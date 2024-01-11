import { Transform, TransformFnParams } from 'class-transformer'


export function Default(defaultValue: any) {
	return Transform(({ value }: TransformFnParams) => {
		if (value !== null && value !== undefined) {
      return value
    }

		if (typeof defaultValue === 'function') {
      return defaultValue()
    }

		if (Array.isArray(defaultValue)) {
      return [...defaultValue]
    }

		if (typeof defaultValue === 'object') {
			return (defaultValue === null) ? null : { ...defaultValue }
		}

		return defaultValue
	})
}
