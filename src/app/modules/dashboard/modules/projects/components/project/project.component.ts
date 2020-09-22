import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import {
  AbstractCrudComponent,
  CreateProjectDto,
  extractError,
  ModalService,
  Project,
  ProjectComplete,
  ProjectCreate,
  ProjectDelete,
  ProjectState,
  ProjectUpdate,
  ToasterError,
  ToasterSuccess,
  UI,
  UpdateProjectDto,
} from '@fe/shared';
import { Navigate } from '@ngxs/router-plugin';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-project',
  templateUrl: 'project.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ModalService],
})
export class ProjectComponent extends AbstractCrudComponent implements OnInit {
  @Select(ProjectState.getProject)
  project$: Observable<Project>;

  project: Project;

  breadcrumbItems: UI.BreadcrumbItem[] = [
    {
      title: 'Projects',
      routerLink: '/dashboard/projects',
    },
    {
      title: 'New Project',
      routerLink: '/dashboard/project/new',
    },
  ];

  form: FormGroup;

  ngOnInit(): void {
    super.onInit();

    this.form = this.fb.group({
      id: [null],
      code: [null, Validators.required],
      title: [null, Validators.required],
      description: [null],
    });

    if (this.isEdit) {
      this.project$.pipe(untilDestroyed(this)).subscribe(project => {
        this.project = project;

        const { id, code, title, description } = project;

        this.breadcrumbItems = this.breadcrumbItems.slice(0, -1);
        this.breadcrumbItems = [
          ...this.breadcrumbItems,
          {
            title: `Edit ${code} Project`,
            routerLink: '/dashboard/project/new',
          },
        ];

        this.form.patchValue({ id, code, title, description });
      });
    }
  }

  createProject(): void {
    const { id, ...formValue } = this.form.value;
    this.store.dispatch(new ProjectCreate(formValue as CreateProjectDto)).subscribe({
      next: _ =>
        this.store.dispatch([
          new ToasterSuccess('New project successfully created.'),
          new Navigate(['/dashboard/projects']),
        ]),
      error: err => this.store.dispatch(new ToasterError(extractError(err))),
    });
  }

  updateProject(): void {
    this.store.dispatch(new ProjectUpdate(this.form.value as UpdateProjectDto)).subscribe({
      next: _ => this.store.dispatch([new ToasterSuccess('Project saved.'), new Navigate(['/dashboard/projects'])]),
      error: err => this.store.dispatch(new ToasterError(extractError(err))),
    });
  }

  completeProject(): void {
    this.modalService.confirm('Are you sure to complete?', 'This action is cannot be undone.').subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new ProjectComplete(this.project.id)).subscribe({
          next: _ => this.store.dispatch(new ToasterSuccess('Project completed.')),
          error: err => this.store.dispatch(new ToasterError(extractError(err))),
        });
      }
    });
  }
  deleteProject(): void {
    this.modalService.confirm('Are you sure to delete?', 'This action is cannot be undone.').subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new ProjectDelete(this.project.id)).subscribe({
          next: _ =>
            this.store.dispatch([new ToasterSuccess('Project deleted.'), new Navigate(['/dashboard/projects'])]),
          error: err => this.store.dispatch(new ToasterError(extractError(err))),
        });
      }
    });
  }
}
