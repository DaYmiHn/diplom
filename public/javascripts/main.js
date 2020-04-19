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

        $("#shop").mCustomScrollbar({
            theme:"dark-3"
        });
        $("#send").mCustomScrollbar({
            theme:"dark-3"
        });
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

    $('#---').mask('99:99');

});


ymaps.route(
    [
      'Санкт-Петебруг, ул Долгоозёрная, д 37',
      'Сестрорецк, ул Лесная д 10'
    ],
    {mapStateAutoApply: false}
    ).done(function (router) {
     console.log(route.getHumanLength()); // длинна маршрута
     console.log(route.getHumanTime()); // сколько примерно повремени
    });