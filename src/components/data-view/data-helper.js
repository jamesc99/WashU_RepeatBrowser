export const getFiltered = function (data, cell) {
  const keys = Object.keys(cell);
  let filteredResults = data.filter(item => keys.map(key => item[key] === cell[key]).reduce((acc, cum) => acc && cum))

  return filteredResults

}


export const formatCellInfo = function(rowAttrs, rowKey, colAttrs, colKey, val) {
  let tmp = {
    // count: val
  };
  rowAttrs.forEach((elem, i) => {
    tmp[elem] = rowKey[i];
  });

  colAttrs.forEach((elem, i) => {
    tmp[elem] = colKey[i];
  });

  return tmp;
}