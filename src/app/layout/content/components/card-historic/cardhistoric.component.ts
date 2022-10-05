import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cardhistoric-app',
  templateUrl: './cardhistoric.component.html',
  styleUrls: ['./cardhistoric.component.css'],
})
export class CardHistoricComponent  {
  @Input() item: any = null;

  @Output() onRemoveHistorico: EventEmitter<string> = new EventEmitter<string>;


  onClickRemoveItem(_item: any){
    this.onRemoveHistorico.emit(_item);
  }

}
