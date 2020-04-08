import {  Component, OnInit , enableProdMode,Input,ChangeDetectionStrategy,ChangeDetectorRef, DoCheck } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { tablcompService } from '../_services/tablcomp.service';

if(!/localhost/.test(document.location.host)) {
    enableProdMode();
}

@Component({
    selector: 'app-dtgr',
    templateUrl: './tablcomp.component.html',
    styleUrls: ['./tablcomp.component.scss'],
    providers: [tablcompService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class tablcompComponent implements OnInit,DoCheck{
    private partnum:string;
    dataSource: DataSource;
    collapsed = false;


    @Input()
set _partnum(value:string){
this.partnum=value;
this.dataSource = this.service.getDataSource(this.partnum);
}

    ngOnInit(): void {
    }
ngDoCheck(){
    this.cdRef.markForCheck();
}
    contentReady = (e) => {
        if(!this.collapsed) {
            this.collapsed = true;
            e.component.expandRow(["EnviroCare"]);
        }
    };
    customizeTooltip = (pointsInfo) => {
        return { text: parseInt(pointsInfo.originalValue) + "%" };
    }


    constructor(private service: tablcompService,private cdRef: ChangeDetectorRef) {
        this.dataSource = service.getDataSource(this.partnum);
    }
}
