// material.module.ts
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class MaterialModule {}
