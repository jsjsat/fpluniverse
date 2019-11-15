import { Pipe, PipeTransform } from '@angular/core';
import { TEAMS } from '../translate';

@Pipe({
  name: 'formatTeam',
})
export class TeamPipe implements PipeTransform {
  transform(val: number): string {
    return TEAMS[val];
  }
}
