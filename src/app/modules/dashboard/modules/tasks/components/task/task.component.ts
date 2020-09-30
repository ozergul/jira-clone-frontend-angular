import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import {
  AbstractCrudComponent,
  AuthState,
  BreadcrumbItem,
  CreateTaskConfig,
  CreateTaskDto,
  editorConfig,
  extractError,
  Lov,
  LovType,
  ModalService,
  Project,
  Task,
  TaskCreate,
  TaskState,
  TaskUpdate,
  ToasterError,
  ToasterSuccess,
  UIState,
  UpdateTaskDto,
  User,
  UserInfo,
} from '@fe/shared';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Navigate } from '@ngxs/router-plugin';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

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
  createTaskConfig$: Observable<CreateTaskConfig>;

  @Select(TaskState.getTask)
  task$: Observable<Task>;

  @Select(AuthState.getCurrentUser)
  currentUser$: Observable<User>;

  task: Task;

  breadcrumbItems: BreadcrumbItem[] = [
    {
      title: 'Tasks',
      routerLink: '/dashboard/tasks',
    },
    {
      title: 'New Task',
      routerLink: '/dashboard/tasks/new',
    },
  ];

  editorConfig = editorConfig;

  priorityItems: Lov[];
  types: Lov[];
  projects: Project[];
  users: UserInfo[];

  LovType = LovType;

  isEditFields = {
    description: true,
    title: true,
  };

  faPen = faPen;

  ngOnInit(): void {
    super.onInit();
    this.fillElements();
    this.buildForm();
    this.editProcess();
  }

  crateTask(): void {
    if (this.validateForm()) {
      return;
    }

    const formValue = this.form.value as CreateTaskDto;

    this.store.dispatch(new TaskCreate(formValue)).subscribe({
      next: _ =>
        this.store.dispatch([new ToasterSuccess('New task successfully created.'), new Navigate(['/dashboard/tasks'])]),
      error: err => this.store.dispatch(new ToasterError(extractError(err))),
    });
  }

  updateTask(): void {
    if (this.validateForm()) {
      return;
    }

    const formValue = this.form.value as UpdateTaskDto;

    this.store.dispatch(new TaskUpdate(formValue)).subscribe({
      next: _ =>
        this.store.dispatch([new ToasterSuccess('Task successfully updated.'), new Navigate(['/dashboard/tasks'])]),
      error: err => this.store.dispatch(new ToasterError(extractError(err))),
    });
  }

  assignToMe(): void {
    this.currentUser$.pipe(take(1)).subscribe(currentUser =>
      this.form.patchValue({
        assigneeId: currentUser.id,
      }),
    );
  }

  editField(field: string, value = true): void {
    this.isEditFields[field] = value;
  }

  private buildForm(): void {
    this.form = this.fb.group({
      id: null,
      projectId: [null, Validators.required],
      priorityId: [null, Validators.required],
      typeId: [null, Validators.required],
      title: ['', Validators.required],
      description: [''],
      assigneeId: [null, Validators.required],
      taskId: null,
    });

    if (!this.projects.length) {
      this.form.disable({ emitEvent: true });
    }
  }

  private fillElements(): void {
    this.createTaskConfig$.pipe(untilDestroyed(this)).subscribe(createTaskConfig => {
      this.priorityItems = createTaskConfig.priorities;
      this.types = createTaskConfig.types;
      this.projects = createTaskConfig.projects;
      this.users = createTaskConfig.users;
    });
  }

  private editProcess(): void {
    if (this.isEdit) {
      this.task$.pipe(untilDestroyed(this)).subscribe(task => {
        this.task = task;

        const id = task.id;
        const taskId = task.taskId;
        const typeId = task.type.id;
        const priorityId = task.priority.id;
        const projectId = task.projectId;
        const title = task.title;
        const description = task.description;
        const assigneeId = task.assigneeId;

        this.breadcrumbItems = this.breadcrumbItems.slice(0, -1);
        this.breadcrumbItems = [
          ...this.breadcrumbItems,
          {
            title: taskId,
            routerLink: '',
          },
        ];

        this.form.patchValue({
          id,
          taskId,
          typeId,
          priorityId,
          projectId,
          title,
          description,
          assigneeId,
        });
      });

      this.isEditFields.description = false;
      this.isEditFields.title = false;
    }
  }
}
