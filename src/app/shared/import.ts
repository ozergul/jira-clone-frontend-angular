import * as _abstracts from './abstracts';
import * as _components from './components';
import * as _directives from './directives';
import * as _pipes from './pipes';

export const COMPONENTS = [
  // ABSTRACTS
  _abstracts.AbstractNgModelComponent,
  _abstracts.AbstractCrudComponent,

  // CORE
  _components.DummyComponent,

  // ATOMS
  _components.AtomsInputComponent,
  _components.AtomsCheckboxComponent,
  _components.AtomsTextareaComponent,
  _components.AtomsTaskIconComponent,

  // MOLECULES
  _components.MoleculesBreadcrumbComponent,
  _components.MoleculesSelect,

  // TEMPLATES
  _components.TemplatesHeaderComponent,
  _components.TemplatesFooterComponent,
  _components.TemplatesCrudWrapper,

  // MODALS
  _components.ConfirmationModalComponent,

  //LAYOUTS
  _components.LayoutDefaultComponent,
];

export const DIRECTIVES = [_directives.ClickOutsideDirective, _directives.ErrorMessagesDirective];

export const PIPES = [_pipes.MemoizePipe];
