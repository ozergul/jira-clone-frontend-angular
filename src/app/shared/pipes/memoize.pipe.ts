import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'memoize' })
export class MemoizePipe implements PipeTransform {
  transform(value: any, handler: (value: any) => any, context?: any): any {
    if (context) {
      return handler.call(context, value);
    }
    return handler(value);
  }
}
