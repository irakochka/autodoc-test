import { Component } from '@angular/core';
import {Header} from '../header/header';
import {RouterOutlet} from '@angular/router';
import {ModalHost} from '@shared/components/modal/modal-host/modal-host';

@Component({
  selector: 'app-layout',
  imports: [
    Header,
    RouterOutlet,
    ModalHost
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {

}
