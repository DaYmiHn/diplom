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





// function ras(){
//     ymaps.ready(function () {
//         var multiRoute = new ymaps.multiRouter.MultiRoute({
//             referencePoints: [model.address_A,
//           model.address_B],
//             params: {
//                 routingMode: 'avto'
//             }
//         }, {
//             boundsAutoApply: false
//         });

//         var changeLayoutButton = new ymaps.control.Button({
//             data: { content: "Изменить макет подписи для пеших сегментов"},
//             options: { selectOnClick: true }
//         });

//         changeLayoutButton.events.add('select', function () {
//             multiRoute.options.set(
//                 "routeWalkMarkerIconContentLayout",
//                 ymaps.templateLayoutFactory.createClass('{{ properties.duration.text }}')
//             );
//         });

//         changeLayoutButton.events.add('deselect', function () {
//             multiRoute.options.unset("routeWalkMarkerIconContentLayout");
//         });

//         var myMap = new ymaps.Map('map_A', {
//             center: [59.940664, 30.316987],
//             zoom: 12,
//             controls: [changeLayoutButton]
//         }, {
//             buttonMaxWidth: 350
//         });
        
//         myMap.geoObjects.add(multiRoute);
//         // var geoBounds = new YMaps.GeoCollectionBounds(); 

//         multiRoute.model.events.add("requestsuccess", function() {

//        myMap.setBounds(multiRoute.getBounds(),true);
//        var sred = multiRoute.getRoutes().get(0).properties.get("durationInTraffic").value + multiRoute.getRoutes().get(0).properties.get("duration").value
//        // setTimeout(raschet, 3000, multiRoute.getRoutes().get(0).properties.get('distance').value, sred/2);
//        console.log(multiRoute.getRoutes().get(0).properties.get('distance').value);
       
//       });
//     });
// }