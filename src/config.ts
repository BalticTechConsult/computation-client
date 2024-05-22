import * as dotenv from 'dotenv'

dotenv.config()

export const BROKER_HOST = process.env.BROKER_HOST || 'http://localhost'
export const BROKER_PORT = process.env.BROKER_PORT || '50051'
