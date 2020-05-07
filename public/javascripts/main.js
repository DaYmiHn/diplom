$(window).load(function(){
    $(function(){
        var transTime = 10000;
        var numBgColors = $('.bg-grad').length;
        var bgtrans = setInterval(function(){
            if($('.bg-grad.active').index() == ($('.bg-grad').length-1)){
                $('.bg-grad.active').removeClass('active');
                $('.bg-grad').eq(0).addClass('active');
            }else{
                var curIndex = $('.bg-grad.active').index();
                $('.bg-grad.active').removeClass('active');
                $('.bg-grad').eq(curIndex+1).addClass('active');
            }
        },transTime);
    });

        // $("#shop").mCustomScrollbar({
        //     theme:"dark-3"
        // });
        // $("#send").mCustomScrollbar({
        //     theme:"dark-3"
        // });
        $('fieldset').wrapInner('<div></div>');
        // document.querySelector("#app > div:nth-child(1) > div.panel-body > div > fieldset > div > div:nth-child(11) > div > div > input").style.cssText = "width: 100%;";



    var from_vkladka = '#container';
    $('.header_item').click(function(){
        var to_vkladka = $(this).attr('class').split(' ')[1];
        if(from_vkladka === "#"+to_vkladka)return;
        $(from_vkladka).slideUp(300);
        $("#"+to_vkladka).slideDown(300);
        from_vkladka = "#"+to_vkladka;
    });

jQuery(function($) {
    $('#---').mask('99:99');
    // $("#phone").mask("+7(999)999-99-99");
});


$('.avatar').click(function(){
    $('#inp').trigger('click');
});


function readFile() {
  if (this.files && this.files[0]) {
    var FR= new FileReader();
    FR.addEventListener("load", function(e) {
        socket.emit('set avatar', { ava: e.target.result, idUser: $('#id_user').val() });
    }); 
    FR.readAsDataURL( this.files[0] );
  }
}
document.getElementById("inp").addEventListener("change", readFile);


// `address_A` TEXT,
// `address_B` TEXT,
// `cost` TEXT,
// `email` TEXT,
// `fast` TEXT,
// `id` TEXT,
// `name` TEXT,
// `options` TEXT,
// `phone` TEXT,
// `rules` TEXT,
// `startTime` TEXT,
// `status` TEXT,
// `ves` TEXT

// `INSERT INTO 'package' (address_A, address_B, cost, email, fast ,id ,name ,options ,phone ,rules ,startTime ,status ,ves) 
// VALUES (NULL,'${data.address_A}','${data.address_B}','${data.cost}','${data.email}','${data.fast}','${data.id}','${data.name}','${data.options}','${data.phone}','${data.rules}','${data.startTime}','${data.status}','${data.ves}');`


// CREATE TABLE `package` (
//     `id`    INTEGER PRIMARY KEY AUTOINCREMENT,
//     `address_A` TEXT,
//     `address_B` TEXT,
//     `cost` TEXT,
//     `email` TEXT,
//     `fast` TEXT,
//     `name` TEXT,
//     `options` TEXT,
//     `phone` TEXT,
//     `rules` TEXT,
//     `startTime` TEXT,
//     `status` TEXT,
//     `ves` TEXT
// );




$('div.form-group.valid.field-submit > div > input[type=submit]').click(function(){
    // socket.emit('new zakaz');
    socket.emit('new zakaz', {  address_A: vm.model.address_A, 
                                address_B: vm.model.address_B, 
                                cost: vm.model.cost, 
                                email: vm.model.email, 
                                fast: vm.model.fast, 
                                name: vm.model.name, 
                                options: vm.model.options, 
                                phone: vm.model.phone, 
                                rules: vm.model.rules, 
                                startTime: vm.model.startTime, 
                                status: vm.model.status, 
                                ves: vm.model.ves
                            });
});


});


// $(function() {
var socket = io.connect();
socket.on('reload', function(data) {
    location.reload();
});

// });


var acc = document.getElementsByClassName("accordionA");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
  
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}