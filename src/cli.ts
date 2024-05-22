#!/usr/bin/env node
import { pingCommand } from '@commands'


const command = process.argv[2]

switch (command) {
  case 'ping':
    void pingCommand()
    break
  default:
    console.log('Unknown command')
}
