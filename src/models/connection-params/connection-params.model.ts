import { IsBoolean, IsDefined, IsEnum, IsInt, IsOptional, IsString, validateSync } from 'class-validator'
import { Expose, plainToClass } from 'class-transformer'

import { eProtocolVersion } from '@/consts'


/**
* Connection parameters
*/
export interface iConnectionParams {
  /**
  * Host name or IP address
  * @type {string}
  */
  hostname: string

  /**
  * Port number
  * @type {number}
  */
  port: number

  /**
  * Path to the service
  * @type {string}
  */
  path: string

  /**
  * Protocol version
  * @type {eProtocolVersion}
  */
  protocolVersion: eProtocolVersion

  /**
  * Write logs to console
  * @type {boolean|undefined}
  */
  logs?: boolean
}

/**
* Connection parameters
*/
export class ConnectionParams implements iConnectionParams {
  /**
  * Host name or IP address
  * @type {string}
  */
  @Expose()
  @IsDefined()
  @IsString()
  hostname: string

  /**
  * Port number
  * @type {number}
  */
  @Expose()
  @IsDefined()
  @IsInt()
  port: number

  /**
  * Path to the service
  * @type {string}
  */
  @Expose()
  @IsDefined()
  @IsString()
  path: string

  /**
  * Protocol version
  * @type {eProtocolVersion}
  */
  @Expose()
  @IsDefined()
  @IsEnum(eProtocolVersion)
  protocolVersion: eProtocolVersion

  /**
  * Write logs to console
  * @type {boolean|undefined}
  */
  @Expose()
  @IsOptional()
  @IsBoolean()
  logs?: boolean

  /**
  * Create ConnectionParams from plain object
  * @param {unknown} plain - plain object
  * @returns {ConnectionParams}
  * @internal
  */
  static fromPlain = (plain: unknown): ConnectionParams => plainToClass(ConnectionParams, plain)

  /**
  * Validate ConnectionParams
  * @param {ConnectionParams} input - ConnectionParams to validate
  * @returns {true | never}
  * @throws {TypeError}
  * @internal
  */
  static validate = (input: ConnectionParams): true | never => {
    const errors = validateSync(input)

    if (!!errors.length) {
      console.error(errors)

      throw new TypeError('ConnectionParams validation error!')
    }

    return true
  }
}
