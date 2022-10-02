import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductListComponent } from './product-list/product-list.component';

// material components
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';

//All modules
import { ServicesModule } from '../app/services/services.module'
import { GatwayService } from '../app/services/gatway/gatway.service';
import { ProductService } from '../app/services/product/product.service';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { productReducer } from './store/reducers/product.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects'
import { ProductEffect } from './store/effects/product.effect';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ValidationComponent } from './validation/validation.component';
import { ProductViewComponent } from './product-view/product-view.component'

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCreateComponent,
    ValidationComponent,
    ProductViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    MatDividerModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,  
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    ServicesModule,
    StoreModule.forRoot({products: productReducer}),
    StoreDevtoolsModule.instrument({ 
      maxAge: 25, 
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([ProductEffect])
  ],
  entryComponents: [
    ProductCreateComponent,
    ProductViewComponent
  ],
  providers: [
    GatwayService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
