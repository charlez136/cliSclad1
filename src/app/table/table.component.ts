import { Component, OnInit, OnDestroy, Input,enableProdMode } from '@angular/core';
import{ HttpClient }from '@angular/common/http'
import { timer, Subscription } from 'rxjs';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
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
  providers: [tablcompService]
})
export class TableComponent implements OnInit, OnDestroy {
  oeParts:string;
  iamParts:string;
  wholesaler:string;
  rrpAvg:string;
  rrpRange:string;
  partnum='h657i';
  response: any;
  dataSource: DataSource;
  collapsed = false;
  search: DataSource;
  country:DataSource;
  currency:DataSource;

  @Input() public data: any;
  @Input() public name: any;

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  private timerSubscription: Subscription;

  constructor(private service: tablcompService,private http:HttpClient) {
    this.search = this.service.getDataAutocomlete();
    this.country=this.service.getlistcountry();
    this.currency=this.service.getCurrency();
    this.getSummery(this.partnum);

  }
valuechange(){
  this.dataSource = this.service.getDataSource(this.partnum);
  this.getSummery(this.partnum);

}
  public ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    console.log(`init: tab ${this.name}`);
    this.timerSubscription = timer(1000, 2000).subscribe(val => console.log(val));
  }

  contentReady = (e) => {
    if(!this.collapsed) {
        this.collapsed = true;
        e.component.expandRow(["EnviroCare"]);
    }
};

getSummery(partnum:string){
  this.http.get('http://localhost:8080/summary/'+partnum).subscribe((response)=>{
    this.response=response;
    this.oeParts= this.response.oeParts;
    this.iamParts= this.response.iamParts;
    this.wholesaler= this.response.wholesaler;
    this.rrpAvg= this.response.rrpAvg;
    this.rrpRange= this.response.rrpRange;
  })

}


customizeTooltip = (pointsInfo) => {
    return { text: parseInt(pointsInfo.originalValue) + "%" };
}

  public ngOnDestroy() {
    console.log(`destroy: tab ${this.name}`);
    this.timerSubscription.unsubscribe();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
