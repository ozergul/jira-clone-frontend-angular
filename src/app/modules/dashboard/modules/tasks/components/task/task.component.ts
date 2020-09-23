import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import {
  AbstractCrudComponent,
  editorConfig,
  extractError,
  Lov,
  ModalService,
  Project,
  Task,
  TaskCreate,
  ToasterError,
  ToasterSuccess,
  UI,
  UIState,
  validateAllFormFields,
} from '@fe/shared';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Navigate } from '@ngxs/router-plugin';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { faAngleDoubleUp, faCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

@UntilDestroy()
@Component({
  selector: 'app-task',
  templateUrl: 'task.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ModalService],
})
export class TaskComponent extends AbstractCrudComponent implements OnInit {
  @Select(UIState.getCreateTaskConfig)
  createTaskConfig$: Observable<UI.CreateTaskConfig>;

  breadcrumbItems: UI.BreadcrumbItem[] = [
    {
      title: 'Tasks',
      routerLink: '/dashboard/tasks',
    },
    {
      title: 'New Task',
      routerLink: '/dashboard/tasks/new',
    },
  ];

  form: FormGroup;

  editorConfig = editorConfig;

  priorityItems: Lov[];
  types: Lov[];
  projects: Project[];

  iconMap = {
    Low: {
      icon: faCircle,
      color: '#57A55A',
    },
    Medium: {
      icon: faAngleDoubleUp,
      color: '#E97F33',
    },
    Urgent: {
      icon: faMinusCircle,
      color: '#CD1317',
    },
  } as {
    [key: string]: {
      icon: any;
      color: string;
    };
  };

  ngOnInit(): void {
    super.onInit();
    this.fillElements();

    this.form = this.fb.group({
      id: null,
      project: [null, Validators.required],
      priority: [null, Validators.required],
      type: [null, Validators.required],
      title: ['', Validators.required],
      description: [''],
      assignee: null,
      labels: null,
    });
  }

  crateTask(): void {
    if (this.form.invalid) {
      validateAllFormFields(this.form);
      return;
    }

    const { id, ...formValue } = this.form.value as Partial<Task>;

    this.store.dispatch(new TaskCreate(formValue)).subscribe({
      next: _ =>
        this.store.dispatch([new ToasterSuccess('New task successfully created.'), new Navigate(['/dashboard/tasks'])]),
      error: err => this.store.dispatch(new ToasterError(extractError(err))),
    });
  }

  private fillElements(): void {
    this.createTaskConfig$.pipe(untilDestroyed(this)).subscribe(createTaskConfig => {
      this.priorityItems = createTaskConfig.priorities;
      this.types = createTaskConfig.types;
      this.projects = createTaskConfig.projects;
    });
  }
}
