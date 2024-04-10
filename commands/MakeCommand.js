import { Command } from './Command.js';
import fs from 'fs';
import { pineconeQuestions, processPinecone } from '../src/pinecones.js';

export default class Make extends Command {

    constructor() {
        super(
            "make",
            "Makes a ew Pinecone block",
            [],
            []
        )

        /**
         * 
        super(
        "make",
        "Makes a ew Pinecone block",
        [
            ["<string>", "The actual string to split"]
        ],
        [
            ["-s", "--separator <char>", "the word separator, by default it'll use the space character", " "]
        ])
         */
    }

    async action() {
        // log initialisation
        console.log("Making a new Pinecone block");
        let config = JSON.parse(fs.readFileSync('./fir.config.json', 'utf8'));
        let version = (config.version) ? config.version : 'v3'
        let newAnswers = await pineconeQuestions(version).then((result) => {
            return result
        })

        console.log("ReWriting Files...");

        let path = `${config.path}/${newAnswers.nameCamelCase}`

        let newFiles = await processPinecone(newAnswers, path).then((result) => {
            return result
        })

        console.log("All Finished!");
    }
}
