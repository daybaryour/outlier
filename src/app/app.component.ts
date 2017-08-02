import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ConversationService } from './services/conversation.service';

declare var $:any;
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	// styleUrls: ['./app.component.css'],
	providers: [ConversationService]
})

export class AppComponent implements OnInit{
	conversation : any[];
	ChangeVariables: any;
	parsed_convo:any = [];
	chat_flow_convo:any = [];
	userParams:any = [];
	answerParams:any = [];
    FormVariables = false;
    ButtonVariables = false;
    TextVariables = false;
    ExtraParams = false;
	ResponseMessage = false;
	
	constructor(private _conversationService: ConversationService) {
        
    }

	ngOnInit() {
        this.ChangeVariables = false;
		this.conversation = [];
		
		this._conversationService.startConversation()
                .subscribe(chat => {
					//Set the conversation chat to the response
					this.chat_flow_convo = chat;

					//update conversation ui, params -- class, message, no_of_load_secs
					var start_message = this.chat_flow_convo.start_message.question;
					var next_message_params = this.chat_flow_convo.start_message.answer;

					for(var i = 0; i < start_message.length; i++) {
						this.updateConversationUi(start_message[i], "otto", "new", "", next_message_params);
					}

					this.scrollToBottom();
                })
		
	}

	process_next_message(next_message) {
		var next_message_details = this.chat_flow_convo[next_message].question;
		var next_message_params = this.chat_flow_convo[next_message].answer;

		if(next_message_details.length == 1) {
			this.updateConversationUi(next_message_details[0], "otto", "new", "", next_message_params);			
		} else {
			var i = 0;
			var startInterval = setInterval(() => {	
				this.updateConversationUi(next_message_details[i], "otto", "new", "", next_message_params);
				i++;

				if(i == next_message_details.length) {
					clearInterval(startInterval)
				}
			}, 1200);
			
		}
		
	}

	updateConversationUi(message, sender, class_name, action, params) {
		//display the conversation content
		var curr_time:string = this.getSystemTime();

		//personalize text where neccesary
		message = this.processOutputMessage(message)

        if(this.parsed_convo == null) {
        } else {    
            var conversation_length = this.parsed_convo.length;
        }

        var curr_convo = {message:message, time:curr_time, sender: sender, class:class_name, action:action, params:params}
        
		this.conversation.push(curr_convo);
        if(typeof(Storage) !== "undefined") {
            localStorage.setItem('curr_convo', JSON.stringify(this.conversation));

			var retrieved_convo = localStorage.getItem('curr_convo');
			this.parsed_convo = JSON.parse(retrieved_convo);
			this.parseConversationUi(params);
			
        } else {
            
		}
		
		//handle what shows next
        this.scrollToBottom(); 
	}

	parseConversationUi(answers) {
		this.ButtonVariables = false;
		this.TextVariables = false;

		var message_type = answers.type;
		var message_next = answers.next;

		switch(message_type) {
			case 'button':
				this.ButtonVariables = true;
				this.answerParams = answers;
			
			break;

			case 'text':
				this.TextVariables = true;
			break;

			default:
			break;
		}
	}

	sendConversationMessage(message, next_message = false) {
		if(String(next_message) == 'move_to_login') {
			window.location.href = "/page3.html";
		}
		if(message != "") {
			to_save = false;
			if(next_message == false) {
				var length = this.conversation.length;
				var params = this.conversation[length - 1].params.next[0];

				var to_save = this.conversation[length - 1].params;
				next_message = params;
			} else {
				var convo_length = this.parsed_convo.length;

				var is_to_save = this.parsed_convo[convo_length - 1].params.to_save;
				if(is_to_save != false) {
					to_save  = this.parsed_convo[convo_length - 1].params;
				}
			}

			//save neccesary params as required
			if(to_save != false) {
				//save the value entered
				var toSave = to_save.to_save;
				var saveValue = message;
				this.userParams[toSave] =  saveValue;
				
				console.log(this.userParams);
			} 

			var result:any;
			this.TextVariables = false;
			this.ButtonVariables = false;
			
		
			var newMessage = { message : message, sender : "user", class:"personal", action: next_message };
			this.updateConversationUi(message, "user", "personal", "", next_message);

			$('#chat-input').val(null);

			this.addLoadingMessage();
			setTimeout(() => {
				this.removeLoadingMessage();
				this.process_next_message(next_message);
			}, 2000);
		}
		
	}

	getSystemTime() {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? minutes : minutes;
        var sysTime = hours + ':' + minutes + ' ' + ampm;

        return sysTime;
	}
	
	scrollToBottom() {
        $(".messages").animate({ scrollTop: $('.messages').prop("scrollHeight")}, "slow");
	}
	
	addLoadingMessage() {
		this.updateConversationUi("", "user", "loading", "", "");
	}

	removeLoadingMessage() {
		var loadingMessage = this.parsed_convo;
		this.conversation.pop();
	}

	processOutputMessage(message) {
		message = message.replace("<firstname></firstname>", this.userParams.firstname);
		message = message.replace("<lastname></lastname>", this.userParams.lastname);
		message = message.replace("<email></email>", this.userParams.email);
		message = message.replace("<password></password>", this.userParams.password);

		message = message.split("_gda_");
		return message;
	}
}
