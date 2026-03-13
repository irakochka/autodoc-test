import { Component } from '@angular/core';
import {Header} from '../header/header';
import {RouterOutlet} from '@angular/router';
import {ModalHostComponent} from '@shared/components/modal/modal-host/modal-host.component';

@Component({
  selector: 'app-layout',
  imports: [
    Header,
    RouterOutlet,
    ModalHostComponent
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {

}
