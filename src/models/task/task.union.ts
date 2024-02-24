import { eTaskType, iOptimizationTask, iPreciseTask, iTask, OptimizationTask, PreciseTask, Task } from './members'


/**
* Union of all tasks
*/
export type uTask =
  /**
  * Optimization task
  */
  OptimizationTask |

  /**
  * Precise task
  */
  PreciseTask |

  /**
  * Task
  */
  Task

/**
* Union of all interfaces of tasks
*/
export type iuTask =
  /**
  * Optimization task
  */
  iOptimizationTask |

  /**
  * Precise task
  */
  iPreciseTask |

  /**
  * Task
  */
  iTask

export namespace uTask {
  /**
  * Create uTask from plain object
  * @param {iOptimizationTask | iPreciseTask | iTask} plain - plain object
  * @returns {uTask}
  */
  export function fromPlain(
    plain: iOptimizationTask | iPreciseTask | iTask
  ): uTask {
    switch (plain?.taskType) {
      case eTaskType.OPTIMIZATION_TASK:
        return OptimizationTask.fromPlain(plain)
      case eTaskType.PRECISE_TASK:
        return PreciseTask.fromPlain(plain)
      case eTaskType.TASK:
        return Task.fromPlain(plain)
      default:
        throw new Error(`Unknown task type.`)
    }
  }

  /**
  * Validate uTask
  * @param {uTask} task - uTask
  * @returns {true | never}
  * @throws {ModelError | Error}
  */
  export function validate(task: uTask): true | never {
    switch (task.taskType) {
      case eTaskType.OPTIMIZATION_TASK:
        return OptimizationTask.validate(task)
      case eTaskType.PRECISE_TASK:
        return PreciseTask.validate(task)
      case eTaskType.TASK:
        return Task.validate(task)
      default:
        throw new Error(`Unknown task type.`)
    }
  }
}
