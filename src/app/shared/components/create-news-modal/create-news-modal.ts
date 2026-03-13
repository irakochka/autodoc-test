import { Component } from '@angular/core';
import {ModalBaseComponent} from '@shared/components/modal/modal-base/modal-base.component';

@Component({
  selector: 'app-create-news-modal',
  imports: [
    ModalBaseComponent
  ],
  templateUrl: './create-news-modal.html',
  styleUrl: './create-news-modal.scss',
})
export class CreateNewsModal {

}
