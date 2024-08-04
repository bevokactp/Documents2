
const fs = require('fs');
const path = require('path');


export const fakeDirname = (len_max = 80) => {
    // Generate a random dirname
    
    const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 _-';
    
    // Generate random dirname length between 1 and 80
    const dirLength = Math.floor(Math.random() * len_max) + 1;
    let dirname = '';
    
    for (let i = 0; i < dirLength; i++) {
        dirname += validChars.charAt(Math.floor(Math.random() * validChars.length));
    }
    return dirname.trim();
}

export const fakeFilename = (len_max = 80) => {
    // Generate a random filename

    const filename = fakeDirname(len_max);
    
    const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    
    // Generate random extension length between 1 and 5
    const extLength = Math.floor(Math.random() * 5) + 1;
    
    let extension = '';
    for (let i = 0; i < extLength; i++) {
        extension += validChars.charAt(Math.floor(Math.random() * validChars.length));
    }
    
    return `${filename}.${extension}`;
}


export class ThreePathsRenamerNormalize {
    /*
    function that normalizes a passed path recursively (including files and folders) according to the specified rules

    -- convert to lowercase.
    -- replace underscore (_) with space ( ).
    -- remove sequentially repeated punctuation marks.
    -- remove characters that are not in the allowed set

    const normalizer = new ThreePathsRenamerNormalize();
    normalizer.normalizePath('/home/bk/Downloads/js/mu11da8/src/mu11da8may_js/path/');
    */


    constructor() {
        // Define allowed characters regex
        this.allowedCharactersRegex = /[a-zа-яіїє0-9\- ()+]/g;
    }

    async normalizePath(inputPath) {
        try {
            const stats = await fs.promises.stat(inputPath);
            if (stats.isFile()) {
                await this.normalizeFile(inputPath);
            } else if (stats.isDirectory()) {
                await this.normalizeDirectory(inputPath);
            }
        } catch (err) {
            console.error(`Error processing path ${inputPath}: ${err}`);
        }
    }

    async normalizeDirectory(dirPath) {
        try {
            const files = await fs.promises.readdir(dirPath);
            for (const file of files) {
                const filePath = path.join(dirPath, file);
                await this.normalizePath(filePath);
            }
            // Rename directory itself
            await this.normalizeFile(dirPath);
        } catch (err) {
            console.error(`Error reading directory ${dirPath}: ${err}`);
        }
    }

    async normalizeFile(filePath) {
        try {
            const fileName = path.basename(filePath);
            const fileExt = path.extname(filePath);
            const baseName = path.basename(filePath, fileExt);
            const normalizedBaseName = this.normalizeString(baseName);
            const normalizedFileName = normalizedBaseName + fileExt;
            const directoryPath = path.dirname(filePath);
            const newFilePath = path.join(directoryPath, normalizedFileName);

            if (filePath !== newFilePath) {
                await fs.promises.rename(filePath, newFilePath);
                ppp(`Renamed ${filePath} to ${newFilePath}`);
            }
        } catch (err) {
            console.warn(`Warning: Unable to normalize ${filePath}: ${err.message}`);
        }
    }

    normalizeString(str) {
        // Trim leading and trailing spaces
        let normalized = str.trim();

        // Convert to lowercase
        normalized = normalized.toLowerCase();

        // Replace multiple spaces with a single space
        normalized = normalized.replace(/\s+/g, ' ');

        // Replace underscore (_) with space ( )
        normalized = normalized.replace(/_/g, ' ');

        // Remove sequentially repeated punctuation marks
        normalized = normalized.replace(/([.,\/#!$%^&*;:{}=\-_`~()])\1+/g, '$1');

        // Remove characters that are not in the allowed set
        normalized = normalized.replace(/[^a-zа-яі0-9\- ()+]/g, '');

        return normalized;
    }
}

    
