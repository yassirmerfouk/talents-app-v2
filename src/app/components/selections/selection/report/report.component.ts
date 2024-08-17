import {Component, inject, Input, OnInit} from '@angular/core';
import {EventService} from "../../../../services/event.service";
import {EventType} from "../../../../state/event-type.enum";
import {ItemResponse} from "../../../../models/selection.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthStateService} from "../../../../services/auth.state.service";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit {

  private eventService: EventService = inject(EventService);

  private formBuilder: FormBuilder = inject(FormBuilder);

  public authStateService: AuthStateService = inject(AuthStateService);

  @Input()
  public item !: ItemResponse;

  public itemForm !: FormGroup;

  public ngOnInit(): void {
    if (this.item) {
      this.itemForm = this.formBuilder.group({
        report: this.formBuilder.control(this.item.report)
      });
    }
  }

  public handleCloseSelectionReport(): void {
    this.eventService.dispatchEvent({eventType: EventType.CLOSE_SELECTION_REPORT});
  }

  public handleUpdateSelectionItem(): void {
    this.item.report = this.itemForm.value.report;
    this.eventService.dispatchEvent({eventType: EventType.UPDATE_SELECTION_ITEM, payload: this.item});
  }
}
