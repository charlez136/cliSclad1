import { Component, ViewChild,Output,EventEmitter } from '@angular/core';

import { TabsComponent } from './tabs.component';

@Component({
  selector: 'my-tabwr',
  templateUrl: './tabwrap.component.html',
  styles:[`
  .addbtn{
    padding-bottom:20px;
  }
  `],
})
export class tabwrapComponent {
  @ViewChild('contenttable') TableTab;
  @Output() addTable = new EventEmitter<any>();
  @ViewChild(TabsComponent) tabsComponent;



  addinnewTable(){
    this.addTable.emit()
    this.tabsComponent.openTab('New Tab', this.TableTab, {}, true);
    
  }

}
