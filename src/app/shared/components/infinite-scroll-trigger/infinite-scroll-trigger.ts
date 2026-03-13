import {ChangeDetectionStrategy, Component, OnInit, output} from '@angular/core';

@Component({
  selector: 'app-infinite-scroll-trigger',
  standalone: true,
  imports: [],
  templateUrl: './infinite-scroll-trigger.html',
  styleUrl: './infinite-scroll-trigger.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfiniteScrollTrigger implements OnInit {
  loaded = output<void>();
  ngOnInit() {
    this.loaded.emit();
  }
}
