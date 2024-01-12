#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import * as nfs from 'node:fs/promises';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import Make from './commands/MakeCommand.js';
import Config from './commands/ConfigCommand.js';
import Update from './commands/UpdateCommand.js';
import Import from './commands/ImportCommand.js';
import Test from './commands/TestCommand.js';

import {displayFirAscii} from './ascii/art.js';

const fir = new Command()
const log = console.log;

const commands = [
   new Make(),
   new Config(),
   new Update(),
   new Import(),
   new Test()
]



async function getPineconeNames() {
   const __filename = fileURLToPath(import.meta.url);
   const __dirname = path.dirname(__filename);
   const directoryPath = path.join(__dirname, '../');

   //passsing directoryPath and callback function
   const pineconeNames = await nfs.readdir(directoryPath)
   return pineconeNames
}




commands.forEach(c => {
   //get the definition of our command
   const commandDef = c.definition()

   //we then use it to build the command we're going to be executing later.
   const subCommand = fir
      .command(commandDef.command)
      .description(commandDef.help)

   commandDef.arguments.forEach(arg => {
      subCommand.argument(arg[0], arg[1])
   })

   commandDef.options.forEach(o => {
      subCommand.option([o[0], o[1]].join(","), o[2], o[3])
   })
   subCommand
      .action(function () {
         c.action.apply(c, arguments)
         console.log(c.getResult())
      })

})


await getPineconeNames()
let count = 0
let intro = setInterval(() => {
   if (count > 0) {
      clearInterval(intro)
      fir.parse()
   }else{
      console.clear()
      displayFirAscii()
      count++

   }
}, 100)

