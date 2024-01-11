import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'


export const IsLessOrEqualThan = (property: string, validationOptions?: ValidationOptions) => {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isLessOrEqualThan',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints
          const relatedValue = (args.object as any)[relatedPropertyName]
          return typeof value === 'number' && typeof relatedValue === 'number' && value <= relatedValue
        },
      },
    })
  }
}
