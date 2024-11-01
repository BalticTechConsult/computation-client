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
  .requiredOption('-a, --address <brokerAddress>', 'address of the broker')
  .requiredOption('-c, --cert <certPath>', 'path to the certificate file')
  .requiredOption('-k, --key <keyPath>', 'path to the private key file')
  .action((options) => {
    const brokerAddress = options.address
    const certPath = options.cert
    const keyPath = options.key

    void pingCommand(brokerAddress, certPath, keyPath)
  })

program
  .command('delete')
  .description('delete a task')
  .requiredOption('-a, --address <brokerAddress>', 'address of the broker')
  .requiredOption('-i, --id <taskId>', 'ID of the task to delete')
  .requiredOption('-c, --cert <certPath>', 'path to the certificate file')
  .requiredOption('-k, --key <keyPath>', 'path to the private key file')
  .action((options) => {
    const brokerAddress = options.address
    const taskId = options.id
    const certPath = options.cert
    const keyPath = options.key

    void deleteCommand(brokerAddress, taskId, certPath, keyPath)
  })

program
  .command('solve')
  .description('submit a task')
  .requiredOption('-a, --address <brokerAddress>', 'address of the broker')
  .requiredOption('-f, --file <filePath>', 'path to the JSON file containing the task')
  .requiredOption('-c, --cert <certPath>', 'path to the certificate file')
  .requiredOption('-k, --key <keyPath>', 'path to the private key file')
  .action((options) => {
    const brokerAddress = options.address
    const filePath = options.file
    const certPath = options.cert
    const keyPath = options.key

    void solveCommand(brokerAddress, filePath, certPath, keyPath)
  })

program
  .command('clear')
  .description('clear the task queue')
  .requiredOption('-a, --address <brokerAddress>', 'address of the broker')
  .requiredOption('-c, --cert <certPath>', 'path to the certificate file')
  .requiredOption('-k, --key <keyPath>', 'path to the private key file')
  .action((options) => {
    const brokerAddress = options.address
    const certPath = options.cert
    const keyPath = options.key

    void clearCommand(brokerAddress, certPath, keyPath)
  })

program
  .command('tasks')
  .description('get the list of tasks')
  .requiredOption('-a, --address <brokerAddress>', 'address of the broker')
  .requiredOption('-c, --cert <certPath>', 'path to the certificate file')
  .requiredOption('-k, --key <keyPath>', 'path to the private key file')
  .action((options) => {
    const brokerAddress = options.address
    const certPath = options.cert
    const keyPath = options.key

    void tasksCommand(brokerAddress, certPath, keyPath)
  })

program
  .command('solutions')
  .description('get the solutions for a task')
  .requiredOption('-a, --address <brokerAddress>', 'address of the broker')
  .requiredOption('-i, --id <taskId>', 'ID of the task to get solutions for')
  .requiredOption('-c, --cert <certPath>', 'path to the certificate file')
  .requiredOption('-k, --key <keyPath>', 'path to the private key file')
  .action((options) => {
    const brokerAddress = options.address
    const taskId = options.id
    const certPath = options.cert
    const keyPath = options.key

    void solutionsCommand(brokerAddress, taskId, certPath, keyPath)
  })

program
  .command('connections')
  .description('Get list of connections to the broker')
  .requiredOption('-a, --address <brokerAddress>', 'The address of the broker')
  .requiredOption('-c, --cert <certPath>', 'path to the certificate file')
  .requiredOption('-k, --key <keyPath>', 'path to the private key file')
  .action((options) => {
    const brokerAddress = options.address
    const certPath = options.cert
    const keyPath = options.key

    void connectionsCommand(brokerAddress, certPath, keyPath)
  })

program.parse(process.argv)
