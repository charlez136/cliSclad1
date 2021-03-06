import { Injectable } from '@angular/core';
import 'devextreme/data/odata/store';
import { HttpClient } from '@angular/common/http';
import CustomStore from "devextreme/data/custom_store";
import DataSource from 'devextreme/data/data_source';
import { catchError, map  } from 'rxjs/operators';
import {LoadOptions} from 'devextreme/data/load_options';
import { environment } from 'src/environments/environment'; 
import {  of } from 'rxjs';



@Injectable()
export class tablcompService {
  response: any;


  constructor(private httpClient: HttpClient) { }
    getDataSource(partnum:string)  {
        return new DataSource({
          load: (loadOptions: LoadOptions) => {
            return this.httpClient.get<any[]>(`${environment.baseurl}/db/${partnum}`)
              .pipe(
                map(res => {
                  return {
                    totalCount: res.length,
                    data: res,
                  };
                }),
                catchError(err => {
                  console.log(err);
                  return of({
                    totalCount: 0,
                    data: [],
                  });
                })
              )
              .toPromise();
          }
        })
    }
    getDataAutocomlete( )  {
      return new DataSource({
        load: (loadOptions: LoadOptions) => {
          return this.httpClient.get<any[]>(`${environment.baseurl}/partnum`)
            .pipe(
              map(res => {
                return {
                  totalCount: res.length,
                  data: res,
                };
              }),
              catchError(err => {
                console.log(err);
                return of({
                  totalCount: 0,
                  data: [],
                });
              })
            )
            .toPromise();
        }
      })
  }

    getlistcountry() {
      return new DataSource({
        load: (loadOptions: LoadOptions) => {
          return this.httpClient.get<any[]>(`${environment.baseurl}/country`)
            .pipe(
              map(res => {
                return {

                  totalCount: res.length,
                  data: res,
                };
              }),
              catchError(err => {
                console.log(err);
                return of({
                  totalCount: 0,
                  data: [],
                });
              })
            )
            .toPromise();
        }
      })
    }

    getCurrency() {
      return new DataSource({
        load: (loadOptions: LoadOptions) => {
          return this.httpClient.get<any[]>(`${environment.baseurl}/currency`)
            .pipe(
              map(res => {
                return {

                  totalCount: res.length,
                  data: res,
                };
              }),
              catchError(err => {
                console.log(err);
                return of({
                  totalCount: 0,
                  data: [],
                });
              })
            )
            .toPromise();
        }
      })
    }

}
