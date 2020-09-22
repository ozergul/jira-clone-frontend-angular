import { Injectable } from '@angular/core';

export const TOKEN = 'jwtToken';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  getToken(): string {
    return window.localStorage.getItem(TOKEN);
  }

  saveToken(token: string) {
    window.localStorage.setItem(TOKEN, token);
  }

  destroyToken(): void {
    window.localStorage.removeItem(TOKEN);
  }
}
