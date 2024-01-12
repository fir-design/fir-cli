import { Command } from './Command.js';
import { awaitPinecone } from '../src/pinecones.js';

export default class Test extends Command {

    constructor() {
        super(
            "test",
            "Test Command",
            [],
            []
        )
    }

    action() {
        awaitPinecone().then((msg) => {
            this.logger(msg);
        })
    }

    logger(msg) {
        console.log('Results: ', msg)
    }

}
