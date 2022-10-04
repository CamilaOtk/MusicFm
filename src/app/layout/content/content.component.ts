import { Component, Input } from '@angular/core';

@Component({
  selector: 'content-app',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})

export class ContentComponent {
  @Input() listItems: any[] = [];
}
