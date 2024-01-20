import { IsDefined, IsLatitude, IsLongitude } from 'class-validator'
import { Expose } from 'class-transformer'


/**
* Point
*/
export interface iPoint {
  /**
  * Latitude
  * @type {number}
  */
  lat: number

  /**
  * Longitude
  * @type {number}
  */
  lon: number
}

/**
* Point
*/
export class Point implements iPoint {
  /**
  * Latitude
  * @type {number}
  */
  @Expose()
  @IsDefined()
  @IsLatitude()
  lat: number

  /**
  * Longitude
  * @type {number}
  */
  @Expose()
  @IsDefined()
  @IsLongitude()
  lon: number
}
