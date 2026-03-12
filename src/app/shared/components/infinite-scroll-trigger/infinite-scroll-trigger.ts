import {Component, OnInit, output} from '@angular/core';

@Component({
  selector: 'app-infinite-scroll-trigger',
  imports: [],
  templateUrl: './infinite-scroll-trigger.html',
  styleUrl: './infinite-scroll-trigger.scss',
})
export class InfiniteScrollTrigger implements OnInit {
  loaded = output<void>();
  ngOnInit() {
    this.loaded.emit();
  }
}
