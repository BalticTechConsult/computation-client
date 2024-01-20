export enum eTaskType {
  /**
  * Simple Task Type (solved most quickly)
  */
  TASK = 'task',

  /**
  * Precise Task Type (solved more slowly)
  */
  PRECISE_TASK = 'preciseTask',

  /**
  * Optimization Task Type
  */
  OPTIMIZATION_TASK = 'optimizationTask',
}
