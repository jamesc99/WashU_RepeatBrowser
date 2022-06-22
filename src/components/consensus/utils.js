// import BigSource from '../../dataSource/BigSource';
import BigWigSource from '../../api/BigWigSource';
// import CONFIG from '../../config/settings.json'
// import { max } from 'd3-array'
// import DATA from '../../json/test.datahubs.json';
// import { Cart } from '../../stores/CartStore';

const fetchConsensusData = async function (FILE, subfam) {
    const fileId = FILE[0].id;
    // const FILE = DATA.files.filter(file => file.File_accession === dataId);
    // const FILE = $Cart.data.filter(file => file.File_accession === dataId);
    // console.log(FILE);
    const optionsBigWig = {
        url: {
            // all: `${CONFIG.WEB_ASSETS_URL_AWS}/${dataId}/data.iteres.bigWig`,
            // unique: `${CONFIG.WEB_ASSETS_URL_AWS}/${dataId}/data.iteres.unique.bigWig`
            all: FILE[0].subfamAll,
            unique: FILE[0].subfamUniq
        },
        params: {
            chr: subfam,
            min: 1,
            max: 99999 // if you give a very large value, it will return just what exists.
            // No need to specifically pass consensus length
        }
    }

    // const dataSource_all = new BigSource(optionsBigWig.url.all);
    // const dataSource_unique = new BigSource(optionsBigWig.url.unique);

    // let allPromise = dataSource_all.getBigWigData(optionsBigWig.params)
    // let uniquePromise = dataSource_unique.getBigWigData(optionsBigWig.params)

    const dataSource_all = new BigWigSource(optionsBigWig.url.all);
    const dataSource_unique = new BigWigSource(optionsBigWig.url.unique);

    const { chr, min, max } = optionsBigWig.params;
    let allPromise = dataSource_all.getData(chr, min, max);
    let uniquePromise = dataSource_unique.getData(chr, min, max);

    let combined = await Promise.all([allPromise, uniquePromise])
    const [all, unique] = combined;

    return { fileId, all, unique };
    // let toRespond = consolidate(combined)
    // let maxValue = calcMaxValue(combined)

    // return { 
    //     data: toRespond,
    //     max: maxValue
    // }

}

function consolidate(responses) {
    let all = responses[0];
    let unique = responses[1];
    
    let consolidated = []

    all.forEach((element, i) => {
        let tmp = {}
        tmp.all = Number.parseInt(element.score, 10);
        tmp.unique = Number.parseInt(unique[i].score, 10);
        tmp.position = i + 1;

        consolidated.push(tmp);
    });

    return consolidated;

}


function calcMaxValue(responses) {
    let all = responses[0];
    let unique = responses[1];

    let allValues = all.map(item => item.score)
    let uniqueValues = unique.map(item => item.score)

    let concatValues = allValues.concat(uniqueValues)

    return d3.max(concatValues)

}

export default fetchConsensusData

/**
const optionsBigWig = {
    url: {
        all: `${CONFIG.WEB_ASSETS_URL}/a7fe1c70-6b00-11e7-8202-1bbac9f23d88/data.iteres.bigWig`,
        unique: `${CONFIG.WEB_ASSETS_URL}/a7fe1c70-6b00-11e7-8202-1bbac9f23d88/data.iteres.unique.bigWig`
    },
    params: {
        chr: 'AluJb',
        min: 1,
        max:  400  // if you give a very large value, it will return just what exists. 
                    // No need to specifically pass consensus length
    }
}
 */

export const fetchConsensusDataAll = async function(experiment, subfam, FILES) {
    const { Replicates, Controls } = experiment;

    let signalPromises = [];
    let backgroundPromises = [];

    let signalValues = [];
    let backgroundValues = [];

    Replicates.map(fileName => {
        const file = FILES.filter(file => file.id === fileName);
        if (file.length === 0) {
            console.error('File not found : ' + fileName);
            throw new Error('File not found : ' + fileName);
        } else {
            signalPromises.push(fetchConsensusData(file, subfam));
        }
    })
    signalValues = await Promise.all(signalPromises);

    if (Controls.length > 0) {
        Controls.map(fileName => {
            const file = FILES.filter(file => file.id === fileName);
            if (file.length === 0) {
                console.error('File not found : ' + fileName);
                throw new Error('File not found : ' + fileName);
            } else {
                backgroundPromises.push(fetchConsensusData(file, subfam));
            }
        })
        backgroundValues = await Promise.all(backgroundPromises);
    }

    return [...signalValues, ...backgroundValues]
}
