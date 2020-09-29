

const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
const token = "03d28ebc2a1a611d8755f31e6ff19c3272e06599";


const mapKey = {
    'q' : 'й', 'w' : 'ц', 'e' : 'у', 'r' : 'к', 't' : 'е', 'y' : 'н', 'u' : 'г', 'i' : 'ш', 'o' : 'щ', 'p' : 'з', '[' : 'х', ']' : 'ъ', 'a' : 'ф', 's' : 'ы', 'd' : 'в', 'f' : 'а', 'g' : 'п', 'h' : 'р', 'j' : 'о', 'k' : 'л', 'l' : 'д', ';' : 'ж', '\'' : 'э', 'z' : 'я', 'x' : 'ч', 'c' : 'с', 'v' : 'м', 'b' : 'и', 'n' : 'т', 'm' : 'ь', ',' : 'б', '.' : 'ю','Q' : 'Й', 'W' : 'Ц', 'E' : 'У', 'R' : 'К', 'T' : 'Е', 'Y' : 'Н', 'U' : 'Г', 'I' : 'Ш', 'O' : 'Щ', 'P' : 'З', '{' : 'Х', '}' : 'Ъ', 'A' : 'Ф', 'S' : 'Ы', 'D' : 'В', 'F' : 'А', 'G' : 'П', 'H' : 'Р', 'J' : 'О', 'K' : 'Л', 'L' : 'Д', ':' : 'Ж', '"' : 'Э', 'Z' : 'Я', 'X' : 'ч', 'C' : 'С', 'V' : 'М', 'B' : 'И', 'N' : 'Т', 'M' : 'Ь', '<' : 'Б', '>' : 'Ю',
    };

    // Транслитерация латинских символов
    function translit () {

        let str = $('#text').val();

        let r = '';

        for (let i = 0; i < str.length; i++) {
        r += mapKey[str.charAt(i)] || str.charAt(i);
        }
        $("#text").val(r);
    }


    $('#text').bind('input', function(){

        translit ();

        let address = [];

        // получение подсказок при вводе в input
        $.ajax({
            url: url, 
            method: 'POST',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + token
            },
            data: {query: this.value,count: 13,},
            // в случае успеха отрисовка результата
            success: function(data){
                data.suggestions.forEach(element => {
                    address.push(element.value);
                });
                render (address);
            }
        });
    });

    // отрисовка всплывающей подсказки
    function render (address) {
        $('.autocomplete').html('');
        address.forEach(element => {
            $('.autocomplete').append(`<p>${element}</p>`);
        });
        // навешивание события выбора результата стрелками 
        move ();
        // навешивание события выбора результата кликом мыши 
        $('p').click(function () {
            $('#text').val($(this).text()) ;
            $('.autocomplete').html('');
        });
    }


    function move ()
    {
        $(window).off();
        $('.autocomplete p:first-child').addClass('active');
        $(window).keyup(function(e) {
            e.preventDefault();
            let current = $('.autocomplete p.active');
            let next;
            switch (e.keyCode) {
                case 38:
                    next = current.prev('.autocomplete p');
                    break;
                case 40:
                    next = current.next('.autocomplete p');
                    break;
                case 13:
                    $('#text').val($('.autocomplete p.active').text()) ;
                    $('.autocomplete').html('');
                    break;
            }
            if (next.length > 0) {
                $('.autocomplete p').removeClass('active');
                next.addClass('active');
            };
        });
};

// очистка поля ввода
$('#btn').click(function(){
	$('#text').val('');
});
