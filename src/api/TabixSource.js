import { TabixIndexedFile } from '@gmod/tabix';
import { RemoteFile } from 'generic-filehandle';

export default class TabixSource {
    constructor(url) {
        this.url = url;
        this.tabix = new TabixIndexedFile({ 
            filehandle: new RemoteFile(url),
            tbiFilehandle: new RemoteFile(url+'.tbi'),
        });
        this.header = null;
    }
    async getData(chrom, start, end) {
        const lines = [];
        await this.tabix.getLines(chrom, start, end, line => lines.push(line));
        return lines;
    }
}