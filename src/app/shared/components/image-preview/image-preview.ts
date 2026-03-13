import {ChangeDetectionStrategy, Component, input} from '@angular/core';

@Component({
  selector: 'app-image-preview',
  standalone: true,
  imports: [],
  templateUrl: './image-preview.html',
  styleUrl: './image-preview.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagePreview {
  imageUrl = input<string | undefined>();
}
