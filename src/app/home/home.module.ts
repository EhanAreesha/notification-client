import { NgModule } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import {DataTableModule} from 'primeng/datatable';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from './notifications.service';
import { NotificationComponent } from './notifications/notifications.component';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    HomeComponent,
    NotificationComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    AccordionModule,
    ToastModule,
    DataTableModule,
    ConfirmDialogModule
  ],
  providers: [MessageService, ConfirmationService, NotificationService]
})
export class NotificationModule {
  constructor() {
  }

}
