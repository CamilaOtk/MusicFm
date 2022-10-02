import { SelectorMatcher } from '@angular/compiler';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { concat, uniq } from 'lodash';

@Component({
  selector: 'loading-app',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})

export class LoadingComponent {
    @Input() activeLoading: boolean = false;
}
