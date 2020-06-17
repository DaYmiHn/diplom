var controlId_A, controlId_B;


let summ = {
  rast: 0,  
  options: 0,  
  fast: 0,  
  ves: 0,
  total: 0,
  cart: 0     
};

let options = setInterval( function() { 
    if (vm.model.options === undefined) {summ.options = 0 }else{

    summ.options = vm.model.options.length * 30;
    }
 } , 1000);

let fast = setInterval( function() {
    // var radioButtons = $("#app > div:nth-child(1) > div.panel-body > div > fieldset > div > div.form-group.valid.field-radios > div > div");
    // var selectedIndex = radioButtons.index(radioButtons.filter('.is-checked'));
    $("#app > div:nth-child(1) > div.panel-body > div > fieldset > div > div.form-group.valid.field-radios > div > div > label").each((index, item) => {
     if(item.className.includes('is-checked')) summ.fast = index *50;
    } );
    // console.log(selectedIndex);
} , 1000);

let ves = setInterval( function() {
    summ.ves = vm.model.ves * 10;
 } , 1000);
let total = setInterval( function() {
    var button = document.querySelector("#app > div.panel.panel-default > div.panel-body > div > fieldset > div > div.form-group.valid.field-submit > div > input[type=submit]");
    summ.total = summ.rast + summ.options + summ.fast + summ.ves + summ.cart;
    if (isNaN(summ.total)) {
        button.value = 'Оформить заказ минимум 30 руб.'
    } else {
        button.value = 'Оформить заказ за '+summ.total + ' руб.'        
    }
 } , 1000);

var vm = new Vue({
    el: "#app",

    components: {
        "vue-form-generator": VueFormGenerator.component
    },

    data() {
        return {
            model: {
                id: 1,
                name: " ",
                phone: "+7",
                email: "john.doe@gmail.com",
                zakaz: "посылка",
                address_A : 'г Санкт-Петербург, пр-кт Авиаконструкторов, д 28',
                address_B : 'Россия, Санкт-Петербург, Среднеохтинский проспект, 11к4',
                ves : 1
                
            },
            schema: {
                fields: [{
                    type: "input",
                    inputType: "text",
                    label: "Ваше имя 😺",
                    model: "name",
                    id: "name",
                    placeholder: "Как к Вам обращаться?",
                    required: true,
                    readonly: true,
                    validator: VueFormGenerator.validators.string
                }, {
                    type: "input",
                    inputType: "text",
                    maxlength: 12,
                    minlength: 12,
                    id: "phone",
                    label: "Телефон",
                    model: "phone",
                    required: true
                }, {
                    type: "radios",
                    label: "Скорость доставки",
                    model: "fast",
                    values: [
                        "Быстро 🐪",
                        "Очень быстро 🐴",
                        "Побить рекорды скорости 🐳💨"
                    ],
                    required: true
                }, {
                    type: "checklist",
                    label: "Опции",
                    model: "options",
                    multi: true,
                    multiSelect: true,
                    values: [
                        "Хрупкая посылка",
                        "Срочная доставка",
                        "Бесконтактная доставка",
                        "Ночная доставка 🌙",
                        "Трезвый курьер 🍾",
                        "Некурящий курьер 🚭",
                        "Курьер с чувством юмора 🤡"
                    ]
                },{
                    type: "dateTimePicker",
                    label: "Время забора",
                    model: "startTime",
                    id: "startTime",
                    maxlength: 5,
                    placeholder: "09:00",
                    format: "HH:m",
                    dateTimePickerOptions: {
                        format: "HH:m"
                    },
                    required: true
                },{
                    type: "dateTimePicker",
                    label: "и вручения посылки 🕐",
                    placeholder: "09:00",
                    model: "endTime",
                    maxlength: 5,
                    id: "endTime",
                    format: "HH:m",
                    dateTimePickerOptions: {
                        format: "HH:m"
                    },
                    required: true
                }, {
                    type: "input",
                    inputType: "number",
                    label: "Её вес (кг.) 📦",
                    model: "ves",
                    id: "ves",
                    min: 1,
                    required: true,
                    validator: VueFormGenerator.validators.number
                }, {
                    type: "input",
                    inputType: "email",
                    label: "Ваш E-mail 📧",
                    model: "email",
                    id: "email",
                    required: true,
                    placeholder: "User's e-mail address",
                    validator: VueFormGenerator.validators.email
                }, {
                    type: "input",
                    inputType: "text",
                    label: "Точка А 🚩",
                    model: "address_A",
                    id: 'address_a',
                    required: true
                    // multi: true
                }, {
                    type: "input",
                    inputType: "text",
                    label: "Точка Б 🏁",
                    model: "address_B",
                    id: 'address_b',
                    required: true
                    // multi: true
                },{
                    type: "textArea",
                    label: "Комментарий",
                    model: "comment",
                    hint: "Максимально 500 символов",
                    max: 500,
                    placeholder: "Напишите поподробнее о своём заказе и деталях....",
                    rows: 2
                },{
                    type: "submit",
                    buttonText: "Оформить заказ"
                }]
            },

            formOptions: {
                validateAfterLoad: true,
                validateAfterChanged: true
            }
        };
    },

    methods: {
        prettyJSON: function(json) {
            if (json) {
                json = JSON.stringify(json, undefined, 4);
                json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
                return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
                    var cls = 'number';
                    if (/^"/.test(match)) {
                        if (/:$/.test(match)) {
                            cls = 'key';
                        } else {
                            cls = 'string';
                        }
                    } else if (/true|false/.test(match)) {
                        cls = 'boolean';
                    } else if (/null/.test(match)) {
                        cls = 'null';
                    }
                    return '<span class="' + cls + '">' + match + '</span>';
                });
            }
        }
    },watch : { name: function() {
        alert('dfg')
    }},
});
var costRast;
var directionsRenderer;
var directionsService;
function initMap() {
    directionsRenderer = new google.maps.DirectionsRenderer;
    directionsService = new google.maps.DirectionsService;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: {lat: 37.77, lng: -122.447},
      disableDefaultUI: true   
    });
    directionsRenderer.setMap(map);
    
    
    // document.getElementById('mode').addEventListener('change', function() {
    //   calculateAndDisplayRoute(directionsService, directionsRenderer);
    // });
} 

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    let a =vm.model.address_A;
    let b =vm.model.address_B;
    setTimeout(function(){
        var selectedMode = 'TRANSIT';
        directionsService.route({
          origin: a,  // Haight.
          destination: b,  // Ocean Beach.
          // Note that Javascript allows us to access the constant
          // using square brackets and a string value as its
          // "property."
          travelMode: google.maps.TravelMode[selectedMode]
        }, function(response, status) {
          if (status == 'OK') {
            directionsRenderer.setDirections(response);
            console.log(response.routes[0].legs[0].distance.value/1000);
            console.log(response.routes[0].legs[0].duration.value/60);
            // $('#map').slideDown( 200);
            $('#map').show();
            console.log(response.routes[0].fare.value);

            var rasKm = Math.round(response.routes[0].legs[0].distance.value/1000); //в метрах // км
            var durKm = Math.round(response.routes[0].legs[0].duration.value/60); //в секундах // мин
            summ.rast = (rasKm+durKm)*2;
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        }); 
    }, 3000);
    // var selectedMode = document.getElementById('mode').value;
}


var data;
    $("#address_a,#address_b").suggestions({
        token: "2a590f083f301abfa0b8b944b982bf15b2d5d5a6",
        type: "ADDRESS",
        onSelect: function(suggestion) {
            data = suggestion;
            vm.model.address_A = $("#address_a").val();
            vm.model.address_B = $("#address_b").val();
            console.log(data);
            calculateAndDisplayRoute(directionsService, directionsRenderer);
        }
    });