const convertToArray = sheet => {
  const keys = Object.keys(sheet);
  const columns = keys.map(key => {
    if (key.includes('!')) return
    return sheet[key].w;
  }).filter(column => column !== undefined);

  return columns;
}

const organizeSheet = (sheet) => {
  const sheetOrganized = [];
  const chunkSize = 7;
  for (let i = 0; i < sheet.length; i += chunkSize) {
    sheetOrganized.push(sheet.slice(i, i + chunkSize));
  }
  return sheetOrganized;
}

module.exports = {
  organizeSheet,
  convertToArray,
}