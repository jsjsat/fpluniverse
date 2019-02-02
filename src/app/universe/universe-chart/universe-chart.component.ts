import { Component, OnInit, HostListener } from '@angular/core';
import * as d3 from 'd3';
import { Player } from 'src/app/model/player';
import { UniverseService } from '../services/universe-service';
import Utils from 'src/app/util/utils';
import { ScaleLinear } from 'd3';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'universe-chart',
  templateUrl: './universe-chart.component.html',
  styleUrls: ['./universe-chart.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UniverseChartComponent implements OnInit {
  constructor(private universeService: UniverseService) { }

  private _players: Player[];

  ngOnInit() {
    this.universeService.getPlayers().subscribe(
      players => {
        this._players = players.sort((a, b) => b.team - a.team)
        this.updateChart(this._players);
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this._players) {
      this.updateChart(this._players);
    }
  }

  getRadius(player: Player, players: Player[]): number {
    let max: number = Math.max.apply(Math, players.map(p => p.points));
    let min: number = Math.min.apply(Math, players.map(p => p.points));
    let bubbleChartWidth = window.innerWidth;
    let bubbleChartHeight = window.innerHeight;
    let minlen: number = Math.min(bubbleChartWidth, bubbleChartHeight);
    let scaleLinear: ScaleLinear<number, number> = d3.scaleLinear()
      .domain([min, max])
      .range([1, minlen / 20]);
    return scaleLinear(player.points);
  }

  updateChart(players: Player[]) {
    players = players.filter(player => player.points > 0).sort((a, b) => b.points - a.points);

    let bubbleChartWidth = window.innerWidth;
    let bubbleChartHeight = window.innerHeight;

    let simulation = d3.forceSimulation()
      .force("xtocenter", d3.forceX(bubbleChartWidth / 2).strength(0.1))
      .force("ytocenter", d3.forceY(bubbleChartHeight / 2).strength(0.1))
      .force("anticollide", d3.forceCollide().radius((d: Player) => this.getRadius(d, players) + 2));

    let svg = d3.select('svg')
      .attr('height', bubbleChartHeight)
      .attr('width', bubbleChartWidth);

    let bubbles = svg.selectAll('circle').data(players, (d: Player) => d.lastName);
    let bubbles_enter = bubbles.enter().append('circle').attr('class', 'bubble');
    bubbles_enter.append('title');

    let texts = svg.selectAll('text')
      .data(players);

    let texts_enter = texts.enter().append('text')
      .text(d => d.lastName)
      .attr('fill', 'white')
      .attr('text-anchor', 'middle')
      .attr('font-size', 12)
      .attr('display', (d) => this.fitsIntoCircle(d, players) ? 'block' : 'none');

    // UPDATE

    const bubbles_update = bubbles.merge(bubbles_enter)
      .attr("r", (d: Player) => this.getRadius(d, players))
      .attr("fill", (d) => Utils.getColor(d.team))
      .attr("id", (d) => d.lastName);

    bubbles.merge(bubbles_enter).select('title').text((p: Player) => p.lastName);
    bubbles.exit().remove();

    const texts_update = texts.merge(texts_enter);
    texts.exit().remove();


    simulation.nodes(players)
      .on("tick", ticked)

    function ticked() {
      bubbles_update
        .attr("cx", function (d, i) {
          var t: any = d;
          return t.x;
        })
        .attr("cy", function (d, i) {
          var t: any = d;
          return t.y;
        })

      texts_update.attr('x', (d) => {
        var t: any = d;
        return t.x;
      })
        .attr('y', (d) => {
          var t: any = d;
          return t.y;
        });

    }
  }

  fitsIntoCircle(player: Player, players: Player[]): boolean {
    let circleSize: number = this.getRadius(player, players);
    return circleSize > (player.lastName.length * 2.5);
  }
}
