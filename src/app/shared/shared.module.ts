import { NgModule } from '@angular/core';
import { TeamPipe } from './team-pipe/team.pipe';
import { PositionPipe } from './position-pipe/position.pipe';

@NgModule({
  declarations: [TeamPipe, PositionPipe],
  imports: [],
  providers: [],
  exports: [TeamPipe, PositionPipe],
})
export class SharedModule {}
