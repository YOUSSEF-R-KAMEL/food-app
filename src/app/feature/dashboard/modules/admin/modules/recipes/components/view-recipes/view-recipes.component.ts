import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICategory } from 'src/app/feature/dashboard/modules/admin/modules/categories/models/ICategory';
import { IRecipes } from '../../models/IRecipes';

@Component({
  selector: 'app-view-recipes',
  templateUrl: './view-recipes.component.html',
  styleUrls: ['./view-recipes.component.scss']
})
export class ViewRecipesComponent {

  constructor(
    public dialogRef: MatDialogRef<ViewRecipesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {recipe: IRecipes},
  ) {
    console.log(data)
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

