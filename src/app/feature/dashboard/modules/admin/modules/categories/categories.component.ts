import {AfterViewInit, Component, OnInit} from '@angular/core';
import { CategoriesService } from './services/categories.service';
import { ICategory } from './models/icategory';
import { IResponse } from './models/IResponse';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  animatedUsername: string = '';
  waveUsername: string[] = [];
  categories: ICategory[] = [];
  pageSize:number = 10
  pageNumber:number = 1
  tableResponse?:IResponse<ICategory[]>
  pageEvent?: PageEvent;
  name:string = ''

  constructor(private _categoriesService:CategoriesService){}

  ngOnInit(): void {
    this.prepareWaveUserName();
    this.getAllCategories()
  }
  prepareWaveUserName () {
    this.waveUsername ='Categories'.split('');
  }
  getAllCategories(){
    let tableParams = {
      name: this.name,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    }
    this._categoriesService.getAllCategories(tableParams).subscribe({
      next: (res:IResponse<ICategory[]>) => {
        this.categories = res.data
        this.tableResponse = res
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;
    console.log(this.pageSize);
    this.getAllCategories();
  }
  search(e:any){
    this.name = e.target.value
  }
}
