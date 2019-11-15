import {
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import * as d3 from 'd3';
import { ScaleLinear, SimulationNodeDatum } from 'd3';
import { Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { Player } from 'src/app/model/player';
import Utils from 'src/app/util/utils';
import { FilterState } from '../+state/filter-state';
import { FilterStateFacadeService } from '../+state/filter-state-facade.service';
import { UniverseService } from '../services/universe-service';
import { applyFilters, applyMode } from 'src/app/util/filter.utils';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'universe-chart',
  templateUrl: './universe-chart.component.html',
  styleUrls: ['./universe-chart.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UniverseChartComponent implements OnInit {
  constructor(
    private universeService: UniverseService,
    private store: FilterStateFacadeService,
  ) {}

  public selectedPlayer: Player;
  public selectedPosition: { x: number; y: number };
  private selectionSticky = false;
  private _playersSubject: Subject<Player[]> = new Subject();
  private resizeSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private simulation: any;

  ngOnInit() {
    this.universeService.getPlayers().subscribe(players => {
      players = players.sort((a, b) => b.team - a.team);
      this._playersSubject.next(players);
    });

    combineLatest([
      this._playersSubject.asObservable(),
      this.store.filterState$,
      this.resizeSubject,
    ])
      .pipe(
        debounceTime(500), // due to resizing
      )
      .subscribe((data: any[]) => {
        this.updateChart(data[0], data[1]);
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resizeSubject.next(true);
  }

  getRadius(player: Player, players: Player[]): number {
    const max: number = Math.max.apply(
      Math,
      players.map(p => p.selectedMetric),
    );
    const min: number = Math.min.apply(
      Math,
      players.map(p => p.selectedMetric),
    );

    const minlen: number = Math.min(window.innerWidth, window.innerHeight);
    const scaleLinear: ScaleLinear<number, number> = d3
      .scaleLinear()
      .domain([min, max])
      .range([5, minlen / 20]);
    return scaleLinear(player.selectedMetric);
  }

  updateChart(players: Player[], filters: FilterState) {
    players = players
      .map(p => applyMode(p, filters.mode))
      .filter(p => applyFilters(p, filters))
      .sort((a, b) => b.selectedMetric - a.selectedMetric);

    const bubbleChartWidth = window.innerWidth - 250;
    const bubbleChartHeight = window.innerHeight - 250;

    this.simulation = d3
      .forceSimulation()
      .force(
        'center',
        d3.forceCenter(bubbleChartWidth / 2 + 125, bubbleChartHeight / 2 + 125),
      )
      .force('x', d3.forceX(bubbleChartWidth / 2 + 125).strength(0.05))
      .force('y', d3.forceY(bubbleChartHeight / 2 + 125).strength(0.05))
      .force(
        'anticollide',
        d3
          .forceCollide()
          .radius((d: SimulationNodeDatum) => this.getRadius(d as any, players)),
      );

    const svg = d3
      .select('.bubbleDiv > svg ')
      .attr('height', bubbleChartHeight)
      .attr('width', bubbleChartWidth);

    const bubbles = svg
      .selectAll('circle')
      .data(players, (d: Player) => d.lastName);
    const texts = svg
      .selectAll('text')
      .data(players, (d: Player) => d.lastName);

    // ENTER

    const bubbles_enter = bubbles
      .enter()
      .append('circle')
      .attr('class', 'bubble')
      .on('mouseover', p => this.selectPlayer(p, true, false))
      .on('mouseout', p => this.selectPlayer(p, false, false))
      .on('click', p =>
        this.selectPlayer(
          p,
          !this.selectionSticky || p !== this.selectedPlayer,
          true,
        ),
      );

    bubbles_enter.append('title');

    const texts_enter = texts
      .enter()
      .append('text')
      .text(d => d.lastName)
      .attr('fill', 'white')
      .attr('text-anchor', 'middle')
      .attr('font-size', 12)
      .on('click', p =>
        this.selectPlayer(
          p,
          !this.selectionSticky || p !== this.selectedPlayer,
          true,
        ),
      )
      .on('mouseover', p => this.selectPlayer(p, true, false))
      .on('mouseout', p => this.selectPlayer(p, false, false));

    // UPDATE

    const bubbles_update = bubbles
      .merge(bubbles_enter)
      .attr('r', (d: Player) => this.getRadius(d, players) - 2)
      .attr('fill', d => Utils.getColor(d.team))
      .attr('id', d => d.lastName);

    const texts_update = texts
      .merge(texts_enter)
      .attr('display', d =>
        this.fitsIntoCircle(d, players) ? 'block' : 'none',
      );

    // EXIT

    bubbles.exit().remove();
    texts.exit().remove();

    this.simulation.nodes(players).on('tick', ticked);

    function ticked() {
      bubbles_update
        .attr('cx', function(d, i) {
          const t: any = d;
          return t.x;
        })
        .attr('cy', function(d, i) {
          const t: any = d;
          return t.y;
        });

      texts_update
        .attr('x', d => {
          const t: any = d;
          return t.x;
        })
        .attr('y', d => {
          const t: any = d;
          return t.y;
        });
    }
  }

  fitsIntoCircle(player: Player, players: Player[]): boolean {
    const circleSize: number = this.getRadius(player, players) - 2;
    return circleSize > player.lastName.length * 2;
  }

  selectPlayer(p: Player, select: boolean, sticky: boolean) {
    if (d3.event) {
      (d3.event as Event).stopPropagation();
    }
    if ((this.selectionSticky && sticky) || !this.selectionSticky) {
      if (p && this.selectedPlayer !== p) {
        const x = d3.event.x;
        const y = d3.event.y;
        this.selectedPosition = { x, y };
      }
      this.selectedPlayer = select ? p : undefined;
    }
    if (sticky) {
      this.selectionSticky = select;
    }
  }
}
