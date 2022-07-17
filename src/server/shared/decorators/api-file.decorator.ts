import { ApiBody } from '@nestjs/swagger'
export function ApiFile(fileName = 'file'): MethodDecorator {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          [fileName]: { type: 'string', format: 'binary' },
        },
      },
    })(target, propertyKey, descriptor)
  }
}
