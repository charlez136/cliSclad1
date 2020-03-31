import {
    Component,
    ContentChildren,
    QueryList,
    AfterContentInit,
    ViewChild,
    ComponentFactoryResolver,
    
  } from '@angular/core';
  
  import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

  
  import { TabComponent } from './tab.component';
  import { DynamicTabsDirective } from './dynamic-tabs.directive';
  
  @Component({
    selector: 'my-tabs',
    templateUrl:'./tabs.component.html'
  })
  export class TabsComponent implements AfterContentInit {
    dynamicTabs: TabComponent[] = [];
  
    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  
    @ViewChild(DynamicTabsDirective) dynamicTabPlaceholder: DynamicTabsDirective;

    constructor(private _componentFactoryResolver: ComponentFactoryResolver) {}

    ngAfterContentInit() {
      
      const activeTabs = this.tabs.filter(tab => tab.active);
      if (activeTabs.length === 0) {
        this.selectTab(this.tabs.first);
      }
    }


    drop(event: CdkDragDrop<TabComponent[]>) {
        moveItemInArray(this.dynamicTabs, event.previousIndex, event.currentIndex);
      }



  
    openTab(title: string, template, data, isCloseable = false) {
      const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        TabComponent
      );

      const viewContainerRef = this.dynamicTabPlaceholder.viewContainer;
      const componentRef = viewContainerRef.createComponent(componentFactory);
      const instance: TabComponent = componentRef.instance as TabComponent;
      instance.title = title;
      instance.template = template;
      instance.dataContext = data;
      instance.isCloseable = isCloseable;
      this.dynamicTabs.push(componentRef.instance as TabComponent);
      this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);
    }
  
    selectTab(tab: TabComponent) {
      this.tabs.toArray().forEach(tab => (tab.active = false));
      this.dynamicTabs.forEach(tab => (tab.active = false));
      tab.active = true;
    }
  
    closeTab(tab: TabComponent) {
      for (let i = 0; i < this.dynamicTabs.length; i++) {
        if (this.dynamicTabs[i] === tab) {
          this.dynamicTabs.splice(i, 1);
          let viewContainerRef = this.dynamicTabPlaceholder.viewContainer;
          viewContainerRef.remove(i);
          this.selectTab(this.tabs.first);
          break;
        }
      }
    }
  
    closeActiveTab() {
      const activeTabs = this.dynamicTabs.filter(tab => tab.active);
      if (activeTabs.length > 0) {
        this.closeTab(activeTabs[0]);
      }
    }
  }
  