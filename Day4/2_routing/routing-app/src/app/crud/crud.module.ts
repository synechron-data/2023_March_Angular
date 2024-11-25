import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { CrudRootComponent } from './components/crud-root/crud-root.component';
import { ProductsService } from './services/products.service';
import { PubSubService } from './services/pub-sub.service';
import { CrudAddEditComponent } from './components/crud-add-edit/crud-add-edit.component';

@NgModule({
  declarations: [
    CrudRootComponent,
    CrudAddEditComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CrudRootComponent,
    CrudAddEditComponent
  ],
  providers: [ProductsService, PubSubService]
})
export class CrudModule { }
