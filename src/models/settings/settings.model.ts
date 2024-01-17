import { IsDefined, IsInt, IsOptional, Min, validateSync } from 'class-validator'
import { Expose, plainToClass } from 'class-transformer'

import { Default } from '@/decorators'
import { IsLessOrEqualThan } from '@/validators'


/**
* Task settings
*/
export interface iSettings {
  /**
  * Number of routes
  * @type {number}
  */
  routes: number

  /**
  * Number of looped routes
  * @type {number|undefined}
  * @default 0
  */
  loopedRoutes?: number

  /**
  * Minimum points in route
  * @type {number}
  */
  minPir: number

  /**
  * Maximum points in route
  * @type {number}
  */
  maxPir: number

  /**
  * High priority max route index
  * @type {number|undefined}
  * @default 3
  */
  fmri?: number

  /**
  * Low priority max route index
  * @type {number|undefined}
  * @default 3
  */
  lmri?: number
}

/**
* Task settings
*/
export class Settings implements iSettings {
  /**
  * Number of routes
  * @type {number}
  */
  @Expose()
  @IsDefined()
  @IsInt()
  routes: number

  /**
  * Number of looped routes
  * @type {number|undefined}
  * @default 0
  */
  @Expose()
  @IsOptional()
  @IsInt()
  @Default(0)
  @IsLessOrEqualThan('routes', { message: 'Looped routes have to be less or equal than routes' })
  loopedRoutes?: number

  /**
  * Minimum points in route
  * @type {number}
  */
  @Expose()
  @IsDefined()
  @IsInt()
  minPir: number

  /**
  * Maximum points in route
  * @type {number}
  */
  @Expose()
  @IsDefined()
  @IsInt()
  maxPir: number

  /**
  * High priority max route index.
  * Have to be more than 1.
  * @type {number|undefined}
  * @default 3
  */
  @Expose()
  @IsOptional()
  @IsInt()
  @Default(1)
  @Min(1)
  @IsLessOrEqualThan('minPir', { message: 'High priority max route index have to be less or equal than minimum points in route' })
  fmri?: number

  /**
  * Low priority max route index
  * Have to be more than 1.
  * @type {number|undefined}
  * @default 3
  */
  @Expose()
  @IsOptional()
  @IsInt()
  @Default(1)
  @Min(1)
  @IsLessOrEqualThan('minPir', { message: 'Low priority max route index have to be less or equal than minimum points in route' })
  lmri?: number
}
