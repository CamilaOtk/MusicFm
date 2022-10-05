import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'content-app',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent {
  @Input() listItems: any[] = [];
  @Input() tab: string = '';
  @Input() menuTabs: any[] = [];
  @Input() dataArtistas: any = null;
  @Input() dataAlbuns: any = null;

  @Output() handleChangeTab: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteItemHistorico: EventEmitter<string> = new EventEmitter<string>();

  changeTab(_tab: string){
    this.handleChangeTab.emit(_tab);
  }

  deleteHistorico(item: any){
    this.deleteItemHistorico.emit(item);
  }
}
