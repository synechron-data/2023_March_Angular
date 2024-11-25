import { Component, OnInit } from '@angular/core';
import { AuthorsService } from '../../services/authors.service';
import { PubSubService } from '../../services/pub-sub.service';

@Component({
  selector: 'author-root',
  templateUrl: './author-root.component.html',
  styleUrls: ['./author-root.component.css'],
  providers: [AuthorsService, PubSubService]
})
export class AuthorRootComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
