import { Component } from '@angular/core';

@Component({
  selector: 'app-tabwrap',
  templateUrl: './tabwrap.component.html',
  styleUrls: ['./tabwrap.component.scss']
})
export class tabwrapComponent {

  public tabs: { label: string, formSrc: string }[];

  constructor() {
    this.createFakeTabs();
  }

  public selectedTabChanged() {
    console.log('tab changed');
  }

  private createFakeTabs() {
    const tabs = [
      { label: 'zero', formSrc: 'content for zero' },
      { label: 'one', formSrc: 'content for one' },
      { label: 'two', formSrc: 'content for two' },
    ];

    this.tabs = tabs;
  }

}
