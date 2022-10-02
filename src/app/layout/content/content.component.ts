import { SelectorMatcher } from '@angular/compiler';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { concat, uniq } from 'lodash';

@Component({
  selector: 'content-app',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})

export class ContentComponent {
  @Input() listItems: any[] = [];
}
