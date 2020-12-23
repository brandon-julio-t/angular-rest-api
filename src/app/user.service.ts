import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';
import { concatAll, first, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
      .pipe(retry(3));
  }

  getUserByEmail(email: string): Observable<User | undefined> {
    return this.getAll().pipe(
      concatAll(),
      first((u) => u.email === email)
    );
  }
}
