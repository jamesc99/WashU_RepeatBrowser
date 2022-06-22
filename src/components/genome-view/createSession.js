export const createSession = function(input, count, subfam, uuid) {

  const allDataPoints = input.map(chr => chr.values.map(d => {
    let tmp = {...d};
    tmp.chr = chr.key;

    return tmp;
  })).flat(2);
  const topTenEntries = calcTopEntries(allDataPoints, 'RPKM', count);
  const totalLength = calcTotalLength(topTenEntries);

  let features = topTenEntries.map((d, index) => {
    return {
      name: subfam + "_" + parseInt(index + 1),
      locus: { start: d.start, end: d.end, chr: d.chr },
      strand: "+"
    }
  })

  let bundleId = uuid;
  let viewIntervalEnd = totalLength;
  
  const updatedTemplate =`
  {
    "genomeName": "hg38",
    "viewInterval": { "start": 0, "end": ${viewIntervalEnd} },
    "tracks": [
      {
        "name": "gencodeV29",
        "type": "geneannotation",
        "label": "gencodeV29",
        "options": { "maxRows": 10, "label": "gencodeV29" },
        "url": "",
        "metadata": { "Track type": "geneannotation" },
        "isSelected": false,
        "fileObj": "",
        "files": [],
        "tracks": [],
        "isText": false,
        "textConfig": {},
        "genome": "hg38"
      },
      {
        "name": "RepeatMasker",
        "type": "repeatmasker",
        "label": "RepeatMasker",
        "options": { "label": "RepeatMasker" },
        "url": "https://vizhub.wustl.edu/public/hg38/rmsk16.bb",
        "metadata": { "Track type": "repeatmasker" },
        "isSelected": false,
        "fileObj": "",
        "files": [],
        "tracks": [],
        "isText": false,
        "textConfig": {}
      },
      {
        "name": "Ruler",
        "type": "ruler",
        "label": "Ruler",
        "options": { "label": "Ruler" },
        "url": "",
        "metadata": { "Track type": "ruler" },
        "isSelected": false,
        "fileObj": "",
        "files": [],
        "tracks": [],
        "isText": false,
        "textConfig": {}
      }
    ],
    "metadataTerms": [],
    "regionSets": [
      {
        "name": "test",
        "features": ${JSON.stringify(features)},
        "genomeName": "hg38",
        "flankingStrategy": { "type": 0, "upstream": 0, "downstream": 0 }
      }
    ],
    "regionSetViewIndex": 0,
    "trackLegendWidth": 120,
    "bundleId": "${bundleId}",
    "isShowingNavigator": true
  }
  `
  return updatedTemplate;

}

const reducer = (accumulator, currentValue) => {
  let res = accumulator + currentValue;
  return res;
 } ;

function calcTotalLength(list) {
  return list.map(d => d.end - d.start).reduce(reducer);
}

function calcTopEntries(list, key, count) {
  return list.sort((a, b) => (a[key] > b[key]) ? 1 : -1).slice(Math.max(list.length - count, 1));
}

function calcBottomEntries(list, key, count) {
  return list.sort((a, b) => (a[key] > b[key]) ? 1 : -1).slice(0, count);
}