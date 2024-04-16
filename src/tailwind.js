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
    console.log('Full list: ', fullSafelist)
    return fullSafelist
}

async function _updateTailwindConfig(version) {
    __version = version

    let twConfigs = glob.sync(`${process.cwd()}/fir/Pinecones/**/tailwind.js`);

    const safelists = await getSafelist(twConfigs)

    // make an array of all the regex patterns
    let regex = []
    let index = 0
    safelists.forEach((item, i) => {
        console.log(item)
        if (item.pattern) {
            regex.push((new RegExp(item.pattern)).source)
            safelists[i].pattern = `R${index}`
            index ++
        }
    })
    console.log(regex)

    let safelist = JSON.stringify(safelists, null, 2)

    const patternString = /"pattern"(\s*):(\s*)"(.*)"/gm
    let match;
    while ((match = patternString.exec(safelist)) !== null) {
        console.log('Match:', match[0].replace(/"/g, ''))
        safelist = safelist.replace(match[0],match[0].replace(/"/g, ''))
    }

    regex.forEach((item, i) => {
        safelist = safelist.replace(`R${i}`, RegExp(item))
    })


    fs.writeFileSync(`${process.cwd()}/tailwind.safelist.js`, `export const safelist =${safelist}`, 'utf8');

    return new Promise((resolve, reject) => {
        resolve('Hooray!');
    });  
}

export const updateTailwindConfig = await _updateTailwindConfig;
