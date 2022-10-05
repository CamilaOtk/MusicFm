import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'leftmenu-app',
  templateUrl: './leftmenu.component.html',
  styleUrls: ['./leftmenu.component.css'],
})
export class LeftmenuComponent {
  @Input() menuTabs: any[] = [];
  @Input() tab: string = "";
  @Output() changeTab: EventEmitter<string> = new EventEmitter<string>();

  async onClickTabItem(tabItem: string) {    
    await this.changeTab.emit(tabItem);
  }
}
