import {Component, input} from '@angular/core';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-published-date',
    imports: [
        DatePipe
    ],
  templateUrl: './published-date.html',
  styleUrl: './published-date.scss',
})
export class PublishedDate {
  date = input.required<string>();
}
