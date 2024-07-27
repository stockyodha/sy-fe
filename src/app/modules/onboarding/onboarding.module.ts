// Onboarding module

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardingComponent } from './onboarding.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: OnboardingComponent
  }
];

@NgModule({
  declarations: [OnboardingComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingModule { }
// Path: src/app/modules/onboarding/onboarding-routing.module.ts
