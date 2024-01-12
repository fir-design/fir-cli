import { Command } from './Command.js';
import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';


const ConfigDefaults = {
    name: "Marc",
}


export default class Config extends Command {

    constructor() {
        super(
            "config",
            "Generate the Fir Config",
            [],
            [],
            ConfigDefaults
        )
    }

    async action() {
        console.log('Config action')
        console.log('---------------------')
        inquirer
            .prompt([
                {
                    message: 'What is the name of this Pinecone?',
                    type: "input",
                    name: "name",
                    validate: (input) => {
                        var valid = (input != '')

                        // get a list of filenames in the ./fir/Pinecones directory
                        // if the input is in the list, then it's not valid
                        // if the input is not in the list, then it's valid


                        return valid || `Please enter a name for this pinecone`
                    }
                },
            ]).then(answers => {
                // process answers
                console.log('---------------------')
                console.log('Finished!')     
                this.makeConfigFile()  
            })

    }

    makeConfigFile() {
        console.log('makeConfigFile')
        // make a new file and write the contents of an object to json
        const config = {
            path: './fir/Pinecones',
            orgs: {
                fir: {
                    url: "https://api.github.com/orgs/fir-design/repos",
                    topics: ["pinecone"]
                }
            },
            pinecones: {
                fir: {}
            }
        }

        const data = JSON.stringify(config, null, 2)
        fs.writeFileSync('fir.config.json', data)
        // log in chalk red that the file has been created
        console.log(chalk.white.bgRed.bold(' Fir Config has been created... '));
    }
}
