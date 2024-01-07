import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { VoterDetailsComponent } from './pages/admin/voter/voter-details/voter-details.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminGuard } from './services/guard/admin.guard';
import { NormalGuard } from './services/guard/normal.guard';
import { ViewSingleVoterComponent } from './pages/admin/voter/view-single-voter/view-single-voter.component';
import { VoterValidationComponent } from './pages/admin/voter/voter-validation/voter-validation.component';
import { SingleVoterValidationComponent } from './pages/admin/voter/single-voter-validation/single-voter-validation.component';
import { ElectionListComponent } from './pages/admin/election/election-list/election-list.component';
import { NewElectionComponent } from './pages/admin/election/new-election/new-election.component';
import { UpdateElectionComponent } from './pages/admin/election/update-election/update-election.component';
import { CandidateListComponent } from './pages/admin/candidate/candidate-list/candidate-list.component';
import { NewCandidateComponent } from './pages/admin/candidate/new-candidate/new-candidate.component';
import { UpdateCandidateComponent } from './pages/admin/candidate/update-candidate/update-candidate.component';
import { ViewCandidateComponent } from './pages/admin/candidate/view-candidate/view-candidate.component';
import { VoterDashboardComponent } from './pages/voter/voter-dashboard/voter-dashboard.component';
import { VoterElectionComponent } from './pages/voter/voter-election/voter-election.component';
import { VoterHomeComponent } from './pages/voter/voter-home/voter-home.component';
import { VoterElectionPanelComponent } from './pages/voter/voter-election-panel/voter-election-panel.component';
import { ElectionResultComponent } from './pages/election-result/election-result.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path:'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path:'register',
    component: RegisterComponent,
    pathMatch: 'full',
  },
  {
    path:'admin',
    canActivate: [AdminGuard],
    component: HomeComponent,
    children: [

      {
        path: 'profile',
        component: ProfileComponent,
      },
      // voters
      {
        path: 'voterDetails',
        component: VoterDetailsComponent,
      },
      {
        path: 'voterDetails/voter/:email',
        component: ViewSingleVoterComponent,
      },
      {
        path: 'voterValidation',
        component: VoterValidationComponent,
      },
      {
        path: 'voterValidation/voter/:vid',
        component: SingleVoterValidationComponent,
      },
      // elections
      {
        path: 'elections',
        component: ElectionListComponent,
      },
      {
        path: 'elections/add',
        component: NewElectionComponent,
      },
      {
        path: 'elections/update/:eid',
        component: UpdateElectionComponent,
      },

      {
        path:'elections/result/:eid', 
        component: ElectionResultComponent
       },

      // candidates
      {
        path: 'candidates',
        component: CandidateListComponent,
      },
      {
        path: 'candidates/add',
        component: NewCandidateComponent,
      },
      {
        path: 'candidates/view/:cid',
        component: ViewCandidateComponent,
      },
      {
        path: 'candidates/update/:cid',
        component: UpdateCandidateComponent,
      },


    ]
  },
  {
    path:'voter',
    canActivate: [NormalGuard],
    component: VoterHomeComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path:'dashboard', 
        component: VoterDashboardComponent
       },
      {
       path:'elections', 
       component: VoterElectionComponent
      },
      {
        path:'elections/vote/:eid', 
        component: VoterElectionPanelComponent
       },
       {
        path:'elections/result/:eid', 
        component: ElectionResultComponent
       },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
