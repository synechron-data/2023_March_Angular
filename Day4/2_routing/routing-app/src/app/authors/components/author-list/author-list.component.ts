import { Component, OnInit } from '@angular/core';
import { Author } from '../../models/author.interface';
import { AuthorsService } from '../../services/authors.service';
import { PubSubService } from '../../services/pub-sub.service';

@Component({
  selector: 'author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {
  list?: Array<Author>;
  selectedAuthor?: Author;

  constructor(private authorsService: AuthorsService, private pubSubService: PubSubService) { }

  ngOnInit(): void {
    this.list = this.authorsService.Authors;
  }

  selectAuthor(a: Author) {
    this.authorsService.SelectedAuthor = a;
    this.selectedAuthor = this.authorsService.SelectedAuthor;
    this.pubSubService.publish('selected-author-updated');
  }

  isSelected(a: Author) {
    return this.selectedAuthor === a;
  }
}
