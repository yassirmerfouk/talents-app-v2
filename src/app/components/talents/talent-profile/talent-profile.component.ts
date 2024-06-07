import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Talent, TalentRequest} from "../../../models/talent.model";
import {EventService} from "../../../services/event.service";
import {EventType} from "../../../state/event-type.enum";
import {CertificationService} from "../../../services/certification.service";
import {Certification} from "../../../models/certification.model";
import {UserService} from "../../../services/user.service";
import {Store} from "../../../state/store.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-talent-profile',
  templateUrl: './talent-profile.component.html',
  styleUrl: './talent-profile.component.css'
})
export class TalentProfileComponent implements OnInit, OnDestroy {

  private store: Store = inject(Store);
  private eventService: EventService = inject(EventService);
  private stateSubscription !: Subscription;

  private userService: UserService = inject(UserService);
  private certificationService: CertificationService = inject(CertificationService);

  private formBuilder: FormBuilder = inject(FormBuilder);

  public talent !: Talent;
  public talentForm !: FormGroup;
  public imageForm !: FormGroup;

  private image !: File;

  public ngOnInit(): void {

    this.stateSubscription = this.store.state$.subscribe(
      (state: any) => {
        this.talent = state.talentState.talent;
        if (this.talent) {
          this.talentForm = this.formBuilder.group({
            lastName: this.formBuilder.control(this.talent.lastName),
            firstName: this.formBuilder.control(this.talent.firstName),
            email: this.formBuilder.control(this.talent.email),
            phone: this.formBuilder.control(this.talent.phone),
            title: this.formBuilder.control(this.talent.title),
            summary: this.formBuilder.control(this.talent.summary),
            dateOfBirth: this.formBuilder.control(this.talent.dateOfBirth),
            city: this.formBuilder.control(this.talent.city),
            address: this.formBuilder.control(this.talent.address),
          });
          this.imageForm = this.formBuilder.group({
            image: this.formBuilder.control(null)
          });
        }
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

  public handleUpdateProfile(): void {
    let talentRequest: TalentRequest = this.talentForm.value;
    this.eventService.dispatchEvent({eventType: EventType.UPDATE_TALENT_PROFILE, payload: talentRequest})
  }

  public handleAskForVerification(): void {
    this.eventService.dispatchEvent({eventType: EventType.ASK_VERIFICATION, payload: this.talent});
  }

  private updateImage(): void {
    this.userService.updateImage(this.image).subscribe({
      next: (image: any) => {
        this.talent.image = image;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  public addCertification(certification: Certification): void {
    this.certificationService.addCertification(certification).subscribe({
      next: (certification: Certification) => {
        this.talent.certifications.push(certification);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  public updateCertification(certification: Certification): void {
    this.certificationService.updateCertification(certification).subscribe({
      next: (certification: Certification) => {
        this.talent.certifications = this.talent.certifications.map((cert: Certification) => {
          if (cert.id == certification.id) cert = certification;
          return cert;
        });
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  public deleteCertification(id: number): void {
    this.certificationService.deleteCertification(id).subscribe({
      next: () => this.talent.certifications = this.talent.certifications.filter((certification: Certification) => certification.id != id),
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }


  public handleUpdateImage(): void {
    this.eventService.publishEvent({eventType: EventType.UPDATE_IMAGE});
  }


  public ngOnDestroy(): void {
    if (this.stateSubscription)
      this.stateSubscription.unsubscribe();
  }
}
