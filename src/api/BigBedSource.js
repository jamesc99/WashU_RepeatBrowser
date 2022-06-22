import {BigBed} from '@gmod/bbi';
// import BED from '@gmod/bed';

// const ti = new BigBed({
//   filehandle: new LocalFile(require.resolve('./data/hg18.bb'))
// })
// const {autoSql} = await ti.getHeader()
// const feats = await ti.getFeatures('chr7', 0, 100000)
// const parser = new BED({autoSql})
// const lines = feats.map(f => {
//   const {start, end, rest, uniqueId} = f
//   return parser.parseLine(`chr7\t${start}\t${end}\t${rest}, { uniqueId })
// })

    export default class BigBedSource {
      constructor(url){
          this.url = url;
          this.ti = new BigBed({
              url,
          });
          this.header = null;
      }
  
      async getData(chrom, start, end, scale=1) {
          return await this.ti.getFeatures(chrom, start, end);
      }
  }
