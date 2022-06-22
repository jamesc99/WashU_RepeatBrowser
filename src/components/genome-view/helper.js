export const filterDataAboveCutoff = function(data, cutoff) {
  console.log(data.data);
  let res = data.data.map(chrObj => {
    return chrObj.values.filter(d => d.RPKM > cutoff);
  });
  let filteredList = res.flat();
  // createSessionJSON(filteredList);
  console.log(filteredList);
  // TODO: function to sort filteredList on RPKM and take top 10
  return filteredList;
}



