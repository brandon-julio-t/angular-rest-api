import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post?: Post;
  @Output() update = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  isSubmitting = false;

  constructor() {}

  ngOnInit(): void {}

  onUpdate(): void {
    const id = this.post?.id;
    this.update.emit(id);
  }

  onDelete(): void {
    this.isSubmitting = true;
    const id = this.post?.id;
    this.delete.emit(id);
  }
}
