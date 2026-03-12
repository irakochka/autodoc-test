import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {SvgIcon} from '@shared/components';

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
