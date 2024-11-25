import { Observable, Subject } from "rxjs";
import { Author } from "../models/author.interface";

export class AuthorsService {
    private _list: Array<Author>;
    private _selectedAuthor?: Author;

    constructor() {
        console.log("Authors Service Object Created...");

        var fowler = {
            name: "Fowler",
            quote: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand."
        },
            twain = {
                name: "Twain",
                quote: "Why, I have known clergymen, good men, kind-hearted, liberal, sincere, and all that, who did not know the meaning of a 'flush.' It is enough to make one ashamed of one's species."
            },
            poe = {
                name: "Poe",
                quote: "Deep into that darkness peering, long I stood there, wondering, fearing, doubting, dreaming dreams no mortal ever dared to dream before."
            },
            plato = {
                name: "Plato",
                quote: "All things will be produced in superior quantity and quality, and with greater ease, when each man works at a single occupation, in accordance with his natural gifts, and at the right moment, without meddling with anything else. "
            };

        this._list = [twain, fowler, poe, plato];
    }

    get Authors() {
        return this._list;
    }

    set SelectedAuthor(value: Author | undefined) {
        this._selectedAuthor = value;
    }

    get SelectedAuthor(): Author | undefined {
        return this._selectedAuthor;
    }
}