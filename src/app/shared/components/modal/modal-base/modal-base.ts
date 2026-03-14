import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-base',
  imports: [CommonModule],
  templateUrl: './modal-base.html',
  styleUrl: './modal-base.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ModalBase {}
