var controlId_A, controlId_B;
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
                address_A : $('.customControl').text(),
                address_B : $('.customControl').text()
            },
            schema: {
                fields: [{
                    type: "input",
                    inputType: "text",
                    label: "Ваше имя 😺",
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
                    hint: "Минимум 6 символов",
                    validator: VueFormGenerator.validators.string
                }, {
                    type: "radios",
                    label: "Скорость доставки",
                    model: "fast",
                    values: [
                        "Быстро 🐪",
                        "Очень быстро 🐴",
                        "Побить рекорды скорости 🐳💨"
                    ]
                },{
                    type: "dateTimePicker",
                    label: "Время забора посылки 🕐",
                    model: "startTime",
                    format: "HH:m",
                    dateTimePickerOptions: {
                        format: "HH:m"
                    }
                }, {
                    type: "input",
                    inputType: "number",
                    label: "Её вес (кг.) 📦",
                    model: "ves",
                    min: 18,
                    validator: VueFormGenerator.validators.number
                }, {
                    type: "input",
                    inputType: "email",
                    label: "Ваш E-mail 📧",
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
                        "Бесконтактная доставка",
                        "Ночная доставка 🌙",
                        "Трезвый курьер 🍾",
                        "Некурящий курьер 🚭",
                        "Курьер с чувством юмора 🤡"
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
                }, {
                    type: "input",
                    inputType: "text",
                    label: "Точка А 🚩",
                    model: "address_A",
                    multi: true,
                    buttons: [
                        {
                            classes: "btn-location",
                            label: "Определить",
                            onclick: function(model) {
                                clearInterval(controlId_A);
                                $(".ya_map_A").hide();
                                if (navigator.geolocation) {
                                    navigator.geolocation.getCurrentPosition(function(pos) {
                                        let coords = pos.coords.longitude.toFixed(5) + "," + pos.coords.latitude.toFixed(5);
                                        $.ajax({
                                            url: "https://geocode-maps.yandex.ru/1.x/?apikey=d40fb052-95ef-400a-b9ad-d8e14749a9be&geocode="+coords,
                                            dataType: "xml",
                                            success: function(data){
                                                let address = $(data).find('GeocoderMetaData text').first().text();
                                                model.address_A = address;
                                            }
                                        });

                                    });
                                    console.log(model.address)
                                } else {
                                    alert("Geolocation is not supported by this browser.");
                                }
                            }
                        },
                        {
                            classes: "btn-clear",
                            label: "Выбрать на карте",
                            onclick: function(model, field) {
                                $(".ya_map_A").insertAfter($('.btn-clear').first().parent().parent());
                                $(".ya_map_A").show(); $('.customControl').first().hide();
                                $('.btn-allow').first().toggle(); $('.btn-clear').first().toggle();
                                controlId_A = setInterval(function() {
                                    model.address_A = $('.customControl').first().text();
                                }, 500);

                            }
                        },
                        {
                            classes: "btn-allow",
                            label: "Подтвердить",
                            onclick: function(model, field) {
                                $(".ya_map_A").toggle();
                                $('.btn-allow').first().toggle();
                                $('.btn-clear').first().toggle();
                            }
                        }
                    ]
                }, {
                    type: "input",
                    inputType: "text",
                    label: "Точка Б 🏁",
                    model: "address_B",
                    multi: true,
                    buttons: [
                        {
                            classes: "btn-location",
                            label: "Определить",
                            onclick: function(model) {
                                clearInterval(controlId_B);
                                $(".ya_map_B").hide();
                                if (navigator.geolocation) {
                                    navigator.geolocation.getCurrentPosition(function(pos) {
                                        let coords = pos.coords.longitude.toFixed(5) + "," + pos.coords.latitude.toFixed(5);
                                        $.ajax({
                                            url: "https://geocode-maps.yandex.ru/1.x/?apikey=d40fb052-95ef-400a-b9ad-d8e14749a9be&geocode="+coords,
                                            dataType: "xml",
                                            success: function(data){
                                                let address = $(data).find('GeocoderMetaData text').first().text();
                                                model.address_B = address;
                                            }
                                        });

                                    });
                                    console.log(model.address)
                                } else {
                                    alert("Geolocation is not supported by this browser.");
                                }
                            }
                        },
                        {
                            classes: "btn-clear",
                            label: "Выбрать на карте",
                            onclick: function(model, field) {
                                $(".ya_map_B").insertAfter($('.btn-clear').eq(1).parent().parent());
                                $(".ya_map_B").show(); $('.customControl').eq(1).hide();
                                $('.btn-allow').eq(1).toggle(); $('.btn-clear').eq(1).toggle();
                                controlId_B = setInterval(function() {
                                    model.address_B = $('.customControl').eq(1).text();
                                }, 500);

                            }
                        },
                        {
                            classes: "btn-allow",
                            label: "Подтвердить",
                            onclick: function(model, field) {
                                $(".ya_map_B").toggle();
                                $('.btn-allow').eq(1).toggle();
                                $('.btn-clear').eq(1).toggle();
                            }
                        }
                    ]
                },{
                    type: "label",
                    label: "Цена:",
                    model: "cost",
                    get: function(model) { 
                        return model.ves ? model.ves*2+" руб." : "Минимально 100 руб.";
                      // return model && model.created ? moment(model.created).format("LLL") : "-"; 
                    }
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
    },
});