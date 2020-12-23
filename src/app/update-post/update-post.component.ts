import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss'],
})
export class UpdatePostComponent implements OnInit {
  updateTodoForm: FormGroup;
  isSubmitting = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { id: number; title: string; body: string },
    private fb: FormBuilder,
    private postService: PostService,
    private dialog: MatDialogRef<UpdatePostComponent>
  ) {
    this.updateTodoForm = this.fb.group({
      title: [this.data.title, Validators.required],
      body: [this.data.body, Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const { title, body } = this.updateTodoForm.controls;
    if (title.invalid || body.invalid) {
      return;
    }

    this.isSubmitting = true;

    this.postService
      .update(this.data.id, title.value, body.value)
      .subscribe((post) => {
        this.isSubmitting = false;
        this.dialog.close(post);
      });
  }
}
