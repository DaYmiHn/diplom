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


$('#cabinet > div > div.settings > input.open-modal-btn').click(function(){
    $('.overlay').toggle();
    $('.modal').toggle();
});

$('.overlay').click(function(){
    $('.overlay').toggle();
    $('.modal').toggle();
});
$('.modal input[type=button]').click(function(){
    let tovar = {
      name: '',  
      cost: '',  
      image: '',
      id_mag: 0  
    };
    tovar.name = $('.modal input[type=text]:nth-child(1)').val();
    tovar.cost = $('.modal input[type=text]:nth-child(3)').val();
    tovar.image = $('.modal input[type=text]:nth-child(5)').val();
    tovar.id_mag = $('#id_user').val();
    // console.log(tovar);
    socket.emit('new tovar', {tovar: tovar});
});






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
    var cartData = getCartData() || {}, // получаем данные корзины или создаём новый объект, если данных еще нет
            parentBox = this.parentNode, // родительский элемент кнопки &quot;Добавить в корзину&quot;
            itemId = this.getAttribute('data-id'), // ID товара
            itemTitle = parentBox.querySelector('.item_title').innerHTML, // название товара
            itemPrice = this.getAttribute('data-cost'); // стоимость товара
    if(cartData.hasOwnProperty(itemId)){ // если такой товар уже в корзине, то добавляем +1 к его количеству
        cartData[itemId][2] += 1;
    } else { // если товара в корзине еще нет, то добавляем в объект
        cartData[itemId] = [itemTitle, itemPrice, 1];
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
            for(var i = 0; i < cartData[items].length; i++){
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
    cartCont.innerHTML = 'Корзина очишена.';    
});



$('#checkout').click(function(){
    $.each({"1":[" 123","120",7],"2":[" dfdfg","123",1],"4":[" fgdfgdf","213",5]}, function( index, value ) {
      summ.cart += value[1]*value[2];
    });
    summ.ves = 1;
    summ.rast = 1;
    vm.model.ves = 10;
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

$('.updPackageStatus').click(function (){
    let id_pac = $(this).attr("data-id");
    let id_cur = $('#id_user').val();
    let status = $(this).attr("data-status");
    socket.emit('upd status package', { id_pac: id_pac, id_cur: id_cur, status: status});
});
