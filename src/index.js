import { useState, useEffect } from 'react';
import axios from 'axios';

import processSpreadsheet from './utils/processSpreadsheet';
import getChart from './chart';

const GSHEETS_API = 'https://sheets.googleapis.com/v4/spreadsheets/';
/**
 * SmartChart component
 */
const SmartChart = (props) => {
  const [cdata, setCdata] = useState({});
  const [fetchingData, setFetchingData] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  /**
   * Query Google sheets once the component mounts
   */
  useEffect(() => {
    /**
     * Compose and run query using app state
     */
    const runQuery = async () => {
      const { id, sheet, start, end, token } = props;
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

        setFetchingData(true);
        setAuthError(false);
        setFetchError(false);

        try {
          const response = await axios.get(url);
          setFetchingData(false);
          process(response);
        } catch (error) {
          if (error.response && error.response.status === 403) {
            setAuthError(true);
            setFetchingData(false);
          } else {
            setFetchError(true);
            setFetchingData(false);
          }
        }
      } else {
        setFetchingData(false);
      }
    };
    runQuery();
  }, []);

  /**
   * Process fetched data, try to find best data to plot
   * @param {object} res query result
   */
  const process = (res) => {
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

      setCdata(processedData);
    }
  };

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

  if (fetchError) {
    return <p>It looks like there is a connection issue, please try again.</p>;
  }

  /**
   * Support small screens
   *
   * @param {number} screenWidth screen width
   */
  const getSmallScreenChartDimensions = (screenWidth) => {
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

  const chart = getChart(data, maintainAspectRatio, props);
  return (
    <div>
      <div style={style}>{chart}</div>
    </div>
  );
};

export default SmartChart;
