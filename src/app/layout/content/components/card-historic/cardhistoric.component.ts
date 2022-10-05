import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cardhistoric-app',
  templateUrl: './cardhistoric.component.html',
  styleUrls: ['./cardhistoric.component.css'],
})
export class CardHistoricComponent  {
  @Input() item: any = null;

  @Output() onRemoveHistorico: EventEmitter<string> = new EventEmitter<string>;

  ngOnChanges(){
    console.log('vber', this.item)
  }

  onClickRemoveItem(_item: any){
    console.log('passei bro')
    this.onRemoveHistorico.emit(_item);
  }

}
