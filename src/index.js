import React, { Component } from 'react';
import processSpreadsheet from './utils/processSpreadsheet';
import getChart from './chart';
import axios from 'axios';

const GSHEETS_API = 'https://sheets.googleapis.com/v4/spreadsheets/';
/**
 * SmartChart component
 */
export default class SmartChart extends Component {
  state = {
    cdata: {},
    fetchingData: false,
    authError: false,
    error: false,
  };

  /**
   * Query Google sheets once the component mounts
   */
  componentDidMount() {
    this.runQuery();
  }

  /**
   * Compose and run query using app state
   */
  runQuery() {
    const { id, sheet, start, end, token } = this.props;
    if (
      id &&
      id.length > 5 &&
      sheet &&
      sheet.length > 0 &&
      token &&
      token.length > 0
    ) {
      let url = `${GSHEETS_API}${id}/values/${sheet}?key=${token}`;
      if (start && start.length > 0 && end && end.length > 0) {
        const grid = `!${start}:${end}`;
        url = `${GSHEETS_API}${id}/values/${sheet}${grid}?key=${token}`;
      }

      this.setState({
        fetchingData: true,
        authError: false,
        error: false,
      });

      axios
        .get(url)
        .then(res => {
          this.setState({ fetchingData: false });
          this.process(res);
        })
        .catch(error => {
          if (error.response && error.response.status === 403) {
            this.setState({ authError: true, fetchingData: false });
          } else {
            this.setState({ error: true, fetchingData: false });
          }
        });
    } else {
      this.setState({ fetchingData: false });
    }
  }

  /**
   * Process fetched data, try to find best data to plot
   * @param {object} res query result
   */
  process(res) {
    if (res.data && res.data.values) {
      let processedData = processSpreadsheet(res.data.values);
      let done = false;
      while (processedData && processedData.data.length > 0 && !done) {
        const tempProcessedData = processSpreadsheet(
          res.data.values,
          processedData.startr + 1,
          processedData.startc + 1,
        );
        if (
          tempProcessedData &&
          tempProcessedData.data.length > processedData.data.length
        ) {
          processedData = tempProcessedData;
        } else {
          done = true;
        }
      }

      this.setState({ cdata: processedData });
    }
  }

  render() {
    const { cdata, fetchingData, authError, error } = this.state;
    if (fetchingData) {
      return '';
    }

    if (authError) {
      return (
        <p>
          It looks like your Spreadsheet is private, please change its access to{' '}
          <strong>Anyone with the link</strong> and then try again
        </p>
      );
    }

    if (error) {
      return (
        <p>It looks like there is a connection issue, please try again.</p>
      );
    }

    /**
     * Support small screens
     *
     * @param {number} screenWidth screen width
     */
    const getSmallScreenChartDimensions = screenWidth => {
      const width = (100 * screenWidth) / 100;
      const height = (95 * width) / 100;
      return [width, height];
    };

    const { data } = cdata;
    if (!data || data.length === 0) {
      return '';
    }

    let dimensions = [];
    let maintainAspectRatio = true;
    if (window.innerWidth < 900) {
      maintainAspectRatio = false;
      dimensions = getSmallScreenChartDimensions(window.innerWidth);
    }

    let style = {};
    if (dimensions.length > 0) {
      style = { width: dimensions[0], height: dimensions[1] };
    }

    const chart = getChart(data, maintainAspectRatio, this.props);
    return (
      <div>
        <div style={style}>{chart}</div>
      </div>
    );
  }
}
