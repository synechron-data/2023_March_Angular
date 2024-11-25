import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product?: Product;
  rSub?: Subscription;

  constructor(private productService: ProductService, private route: ActivatedRoute) {
    // console.log(route);
  }

  ngOnInit(): void {
    this.rSub = this.route.params.pipe(map(p => p['id'])).subscribe(id => {
      this.product = this.productService.Products.find(prd => prd.id === parseInt(id));
    });
  }

  ngOnDestroy(): void {
    this.rSub?.unsubscribe();
  }
}
