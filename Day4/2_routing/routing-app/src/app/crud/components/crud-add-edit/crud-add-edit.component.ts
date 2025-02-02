import { Component, HostBinding } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { slideInOutAnimation } from 'src/app/utilities/animations/slide-in.animation';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { PubSubService } from '../../services/pub-sub.service';

@Component({
  selector: 'crud-add-edit',
  templateUrl: './crud-add-edit.component.html',
  animations: [slideInOutAnimation]
})
export class CrudAddEditComponent {
  @HostBinding('@slideInOutAnimation') slideInOutAnimation = true;
  
  title?: string;
  productFormGroup: FormGroup;
  saving = false;
  addEdit_sub?: Subscription;

  pstatus = [
    { key: 'Select Status', value: '' },
    { key: 'Available', value: 'Available' },
    { key: 'Not Available', value: 'Not Available' }
  ];

  get f() { return this.productFormGroup.controls; }

  constructor(private route: ActivatedRoute, private router: Router, private frmBuilder: FormBuilder,
    private productsService: ProductsService, private pubSubService: PubSubService) {
    this.productFormGroup = this.frmBuilder.group({
      id: [0, Validators.required],
      name: ["", Validators.required],
      description: ["", Validators.required],
      status: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.title = 'Add Product';

    const productId = Number(this.route.snapshot.params['id']);

    if (productId) {
      this.title = 'Edit Product';
      this.productsService.getProduct(productId).subscribe(x => this.productFormGroup?.patchValue(x));
    }
  }

  saveProduct() {
    if(this.productFormGroup.valid) {
      let product: Product = this.productFormGroup.value;
      const action = product.id !== 0 ? 'updateProduct' : 'createProduct';
      this.addEdit_sub = this.productsService[action](product).subscribe(() => {
        this.router.navigate(['crud']);
        this.pubSubService.publish('products-updated');
      });
    } else {
      this.productFormGroup.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.addEdit_sub?.unsubscribe();
  }
}
