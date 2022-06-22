import TabixSource from '../../api/TabixSource';

export const fetchRPKMTabixChrAll = async function (dataId, subfamily, URL) {        // not restricted to a single chr

  // const URL = DATA.files.filter(d => d.File_accession === dataId)[0].subfamLoci;
  const tab =  new TabixSource(URL);
  try {
      const tabData = await tab.getData(subfamily, 0, 1);
      const fetchedData = responseParse(tabData);
      const extent = calcExtent(fetchedData, 'RPKM');
      const data = nestByChr(fetchedData);
      // return { fetchedData, data, extent, selection: extent };
      return data
  } catch (error) {
      throw new Error(error)
  }  
}

function responseParse(input) {

  const parsedInput = input.map(element => {
      const myArray = element.split('\t');
      const lastItem = myArray[myArray.length-1];
      return JSON.parse(lastItem)
  })

  return parsedInput;
}

function calcExtent(list, key) {
  const listValues = list.map(d => d[key]);
  const extent = d3.extent(listValues);
  return extent;
}

function nestByChr(parsedInput) {
  const nestedByChr = d3.nest()
                          .key(function(d) { return d.chr; })
                          .entries(parsedInput);

  return nestedByChr;
}
