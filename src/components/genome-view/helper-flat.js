import TabixSource from '../../api/TabixSource';
const fetch = require('node-fetch')
const zarrRemote = require('zarr-js')(fetch)

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

export async function getZarrLoci(subfam, FILE){
    const zarr_url = FILE[0].Zarr;
    const fileId = FILE[0].id;
    const mode = FILE[0].Mode;

    let loci_tile;
    if (mode === 'Experiment'){
        loci_tile = 'signal_loci';
    }else {
        loci_tile = 'loci';
    }

    let loci_promise = new Promise((resolve) => {
        zarrRemote.openGroup(zarr_url, (err, group, metadata) => {
            group[`${loci_tile}_${subfam}`]([0], function(err, array){
                const raw_data = array.data;
                let chro_dict = {};
                for(let i = 0; i < raw_data.length; i=i+4){
                    let chrome = raw_data[i];
                    let start = raw_data[i+1];
                    let end = raw_data[i+2];
                    let RPKM = raw_data[i+3];
                    if(chro_dict[`${chrome}`]){
                        chro_dict[`${chrome}`].push({'chr': chrome, 'start': start, 'end': end, 'RPKM': parseFloat(RPKM)});
                    }
                    else{
                        chro_dict[`${chrome}`] = [{'chr': chrome, 'start': start, 'end': end, 'RPKM': parseFloat(RPKM)}];
                    }
                }

                let return_array = new Array();
                for(let i = 0; i < 22; i++){
                    if(i == 0){
                        // return_array[i] = {'chrX': chro_dict['chrx']};
                        if(chro_dict['chrX']){
                            return_array.push({key: 'chrX', values: chro_dict['chrX']});
                        }

                    }
                    else {
                        if(chro_dict[`chr${i}`]){
                            return_array.push({key: `chr${i}`, values: chro_dict[`chr${i}`]});
                        }
                    }
                }
                resolve(return_array);
            })
        })
    })

    let return_value = await loci_promise;

    return return_value
}
