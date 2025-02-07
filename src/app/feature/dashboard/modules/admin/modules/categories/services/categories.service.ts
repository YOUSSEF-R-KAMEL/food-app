import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from '../models/icategory';
import { IResponse } from '../models/IResponse';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _httpClient:HttpClient) { }
  getAllCategories(tableParams:any):Observable<IResponse<ICategory[]>>{
    return this._httpClient.get<IResponse<ICategory[]>>("Category", {params: tableParams})
  }
}
