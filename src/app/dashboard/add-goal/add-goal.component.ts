import { AddGoalService } from './add-goal.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { DashboardService } from './../dashboard.service';

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.scss']
})
export class AddGoalComponent implements OnInit {

  addGoalForm: FormGroup;
  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.addGoalForm.get('formArray'); }

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    public addGoalService: AddGoalService
  ) { }

  ngOnInit() {
    this.addGoalForm = this.fb.group({
      formArray: this.fb.array([
        this.fb.group({
          calories: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
        }),
        this.fb.group({
          protein: ['', [Validators.pattern(/^\d+$/)]],
          carbs: ['', [Validators.pattern(/^\d+$/)]],
          fat: ['', [Validators.pattern(/^\d+$/)]]
        })
      ])
    });
  }

  onSubmit(form: FormGroup) {
    if (!form.valid) {
      return;
    }

    const dailyGoal = {
      calories: form.value.calories,
      protein: form.value.protein,
      carbs: form.value.carbs,
      fat: form.value.fat
    };

    this.dashboardService.setDailyGoal(dailyGoal)
      .subscribe((data: any) => {
        if (data.success) {

        } else {
          alert('Something went wrong.');
        }
      });
  }
}