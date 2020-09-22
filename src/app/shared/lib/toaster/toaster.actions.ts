export class ToasterSuccess {
  static readonly type = '[ToasterSuccess] Toaster Success';
  constructor(public message: string) {}
}

export class ToasterError {
  static readonly type = '[ToasterError] Toaster Error';
  constructor(public message = 'Error occurred.') {}
}

export class ToasterInfo {
  static readonly type = '[ToasterInfo] Toaster Info';
  constructor(public message: string) {}
}
