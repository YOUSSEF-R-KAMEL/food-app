import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditViewRecipesComponent } from './add-edit-view-recipes.component';

describe('AddEditViewRecipesComponent', () => {
  let component: AddEditViewRecipesComponent;
  let fixture: ComponentFixture<AddEditViewRecipesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditViewRecipesComponent]
    });
    fixture = TestBed.createComponent(AddEditViewRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
