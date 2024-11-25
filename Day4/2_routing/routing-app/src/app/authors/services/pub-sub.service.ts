import { Observable, Subject } from "rxjs";

export class PubSubService {
    private subjects: { [key: string]: Subject<any> } = {};

    publish(eventName: string) {
        this.subjects[eventName] = this.subjects[eventName] || new Subject<string>();
        this.subjects[eventName].next(null);
    }

    on(eventName: string): Observable<any> {
        this.subjects[eventName] = this.subjects[eventName] || new Subject<string>();
        return this.subjects[eventName].asObservable();
    }
}