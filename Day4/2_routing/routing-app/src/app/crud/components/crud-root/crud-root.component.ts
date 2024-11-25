import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { fadeInAnimation } from 'src/app/utilities/animations/fade-in.animation';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { PubSubService } from '../../services/pub-sub.service';

@Component({
  selector: 'crud-root',
  templateUrl: './crud-root.component.html',
  animations: [fadeInAnimation]
})
export class CrudRootComponent implements OnInit, OnDestroy {
  @HostBinding('@fadeInAnimation') fadeInAnimation = true;
  @HostBinding('style.display') display = 'block';

  products?: Array<Product>;
  message?: string;
  subscription?: Subscription;
  gap_subscription?: Subscription;
  dp_subscription?: Subscription;

  constructor(private productsService: ProductsService, private pubSubService: PubSubService) { }

  ngOnInit(): void {
    this.subscription = this.pubSubService.on('products-updated').subscribe(() => { this.loadProducts() });
    this.loadProducts();
  }

  private loadProducts() {
    this.gap_subscription = this.productsService.getAllProducts().subscribe({
      next: resData => {
        this.products = resData;
        this.message = "";
      },
      error: (err: string) => {
        this.message = err;
      }
    });
  }

  deleteProduct(id: number) {
    if (window.confirm("Are you sure to delete the product?")) {
      this.dp_subscription = this.productsService.deleteProduct(id).subscribe(() => {
        this.products = this.products?.filter(x => x.id !== id);
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.gap_subscription?.unsubscribe();
    this.dp_subscription?.unsubscribe();
  }
}
