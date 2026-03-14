import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ModalService, SvgIcon} from '@shared/components';
import {CreateNewsModal} from '@features/news';

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
  private readonly modalService = inject(ModalService);

  showCreateNews() {
    this.modalService.show(CreateNewsModal);
  }
}
