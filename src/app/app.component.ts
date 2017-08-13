import { Component, OnInit } from '@angular/core';
import { ConversationService } from './services/conversation.service';

declare var $:any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	// styleUrls: ['./app.component.css'],
	providers: [ ConversationService ]
})

export class AppComponent implements OnInit {
    conversation : any[];

	constructor(private _conversationService: ConversationService) {}
	//watson conversation here
	ngOnInit() {
		this.conversation = [];
		
		this._conversationService.startFaqConversation()
                .subscribe(chat => {
					//Set the conversation chat to the response
					//this.chat_flow_convo = chat;

					//update conversation ui, params -- class, message, no_of_load_secs
					// var start_message = this.chat_flow_convo.start_message.question;
					// var next_message_params = this.chat_flow_convo.start_message.answer;

					// for(var i = 0; i < start_message.length; i++) {
					// 	this.updateConversationUi(start_message[i], "otto", "new", "", next_message_params);
					// }

					this.scrollToFaqBottom();
                })
		
	}
			
	scrollToFaqBottom() {

	}

}
