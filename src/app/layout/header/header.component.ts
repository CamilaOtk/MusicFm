import { SelectorMatcher } from '@angular/compiler';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { concat, uniq } from 'lodash';

@Component({
  selector: 'header-app',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  inputText: string = '';

  @Output() onSerachMusics: EventEmitter<string> = new EventEmitter<string>(); 

  onInput(event: any): void {
    this.inputText = event.target.value;
  }

  onPress(event: any): void {
    if ('13'.includes((event.which || event.keyCode).toString()))
      this.setItemInLocalStorage(this.inputText);
  }

  onPressIcon(): void {
    this.setItemInLocalStorage(this.inputText);
  }

  async setItemInLocalStorage(search: string, key: string = 'historic_searchs') {
    await this.onSerachMusics.emit(search);
    const searchs = JSON.parse(localStorage.getItem(key) ?? '[]');
    localStorage.setItem(
      key,
      JSON.stringify(uniq(concat(search, searchs)).slice(0, 15))
    );
  }
}
