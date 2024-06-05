import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Project} from "../../../../../models/project.model";
import {EventService} from "../../../../../services/event.service";
import {EventType} from "../../../../../state/event-type.enum";

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent implements OnInit{

  private eventService : EventService = inject(EventService);
  private formBuilder : FormBuilder = inject(FormBuilder);

  public projectForm !: FormGroup;

  public ngOnInit() : void {
    this.projectForm = this.formBuilder.group({
      title : this.formBuilder.control(null),
      shortDescription : this.formBuilder.control(null),
      longDescription : this.formBuilder.control(null),
      resource : this.formBuilder.control(null)
    });
  }

  public handleAddProject() : void {
    let project : Project = this.projectForm.value;
    this.eventService.publishEvent({eventType : EventType.ADD_PROJECT, payload : project});
  }

  public handleCloseAddProject() : void {
    this.eventService.publishEvent({eventType : EventType.CLOSE_ADD_PROJECT});
  }

}
