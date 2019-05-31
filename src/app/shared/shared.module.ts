import { NgModule } from "@angular/core";
import { TeamPipe } from "./team-pipe/team.pipe";

@NgModule({
  declarations: [TeamPipe],
  imports: [],
  providers: [],
  exports: [TeamPipe]
})
export class SharedModule {}
