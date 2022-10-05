import { SelectorMatcher } from '@angular/compiler';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { concat, uniq } from 'lodash';

@Component({
  selector: 'cardbyartist-app',
  templateUrl: './cardbyartist.component.html',
  styleUrls: ['./cardbyartist.component.css'],
})
export class CardbyartistComponent {
  @Input() image = "";
  @Input() name = "";
}
