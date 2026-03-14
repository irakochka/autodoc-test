import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalService} from '@shared/components';

@Component({
  selector: 'app-modal-host',
  imports: [CommonModule],
  templateUrl: './modal-host.html',
  styleUrl: './modal-host.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ModalHost implements AfterViewInit {
  private readonly modalService = inject(ModalService);

  container = viewChild('container', { read: ViewContainerRef });

  ngAfterViewInit() {
    const container = this.container();

    if (!container) return;
    this.modalService.registerContainer(container);
  }
}
