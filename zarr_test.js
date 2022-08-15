const test = require('tape')
const fs = require('fs/promises')
const fetch = require('node-fetch')
const zarrLocal = require('zarr-js')(fs.readFile)
const zarrRemote = require('zarr-js')(fetch)

const args = process.argv

const urlLocal = 'data/'
const urlRemote =
    'https://storage.googleapis.com/carbonplan-share/testing/zarr-js/'

// zarrRemote.openGroup('https://repeatbrowser.s3.us-east-2.amazonaws.com/stat/example.zarr', (err, group, metadata) => {
//     // console.log(metadata['metadata']['.zattrs']['all_wig'])
//     group.subfam_stat([0, 0], function (err, array) {
//         console.log(array.data)
//     })
// })

// async function getdata(dataname, chunksize){
//     Promise.all(chunksize.map(
//         (key) =>
//         new Promise((resolve) => {
//             zarrRemote.openGroup('https://repeatbrowser.s3.us-east-2.amazonaws.com/stat/example.zarr', (err, group) => {
//                 group[dataname]([key, 0], function(err, array) {
//                     resolve(array.data)
//                 })
//             })
//         })
//     )
//     ).then(values => {console.log(values)})
// }
// const chunksize = [0, 1, 2];
// const dataname = 'subfam_stat';
// getdata(dataname, chunksize);

// async function getZarrWig(wig_type, subfam){
//     let chunk_id;
//     let wig_zatrr;
//     switch (wig_type){
//         case 'all_bigwig':
//             chunk_id = [0, 0];
//             wig_zatrr = 'all_wig';
//             break;
//
//         case 'uni_bigwig':
//             chunk_id = [0, 0];
//             wig_zatrr = 'uni_bigwig';
//             break;
//     }
//
//     let wig_promise = new Promise((resolve) => {
//         zarrRemote.openGroup('https://repeatbrowsers.s3.us-east-2.amazonaws.com/Zarr_data/example.zarr', (err, group, metadata) => {
//             const subfam_list = metadata['metadata']['.zattrs'][wig_zatrr];
//             const chunksize = metadata['metadata'][`${wig_type}/.zarray`]['chunks'];
//             const subfam_index = subfam_list.indexOf(subfam);
//
//             group[wig_type](chunk_id, function(err, array) {
//                 const all_array = array.data;
//                 const target_array = all_array.slice(chunksize[1] * subfam_index, chunksize[1] * (subfam_index + 1));
//                 const return_value = target_array.filter((element, index, array) => {return element >= 0})
//                 resolve(return_value);
//             })
//         })
//     })
//     const target_array = await wig_promise;
//     let return_value = new Array();
//     target_array.forEach((element, i) => {
//         return_value.push({'score': element, 'start': i, 'end': i+1});
//     })
//     console.log(return_value);
// }
// getZarrWig('all_bigwig', "(AGGGGG)n");


// async function getLocidata(chunksize){
//     Promise.all(chunksize.map(
//         (key) =>
//         new Promise((resolve) => {
//             zarrRemote.openGroup('https://repeatbrowsers.s3.us-east-2.amazonaws.com/Zarr_data/example.zarr', (err, group) => {
//                 group['loci'](key, function(err, array) {
//                     resolve(array.data)
//                 })
//             })
//         })
//     )
//     ).then(values => {console.log(values)})
// }
// const chunksize = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]];
// getLocidata(chunksize);


// async function getZarrLoci(subfam, zarr_url){
//     let loci_promise = new Promise((resolve) => {
//         zarrRemote.openGroup(zarr_url, (err, group, metadata) => {
//             group[`loci_${subfam}`]([0], function(err, array){
//                const raw_data = array.data;
//                let loci_data = new Array();
//
//                let chro_dict = {};
//                for(let i = 0; i < raw_data.length; i=i+4){
//                    let chrome = raw_data[i];
//                    let start = raw_data[i+1];
//                    let end = raw_data[i+2];
//                    let RPKM = raw_data[i+3];
//                    if(chro_dict[`${chrome}`]){
//                        chro_dict[`${chrome}`].push({'chr': chrome, 'start': start, 'end': end, 'RPKM': RPKM})
//                    }
//                    else{
//                        chro_dict[`${chrome}`] = [{'chr': chrome, 'start': start, 'end': end, 'RPKM': RPKM}]
//                    }
//                }
//
//                let return_array = new Array();
//                for(let i = 0; i < 22; i++){
//                    if(i == 0){
//                        // return_array[i] = {'chrX': chro_dict['chrx']};
//                        return_array.push({key: 'chrX', values: chro_dict['chrX']});
//                    }
//                    else {
//                        return_array.push({key: `chr${i}`, values: chro_dict[`chr${i}`]});
//                    }
//
//                }
//                console.log(return_array[0]);
//             })
//         })
//     })
// }
// getZarrLoci('MER135', 'https://repeatbrowsers.s3.us-east-2.amazonaws.com/Zarr_data/example.zarr');

// async function getdata(){
//     Promise.all([
//         new Promise((resolve) =>{
//             zarrRemote.openGroup('https://repeatbrowser.s3.us-east-2.amazonaws.com/stat/example.zarr', (err, group) => {
//                 group['subfam_stat']([0, 0], function(err, array) {
//                     // data['SUBFAMILY'] = array.data
//                     resolve(array.data)
//                 })
//                 // group.subfam_stat([1, 0], function (err, array) {
//                 //     data['ALL_RPKM'] = array.data
//                 //     // console.log(array.data)
//                 // })
//                 // group.subfam_stat([2, 0], function (err, array) {
//                 //     data['UNI_RPKM'] = array.data
//                 //     // console.log(array.data)
//                 // })
//             })
//         }),
//         new Promise((resolve) =>{
//             zarrRemote.openGroup('https://repeatbrowser.s3.us-east-2.amazonaws.com/stat/example.zarr', (err, group) => {
//                 group['subfam_stat']([1, 0], function(err, array) {
//                     // data['SUBFAMILY'] = array.data
//                     resolve(array.data)
//                 })
//                 // group.subfam_stat([1, 0], function (err, array) {
//                 //     data['ALL_RPKM'] = array.data
//                 //     // console.log(array.data)
//                 // })
//                 // group.subfam_stat([2, 0], function (err, array) {
//                 //     data['UNI_RPKM'] = array.data
//                 //     // console.log(array.data)
//                 // })
//             })
//         }),
//         new Promise((resolve) =>{
//             zarrRemote.openGroup('https://repeatbrowser.s3.us-east-2.amazonaws.com/stat/example.zarr', (err, group) => {
//                 group['subfam_stat']([2, 0], function(err, array) {
//                     // data['SUBFAMILY'] = array.data
//                     resolve(array.data)
//                 })
//                 // group.subfam_stat([1, 0], function (err, array) {
//                 //     data['ALL_RPKM'] = array.data
//                 //     // console.log(array.data)
//                 // })
//                 // group.subfam_stat([2, 0], function (err, array) {
//                 //     data['UNI_RPKM'] = array.data
//                 //     // console.log(array.data)
//                 // })
//             })
//         })]
//
//     ).then(values => {console.log(values)})
// }







if (args.includes('local')) {
    run(zarrLocal, urlLocal, 'local')
}
if (args.includes('remote')) {
    run(zarrRemote, urlRemote, 'remote')
}

function run(zarr, prefix, mode) {
    test('1d.chunked.compressed.i2' + `.${mode}`, function (t) {
        zarr.load(prefix + '1d.chunked.compressed.i2.zarr', (err, array) => {
            t.deepEqual(array.data, new Int16Array([1, 2, 3, 4]))
            t.end()
        })
    })

    test('1d.chunked.filled.compressed.i2' + `.${mode}`, function (t) {
        zarr.load(prefix + '1d.chunked.filled.compressed.i2.zarr', (err, array) => {
            t.deepEqual(array.data, new Int16Array([1, 2, 0, 0]))
            t.end()
        })
    })

    test('1d.contiguous.uncompressed.i2' + `.${mode}`, function (t) {
        zarr.load(prefix + '1d.contiguous.uncompressed.i2.zarr', (err, array) => {
            t.deepEqual(array.data, new Int16Array([1, 2, 3, 4]))
            t.end()
        })
    })

    test('1d.contiguous.compressed.i4' + `.${mode}`, function (t) {
        zarr.load(prefix + '1d.contiguous.compressed.i4.zarr', (err, array) => {
            t.deepEqual(array.data, new Int32Array([1, 2, 3, 4]))
            t.end()
        })
    })

    test('1d.contiguous.compressed.u1' + `.${mode}`, function (t) {
        zarr.load(prefix + '1d.contiguous.compressed.u1.zarr', (err, array) => {
            t.deepEqual(array.data, new Uint8Array([255, 0, 255, 0]))
            t.end()
        })
    })

    test('1d.contiguous.compressed.f4' + `.${mode}`, function (t) {
        zarr.load(prefix + '1d.contiguous.compressed.f4.zarr', (err, array) => {
            t.deepEqual(array.data, new Float32Array([-1000.5, 0, 1000.5, 0]))
            t.end()
        })
    })

    test('1d.contiguous.uncompressed.i4' + `.${mode}`, function (t) {
        zarr.load(prefix + '1d.contiguous.uncompressed.i4.zarr', (err, array) => {
            t.deepEqual(array.data, new Int32Array([1, 2, 3, 4]))
            t.end()
        })
    })

    test('1d.contiguous.compressed.f8' + `.${mode}`, function (t) {
        zarr.load(prefix + '1d.contiguous.compressed.f8.zarr', (err, array) => {
            t.deepEqual(array.data, new Float64Array([1.5, 2.5, 3.5, 4.5]))
            t.end()
        })
    })

    test('1d.contiguous.compressed.U13' + `.${mode}`, function (t) {
        zarr.load(prefix + '1d.contiguous.compressed.U13.zarr', (err, array) => {
            t.deepEqual(array.data, new Array('a', 'b', 'cc', 'd'))
            t.end()
        })
    })

    test('1d.contiguous.uncompressed.U13' + `.${mode}`, function (t) {
        zarr.load(prefix + '1d.contiguous.compressed.U13.zarr', (err, array) => {
            t.deepEqual(array.data, new Array('a', 'b', 'cc', 'd'))
            t.end()
        })
    })

    test('1d.contiguous.compressed.U7' + `.${mode}`, function (t) {
        zarr.load(prefix + '1d.contiguous.compressed.U13.zarr', (err, array) => {
            t.deepEqual(array.data, new Array('a', 'b', 'cc', 'd'))
            t.end()
        })
    })

    test('1d.contiguous.uncompressed.U7' + `.${mode}`, function (t) {
        zarr.load(prefix + '1d.contiguous.compressed.U13.zarr', (err, array) => {
            t.deepEqual(array.data, new Array('a', 'b', 'cc', 'd'))
            t.end()
        })
    })

    test('1d.contiguous.compressed.S7' + `.${mode}`, function (t) {
        zarr.load(prefix + '1d.contiguous.compressed.U13.zarr', (err, array) => {
            t.deepEqual(array.data, new Array('a', 'b', 'cc', 'd'))
            t.end()
        })
    })

    test('1d.contiguous.uncompressed.S7' + `.${mode}`, function (t) {
        zarr.load(prefix + '1d.contiguous.compressed.U13.zarr', (err, array) => {
            t.deepEqual(array.data, new Array('a', 'b', 'cc', 'd'))
            t.end()
        })
    })

    test('1d.contiguous.compressed.b1' + `.${mode}`, function (t) {
        zarr.load(prefix + '1d.contiguous.compressed.b1.zarr', (err, array) => {
            t.deepEqual(array.data, new Array(true, false, true, false))
            t.end()
        })
    })

    test('1d.contiguous.uncompressed.b1' + `.${mode}`, function (t) {
        zarr.load(prefix + '1d.contiguous.compressed.b1.zarr', (err, array) => {
            t.deepEqual(array.data, new Array(true, false, true, false))
            t.end()
        })
    })

    test('1d.contiguous.uncompressed.f8' + `.${mode}`, function (t) {
        zarr.load(prefix + '1d.contiguous.uncompressed.f8.zarr', (err, array) => {
            t.deepEqual(array.data, new Float64Array([1.5, 2.5, 3.5, 4.5]))
            t.end()
        })
    })

    test('1d.chunked.compressed.i2' + `.${mode}`, function (t) {
        zarr.load(prefix + '1d.chunked.compressed.i2.zarr', (err, array) => {
            t.deepEqual(array.data, new Int16Array([1, 2, 3, 4]))
            t.end()
        })
    })

    test('1d.chunked.ragged.compressed.i2' + `.${mode}`, function (t) {
        zarr.load(prefix + '1d.chunked.ragged.compressed.i2.zarr', (err, array) => {
            t.deepEqual(array.data, new Int16Array([1, 2, 3, 4, 5]))
            t.end()
        })
    })

    test('2d.contiguous.compressed.i2' + `.${mode}`, function (t) {
        zarr.load(prefix + '2d.contiguous.compressed.i2.zarr', (err, array) => {
            t.deepEqual(array.data, new Int16Array([1, 2, 3, 4]))
            t.deepEqual(array.shape, [2, 2])
            t.end()
        })
    })

    test('2d.chunked.compressed.i2' + `.${mode}`, function (t) {
        zarr.load(prefix + '2d.chunked.compressed.i2.zarr', (err, array) => {
            t.deepEqual(array.data, new Int16Array([1, 2, 3, 4]))
            t.deepEqual(array.shape, [2, 2])
            t.end()
        })
    })

    test('2d.chunked.compressed.U7' + `.${mode}`, function (t) {
        zarr.load(prefix + '2d.chunked.compressed.U7.zarr', (err, array) => {
            t.deepEqual(array.data, new Array('a', 'b', 'cc', 'd'))
            t.deepEqual(array.shape, [2, 2])
            t.end()
        })
    })

    test('2d.chunked.filled.compressed.U7' + `.${mode}`, function (t) {
        zarr.load(prefix + '2d.chunked.filled.compressed.U7.zarr', (err, array) => {
            t.deepEqual(array.data, new Array('a', 'b', 'cc', ''))
            t.deepEqual(array.shape, [2, 2])
            t.end()
        })
    })

    test('2d.chunked.ragged.compressed.i2' + `.${mode}`, function (t) {
        zarr.load(prefix + '2d.chunked.ragged.compressed.i2.zarr', (err, array) => {
            t.deepEqual(array.data, new Int16Array([1, 2, 3, 4, 5, 6, 7, 8, 9]))
            t.deepEqual(array.shape, [3, 3])
            t.end()
        })
    })

    test('3d.chunked.compressed.i2' + `.${mode}`, function (t) {
        zarr.load(prefix + '3d.chunked.compressed.i2.zarr', (err, array) => {
            t.deepEqual(
                array.data,
                new Int16Array([
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
                    20, 21, 22, 23, 24, 25, 26,
                ])
            )
            t.deepEqual(array.shape, [3, 3, 3])
            t.end()
        })
    })

    test('3d.contiguous.compressed.i2' + `.${mode}`, function (t) {
        zarr.load(prefix + '3d.contiguous.compressed.i2.zarr', (err, array) => {
            t.deepEqual(
                array.data,
                new Int16Array([
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
                    20, 21, 22, 23, 24, 25, 26,
                ])
            )
            t.deepEqual(array.shape, [3, 3, 3])
            t.end()
        })
    })

    test('3d.chunked.mixed.compressed.i2' + `.${mode}`, function (t) {
        zarr.load(prefix + '3d.chunked.mixed.compressed.i2.zarr', (err, array) => {
            t.deepEqual(
                array.data,
                new Int16Array([
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
                    20, 21, 22, 23, 24, 25, 26,
                ])
            )
            t.deepEqual(array.shape, [3, 3, 3])
            t.end()
        })
    })

    test('1d.contiguous.compressed.i2.group' + `.${mode}`, function (t) {
        zarr.loadGroup(
            prefix + '1d.contiguous.compressed.i2.group.zarr',
            (err, group) => {
                t.deepEqual(group.a.data, new Int16Array([1, 2, 3, 4]))
                t.deepEqual(group.b.data, new Int16Array([5, 6, 7, 8]))
                t.end()
            }
        )
    })

    test('1d.contiguous.compressed.i2.group.list' + `.${mode}`, function (t) {
        zarr.loadGroup(
            prefix + '1d.contiguous.compressed.i2.group.zarr',
            (err, group) => {
                t.deepEqual(group.a.data, new Int16Array([1, 2, 3, 4]))
                t.equal(group.b, undefined)
                t.end()
            },
            ['a']
        )
    })
}