import { Command } from './Command.js';
import axios from 'axios';
import fs from 'fs';

export default class Update extends Command {

    constructor() {
        super(
            "update",
            "Get a list of Pinecones from configured repositories",
            [],
            []
        )
    }

    action() {
        // initialize the update command
        console.log("Updating the list of Pinecone blocks");



        // get a list of all repositories from a github organization

        // get a list of all pinecone blocks from each repository

        // save the list of pinecone blocks to a file
        let pinecones = {};
        axios
            .get(
                "https://api.github.com/orgs/fir-design/repos"
            )
            .then((results) => {
                let data = results.data;

                let list = data.filter((obj) => {
                    return obj.topics.includes('pinecone');
                })

                list.forEach((obj) => {
                    let re = new RegExp('^([a-z|A-Z]*)([0-9]*)')
                    let match = re.exec(obj.name)

                    if (!pinecones[match[1]]) {
                        pinecones[match[1]] = []
                    }

                    pinecones[match[1]].push(obj.name)
                })

                // need some way to save the pinecones to a file

                let config = JSON.parse(fs.readFileSync('./fir.config.json', 'utf8'));

                config.pinecones.fir = pinecones;   

                let newConfig = JSON.stringify(config)

                fs.writeFile('./fir.config.json', newConfig, function (err) {
                    if(err){
                        console.log('Pinecones List JSON Export Error');
                    }else{
                        console.log('Pinecones List JSON Export Success');
                    }
                })
            });


    }
}
