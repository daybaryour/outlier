import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ConversationService {
    constructor(private _http:Http) {
    }

    startConversation() {
        return this._http.get('../assets/data/chat.json')
            .map(res => res.json())
    }
}