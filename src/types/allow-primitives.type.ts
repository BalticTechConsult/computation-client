export type AllowPrimitives<ModelInterface> = {
  [Property in keyof ModelInterface]: ModelInterface[Property] extends object
    ? AllowPrimitives<ModelInterface[Property]>
    : unknown
}
