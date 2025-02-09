import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRecipes } from '../models/IRecipes';
import { IResponse } from '../models/IResponse';
import { IUpdateRecipes } from '../models/IUpdateRecipes';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private _httpClient:HttpClient) { }
  getAllRecipes(tableParams:any):Observable<IResponse<IRecipes[]>>{
    return this._httpClient.get<IResponse<IRecipes[]>>("Recipe", {params: tableParams})
  }
  addRecipe(name: string): Observable<IRecipes>{
    return this._httpClient.post<IRecipes>("Recipe", {name})
  }
  updateRecipe(name: string, id:number): Observable<IUpdateRecipes>{
    return this._httpClient.put<IUpdateRecipes>("Recipe/" + id, {name})
  }
  deleteRecipe(id:number){
    return this._httpClient.delete("Recipe/" + id)
  }
}
