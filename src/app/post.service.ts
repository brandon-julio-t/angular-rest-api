import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Post } from './post';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private authService: AuthService, private http: HttpClient) {}

  getAll(): Observable<Post[]> {
    const user = this.authService.user();
    return this.http
      .get<Post[]>(
        `https://jsonplaceholder.typicode.com/users/${user?.id}/posts`
      )
      .pipe(retry(3));
  }

  save(title: string, body: string): Observable<Post> {
    const user = this.authService.user();

    const userId = user?.id;

    return this.http
      .post<Post>('https://jsonplaceholder.typicode.com/posts', {
        title,
        body,
        userId,
      })
      .pipe(retry(3));
  }

  update(id: number, title: string, body: string): Observable<any> {
    return this.http
      .put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        id,
        title,
        body,
      })
      .pipe(retry(3));
  }

  delete(id: number | undefined): Observable<any> {
    return this.http
      .delete<any>(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .pipe(retry(3));
  }
}
