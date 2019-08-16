import { Pipe, PipeTransform } from '@angular/core';
import { POSITIONS } from '../translate';

@Pipe({
  name: 'formatPosition'
})
export class PositionPipe implements PipeTransform {
  transform(val: number): string {
    return POSITIONS[val];
  }
}
