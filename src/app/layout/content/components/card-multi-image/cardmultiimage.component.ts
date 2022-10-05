import { Component, Input } from '@angular/core';

@Component({
  selector: 'cardmultiimage-app',
  templateUrl: './cardmultiimage.component.html',
  styleUrls: ['./cardmultiimage.component.css'],
})
export class ardMultiImageComponent {
  @Input() text: any = null;
  @Input() images: any[] = [];
}
