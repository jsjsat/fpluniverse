import { Component, OnInit, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'universe-filter',
  templateUrl: './universe-filter.component.html',
  styleUrls: ['./universe-filter.component.scss']
})
export class UniverseFilterComponent implements OnInit {

  public open: boolean = false;

  constructor(private eRef: ElementRef) {
  }

  ngOnInit() {
  }


  toggleFilterDialog() {
    this.open = !this.open;
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.open = false;
    }
  }

}
