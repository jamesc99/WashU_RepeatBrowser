# Data Processing
Pipeline for generating .zarr file as the input of [WashU Repetitive Element Browser](https://repeatbrowser.org/)

Current Version: `rb_v5.0` Last update: `2022.12.03`

## Usage:
For easy and reproducible usage, we have compacted the data processing pipeline into Docker and Singularity images. We highly recommend using Singularity image for non-root users.
### Singularity3 Installation
The singularity image has to be run with **Singularity version3+**, you could follow this instruction if you haven`t install Singularity3. <br/>Please [click here](https://github.com/sylabs/singularity/blob/main/INSTALL.md)<br/>(You will need sudo permission to properlly install and configure it, but you can run it without sudo after installation:smiley:)

### Run Singularity image
**Step1** Download the singularity image and reference files (you only need download them **ONCE**, then you can use them directly), if there is any update, you may need to download a new image, but reference files are usually **NOT** changed:

1. Download the singularity image:
```
wget https://wangftp.wustl.edu/~scheng/repeat_browser/rb_v5.0.simg
```

2. Download the reference files of different genome:
```
wget https://wangftp.wustl.edu/~scheng/repeat_browser/Genome/hg38.tar.gz
```
You can also find more genome builds: [click here](https://wangftp.wustl.edu/~scheng/repeat_browser/Genome/) . Currently we have: mm9/10/39, hg19/38, danRer10/11, rn6 and dm6.

3. Decompress the reference files and put to your own folder:
```
tar -zxvf hg38.tar.gz
```

**Step2** Process data by the singularity image:

**:bangbang:Please run the cmd on the same directory of your data, if your data is on /home/example, then you may need `cd /home/example` first. The location of image and reference files is up to you.**
```
singularity run -B ./:/home -B <path-to-parent-folder-of-ref-file>:/zarr_generation/Genome <path-to-downloaded-image> \
-d <fastq/BAM> -g <hg38/mm10 etc. > -r <PE/SE> \ 
--length <read length of fastq file> \
--assay <DNA-seq/CAGE-seq/Chip-seq> \
-o <experimental_read_file1/BAM_file> -O <experimental read file2> \
-i <IgG_control read file1/BAM file> -I <IgG_control read file2> \
--local (use this option when you want to generate the .zarr file locally) \
--s3_path <s3 path> (use this option when you want to upload the .zarr file to Amazon S3 bucket)
```
For example, if<br/>a) you download the image on /home/image/rb_v5.0.simg<br/>b) the reference file on /home/src/hg38<br/>c) and your data type is Chip-seq FASTQ data with the length as 50 bp<br/>d) and the experiment data is read1.fastq.gz and read2.fastq.gz on folder /home/data<br/>e) and input data is igg_1.fastq.gz and igg_2.fastq.gz on folder /home/data<br/>f) and you want to generate the .zarr file locally

Then you need to:
1. `cd /home/data`
2. `singularity run -B ./:/home -B /home/src:/zarr_generation/Genome /home/image/rb_v5.0.simg -d fastq -g mm10 -r PE --length 50 --assay Chip-seq -o read1.fastq.gz -O read2.fastq.gz -i igg_1.fastq.gz -I igg_2.fastq.gz --local`

:bangbang:Note: <br/>1. For **CAGE-seq data**, you can ONLY use FASTQ file as input to generate .zarr file. For **Chip-seq and DNA-seq (ATAC-seq, DNase-seq etc. ) data**, we support both FASTQ and BAM files as input file. <br/>2. For Chip-seq data, you have to have the same format of input files of Chip-seq data (either all FASTQ files or all BAM files)<br/>3. Please notice you could only choose one between `--s3_path` and `--local`, and there will be a local back-up .Zarr file even you have selected `--s3_path` option

#### Parameters of processing pipeline:
`-h`: help information<br/>
`-d`: input file format. *fastq* for FASTQ file, *BAM* for BAM file<br/>
`-g`: genome reference. For now the supported genoms are: <mm39/mm10/mm9/hg38/hg19/danRer11/danRer10/rn6/dm6><br/>
`-r`: SE for single-end, PE for paired-end<br/>
`--length`: length of raw FASTQ file, mapped read length of BAM file<br/>
`--assay`: *DNA-seq* for DNA-seq (ATAC-seq, DNase-seq etc.), *CAGE-seq*, *Chip-seq*<br/>
`-o`: experiment fastq/BAM file 1 or the SE fastq/BAM file, must be ended by .fastq or .fastq.gz or .bam<br/>
`-O`: experiment fastq/BAM file 2 if input PE data, must be ended by .fastq or .fastq.gz or .bam<br/>
`-i`: input control fastq/BAM file 1 or the SE fastq/BAM file (only be used when assay type is Chip-seq), must be ended by .fastq or .fastq.gz or .bam<br/>
`-I`: input control fastq/BAM file 2 (only be used when assay type is Chip-seq)<br/>
`--local`: create the .zarr file locally (Please notice you could only choose one between --s3_path and --local)<br/>
`--s3_path`: s3 path for AWS S3 bucket<br/>
`--id`: (optional) ID information (default: unknown)<br/>
`--biosample`: (optional) Biosample information, same as ENCODE website (default: unknown)<br/>
`--tissue`: (optional) Tissue information, same as ENCODE website (default: unknown)<br/>
`--experiment`: (optional) Experiment ID information (default: unknown)<br/>

**Step3** Upload the generated .zarr file to WashU Repeat Browser 
[sample image here]

### Test data
There are some sample data


### Docker image
