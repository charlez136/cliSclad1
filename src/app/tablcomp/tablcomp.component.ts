import {  Component, OnInit , enableProdMode } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { tablcompService } from '../_services/tablcomp.service';

if(!/localhost/.test(document.location.host)) {
    enableProdMode();
}

@Component({
    selector: 'app-dtgr',
    templateUrl: './tablcomp.component.html',
    styleUrls: ['./tablcomp.component.scss'],
    providers: [tablcompService]
})
export class tablcompComponent implements OnInit{
    dataSource: DataSource;
    collapsed = false;

    ngOnInit(): void {
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

    constructor(service: tablcompService) {

    }
}
