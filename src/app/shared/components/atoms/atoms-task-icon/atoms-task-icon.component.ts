import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { LovType } from '../../../enums';
import { IconMap, priorityIconMap, typeIconMap } from '../../../constants';
import { Lov } from '../../../models';

@Component({
  selector: 'atoms-task-icon',
  template: `
    <fa-icon
      *ngIf="iconMap && iconMap[lov.value]?.icon"
      [styles]="{ color: iconMap[lov.value]?.color }"
      [icon]="iconMap[lov.value]?.icon"
    ></fa-icon>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtomsTaskIconComponent implements OnInit {
  @Input()
  lovType: LovType;

  @Input()
  lov: Lov;

  iconMap: IconMap = null;

  ngOnInit() {
    if (this.lovType === LovType.TASK_PRIORITY) {
      this.iconMap = priorityIconMap;
    } else if (this.lovType === LovType.TASK_TYPE) {
      this.iconMap = typeIconMap;
    }
  }
}
