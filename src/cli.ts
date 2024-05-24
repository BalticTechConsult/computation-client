#!/usr/bin/env node

import { Command } from 'commander'

import { pingCommand, deleteCommand, solveCommand } from '@commands'


const program = new Command()

program
  .name('computation-client')
  .description('CLI for computation-client')
  .version('1.0.0')

program
  .command('ping')
  .description('Ping the broker')
  .option('-a, --address <brokerAddress>', 'The address of the broker')
  .action((options) => {
    const brokerAddress = options.address

    if (!brokerAddress) {
      console.error('Broker address is required')
      process.exit(1)
    }

    void pingCommand(brokerAddress)
  })

program
  .command('delete')
  .description('Delete a task')
  .option('-a, --address <brokerAddress>', 'The address of the broker')
  .option('-i, --id <taskId>', 'The ID of the task to delete')
  .action((options) => {
    const brokerAddress = options.address
    const taskId = options.id

    if (!brokerAddress || !taskId) {
      console.error('Broker address and task ID are required')
      process.exit(1)
    }

    void deleteCommand(brokerAddress, taskId)
  })

program
  .command('solve')
  .description('Submit a task')
  .option('-a, --address <brokerAddress>', 'The address of the broker')
  .option('-f, --file <filePath>', 'The path to the JSON file containing the task')
  .action((options) => {
    const brokerAddress = options.address
    const filePath = options.file

    if (!brokerAddress || !filePath) {
      console.error('Broker address and file path are required')
      process.exit(1)
    }

    void solveCommand(brokerAddress, filePath)
  })

program.parse(process.argv)
