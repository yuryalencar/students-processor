const readXlsxFile = require('read-excel-file/node');
var xlsx = require("xlsx");

const {
  organizeSheet,
  convertToArray,
} = require('./helper');

const readSheet = async buffer => {
  const file = xlsx.read(buffer);
  const sheet = file.Sheets[file.SheetNames[0]];
  const sheetCleaned = convertToArray(sheet);
  const sheetOrganized = organizeSheet(sheetCleaned);
  sheetOrganized.splice(0,1);
  return sheetOrganized;
}

module.exports = { readSheet };
