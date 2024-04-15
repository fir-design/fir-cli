import { Command } from './Command.js';
import fs from 'fs';
import { updateTailwindConfig } from '../src/tailwind.js';


export default class Tailwind extends Command {

    constructor() {
        super(
            "tailwind",
            "Sets up all the tailwind config",
            [],
            []
        )
    }

    async action() {
        // log initialisation
        console.log("Reading all Pinecone Configs");

        // glob all the pinecones
        // get all the config.json files
        // check if it contains a key called 'safelist'
        // merge it into an object
        // merge the safelist into the tailwind.config.js file

        let config = JSON.parse(fs.readFileSync('./fir.config.json', 'utf8'));
        let version = (config.version) ? config.version : 'v1'

        let tailwind = await updateTailwindConfig(version).then((result) => {
            return result
        })

        console.log(tailwind);
        console.log("All Finished!");
    }
}
