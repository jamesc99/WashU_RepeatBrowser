import CONFIG from '../config/settings.json';
import axios from 'axios';
import { subfamilies } from '../json/classification.json';
const SUBFAM_LOOKUP = subfamilies;
// data fetch api calls
const fetchIteresStat = async function (dataId) {
    let API_URL = `${CONFIG.WEB_ASSETS_URL_AWS}/${dataId}/data.iteres.subfamily.stat`
    let res = await axios.get(API_URL)
    let tsvContent = res.data
    let convertedJSON = tsvJSON(tsvContent)

    return convertedJSON
}

function lookupURL(dataId, FILES) {
    const requireFile = FILES.filter(file => file.File_accession === dataId)[0];

    if (requireFile) {
        return requireFile.subfamStat;
    } else {
        return null;
    }
}

const fetchNewFormatFile = async function (dataId, FILES) {
    const API_URL = lookupURL(dataId, FILES);
    // console.log(API_URL);
    // console.log(API_URL);
    // let API_URL = `${CONFIG.WEB_ASSETS_URL_AWS}/${dataId}/data.iteres.subfamily.stat`
    try {
        if (API_URL) {
            let res = await axios.get(API_URL).then(res => res.data);
            return res;
        } else {
            throw new Error('Not a valid URL found for ' + dataId);
        }
    } catch (error) {
        console.log(error);
    }
}

const makeClusterServerRequest = function (matrixRawJson) {
    return axios.post(CONFIG.CLUSTER_API_URL, {matrixJson: matrixRawJson});
};

export {makeClusterServerRequest}

const getDataMatrix = async function (data, files, subfamList) {

    const experiments = data;
    console.log('experiment is: ' + data);
    // let experimentPromises = experiments.map(experiment => fetchData({signal: experiment.replicates, background: experiment.controls}, files))
    let experimentPromises = experiments.map(experiment => {
        // const experimentParts = experiment.details;
        const { Replicates, Controls } = experiment;
        // console.log("replicates: "+ Replicates, " controls: " + Controls)
        if (Controls.length > 0) {
            return fetchData({signal: Replicates, background: Controls}, files)
        } else {
            return fetchData({signal: Replicates}, files)
        }
    });
    let experimentData = await Promise.all(experimentPromises)
    let ratios = experimentData.map(experiment => getRatios(experiment, subfamList))
    let matrix = makeMatrixDetails(experiments, subfamList)
    matrix.data = ratios

    return matrix
}

export {getDataMatrix}

const fetchData = async function (dataIds, FILES) {
    
    let dataFetchPromises = {}
    dataFetchPromises["signal"] = dataIds.signal.map(id => fetchNewFormatFile(id, FILES))
    if (dataIds.background) {
        dataFetchPromises["background"] = dataIds.background.map(id => fetchNewFormatFile(id, FILES))
    }

    let fetchedData = {}
    try {
        fetchedData.signal = await Promise.all(dataFetchPromises.signal)
        // if (dataIds.background) {
        //     fetchedData.background = await Promise.all(dataFetchPromises.background)
        // }
    } catch (e) {
        console.log('Error fetching dataFetchPromises.signal' + e);
    }
    if (dataIds.background) {
        try {
            fetchedData.background = await Promise.all(dataFetchPromises.background)
        } catch (e) {
            console.log('Error fetching dataFetchPromises.background' + e);
        }
    }
    
    return fetchedData
}

export {fetchData}

const getRatios = function (fetchedData, subfamList) {
    return subfamList.map(subfam => getRatio(fetchedData, subfam))
}
export {getRatios}

// Non exported functions

function getRatio(fetchedData, subfam) {

    let subfamItems = {}
    // filter for the given subfam
    subfamItems.signal = fetchedData.signal.map(item => item[subfam]);
    let numerator = d3.mean(getAllRPKM(subfamItems.signal));
    let logOddsRatio = Math.log2(numerator);

    if (fetchedData.hasOwnProperty('background')) {
        subfamItems.background = fetchedData.background.map(item => item[subfam]);
        let denominator = d3.mean(getAllRPKM(subfamItems.background));
        logOddsRatio = calcRatio(numerator, denominator);
    }
    
    return logOddsRatio
}

function calcRatio(numerator, denominator) {
    return Math.log2(numerator / denominator)
}

function getAllRPKM(arr) {
    return arr.map(item => Number.parseFloat(item.all_reads_RPKM, 10))
    }

//var tsv is the TSV file with headers
function tsvJSON(tsv) {

    var lines = tsv.split('\n');
    var result = [];

    var headers = lines[0].split('\t');

    for (var i = 1; i < lines.length; i++) {

        var obj = {};
        var currentline = lines[i].split('\t');
        if (currentline.length > 1) {
            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }

            if (obj.subfamily === 'AluSq10') {
                console.log(obj);
            }

            result.push(obj);
        }
    }

    return result; //JavaScript object
    // return JSON.stringify(result); //JSON
}

function makeMatrixDetails(experiments, subfamList) {
    return {
        rowNames: getRowNames(experiments),
        colLabels: subfamList,
        rowLabels: getRowLabels(experiments),
        rowSample: getRowSamples(experiments),
        rowAssay: getRowAssays(experiments),
        colFam: getSubfamFamily(subfamList),
        colClass: getSubfamType(subfamList)
    }
}

function getRowNames(experiments) {
    return experiments.map(experiment => experiment.id)
}
export {getRowNames}

function getRowLabels(experiments) {
    return experiments.map(experiment => `${experiment.Assay}_of_${experiment.Tissue}`)
}

function getRowSamples(experiments) {
    return experiments.map(experiment => experiment.Tissue)
}

function getRowAssays(experiments) {
    return experiments.map(experiment => experiment.Assay)
}

function getSubfamFamily(subfamList) {
    
    return subfamList.map(subfam => {
        if (!SUBFAM_LOOKUP[subfam]) {
            console.log(subfam)
        }

        return SUBFAM_LOOKUP[subfam].family;
    })
}

function getSubfamType(subfamList) {
    return subfamList.map(subfam => SUBFAM_LOOKUP[subfam].type)
}


/**
 * rowNames: [
        'GSM733646', 'GSM733691', 'GSM733718', 'GSM945854'
    ],
    colLabels: [
        'AluJb', 'AluY', 'AluSx1', 'L2c', 'AluSz'
    ],
    rowLabels: [
        'NHLF H3K27ac Broad', 'HUVEC H3K27ac Broad', 'H1-hESC H3K27ac Broad', 'MCF-7 H3K27ac USC'
    ],
    rowSample: [
        '22019', '22019', '22019', '22019'
    ],
    rowAssay: [
        '13057', '13052', '11101', '14028'
    ],
    colFam: [
        'Alu', 'Alu', 'Alu', 'L2', 'Alu'
    ],
    colClass: [
        'SINE', 'SINE', 'SINE', 'LINE', 'SINE'
    ],
 */

export const transformDataForFlatHeatmap = function(input) {
    const { rowNames, colLabels, data } = input;
    let result = [];
    let tmp = {};
    rowNames.forEach((experimentId, i) => {
        tmp.id = experimentId;
        colLabels.forEach((repeatName, j) => {
            tmp[repeatName] = data[i][j];
        });
        result.push(tmp);
    });

    return result;
}