const fetch = require('node-fetch')
const zarrRemote = require('zarr-js')(fetch)

export async function getZarrParameters(url) {
    const zarr_url = url;
    try {
        let para_promise = new Promise((resolve) => {
            zarrRemote.openGroup(zarr_url, (err, group, metadata) => {
                let parameters = metadata['metadata']['.zattrs']['Parameters'];
                console.log(parameters)
                resolve(parameters);
            })
        })
        const parameters = await para_promise;
        parameters['Zarr'] = zarr_url;
        return parameters;
    }catch (error){
        console.log(error);
        return error;
    }


}