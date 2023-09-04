import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
@NgModule({
    exports:[
        FormsModule, 
        MatFormFieldModule, 
        MatInputModule, 
        ReactiveFormsModule, 
        MatButtonModule, 
        MatIconModule
    ]
})
export class MaterialModule { }