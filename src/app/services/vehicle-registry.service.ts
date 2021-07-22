import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { VehicleCode } from '../shared/interface';

@Injectable({
  providedIn: 'root'
})
export class VehicleRegistryService {

  constructor(private http: HttpClient) {}

  public getData(): Observable<VehicleCode[]> {
    return this.http
      .get<VehicleCode[]>('./assets/data.json')
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
