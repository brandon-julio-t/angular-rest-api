import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  todoForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private snackBar: MatSnackBar
  ) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const { title, body } = this.todoForm.controls;
    if (title.invalid || body.invalid) {
      return;
    }

    this.isSubmitting = true;

    this.postService.save(title.value, body.value).subscribe(() => {
      this.snackBar.open('Post saved', 'Close', { duration: 4000 });
      this.todoForm.reset();
      this.isSubmitting = false;
    });
  }
}
