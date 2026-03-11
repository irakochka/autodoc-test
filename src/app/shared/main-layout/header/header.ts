import { Component } from '@angular/core';
import {SvgIcon} from '@shared';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    SvgIcon,
    RouterLink
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

}
