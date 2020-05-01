import { Component, Input, Output, OnInit } from '@angular/core';
import {TabItem} from '../_models/tab';

@Component({
  selector: 'my-tab',
  styles: [
    `
    .pane{
      padding: 1em;
    }
  `
  ],
  template: `
    <div [hidden]="!active" class="pane">
      <ng-content></ng-content>
      <ng-container >
      <app-table></app-table>
      </ng-container>

    </div>
  `
})
export class TabComponent  {
  @Input('tabTitle') title: string;
  @Input() active = false;
  @Input() isCloseable = false;
  @Input() template;
  @Input() dataContext;
  tab:TabItem;
  constructor(){
    this.tab = new TabItem()
  }


}
