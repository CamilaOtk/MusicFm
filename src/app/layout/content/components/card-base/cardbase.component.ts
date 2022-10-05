import { SelectorMatcher } from '@angular/compiler';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { concat, uniq } from 'lodash';

@Component({
  selector: 'cardbase-app',
  templateUrl: './cardbase.component.html',
  styleUrls: ['./cardbase.component.css'],
})
export class CardBaseComponent {
  @Input() type: string = '';
  @Input() item: any = null;

  @Output() deleteHistorico: EventEmitter<string> = new EventEmitter<string>;

  onRemoveHistorico(item: any){
    this.deleteHistorico.emit(item);
  }
}
