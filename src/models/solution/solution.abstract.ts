import { eSolutionType } from './members'


export abstract class aSolution {
  /**
  * Solution Type
  * @type {eSolutionType}
  */
  solutionType: eSolutionType

  /**
  * Energy, less is better
  * @type {number}
  */
  energy: number

  /**
  * Algorithm name
  * @type {string}
  */
  algorithm: string
}
