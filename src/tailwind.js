import fs from 'fs-extra';
import _camelCase from 'lodash.camelcase'
import _kebabCase from 'lodash.kebabcase'
import glob from 'glob'

import { fileURLToPath } from 'url';
import { dirname, basename } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let __version = 'v1'

async function getSafelist (lists) {
    let fullSafelist = [];
    for (const list of lists) {
        console.log('Parsing list: ', list)
        const { safelist } = await import(list);
        fullSafelist = [...fullSafelist, ...safelist]
    }
    console.log('Finished safelists import')
    conbsole.log('Full list: ', fullSafelist)
    return fullSafelist
}

async function _updateTailwindConfig(version) {
    __version = version

    let twConfigs = glob.sync(`${process.cwd()}/fir/Pinecones/**/tailwind.js`);

    const safelists = await getSafelist(twConfigs)

    fs.writeFileSync(`${process.cwd()}/tailwind.safelist.js`, `export const safelist =${JSON.stringify(safelists, null, 2).replace(/"/g, '')}`, 'utf8');

    return new Promise((resolve, reject) => {
        resolve('Hooray!');
    });  
}

export const updateTailwindConfig = await _updateTailwindConfig;
