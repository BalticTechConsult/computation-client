import { eSolutionType, iSolution, Solution } from './members'


/**
* Union of all solutions
*/
export type uSolution =
  /**
  * Simple solution
  */
  Solution

/**
* Union of all interfaces of solutions
*/
export type iuSolution =
  /**
  * Simple solution
  */
  iSolution

export namespace uSolution {
  /**
  * Create uSolution from plain object
  * @param {iuSolution} plain - plain object
  * @returns {uTask|never}
  */
  export function fromPlain(plain: iuSolution): uSolution {
    switch (plain?.solutionType) {
      case eSolutionType.SOLUTION:
        return Solution.fromPlain(plain)
      default:
        throw new Error(`Unknown solution type.`)
    }
  }

  /**
  * Validate uTask
  * @param {uTask} task - uTask
  * @returns {true | never}
  * @throws {ModelError | Error}
  */
  export function validate(task: uSolution): true | never {
    switch (task.solutionType) {
      case eSolutionType.SOLUTION:
        return Solution.validate(task)
      default:
        throw new Error(`Unknown solution type.`)
    }
  }
}
