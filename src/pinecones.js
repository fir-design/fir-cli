import { exec } from 'child_process';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import _camelCase from 'lodash.camelcase'
import _kebabCase from 'lodash.kebabcase'
import glob from 'glob'
import replaceInFile from 'replace-in-file'

import { fileURLToPath } from 'url';
import { dirname, basename } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let __version = 'v4'


async function _importPinecone(repo, path, camel, removeGit = true) {

    // check the path to see if a folder already exists with the sane name as camel
    // if it does, ask the user if they want to overwrite it
    // if they do, delete the folder and continue
    // if they don't, cancel the import
    // check if directory exists
    const exists = fs.existsSync(`${path}/${camel}`)
    let git = ''
    if (removeGit) {
        git = ` && rm -rf ${path}/${camel}/.git`
    }

    if (exists) {
        await confirmOverwrite().then((answers) => {
            overwritePinecone(path, camel, git)
        }).catch((error) => {
            console.log('Error: ', error)
        })
    }
    return new Promise((resolve, reject) => {
        clonePinecone(repo, path, camel, git).then((pineconeConfig) => {
            resolve(pineconeConfig);
        })    
    }); 
}

function overwritePinecone(path, camel, git) {
    return new Promise((resolve, reject) => {
        exec(`rm -rf ${path}/${camel}`, (error, stdout, stderr) => {
            if(error) {
                reject(error);
            } else {
                resolve("Success!");
            }
        });
    });
}

function confirmOverwrite(){
    return new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                message: 'Are you sure you want to overwrite this Pinecone?',
                type: "confirm",
                name: "confirm",
                default: true
            }
        ]).then(answers => {
            if(answers.confirm) {
                resolve(true)
            }else{
                reject('User cancelled overwrite')
            }
        })
    });  
}

function clonePinecone(repo, path, camel, git) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve("Success!"), 2000);
        exec(`git clone --depth=1 git@github.com:fir-design/${repo}.git ${path}/${camel}${git}`, (error, stdout, stderr) => {
            if(error) {
                reject(error);
            } else {
                const pineconeConfig = getPineconeConfig(`${path}/${camel}`)
                resolve(pineconeConfig);
            }
        })
    });
}

function getPineconeConfig(path){
    return JSON.parse(fs.readFileSync(`${path}/config.json`, 'utf8'));
}

function _awaitPinecone() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve("Success!"), 2000);
    });
}

function _pineconeQuestions(version = 'v4', defaults = {name: ''}, config = {desc: ''}) {
    __version = version
    console.log(`Version:: ${__version}`)  
    return new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                message: 'What is the name of this Pinecone?',
                type: "input",
                name: "name",
                default: () => {
                    return (defaults.name) ? defaults.name : null 
                },
                validate: input => {
                    return input != ''
                },
                when: answers => {
                    if(defaults.name) {
                        answers.name = defaults.name
                    }
                    return !defaults.name
                }
            },
            {
                message: 'What should the CSS class/slug equal?',
                type: "input",
                name: "nameSlugified",
                default: answers => {
                    //return (defaults.name) ? _kebabCase(defaults.name) : _kebabCase(answers.name) 
                    return _kebabCase(answers.name) 
                },
                validate: input => {
                    return (input != '' && /^[a-z0-9]+(?:-[-a-z0-9]+)*$/igm.test(input))
                    ? true
                    : 'Please enter a valid format'
                }
            },
            {
                message: 'Give the component a camel case name:',
                type: "input",
                name: "nameCamelCase",
                default: answers => {
                    return answers.name.charAt(0).toUpperCase() + _camelCase(answers.name).slice(1)
                },
                validate: input => {
                    return (input != '' && /(^[a-z]|[A-Z0-9])[a-z]*/g.test(input))
                    ? true
                    : 'Please ensure this is a camel case name'
                },
            },
            {
                message: 'Give this Pinecone a brief description:',
                type: "input",
                name: "desc",
                default: () => {
                    return (config.desc) ? config.desc : null 
                },
                validate: input => {
                    return input != ''
                }
            },
            {
                message: 'Does this Pinecone reference a DOB component?',
                type: "input",
                name: "dob",
                default: () => {
                    return (config.dob) ? config.dob : 'N/A' 
                },
                validate: input => {
                    return input != ''
                },
            },
            {
                message: 'Enter an icon for this pinecone',
                type: "input",
                name: "dashicon",
                default: () => {
                    return (config.dashicon) ? config.dashicon : 'editor-ul' 
                },
                validate: input => {
                    return input != ''
                },
                when: () => {
                    return (version == 'v4')
                }
            },

        ]).then(answers => {
             resolve(answers)
        })
    });
}


function _processImportedPinecone(answers, config, path) {
    // line 327
    const excludedFiles = [
        //'config.json',
    ]

    return new Promise((resolve, reject) => {
        glob(`${path}/*`, null, async (er, files) => {
            const start = async () => {
                // if file is not in array excludedFiles, process it                    
                await asyncForEach(files, async (file) => {
                    let __filename = file.replace(`${path}/`, '')
                    if(!excludedFiles.includes(__filename)) {
                        // replace whats in the config, with the answers
                        const options = [
                            new RegExp(config.slug, 'g'),
                            new RegExp(config.camel, 'g'),
                            new RegExp(config.name, 'g'),
                            new RegExp(config.desc, 'g'),
                            new RegExp(config.dob, 'g'),
                            new RegExp(config.cntrsettings, 'g'),
                            new RegExp(config.wrpsettings, 'g'),
                            new RegExp(config.copysettings, 'g'),
                            new RegExp(config.dashicon, 'g')
                        ]
        
                        await _updateFile(file, options, answers)
                    }
                })
                finish()
            }  
            
            start()

        })
    });
}

function _processPinecone(answers, path){
    // need some error checking to see if a file exists

    return new Promise((resolve, reject) => {

        // To copy a folder or file, select overwrite accordingly
        try {
            fs.copySync(`${__dirname}/../Templates/${__version}`, path, { overwrite: true|false })
        } catch (err) {
            reject(error);
        }

        glob(`${path}/**`, null, async (er, files) => {
            const start = async () => {
                await asyncForEach(files, async (file) => {
                    
                    if(!fs.lstatSync(file).isDirectory()){
                        const options = [/\[SLUGIFY\]/g, /\[CAMEL\]/g, /\[NAME\]/g, /\[DESC\]/g,  /\[DOB\]/g,  /\[CNTRSETTINGS\]/g,  /\[WRPSETTINGS\]/g,  /\[COPYSETTINGS\]/g,  /\[DASHICON\]/g]
                        await updateFile(file, options, answers)
                    }
                    
                    if(basename(file) == "Block.php"){
                        const newFile = file.replace("Block.php", `${answers.nameCamelCase}.php`)
                        fs.renameSync( file, newFile )
                    }

                })
                finish()
            }   
    
            start()
    
        })
    });
}


/**
 *
 * @param array
 * @param callback
 */
 async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

async function _updateFile(file, targets, answers) {
    const options = {   
        files: file,
        from: targets,
        to: [answers.nameSlugified, answers.nameCamelCase, answers.name, answers.desc, answers.dob, answers.cntrsettings, answers.wrpsettings, answers.copysettings, answers.dashicon],
    }
    try {
        const changes = await replaceInFile(options)
        console.log(file + ' : updated \u2713')   
        return
    }
    catch (error) {
        console.error('Error occurred:', error);
    }
}

function finish() {
    console.log('Dumping Composer Autoload...');
    exec('composer dump-autoload', function(error, stdout, stderr){ 
        console.log('All Done \u2713 \u2713 \u2713');
    });
}



export const importPinecone = await _importPinecone;
export const awaitPinecone = await _awaitPinecone;
export const pineconeQuestions = _pineconeQuestions;
export const processImportedPinecone = _processImportedPinecone;
export const processPinecone = _processPinecone;
export const updateFile = _updateFile;