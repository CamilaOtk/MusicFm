import { SelectorMatcher } from '@angular/compiler';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { concat, uniq } from 'lodash';

@Component({
  selector: 'cardbyalbum-app',
  templateUrl: './cardbyalbum.component.html',
  styleUrls: ['./cardbyalbum.component.css'],
})
export class CardbyalbumComponent {
  @Input() image = "";
  @Input() name = "";
}
