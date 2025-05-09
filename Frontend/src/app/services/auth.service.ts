import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:5092/api/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http
      .post(`${this.api}/login`, { username, password }, { withCredentials: true })
      .pipe(tap(() => { /* maybe emit logged‑in event */ }));
  }

  register(dto: any) {
    return this.http.post(`${this.api}/register`, dto, { withCredentials: true });
  }

  logout() {
    return this.http.post(`${this.api}/logout`, {}, { withCredentials: true });
  }

  /** Ping endpoint to check cookie */
  ping() {
    return this.http.get(`${this.api}/ping`, { withCredentials: true });
  }
}
