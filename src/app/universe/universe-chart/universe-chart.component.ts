import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { ScaleLinear, SimulationNodeDatum } from 'd3';
import { Player } from 'src/app/model/player';
import Utils from 'src/app/util/utils';
import { UniverseService } from '../services/universe-service';

@Component({
  selector: 'universe-chart',
  templateUrl: './universe-chart.component.html',
  styleUrls: ['./universe-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UniverseChartComponent implements OnInit {
  constructor(private universeService: UniverseService) {}

  public selectedPlayer: Player;
  public selectedPosition: { x: number; y: number };
  private selectionSticky = false;
  private _players: Player[];
  private simulation: any;

  ngOnInit() {
    this.universeService.getPlayers().subscribe(players => {
      this._players = players.sort((a, b) => b.team - a.team);
      this.updateChart(this._players);
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.simulation
      .force(
        'center',
        d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2)
      )
      .alpha(0.8)
      .restart();
  }

  getRadius(player: Player, players: Player[]): number {
    const max: number = Math.max.apply(Math, players.map(p => p.points));
    const min: number = Math.min.apply(Math, players.map(p => p.points));

    const minlen: number = Math.min(window.innerWidth, window.innerHeight);
    const scaleLinear: ScaleLinear<number, number> = d3
      .scaleLinear()
      .domain([min, max])
      .range([1, minlen / 20]);
    return scaleLinear(player.points);
  }

  updateChart(players: Player[]) {
    players = players
      .filter(player => player.points > 0)
      .sort((a, b) => b.points - a.points);

    const bubbleChartWidth = window.innerWidth;
    const bubbleChartHeight = window.innerHeight;

    this.simulation = d3
      .forceSimulation()
      .nodes(players as any)
      .force(
        'center',
        d3.forceCenter(bubbleChartWidth / 2, bubbleChartHeight / 2)
      )
      .force(
        'anticollide',
        d3.forceCollide().radius((d: SimulationNodeDatum) => this.getRadius(d as any, players) + 2)
      )
      .on('tick', ticked);

    const svg = d3
      .select('.bubbleDiv > svg ')
      .attr('height', bubbleChartHeight)
      .attr('width', bubbleChartWidth);

    const bubbles = svg
      .selectAll('circle')
      .data(players, (d: Player) => d.lastName);
    const bubbles_enter = bubbles
      .enter()
      .append('circle')
      .attr('class', 'bubble')
      .on('click', p =>
        this.selectPlayer(
          p,
          !this.selectionSticky || p !== this.selectedPlayer,
          true
        )
      )
      .on('mouseover', p => this.selectPlayer(p, true, false))
      .on('mouseout', p => this.selectPlayer(p, false, false));

    bubbles_enter.append('title');

    const texts = svg.selectAll('text').data(players);

    const texts_enter = texts
      .enter()
      .append('text')
      .text(d => d.lastName)
      .attr('fill', 'white')
      .attr('text-anchor', 'middle')
      .attr('font-size', 12)
      .attr('display', d =>
        this.fitsIntoCircle(d, players) ? 'block' : 'none'
      )
      .on('click', p =>
        this.selectPlayer(
          p,
          !this.selectionSticky || p !== this.selectedPlayer,
          true
        )
      )
      .on('mouseover', p => this.selectPlayer(p, true, false))
      .on('mouseout', p => this.selectPlayer(p, false, false));

    // UPDATE

    const bubbles_update = bubbles
      .merge(bubbles_enter)
      .attr('r', (d: Player) => this.getRadius(d, players))
      .attr('fill', d => Utils.getColor(d.team))
      .attr('id', d => d.lastName);

    bubbles.exit().remove();

    const texts_update = texts.merge(texts_enter);
    texts.exit().remove();

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
    const circleSize: number = this.getRadius(player, players);
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
