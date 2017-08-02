var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

$(document).ready(function() {
	
});

function setDate(){
	d = new Date()
	if (m != d.getMinutes()) {
		m = d.getMinutes();
		$('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
	}
}

$('.message-submit').click(function() {
  	//insertMessage();
});

$(window).on('keydown', function(e) {
	if (e.which == 13) {
		//insertMessage();
		return false;
	}
})