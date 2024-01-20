import { eTaskType } from './members'


export abstract class aTask {
  /**
  * Task Type
  * @type {eTaskType}
  */
  taskType: eTaskType

  /**
  * Task version
  * @type {number}
  */
  version: number
}
