/**
 * Spreadsheet processor brain
 *
 * Process values and stores them in an array
 * Use startr and startc to recursively check for better data to  plot
 *
 * @param {array} values
 * @param {number} startr
 * @param {number} startc
 */
const processSpreadsheet = (values, startr = 0, startc = 0) => {
  const processedData = {
    data: [],
    start: '',
    end: '',
    startr: 0,
    startc: 0,
  };
  let rowstart = -1;
  let colstart = 999999999;
  let colend = -1;
  let donerows = false;
  values.forEach((element, rowindex) => {
    if (rowindex >= startr) {
      if (element.length > 0 && !donerows) {
        if (rowstart < 0) {
          rowstart = rowindex + 1;
        }
        let donecols = false;
        const elements = [];
        element.forEach((value, colindex) => {
          if (colindex >= startc) {
            const trimmedValue = value.trim();
            if (!donecols) {
              if (trimmedValue.length > 0) {
                elements.push(trimmedValue);
                if (colindex < colstart) {
                  colstart = colindex;
                }
                if (colindex > colend) {
                  colend = colindex;
                }
              } else if (elements.length > 0) {
                donecols = true;
              }
            }
          }
        });
        processedData.data.push(elements);
      } else if (rowstart > 0) {
        donerows = true;
      }
    }
  });

  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
  const rowend = rowstart + processedData.data.length - 1;
  const gridStart = alphabet[colstart] + rowstart;
  const gridEnd = alphabet[colend] + rowend;
  processedData.startr = rowstart;
  processedData.startc = colstart;

  processedData.start = gridStart;
  processedData.end = gridEnd;

  return processedData;
};

export default processSpreadsheet;
