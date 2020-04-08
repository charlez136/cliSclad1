import { Component, OnInit, OnDestroy, enableProdMode,ChangeDetectorRef, DoCheck, ChangeDetectionStrategy} from '@angular/core';
import{ HttpClient }from '@angular/common/http';
import { timer, Subscription } from 'rxjs';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {tablcompComponent} from '../tablcomp/tablcomp.component';
import {map, startWith} from 'rxjs/operators';
import { tablcompService } from '../_services/tablcomp.service';
import DataSource from 'devextreme/data/data_source';

if(!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [tablcompService],

})
export class TableComponent implements OnInit, OnDestroy {
  partnum:string;
  tablc:tablcompComponent;
  dataSource: DataSource;
  collapsed = false;
  search: DataSource;
  country:DataSource;
  currency:DataSource;



  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  private timerSubscription: Subscription;
 

  constructor(private service: tablcompService,private cdRef: ChangeDetectorRef) {
    this.search = this.service.getDataAutocomlete();
    this.country=this.service.getlistcountry();
    this.currency=this.service.getCurrency();

  }

  public ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.timerSubscription = timer(1000, 2000).subscribe(val => console.log(val));
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

  public ngOnDestroy() {
    this.timerSubscription.unsubscribe();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
