import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {EventService} from "../../../../services/event.service";
import {Project} from "../../../../models/project.model";
import {EventType} from "../../../../state/event-type.enum";
import {Store} from "../../../../state/store.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit, OnDestroy{

  private store : Store = inject(Store);
  private eventService : EventService = inject(EventService);
  private stateSubscription !: Subscription;

  @Input()
  public projects !: Array<Project>;

  public openAddProject : boolean = false;
  public openEditProject : boolean = false;

  public selectedProject !: Project;

  public ngOnInit() : void {
    this.stateSubscription = this.store.state$.subscribe(
      (state : any) => {
        this.openAddProject = state.projectsState?.openAddProject;
        this.openEditProject = state.projectsState?.openEditProject;
        this.selectedProject = state.projectsState?.selectedProject;
      }
    );
  }

  public handleOpenAddProject() : void {
    this.eventService.dispatchEvent({eventType : EventType.OPEN_ADD_PROJECT})
  }

  public ngOnDestroy() : void {
    if(this.stateSubscription)
      this.stateSubscription.unsubscribe();
  }
}
