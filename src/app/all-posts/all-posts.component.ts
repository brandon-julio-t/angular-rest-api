import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UpdatePostComponent } from '../update-post/update-post.component';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
})
export class AllPostsComponent implements OnInit {
  posts: Post[] = [];

  constructor(
    private postService: PostService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.postService.getAll().subscribe((posts) => (this.posts = posts));
  }

  onSaved(post: Post): void {
    this.posts = [post, ...this.posts];
  }

  deletePost(id: number): void {
    this.postService.delete(id).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id);
      this.snackBar.open('Post deleted', 'Close', { duration: 4000 });
    });
  }

  updatePost(id: number): void {
    const post = this.posts.filter((p) => p.id === id)[0];
    const dialog = this.dialog.open(UpdatePostComponent, {
      data: {
        id,
        title: post.title,
        body: post.body,
      },
    });

    dialog.afterClosed().subscribe((updated) => {
      if (updated) {
        post.title = updated.title;
        post.body = updated.body;
        this.snackBar.open('Post updated', 'Close', { duration: 4000 });
      }
    });
  }
}
