import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Plan} from '../../models/plan';
import {PlansService} from '../../services/plans.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-plans',
    templateUrl: './plans.component.html',
    styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
    title = 'Planes';
    formTitle = 'Nuevo plan';
    plans: Plan[];
    newPlanForm: FormGroup;
    p = 1;
    protected filter = '';
    showForm = false;


    constructor(private planService: PlansService,
                private fb: FormBuilder,
                private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        try {
            this.planService.getAllPlans().subscribe({
                next: (plans) => {
                    this.plans = plans;
                }
            });
        } catch (error) {
            alert(error);
        }
        this.newPlanForm = this.fb.group({
            planId: [null],
            planName: ['', Validators.required],
            price: [0, Validators.required],
            description: ['', Validators.required],
            numDays: [0, Validators.required]
        });
    }

    showNewPlanForm() {
        this.showForm = true;
        console.log(this.showForm);
    }

    cancel() {
        this.showForm = false;
        this.formTitle = 'Nuevo plan';
        this.resetForm();
    }

    resetForm() {
        this.newPlanForm.reset({
                planId: null,
                planName: '',
                price: null,
                description: '',
                numDays: null
            }
        );
    }

    addOrUpdatePlan() {
        if (this.newPlanForm.value.planId) {
            this.updatePlan(this.newPlanForm.value);
            const index = this.plans.findIndex((p) => p.planId === this.newPlanForm.value.planId);
            this.plans[index] = this.newPlanForm.value;
            this.cancel();
        } else {
            this.planService.createPlan(this.newPlanForm.value).subscribe({
                next: (plan) => {
                    this.plans.push(plan);
                    this.resetForm();
                    this.snackBar.open('Plan creado exitosamente', 'Cerrar', {
                        duration: 2000
                    });
                    this.cancel();
                },
                error: err => {
                    this.snackBar.open('Error al crear el plan', '', {
                        duration: 2000
                    });
                }
            });
        }

    }

    loadPlanToUpdate(plan: Plan): void {
        this.formTitle = 'Editar plan';
        this.showNewPlanForm();
        this.newPlanForm.setValue({
            planId: plan.planId,
            planName: plan.planName,
            price: plan.price,
            description: plan.description,
            numDays: plan.numDays,
        });
    }

    updatePlan(plan: Plan) {
        this.planService.updatePlan(plan, plan.planId).subscribe({
            next: () => {
                this.snackBar.open('Plan actualizado exitosamente', '', {
                    duration: 2000
                });
            },
            error: err => {
                this.snackBar.open('Error al actualizar el plan', '', {
                    duration: 2000
                });
            }
        });
    }

    deletePlan(planId: any) {
        if (confirm('¿Está seguro que desea eliminar el plan?')) {
            this.planService.deletePlan(planId).subscribe({
                next: () => {
                    this.plans = this.plans.filter(plan => plan.planId !== planId);
                    this.snackBar.open('Plan eliminado exitosamente', '', {
                        duration: 2000
                    });
                },
                error: err => {
                    this.snackBar.open('Error al eliminar el plan', '', {
                        duration: 2000
                    });
                }
            });
        }

    }
}
