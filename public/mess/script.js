$(document).ready(function(){
		/* make side menu show up */
    $(".trigger").click(function(){
        $(".overlay, .menuWrap").fadeIn(180);
				$(".menu").animate({opacity: '1', left: '0px'}, 180);
			
    });
		
		/* make config menu show up */
		$(".settings").click(function(){
				$(".config").animate({opacity: '1', right: '0px'}, 180);
			/* hide others */
				$(".menuWrap").fadeOut(180);
				$(".menu").animate({opacity: '0', left: '-320px'}, 180);
    });
	
		// Show/Hide the other notification options
		$(".deskNotif").click(function(){
        $(".showSName, .showPreview, .playSounds").toggle();
    });
	
		/* close all overlay elements */
		$(".overlay").click(function () {
				$(".overlay, .menuWrap").fadeOut(180);
        $(".menu").animate({opacity: '0', left: '-320px'}, 180);
				$(".config").animate({opacity: '0', right: '-200vw'}, 180);
    });
		
		//This also hide everything, but when people press ESC
		$(document).keydown(function(e) {
			 if (e.keyCode == 27) {
				$(".overlay, .menuWrap").fadeOut(180);
        $(".menu").animate({opacity: '0', left: '-320px'}, 180);
				$(".config").animate({opacity: '0', right: '-200vw'}, 180);
			}
	});
	
	/* small conversation menu */
		$(".otherOptions").click(function(){
			$(".moreMenu").slideToggle("fast");
		});
	
	/* clicking the search button from the conversation focus the search bar outside it, as on desktop */
	$( ".search" ).click(function() {
		$( ".searchChats" ).focus();
	});

/* Show or Hide Emoji Panel */
	$(".emoji").click(function(){
		$(".emojiBar").fadeToggle(120);
  });
	
	/* if the user click the conversation or the type panel will also hide the emoji panel */
  $(".convHistory, .replyMessage").click(function(){
		$(".emojiBar").fadeOut(120);
  });


/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////


let strToHtml = (str) => {
	var temp = document.createElement('div');
	temp.innerHTML = str;
	return temp.firstChild;
};

var socket = io.connect();

const queryString = window.location.search;
let arr = queryString.split("?id=");
arr.shift();

let chatArr = {
	id_user : parseInt(arr[0]),
	current_dialog : 0
}

socket.on('set all mess', function(data) {
	let dialo_body = $("body > section.mainApp > div.rightPanel > div.convHistory.userBg");
	dialo_body.innerHTML = '';
	data.messages.forEach(element => {
		dialo_body.append(strToHtml(element));
	});
	   dialo_body.scrollTop(dialo_body[0].scrollHeight);
});
socket.emit('get all dialog', {id:chatArr.id_user});
socket.on('set all dialog', function(data) {
	// document.querySelector(".chats").innerHTML = '';
	data.dialogs.forEach(element => {
		document.querySelector(".chats").append(strToHtml(element));
	});
	$('body > section.mainApp > div.leftPanel > div > div').on( "click", function() {
		document.querySelector("body > section.mainApp > div.rightPanel > div.convHistory.userBg").innerHTML = '';
		$('body > section.mainApp > div.rightPanel > div.replyBar').show();
		$('.chatName').text($(this).find('.chatInfo > .name').text());
		if (!$(this).hasClass('active')) {
			$('body > section.mainApp > div.leftPanel > div > div').not(this).removeClass('active');
	    	$(this).toggleClass('active');
		}
    	chatArr.current_dialog = parseInt($(this).attr('data-id'));
		socket.emit('get all mess', {id_dialog:$(this).attr('data-id'), id_user: chatArr.id_user});

	});
});
$('body > section.mainApp > div.rightPanel > div.replyBar > input').on( "keydown", function() {
    if (!$(this).val()) $('#send').css("color", "#888");
    else $('#send').css("color", "#3fa6ff");
    
});

$('#send').on( "click", function() {
	let mess = $('body > section.mainApp > div.rightPanel > div.replyBar > input').val();
	let time = new Date().toString().substr(16, 5);
	if(mess){
		socket.emit('add mess', {message: mess, id_dialog:chatArr.current_dialog, id_user: chatArr.id_user, time: time}, function(err, success) {
			document.querySelector("body > section.mainApp > div.rightPanel > div.convHistory.userBg").append(strToHtml('<div class="msg messageSent">'+mess+'\<i class="material-icons readStatus">done_all</i><span class="timestamp">'+time+'</span></div> -->'));
			$("body > section.mainApp > div.rightPanel > div.convHistory.userBg").scrollTop($("body > section.mainApp > div.rightPanel > div.convHistory.userBg")[0].scrollHeight);
			$('body > section.mainApp > div.rightPanel > div.replyBar > input').val('');
		});
	} 
});

$('body > section.mainApp > div.rightPanel > div.replyBar > input').keyup(function(event){
    if(event.keyCode == 13){
        $('#send').click()
    }
});


socket.on('show new mess', function(data) {
	if (chatArr.current_dialog == data.arr.id_dialog) 
	document.querySelector("body > section.mainApp > div.rightPanel > div.convHistory.userBg").append(strToHtml('<div class="msg messageReceived">'+data.arr.message+'<span class="timestamp">'+data.arr.time+'</span><span class="status_user">'+data.stat+'</span></div>'));
	$("body > section.mainApp > div.rightPanel > div.convHistory.userBg").scrollTop($("body > section.mainApp > div.rightPanel > div.convHistory.userBg")[0].scrollHeight);

});






$('body > div.moreMenu > button').click(()=>{
	let prov = confirm("Вы уверены что хотите завершить диспут? \nВсе сообщения безвозвратно удалятся!!!");
    if (prov) 
	socket.emit('remove disput', {id: chatArr.current_dialog}, function() {
		location.reload();
	});
});







});