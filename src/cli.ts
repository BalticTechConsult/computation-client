#!/usr/bin/env node

import { Command } from 'commander';
import { pingCommand } from '@commands';

const program = new Command();

program
  .name('computation-client')
  .description('CLI for computation-client')
  .version('1.0.0');

program
  .command('ping')
  .description('Ping the broker')
  .argument('<brokerAddress>', 'The address of the broker')
  .action((brokerAddress: string) => {
    void pingCommand(brokerAddress);
  });

program
  .command('help')
  .description('Display help information')
  .action(() => {
    program.help();
  });

program.parse(process.argv);
