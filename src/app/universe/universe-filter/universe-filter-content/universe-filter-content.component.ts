import { Component } from '@angular/core';
import { TEAMS, POSITIONS } from 'src/app/shared/translate';
import { Options } from 'ng5-slider';

@Component({
  selector: 'universe-filter-content',
  templateUrl: './universe-filter-content.component.html',
  styleUrls: ['./universe-filter-content.component.scss']
})
export class UniverseFilterContentComponent {
  selectedPosition = '0';
  selectedTeam = '0';

  priceOptions = {
    value: 0,
    highValue: 100,
    options: {
      floor: 3.8,
      ceil: 14,
      step: 0.1
    } as Options
  };

  getTeams = (): string[] => TEAMS;

  getPositions = (): string[] => POSITIONS;
}
