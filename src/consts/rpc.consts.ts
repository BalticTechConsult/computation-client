export enum eRPC {
  /**
  * Procedure name for registering a task
  */
  REGISTER_TASK = 'registerTask',

  /**
  * Procedure name for unregistering a task
  */
  UNREGISTER_TASK = 'unregisterTask',

  /**
  * Procedure name for registering an optimization task
  */
  REGISTER_OPTIMIZATION_TASK = 'registerOptimizationTask',

  /**
  * Procedure name for unregistering an optimization task
  */
  UNREGISTER_OPTIMIZATION_TASK = 'unregisterOptimizationTask',

  /**
  * Procedure name for get a list of top 10 solutions
  */
  GET_TOP_SOLUTIONS = 'getTopSolutions',

  /**
  * Procedure to get a list of top 10 solutions for optimization
  */
  GET_TOP_OPTIMIZATION_SOLUTIONS = 'getTopOptimizationSolutions'
}
