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

$(window).load(function(){
    $("#shop").mCustomScrollbar({
        theme:"dark-3"
    });
    $("#send").mCustomScrollbar({
        theme:"dark-3"
    });
    $("fieldset").replaceWith(function(index, oldHTML){
      return $("<div>").html(oldHTML);
    });
});



var from_vkladka = '#container';
$('.header_item').click(function(){
    var to_vkladka = $(this).attr('class').split(' ')[1];
    if(from_vkladka === "#"+to_vkladka)return;
    $(from_vkladka).slideUp(300);
    $("#"+to_vkladka).slideDown(300);
    from_vkladka = "#"+to_vkladka;
});

$('#---').mask('99:99');






