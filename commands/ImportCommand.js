import { Command } from './Command.js';
import inquirer from 'inquirer';
import fs from 'fs';
import _camelCase from 'lodash.camelcase'
import _kebabCase from 'lodash.kebabcase'
import { importPinecone, pineconeQuestions, processImportedPinecone } from '../src/pinecones.js';


export default class Import extends Command {

    constructor() {
        super(
            "import",
            "Import a Pinecone block",
            [],
            []
        )
    }

    action() {
        // log initialisation
        console.log("Importing a new Pinecone block");

        let config = JSON.parse(fs.readFileSync('./fir.config.json', 'utf8'));

        inquirer.prompt([
            {
                message: 'Where library do you want to import from?',
                type: "list",
                name: "org",
                choices: Object.keys(config.pinecones),
                validate: input => {
                    return input != ''
                }
            },
            {
                message: 'What kind of Pinecone do you want to import?',
                type: "list",
                name: "category",
                choices: (answers) => {
                    return Object.keys(config.pinecones[answers.org])
                },
                validate: input => {
                    return input != ''
                }
            },
            {
                message: 'Choose a Pinecone:',
                type: "list",
                name: "import",
                choices: (answers) => {
                    return config.pinecones[answers.org][answers.category]
                },
                validate: input => {
                    return input != ''
                }
            },
            {
                message: 'Would you like to rename this Pinecone?',
                type: "input",
                name: "name",
                default: (answers) => {
                    return answers.import
                },
                validate: input => {
                    return input != ''
                }
            }
        ]).then(answers => {
            // process answers 
            answers.camel = answers.name.charAt(0).toUpperCase() + _camelCase(answers.name).slice(1)
            this.process(answers, config)
        })
        
    }
    
    async process(answers, config) {
        let pineconeConfig = await importPinecone(answers.import, config.path, answers.camel).then((pineconeConfig) => {
            return pineconeConfig
        })
    
       let newAnswers =  await pineconeQuestions({'name' : answers.name} , pineconeConfig).then((result) => {
            return result
        })

        await processImportedPinecone(newAnswers , pineconeConfig, `${config.path}/${answers.camel}`).then((result) => {
            console.log(result)
        })

        this.finished()
    }

    finished() {
        console.log('finished importing pinecone!')
    }
   
}
