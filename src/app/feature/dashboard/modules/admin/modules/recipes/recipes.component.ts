import { Component, OnInit } from '@angular/core';
import { IRecipes } from './models/IRecipes';
import { IResponse } from './models/IResponse';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IDialogData } from './models/IDialogData';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { AddEditViewRecipesComponent } from './components/add-edit-view-recipes/add-edit-view-recipes.component';
import { RecipesService } from './services/recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  waveUsername: string[] = [];
  recipes: IRecipes[] = [];
  pageSize:number = 10
  pageNumber:number = 1
  tableResponse?:IResponse<IRecipes[]>
  pageEvent?: PageEvent;
  resName:string = ''
  searchVal:string = ''

  constructor(
    private _recipesService:RecipesService,
    public dialog: MatDialog,
    private _toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.prepareWaveUserName();
    this.getAllRecipes()
  }
  prepareWaveUserName () {
    this.waveUsername ='Recipes'.split('');
  }
  getAllRecipes(){
    let tableParams = {
      name: this.searchVal,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    }
    this._recipesService.getAllRecipes(tableParams).subscribe({
      next: (res:IResponse<IRecipes[]>) => {
        this.recipes = res.data
        this.tableResponse = res
        console.log(this.recipes)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  // paginator
  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;
    this.getAllRecipes();
  }
  // search by name
  searchByCategoryName(e:any){
    this.searchVal = e.target.value
  }

  openDialog(category :IRecipes | null, dialogType:string){
    const dialogRef = this.dialog.open(AddEditViewRecipesComponent, {
      data: { category, type: dialogType },
    });

    dialogRef.afterClosed().subscribe((result: IDialogData) => {
      if(result?.category?.name){
        switch(dialogType){
          case 'Add':
            this._recipesService.addRecipe(result.category.name).subscribe({
              next: () => this.resName = result.category.name,
              error: () => this._toastr.error('Please make sure to enter the category name correctly ', 'Error'),
              complete: () => {
                this._toastr.success(this.resName + ' category added successfully')
                this.getAllRecipes()
              }
            })
            break;
          case 'Update':
              console.log(result.category.name);
              this._recipesService.updateRecipe(result.category.name, result.category.id).subscribe({
                next: (res) => this.resName = result.category.name,
                error: (err) => this._toastr.error('Please make sure to enter the category name correctly ', 'Error'),
                complete: () => {
                  this._toastr.success(this.resName + ' category Updated successfully')
                  this.getAllRecipes()
                }
              })
              break;
        }
      }
    });
  }

  openDeleteDialog(category :IRecipes){
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {cat: category, type: "Category"},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(category)
      if(result?.action === 'delete'){
        this._recipesService.deleteRecipe(category.id).subscribe({
          next: () => this.resName = category.name,
          error: () => this._toastr.error('Please make sure to enter the category name correctly ', 'Error'),
          complete: () => {
            this._toastr.success(this.resName + ' category deleted successfully')
            this.getAllRecipes()
          }
        })
      }
    });
  }
}

