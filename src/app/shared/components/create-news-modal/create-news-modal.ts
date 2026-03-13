import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ModalBaseComponent} from '@shared/components/modal/modal-base/modal-base.component';

@Component({
  selector: 'app-create-news-modal',
  standalone: true,
  imports: [
    ModalBaseComponent
  ],
  templateUrl: './create-news-modal.html',
  styleUrl: './create-news-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNewsModal {

}
