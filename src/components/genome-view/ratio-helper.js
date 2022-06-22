import DATA from '../../json/test.datahubs.json'; // TODO: remove hard-coding
import CHROMOSOMES from '../../json/chromosomes.json'; // TODO : should come from get request with genome as parameter
import CONFIG from '../../config/settings.json';
import BigWigSource from '../../api/BigWigSource';
import BigBedSource from '../../api/BigBedSource';
import TabixSource from '../../api/TabixSource';

export const experimentToChrData = async function (experiment, subfam, FILES) {

    let response = {
        signal: [],
        background: []
    }
    let signalPromises = experiment
        .Replicates
        .map(dataId => fetchRPKMTabixChrAll(dataId, subfam, FILES))
    response.signal = await Promise.all(signalPromises)

    if (experiment.Controls.length) {
        let backGroundPromises = experiment
            .Controls
            .map(dataId => fetchRPKMTabixChrAll(dataId, subfam, FILES))
        response.background = await Promise.all(backGroundPromises)
    };

    let result = {};
    let resultChr = sortByChr(response);

    return resultChr;

}

export const fetchRPKMTabixChrAll = async function (dataId, subfamily, FILES) { // not restricted to a single chr

    console.log(FILES);
    const file = FILES.filter(d => d.id === dataId);
    console.log(file)

    if (file.length === 0) {
        console.error('File not found : ' + dataId);
        throw new Error('File not found : ' + dataId);
    } else {
        const URL = file[0].subfamLoci;
        const tab = new TabixSource(URL);
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
}

// not DRY
function responseParse(input) {

    const parsedInput = input.map(element => {
        const myArray = element.split('\t');
        const lastItem = myArray[myArray.length - 1];
        return JSON.parse(lastItem)
    })

    return parsedInput;
}

function calcExtent(list, key) {
    const listValues = list.map(d => d[key]);
    const extent = d3.extent(listValues);
    return extent;
}

export const calcExtentAll = (input) => {
    let listValues = [];
    input.forEach(d => listValues.push(d.values));
    let flattenedList = flatten(listValues).map(d => d.RPKM);
    const extent = d3.extent(flattenedList);
    const [min,
        max] = [...extent];

    return extent;
}

export const flatten = (arr) => {
    return arr.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten)
            ? flatten(toFlatten)
            : toFlatten);
    }, []);
}

const fetchChrRPKM = async function (chr, dataId, subfam, test) {

    let params = {}
    if (test) {
        params = {
            chr: 'chr7',
            min: 1,
            max: 10
        }
    } else {
        params = {
            chr: chr,
            min: 1,
            max: 99999999
        }
    }

    let optionsBigBed = {
        url: `${CONFIG.WEB_ASSETS_URL_AWS}/${dataId}/bigbed/${subfam}.bb`,
        params: params
    }

    const dataSource = new BigBedSource(optionsBigBed.url);
    let {chromosome, min, max} = optionsBigWig.params;

    // let resPromise = dataSource.getBigBedData(optionsBigBed.params)
    let resPromise = dataSource.getData(chromosome, min, max);

    return resPromise
}

export {fetchChrRPKM}

const fetchChrRPKMTabix = async function (chr, dataId, subfamily, test) {
    const URL = DATA
        .files
        .filter(d => d.id === dataId)[0]
        .subfamLoci;
    const tab = new TabixSource(URL);
    try {
        const tabData = await tab.getData(subfamily, 0, 1);
        const fetchedData = responseParse(tabData);
        const extent = calcExtent(fetchedData, 'RPKM');
        const data = nestByChr(fetchedData);
        // return { fetchedData, data, extent, selection: extent };
        return data.filter(d => d.key === chr)[0].values
    } catch (error) {
        throw new Error(error)
    }
}

export {fetchChrRPKMTabix}

const testIfRPKMexists = async function (experiment, subfam) {

    let dataFetchPromisesReplicates = experiment
        .replicates
        .map(dataId => fetchChrRPKMTabix('chr7', dataId, subfam, true))
    let allPromises = dataFetchPromisesReplicates

    if (experiment.controls.length > 0) {
        let dataFetchPromisesControls = experiment
            .controls
            .map(dataId => fetchChrRPKMTabix('chr7', dataId, subfam, true))
        allPromises = dataFetchPromisesReplicates.concat(dataFetchPromisesControls)
    }

    let result = await Promise.all(allPromises)

    return result

}

export {testIfRPKMexists}

const sortByChr = async function (data) { // experimentToChrData output to sort into chr bins

    let result = {};
    // reshape { signal : [ [chr1: ..., ch2: ...], [chr1: ..., chr2: ..] ]} TO
    //    chr1: { signal: [], background: [] }, chr2 :...
    CHROMOSOMES.forEach(chr => {
        result[chr] = {
            signal: [],
            background: []
        };
    });

    data
        .signal
        .forEach(list => {
            list.forEach(({key, values}) => result[key].signal.push(values));
        });
    if (data.hasOwnProperty('background')) {
        data
            .background
            .forEach(list => {
                list.forEach(({key, values}) => result[key].background.push(values));
            });
    }

    return result;
}

export {sortByChr}

const fetchGenomicRatios = async function (chr, experiment, subfam) {

    let response = {
        signal: [],
        background: []
    }
    let signalPromises = experiment
        .replicates
        .map(dataId => fetchChrRPKMTabix(chr, dataId, subfam, false))
    response.signal = await Promise.all(signalPromises)

    if (experiment.controls.length) {
        let backGroundPromises = experiment
            .controls
            .map(dataId => fetchChrRPKMTabix(chr, dataId, subfam, false))
        response.background = await Promise.all(backGroundPromises)
    }

    return calcRatioForALocation(response)

}

export {fetchGenomicRatios};

export const calcRatioForALocation = function (data) {
    let signalRPKMobj = {}
    let backgroundRPKMobj = {}

    let backgroundRPKMs = data
    let signalRPKMs = data
        .signal
        .map(dataItem => {
            return dataItem.map(item => ({start: item.start, end: item.end, rpkm: item.RPKM}))
        })

    signalRPKMs.forEach(dataItem => {
        dataItem.forEach(item => {
            if (signalRPKMobj.hasOwnProperty(item.start)) {
                signalRPKMobj[item.start]['RPKM'].push(item.rpkm);
            } else {
                signalRPKMobj[item.start] = {
                    RPKM: [item.rpkm],
                    end: item.end
                }
            }
        })
    })

    if (data.background.length) {
        let backgroundRPKMs = data
            .background
            .map(dataItem => {
                return dataItem.map(item => ({start: item.start, end: item.end, rpkm: item.RPKM}))
            })

        backgroundRPKMs.forEach(dataItem => {
            dataItem.forEach(item => {
                if (backgroundRPKMobj.hasOwnProperty(item.start)) {
                    backgroundRPKMobj[item.start]['RPKM'].push(item.rpkm);
                } else {
                    backgroundRPKMobj[item.start] = {
                        RPKM: [item.rpkm],
                        end: item.end
                    }
                }
            })
        })
    }

    let summarizedRatios = [];

    Object
        .keys(signalRPKMobj)
        .forEach(key => {

            let signalValues = getRPKMfloat(signalRPKMobj[key], 'RPKM')
            let signalMean = d3.mean(signalValues)

            if (backgroundRPKMobj.hasOwnProperty(key)) {
                let backgroundValues = getRPKMfloat(backgroundRPKMobj[key], 'RPKM');
                let backgroundMean = d3.mean(backgroundValues);
                let ratio = calcLogOddsRatio(signalMean, backgroundMean);

                summarizedRatios.push({start: parseFloat(key), end: backgroundRPKMobj[key].end, RPKM: ratio})
            } else {
                //TODO: DNAse-seq logic goes here
            }
        })

    return summarizedRatios;
}

function calcLogOddsRatio(numerator, denominator) {

    return Math.log2(numerator / denominator)
}

function getRPKMfloat(arr, key) {

    return arr[key].map(item => Number.parseFloat(item, 10))
}

function nestByChr(parsedInput) {
    const nestedByChr = d3
        .nest()
        .key(function (d) {
            return d.chr;
        })
        .entries(parsedInput);

    return nestedByChr;
}
