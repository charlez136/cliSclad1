import { Component, OnInit,Input, ChangeDetectionStrategy, DoCheck, ChangeDetectorRef} from '@angular/core';
import{ HttpClient }from '@angular/common/http';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SummaryComponent implements OnInit,DoCheck {
  oeParts:string;
  iamParts:string;
  wholesaler:string;
  rrpAvg:string;
  rrpRange:string;
private partnum:string;
  response: any;

  constructor(private http: HttpClient,private cd:ChangeDetectorRef) {

}
@Input()
set _partnum(value:string){
this.partnum=value;
this.getSummery(this.partnum);
}


  ngOnInit(): void {
    this.getSummery(this.partnum);
    
  }

ngDoCheck(){

  this.cd.markForCheck(); 
}
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
  

}
