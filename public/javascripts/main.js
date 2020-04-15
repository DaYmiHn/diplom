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
        });



var from_vkladka = '#container';
$('.header_item').click(function(){
    var to_vkladka = $(this).attr('class').split(' ')[1];
    if(from_vkladka === "#"+to_vkladka)return;
    $(from_vkladka).slideUp(300);
    $("#"+to_vkladka).slideDown(300);
    from_vkladka = "#"+to_vkladka;
});





var vm = new Vue({
    el: "#app",

    components: {
        "vue-form-generator": VueFormGenerator.component
    },

    data() {
        return {
            model: {
                id: 1,
                name: "John Doe",
                password: "J0hnD03!x4",
                age: 35,
                email: "john.doe@gmail.com",
                status: true,
                address : {
                    lat: 0,
                    lng: 0
                }
            },
            schema: {
                fields: [{
                    type: "input",
                    inputType: "text",
                    label: "Идентификатор отправления",
                    model: "id",
                    readonly: true,
                    featured: false,
                    disabled: true
                }, {
                    type: "input",
                    inputType: "text",
                    label: "Имя",
                    model: "name",
                    readonly: false,
                    featured: true,
                    required: true,
                    disabled: false,
                    placeholder: "User's name",
                    validator: VueFormGenerator.validators.string
                }, {
                    type: "input",
                    inputType: "password",
                    label: "Пароль",
                    model: "password",
                    min: 6,
                    required: true,
                    hint: "Minimum 6 characters",
                    validator: VueFormGenerator.validators.string
                }, {
                    type: "radios",
                    label: "Скорость доставки",
                    model: "fast",
                    values: [
                        "Быстро",
                        "Очень быстро",
                        "Побить рекорды скорости"
                    ]
                },{
                    type: "dateTimePicker",
                    label: "Время забора посылки",
                    model: "startTime",
                    format: "HH:m",
                    dateTimePickerOptions: {
                        format: "HH:m"
                    }
                }, {
                    type: "input",
                    inputType: "number",
                    label: "Её вес (кг.)",
                    model: "ves",
                    min: 18,
                    validator: VueFormGenerator.validators.number
                }, {
                    type: "input",
                    inputType: "email",
                    label: "Ваш E-mail",
                    model: "email",
                    placeholder: "User's e-mail address",
                    validator: VueFormGenerator.validators.email
                }, {
                    type: "checklist",
                    label: "Опции",
                    model: "options",
                    multi: true,
                    required: true,
                    multiSelect: true,
                    values: [
                        "Хрупкая посылка",
                        "Срочная доставка",
                        "Бесконтактная доставка"
                    ]
                }, {
                    type: "input",
                    inputType: "text",
                    label: "Location",
                    model: "address",
                    multi: true,
                    buttons: [
                        {
                            classes: "btn-location",
                            label: "Current location",
                            onclick: function(model) {
                                if (navigator.geolocation) {
                                    navigator.geolocation.getCurrentPosition(function(pos) {
                                        model.address = {
                                            lat: pos.coords.latitude.toFixed(5),
                                            lng: pos.coords.longitude.toFixed(5)
                                        };
                                    });
                                    console.log(model.address.lat)
                                } else {
                                    alert("Geolocation is not supported by this browser.");
                                }
                            }
                        },
                        {
                            classes: "btn-clear",
                            label: "Clear",
                            onclick: function(model, field) {
                                model.address = {
                                    lat: 0,
                                    lng: 0
                                };
                                $(".ya_map").insertAfter($('.btn-clear').parent().parent());
                            }
                        }
                    ]
                },{
                    type: "switch",
                    label: "Согласны ли вы с правилами доставки?",
                    model: "rules",
                    multi: true,
                    readonly: false,
                    featured: false,
                    disabled: false,
                    default: true,
                    textOn: "Да, конечно",
                    textOff: "Нет, спасибо"
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
    },
});

$('#but').val("Указать адрес забора посылки");

$("#start-time").attr('maxlength','5');
$('#but').click(function () {
    $(".ya_map").insertAfter($(this));
});

$(".customControl").on("input",function() {
    console.log($(".customControl").text());
});

$(".customControl").bind("DOMSubtreeModified",function(){
});

$(document).ready(function() {

    $(".customControl").bind("propertychange change keyup paste input", function () {
        console.log('fdg');
    });
    $('body').on('propertychange change keyup paste input', '.customControl', function () {
        alert('event on  new_wl');
    });
});
jQuery('.customControl').on('input', function() {
    alert('event on  new_wl');
});


