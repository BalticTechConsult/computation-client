import { ServiceError } from '@grpc/grpc-js'


export const isServiceError = (error: unknown): error is ServiceError => {
  return typeof error === 'object' && error !== null && 'code' in error && 'message' in error
}
