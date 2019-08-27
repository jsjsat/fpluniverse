import { Component } from '@angular/core';
import { Options } from 'ng5-slider';
import { POSITIONS, TEAMS } from 'src/app/shared/translate';
import { FilterStateFacadeService } from '../../+state/filter-state-facade.service';
@Component({
  selector: 'universe-filter-content',
  templateUrl: './universe-filter-content.component.html',
  styleUrls: ['./universe-filter-content.component.scss']
})
export class UniverseFilterContentComponent {
  selectedPosition = '-1';
  selectedTeam = '-1';

  priceOptions = {
    value: 0,
    highValue: 100,
    options: {
      floor: 3.8,
      ceil: 14,
      step: 0.1
    } as Options
  };

  constructor(private store: FilterStateFacadeService) {

  }

  getTeams = (): string[] => TEAMS;

  getPositions = (): string[] => POSITIONS;

  teamChanged(event: any) {
    const selectedTeam = event.value;
    this.store.changeTeam(selectedTeam as number);
  }

  positionChanged(event: any) {
    const selectedPosition = event.value;
    this.store.changePosition(selectedPosition as number);
  }
}
