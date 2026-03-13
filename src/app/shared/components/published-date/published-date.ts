import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-published-date',
  standalone: true,
    imports: [
        DatePipe
    ],
  templateUrl: './published-date.html',
  styleUrl: './published-date.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublishedDate {
  date = input.required<string>();
}
