import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { Player } from 'src/app/model/player';
import { UniverseService } from '../services/universe-service';

@Component({
  selector: 'universe-chart',
  templateUrl: './universe-chart.component.html',
  styleUrls: ['./universe-chart.component.css']
})
export class UniverseChartComponent implements OnInit {
  constructor(private universeService: UniverseService) { }

  ngOnInit() {
    this.universeService.getPlayers().subscribe(
      players => this.updateChart(players.sort((a, b) => b.points - a.points)));
  }

  updateChart(players: Player[]) {
    players = players.filter(player => player.points > 0).sort((a, b) => b.points - a.points);

    let color = d3.scaleOrdinal(d3.schemeCategory10);
    let bubbleChartWidth = window.innerWidth;
    let bubbleChartHeight = window.innerHeight;

    // scales
    let max: number = Math.max.apply(Math, players.map(p => p.points));
    let min: number = Math.min.apply(Math, players.map(p => p.points));
    let radiusScale = d3.scaleLinear()
      .domain([min, max])
      .range([1, 50]);

    let simulation = d3.forceSimulation()
      .force("xtocenter", d3.forceX(bubbleChartWidth / 2).strength(0.05))
      .force("ytocenter", d3.forceY(bubbleChartHeight / 2).strength(0.05))
      .force("anticollide", d3.forceCollide().radius((d: Player) => radiusScale(d.points) + 3));

    let svg = d3.select('svg')
      .attr('height', bubbleChartHeight)
      .attr('width', bubbleChartWidth);

    let bubbles = svg.selectAll('circle').data(players, (d: Player) => d.lastName);
    let bubbles_enter = bubbles.enter().append('circle').attr('class', 'bubble');
    bubbles_enter.append('title');

    let texts = svg.selectAll(null)
      .data(players.filter(p => p.points > 75))
      .enter()
      .append('text')
      .text(d => d.lastName)
      .attr('fill', 'white')
      .attr('text-anchor', 'middle')
      .attr('font-size', 12)

    // UPDATE

    const bubbles_update = bubbles.merge(bubbles_enter)
      .attr("r", (d: Player) => radiusScale(d.points))
      .attr("fill", (d) => color(d.firstName))
      .attr("id", (d) => d.lastName);

    bubbles.merge(bubbles_enter).select('title').text((p: Player) => p.lastName);
    bubbles.exit().remove();

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

      texts.attr('x', (d) => {
        var t: any = d;
        return t.x;
      })
        .attr('y', (d) => {
          var t: any = d;
          return t.y;
        });
    }
  }



}
