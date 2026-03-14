import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {ModalBase} from '@shared/components/modal/modal-base/modal-base';
import {ModalService, SvgIcon} from "@shared/components";
import {DndDirective} from '@shared/directives';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NewsStore} from '@shared/store/news-store';
import {News} from '@shared/interfaces';

@Component({
  selector: 'app-create-news-modal',
  standalone: true,
  imports: [
    ModalBase,
    SvgIcon,
    DndDirective,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-news-modal.html',
  styleUrl: './create-news-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNewsModal {
  private readonly newsStore = inject(NewsStore);
  private readonly modalService = inject(ModalService);

  isSuccess = signal(false);
  createdNews = signal<News | null>(null);

  newsForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(150)],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(5000)],
    }),
    titleImageUrl: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  close() {
    this.modalService.hide();
  }

  // TODO

  previewUrl = signal<string | null>(null);

  photo: File | null = null;

  fileBrowserHandler(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;

      this.newsForm.patchValue({
        titleImageUrl: result,
      });

      this.previewUrl.set(result);
    };

    reader.readAsDataURL(file);
  }

  onFileDropped(file: File): void {
    this.processFile(file);
  }

  processFile(file: File | null | undefined): void {
    if (!file || !file.type.match('image')) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      this.previewUrl.set(event.target?.result?.toString() ?? '');
    };

    reader.readAsDataURL(file);
    this.photo = file;
  }

  removePreview(fileInput?: HTMLInputElement): void {
    this.previewUrl.set(null);
    this.newsForm.patchValue({ titleImageUrl: '' });

    if (fileInput) {
      fileInput.value = '';
    }
  }

  submit(): void {
    if (this.newsForm.invalid) {
      this.newsForm.markAllAsTouched();
      return;
    }

    const { title, description, titleImageUrl } = this.newsForm.getRawValue();

    const createdNews = this.newsStore.createLocalNews({
      title,
      description,
      titleImageUrl,
    });

    this.createdNews.set(createdNews);
    this.isSuccess.set(true);

    this.newsForm.reset({
      title: '',
      description: '',
      titleImageUrl: '',
    });

    this.previewUrl.set(null);
  }
}
