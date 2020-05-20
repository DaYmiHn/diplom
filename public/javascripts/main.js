$(window).load(function(){
    // $(function(){
    //     var transTime = 10000;
    //     var numBgColors = $('.bg-grad').length;
    //     var bgtrans = setInterval(function(){
    //         if($('.bg-grad.active').index() == ($('.bg-grad').length-1)){
    //             $('.bg-grad.active').removeClass('active');
    //             $('.bg-grad').eq(0).addClass('active');
    //         }else{
    //             var curIndex = $('.bg-grad.active').index();
    //             $('.bg-grad.active').removeClass('active');
    //             $('.bg-grad').eq(curIndex+1).addClass('active');
    //         }
    //     },transTime);
    // });

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
    $('#startTime').mask('99:99');
    $('#endTime').mask('99:99');
    // $("#phone").mask("+7(999)999-99-99");
});


$('.avatar').click(function(){
    $('#inp').trigger('click');
});
$('#cabinet > div.register-form.form.modal-tovar > input[type=text]:nth-child(6)').click(function(){
    $('#inp_tov').trigger('click');
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
function readFileTov() {
  if (this.files && this.files[0]) {
    var FR= new FileReader();
    FR.addEventListener("load", function(e) {
        $('#cabinet > div.register-form.form.modal-tovar > input[type=text]:nth-child(6)').val(e.target.result);
    }); 
    FR.readAsDataURL( this.files[0] );
  }
}
document.getElementById("inp").addEventListener("change", readFile);
if ($('#status_user').val() == 'mag') {
            document.getElementById("inp_tov").addEventListener("change", readFileTov);

}


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
//     `startTime` TEXT,
//     `endTime` TEXT,
//     `status` TEXT,
//     `ves` TEXT,
//     `zakaz` TEXT
// );




$('div.form-group.valid.field-submit > div > input[type=submit]').click(function(){
    // var cartZak;
    // if (typeof(cartData) == "undefined") {
    //     cartZak = 'посылка';
    // } else {
    //     cartZak = JSON.stringify(cartData);
    // }
    $('input').click(function(){
        $(this).parent().parent().parent().removeClass('error');
        $(this).parent().parent().parent().find('.help-block').remove();

    });
    if (summ.cart == 0) {
        if ($('#phone').val() == '' || $('#phone').val() == '+7' || $('#phone').val().length != 12 ||
        $('#startTime').val() == ''  || $('#startTime').val().length != 5 ||
        $('#endTime').val() == ''  || $('#endTime').val().length != 5
        ) {
            if ($('#phone').val() == '' || $('#phone').val() == '+7' || $('#phone').val().length != 12) {
                $('#phone').parent().parent().parent().addClass('error').append('<div class="errors help-block"><span>Это поле обязательное!</span></div>');
                
            }

            if ($('#startTime').val() == ''  || $('#startTime').val().length != 5) {
                $('#startTime').parent().parent().parent().addClass('error').append('<div class="errors help-block"><span>Это поле обязательное!</span></div>');
            }
            if ($('#endTime').val() == ''  || $('#endTime').val().length != 5) {
                $('#endTime').parent().parent().parent().addClass('error').append('<div class="errors help-block"><span>Это поле обязательное!</span></div>');
            }    
                alert('Исправьте выделенные поля!');    
                return;
        }

    }
    let isBoss = confirm("Вы уверены что готовы сделать заказ?");
    if (!isBoss) return;
    socket.emit('new zakaz', {  address_A: vm.model.address_A, 
                                address_B: vm.model.address_B, 
                                cost: summ.total, 
                                email: vm.model.email, 
                                fast: vm.model.fast, 
                                name: vm.model.name, 
                                options: vm.model.options, 
                                phone: vm.model.phone, 
                                rules: vm.model.rules, 
                                startTime: vm.model.startTime, 
                                endTime: vm.model.endTime, 
                                status: vm.model.status, 
                                ves: vm.model.ves,
                                zakaz :  vm.model.zakaz
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

////////////////////////////////////////////////////////////////////

$('#cabinet > div > div.settings > input.open-modal-btn-tovar').click(function(){
    $('.overlay').show();
    $('.modal-tovar').show();
});

$('.overlay').click(function(){
    $('.overlay').hide();
    $('.modal-tovar').hide();
});
$('.modal-tovar button').click(function(){
    // alert();
    let tovar = {
      name: '',  
      cost: '',  
      image: '',
      id_mag: 0  
    };
    tovar.name = $('#cabinet > div.modal-tovar > input[type=text]:nth-child(2)').val();
    tovar.cost = $('#cabinet > div.modal-tovar > input[type=text]:nth-child(4)').val();
    tovar.image = $('#cabinet > div.modal-tovar > input[type=text]:nth-child(6)').val();
    tovar.id_mag = $('#id_user').val();
    // console.log(tovar);
    socket.emit('new tovar', {tovar: tovar});
});
////////////////////////////////////////////////////////////////////
$('#cabinet > div > div.settings > input.open-modal-btn-acc').click(function(){
    $('.overlay').show();
    $('.modal-acc').show();
});

$('.overlay').click(function(){
    $('.overlay').hide();
    $('.modal-acc').hide();
});
$('#updMag').click(function(){
    let mag = {
      name: $('#cabinet > div.modal-acc > input[type=text]:nth-child(2)').val(),  
      log: $('#cabinet > div.modal-acc > input[type=text]:nth-child(3)').val(),  
      pas: $('#cabinet > div.modal-acc > input[type=text]:nth-child(4)').val(),
      id: $('#id_user').val()  
    };
    socket.emit('upd mag', {mag: mag});
});


// $('#cabinet > div.modal-acc > input[type=button]:nth-child(6)').click(function(){
//     socket.emit('new tovar', {log: tovar, id: $('#id_user').val()});
// });
// $('#cabinet > div.modal-acc > input[type=button]:nth-child(9)').click(function(){
//     socket.emit('new tovar', {pas: tovar, id: $('#id_user').val()});
// });

////////////////////////////////////////////////////////////////////


$('#cabinet > div.cabinet_block > div.info > h1').bind( 'DOMSubtreeModified',function(){
    let mag = {
        id: $('#id_user').val(),
        name: $(this).text(),
        act: 'no'
    }
    socket.emit('upd mag', {mag: mag});
});





$('#cabinet > div.cabinet_block > div.settings > input.open-modal-btn-edit').click(function(){
    $('.overlay').show();
    $('.modal-tovar-edit').show();
});

$('.overlay').click(function(){
    $('.overlay').hide();
    $('.modal-tovar-edit').hide();
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////

$('#cabinet > div.cabinet_block > div.massanger > center > img').click(function(){
    $('.overlay').show();
    $('#messenger').show();
});

$('.overlay').click(function(){
    $('.overlay').hide();
    $('#messenger').hide();
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////

var cartData=getCartData() || {};
var d = document,
    itemBox = d.querySelectorAll('.item_box'), // блок каждого товара
        cartCont = d.getElementById('cart_content'); // блок вывода данных корзины
// Функция кроссбраузерная установка обработчика событий
function addEvent(elem, type, handler){
  if(elem.addEventListener){
    elem.addEventListener(type, handler, false);
  } else {
    elem.attachEvent('on'+type, function(){ handler.call( elem ); });
  }
  return false;
}
// Получаем данные из LocalStorage
function getCartData(){
    return JSON.parse(localStorage.getItem('cart'));
}
// Записываем данные в LocalStorage
function setCartData(o){
    localStorage.setItem('cart', JSON.stringify(o));
    return false;
}
// Добавляем товар в корзину
function addToCart(e){

    this.disabled = true; // блокируем кнопку на время операции с корзиной
    cartData = getCartData() || {}, // получаем данные корзины или создаём новый объект, если данных еще нет
            parentBox = this.parentNode, // родительский элемент кнопки &quot;Добавить в корзину&quot;
            itemId = this.getAttribute('data-id'), // ID товара
            shopId = this.getAttribute('data-id-shop'), 
            itemTitle = parentBox.querySelector('.item_title').innerHTML, // название товара
            itemPrice = this.getAttribute('data-cost'); // стоимость товара
    if(cartData.hasOwnProperty(itemId)){ // если такой товар уже в корзине, то добавляем +1 к его количеству
        cartData[itemId][2] += 1;
    } else { // если товара в корзине еще нет, то добавляем в объект
        cartData[itemId] = [itemTitle, itemPrice, 1,shopId];
    }
    // Обновляем данные в LocalStorage
    if(!setCartData(cartData)){ 
        this.disabled = false; // разблокируем кнопку после обновления LS
        // cartCont.innerHTML = 'Товар добавлен в корзину.';
        
    }

    openCart();
    return false;
}
// Устанавливаем обработчик события на каждую кнопку &quot;Добавить в корзину&quot;
for(var i = 0; i < itemBox.length; i++){
    addEvent(itemBox[i].querySelector('.add_item'), 'click', addToCart);
}
// Открываем корзину со списком добавленных товаров
function openCart(e){
    var cartData = getCartData(), // вытаскиваем все данные корзины
            totalItems = '';
    console.log(JSON.stringify(cartData));
    // если что-то в корзине уже есть, начинаем формировать данные для вывода
    if(cartData !== null){
        totalItems = '<table class="shopping_list"><tr><th>Наименование</th><th>Цена</th><th>Кол-во</th></tr>';
        for(var items in cartData){
            totalItems += '<tr>';
            for(var i = 0; i < 3; i++){
                totalItems += '<td>' + cartData[items][i] + '</td>';
            }
            totalItems += '</tr>';
        }
        totalItems += '<table>';
        cartCont.innerHTML = totalItems;
    } else {
        // если в корзине пусто, то сигнализируем об этом
        cartCont.innerHTML = 'В корзине пусто!';
    }
    return false;
}
/* Открыть корзину */
// addEvent(d.getElementById('checkout'), 'click', openCart);
/* Очистить корзину */
addEvent(d.getElementById('clear_cart'), 'click', function(e){
    localStorage.removeItem('cart');
    summ.cart = 0;
    cartCont.innerHTML = 'Корзина очишена.';    
});


openCart();
$('#checkout').click(function(){
    summ.cart = 0;
    $.each(cartData, function( index, value ) {
      summ.cart += value[1]*value[2];
    });
    // summ.ves = 1;
    summ.rast = 1;
    vm.model.ves = 10;
    vm.model.address_A = 'г Санкт-Петербург, пр-кт Авиаконструкторов, д 28 ';
    vm.model.zakaz = JSON.stringify(cartData);
    $('.send').trigger("click");
    $('.form-group')[8].remove();
    $('.form-group')[6].remove();
    $('.form-group')[5].remove();
    $('.form-group')[4].remove();

    $('.form-group').eq(3).css("cssText", "grid-column: span 1;");
    $('.form-group').eq(5).css("cssText", "grid-column: span 4;");
    $('.form-group').eq(6).css("cssText", "grid-column: span 4;");
    $('.form-group').eq(7).css("cssText", "grid-column: span 4;");

    // socket.emit('new zakaz', {  cart: cartData});
});
$(document.body).on('click', '.updPackageStatus' ,function(){
// $('.updPackageStatus').bind( "click", function() {
    $(this).parent().click();
    let thisis = $(this).parent();
    thisis = thisis.parent();
    thisis.appendTo($('#'+$(this).attr("data-status")));
    let id_pac = $(this).attr("data-id");
    let id_cur = $('#id_user').val();
    let status;
    if ($(this).attr("data-status") == "created-mag") status = 'created';
    else status = $(this).attr("data-status");
    socket.emit('upd status package', { id_pac: id_pac, id_cur: id_cur, status: status});
    if ($(this).attr("data-status") == "inwork") {
        $(this).val('Выполнено');
        $(this).attr("data-status", "done");

        let el = $('<input type="button" value="Отменить"  data-status="created" class="updPackageStatus">').attr("data-id", $(this).attr("data-id"));
        $(this).parent().append(el).show('slow');;
    
    } else if ($(this).attr("data-status") == "created"){
        $(this).parent().find('input[value="Отменить"]').val('В работу');
        $(this).attr("data-status", "inwork");
        $(this).parent().find('input[value="Выполнено"]').remove();
    
    } else if ($(this).attr("data-status") == "done"){
        $(this).parent().parent().remove();

    } else if ($(this).attr("data-status") == "created-mag"){
        $(this).parent().parent().find('input[value="Подтвердить"]').remove();
    }
});

$('#messenger > iframe').attr("src",'mess/index.html?id='+$('#id_user').val().toString());

setInterval(()=>{
    $('#circle').fadeToggle(400);
},500);

$('.openDisput').click(function(event){
    // event.preventDefault();
    document.querySelector("#messenger > iframe").src = document.querySelector("#messenger > iframe").src;
    socket.emit('new disput', { id_user: $("#id_user").val(), id_pac: $(this).attr('data-id')}, function(err, success) {
        $('#cabinet > div.cabinet_block > div.massanger > center > img').click();
    });
    // alert($(this).attr('data-id'));
});


$('.donePackage').on('click', function(){
    let prov = confirm("Вы уверены что хотите завершить заказ №"+$(this).attr('data-id')+"?");
    if (prov) {
        socket.emit('finish package', {id:$(this).attr('data-id')},()=>{
            $(this).parent().parent().remove();
        });
    } 



    return false
});