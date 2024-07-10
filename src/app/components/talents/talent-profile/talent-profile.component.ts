import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Talent} from "../../../models/talent.model";
import {EventService} from "../../../services/event.service";
import {EventType} from "../../../state/event-type.enum";
import {Store} from "../../../state/store.service";
import {Subscription} from "rxjs";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-talent-profile',
  templateUrl: './talent-profile.component.html',
  styleUrl: './talent-profile.component.css'
})
export class TalentProfileComponent implements OnInit, OnDestroy {

  private store: Store = inject(Store);
  private eventService: EventService = inject(EventService);
  private stateSubscription !: Subscription;

  private authService : AuthService = inject(AuthService);

  private formBuilder: FormBuilder = inject(FormBuilder);

  public talent !: Talent;
  public imageForm !: FormGroup;

  private image !: File;

  public profileCompletion : number = 0;

  public openUpdateInfos : boolean = false;

  public ngOnInit(): void {

    this.stateSubscription = this.store.state$.subscribe(
      (state: any) => {

        this.talent = state.talentState?.talent;
        let image = state.profileImage;

        if (this.talent) {
          this.imageForm = this.formBuilder.group({
            image: this.formBuilder.control(null)
          });
          this.authService.getProfileCompletion().subscribe({
            next : (score : number) => this.profileCompletion = score
          });
        }

        if(image)
          this.talent.image = image;

        this.openUpdateInfos = state.talentState?.openUpdateInfos;

      }
    );

    this.getTalentProfile();

  }

  private getTalentProfile(): void {
    this.eventService.dispatchEvent({eventType: EventType.GET_TALENT_PROFILE});
  }

  public handleSelectImage($event: any): void {
    this.image = $event.target.files.item(0);
  }

  public handleAskForVerification(): void {
    this.eventService.dispatchEvent({eventType: EventType.ASK_VERIFICATION, payload: this.talent});
  }

  public handleUpdateImage(): void {
    this.eventService.dispatchEvent({eventType: EventType.UPDATE_IMAGE, payload : this.image});
  }

  public handleOpenUpdateTalentProfile() : void {
    this.eventService.dispatchEvent({eventType : EventType.OPEN_UPDATE_TALENT_PROFILE});
  }


  public ngOnDestroy(): void {
    if (this.stateSubscription)
      this.stateSubscription.unsubscribe();
  }
}
