import {
    Component,
    ContentChildren,
    QueryList,
    AfterContentInit,
    ViewChild,
    ComponentFactoryResolver,
    ChangeDetectionStrategy,
    DoCheck, OnInit,ViewContainerRef
  } from '@angular/core';
  
  import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
  import { BehaviorSubject } from 'rxjs'
  
  import { TabComponent } from './tab.component';
  import { DynamicTabsDirective } from './dynamic-tabs.directive';
  import{TabItem} from '../_models/tab';
  
  @Component({
    selector: 'my-tabs',
    templateUrl:'./tabs.component.html',

  })
  export class TabsComponent implements AfterContentInit,OnInit{
    dynamicTabs: TabComponent[] = [];
    tabsmodels: TabItem[]=[];

    private currentTabsSubject: BehaviorSubject<TabItem[]>;

    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  
    @ViewChild(DynamicTabsDirective) dynamicTabPlaceholder: DynamicTabsDirective;

    constructor(private _componentFactoryResolver: ComponentFactoryResolver) {

    this.currentTabsSubject=new  BehaviorSubject<TabItem[]>(JSON.parse(localStorage.getItem('currentTabs')));
    this.tabsmodels=this.currentTabsSubject.value;

    }

    ngAfterContentInit() {
      const activeTabs = this.tabs.filter(tab => tab.active);
      if (activeTabs.length === 0) {
        this.selectTab(this.tabs.first);
      }
    }

ngOnInit(){
  console.log(JSON.stringify(this.tabsmodels))
}


restore(){
  this.tabsmodels.forEach((item)=>{
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(TabComponent);
    const viewContainerRef = this.dynamicTabPlaceholder.viewContainer;
    const componentRef = viewContainerRef.createComponent(componentFactory);
    const instance: TabComponent = componentRef.instance as TabComponent;
    instance.title = item.title;
    instance.template = item.template;
    instance.dataContext = item.dataContext;
    instance.isCloseable = item.isCloseable;
    instance.tab=item;
    this.dynamicTabs.push(componentRef.instance as TabComponent);
  });
}

    drop(event: CdkDragDrop<TabComponent[]>) {
        moveItemInArray(this.dynamicTabs, event.previousIndex, event.currentIndex);
        this.storingdata();
      }


      storingdata(){
        this.tabsmodels=[];
        this.dynamicTabs.forEach((item)=>{
        this.tabsmodels.push(item.tab as TabItem)
        });
        localStorage.setItem('currentTabs',JSON.stringify(this.tabsmodels));
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

      instance.tab.title=title;
      instance.tab.template = template;
      instance.tab.dataContext = data;
      instance.tab.isCloseable = isCloseable;
      instance.tab.viewContainerRef=viewContainerRef;
      
      this.tabsmodels.push(instance.tab as TabItem);

      this.dynamicTabs.push(componentRef.instance as TabComponent);
      this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);

    }
  
    selectTab(tab: TabComponent) {
      this.tabs.toArray().forEach(tab => (tab.active = false));
      this.dynamicTabs.forEach(tab => {tab.active = false;
        tab.tab.active=false;
      });
      tab.active = true;
      tab.tab.active = true;
      this.storingdata();
    }
  
    closeTab(tab: TabComponent) {
      for (let i = 0; i < this.dynamicTabs.length; i++) {
        if (this.dynamicTabs[i] === tab) {
          this.dynamicTabs.splice(i, 1);
          let viewContainerRef = this.dynamicTabPlaceholder.viewContainer;
          viewContainerRef.remove(i);
          this.selectTab(this.tabs.first);
          this.storingdata();
          break;
        }
      }
    }
  



    closeActiveTab() {
      const activeTabs = this.dynamicTabs.filter(tab => tab.active);
      if (activeTabs.length > 0) {
        this.closeTab(activeTabs[0]);
        this.storingdata();
      }
    }
  }
  