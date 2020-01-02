import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { Player } from 'src/app/model/player';

@Component({
  selector: 'player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css'],
})
export class PlayerDetailComponent {
  @Input() player: Player;

  _position: { x: number; y: number };
  @Input('position') set position(pos: { x: number; y: number }) {
    const width = this.container.nativeElement.clientWidth;
    const height = this.container.nativeElement.clientWidth;
    const x = pos.x;
    const y = pos.y;

    this.elementResize.next({
      width,
      height,
      x,
      y,
    });
  }

  get position() {
    return this._position;
  }

  @ViewChild('container', { static: true })
  container: ElementRef;

  viewportResize = new BehaviorSubject<[number, number]>([0, 0]);
  elementResize = new BehaviorSubject<{
    width: number;
    height: number;
    x: number;
    y: number;
  }>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    const scrHeight = window.innerHeight;
    const scrWidth = window.innerWidth;
    this.viewportResize.next([scrHeight, scrWidth]);
  }

  // Constructor
  constructor() {
    this.getScreenSize();

    const v = this.viewportResize;
    const e = this.elementResize;

    combineLatest([v, e]).subscribe(([[vh, vw], e]) => {
      if (e.width > 0) {
        const xTooBig = e.x + e.width + 25 > vw;
        const yTooBig = e.y + e.height + 25 > vh;

        this._position = {
          x: xTooBig ? e.x - e.width - 20 : e.x + 20,
          y: yTooBig ? e.y - e.height - 20 : e.y + 20,
        };
      }
    });
  }
}
