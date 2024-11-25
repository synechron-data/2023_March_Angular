import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Author } from '../../models/author.interface';
import { AuthorsService } from '../../services/authors.service';
import { PubSubService } from '../../services/pub-sub.service';

@Component({
  selector: 'author-quote',
  templateUrl: './author-quote.component.html',
  styleUrls: ['./author-quote.component.css']
})
export class AuthorQuoteComponent implements OnInit, OnDestroy {
  selectedAuthor?: Author;
  sau_sub?: Subscription;

  constructor(private authorsService: AuthorsService, private pubSubService: PubSubService) { }

  ngOnInit(): void {
    this.sau_sub = this.pubSubService.on('selected-author-updated').subscribe(() => {
      this.selectedAuthor = this.authorsService.SelectedAuthor;
    });
  }

  ngOnDestroy(): void {
    this.sau_sub?.unsubscribe();
  }
}
