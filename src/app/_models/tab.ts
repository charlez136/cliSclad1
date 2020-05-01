import {ViewContainerRef} from '@angular/core';
export class TabItem{
    title: string;
    active: boolean;
    isCloseable:boolean;
    template:any;
    dataContext:any;
    viewContainerRef:ViewContainerRef;
}