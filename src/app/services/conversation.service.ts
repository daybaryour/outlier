import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ConversationService {
    headers;
    options;

    constructor(private _http:Http) {
        this.headers = new Headers();
        this.headers.append('Authorization', 'Basic ' + btoa('username:password'));
        this.headers.append("Access-Control-Allow-Credentials", "true");
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.options = new RequestOptions();
        this.options = new RequestOptions({ headers: new Headers(this.headers) });
    }

    startConversation() {
        return this._http.get('../assets/data/chat.json')
            .map(res => res.json())
    }

    startFaqConversation() {
        return this._http.get('/api/v1/conversation')
            .map(res => res.json());
    }

    callConversationService() {
        this._http.get('/api/v1/conversation')
            .map(res => res.json());
    }
}