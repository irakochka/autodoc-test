import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {SvgIcon} from '@shared/components';
import {ModalService} from '@shared/services';
import {CreateNewsModal} from '@shared/components/create-news-modal/create-news-modal';

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
  #modalService = inject(ModalService);

  showCreateNews() {
    this.#modalService.show(CreateNewsModal);
  }
}
