#!/usr/bin/env node

import { Command } from 'commander'

import {
  pingCommand,
  deleteCommand,
  solveCommand,
  clearCommand,
  tasksCommand,
  solutionsCommand,
  connectionsCommand
} from '@/commands'


const program = new Command()

program
  .name('computation-client')
  .description('CLI for computation-client')
  .version('1.0.0')

program
  .command('ping')
  .description('ping the broker')
  .option('-a, --address <brokerAddress>', 'address of the broker')
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
  .description('delete a task')
  .option('-a, --address <brokerAddress>', 'address of the broker')
  .option('-i, --id <taskId>', 'ID of the task to delete')
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
  .description('submit a task')
  .option('-a, --address <brokerAddress>', 'address of the broker')
  .option('-f, --file <filePath>', 'path to the JSON file containing the task')
  .action((options) => {
    const brokerAddress = options.address
    const filePath = options.file

    if (!brokerAddress || !filePath) {
      console.error('Broker address and file path are required')
      process.exit(1)
    }

    void solveCommand(brokerAddress, filePath)
  })

program
  .command('clear')
  .description('clear the task queue')
  .option('-a, --address <brokerAddress>', 'address of the broker')
  .action((options) => {
    const brokerAddress = options.address

    if (!brokerAddress) {
      console.error('Broker address is required')
      process.exit(1)
    }

    void clearCommand(brokerAddress)
  })

program
  .command('tasks')
  .description('get the list of tasks')
  .option('-a, --address <brokerAddress>', 'address of the broker')
  .action((options) => {
    const brokerAddress = options.address

    if (!brokerAddress) {
      console.error('Broker address is required')
      process.exit(1)
    }

    void tasksCommand(brokerAddress)
  })

program
  .command('solutions')
  .description('get the solutions for a task')
  .option('-a, --address <brokerAddress>', 'address of the broker')
  .option('-i, --id <taskId>', 'ID of the task to get solutions for')
  .action((options) => {
    const brokerAddress = options.address
    const taskId = options.id

    if (!brokerAddress || !taskId) {
      console.error('Broker address and task ID are required')
      process.exit(1)
    }

    void solutionsCommand(brokerAddress, taskId)
  })

program
  .command('connections')
  .description('Get list of connections to the broker')
  .option('-a, --address <brokerAddress>', 'The address of the broker')
  .action((options) => {
    const brokerAddress = options.address

    if (!brokerAddress) {
      console.error('Broker address is required')
      process.exit(1)
    }

    void connectionsCommand(brokerAddress)
  })

program.parse(process.argv)
