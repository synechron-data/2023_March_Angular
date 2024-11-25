import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRootComponent } from './components/products-root/products-root.component';
import { RouterModule } from '@angular/router';
import { ProductNotSelectedComponent } from './components/product-not-selected/product-not-selected.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

@NgModule({
  declarations: [
    ProductsRootComponent,
    ProductNotSelectedComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ProductsRootComponent,
    ProductNotSelectedComponent,
    ProductDetailsComponent
  ]
})
export class ProductsModule { }
