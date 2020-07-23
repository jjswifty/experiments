const reverseNum = num => -num;

(function colourful() {
    // функция генерирует псевдорандомное число из заданного интервала, 
    // включая минимальное и максимальное значение
    function getRandomNumber(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }
    // массив с возможными цветами 
    const colors = [
        "red",
        "green",
        "blue",
        "black",
        "purple",
        "yellow",
        "pink",
        "orange",
        "maroon",
        "olive",
        "fuchsia",
        "teal",
        "navy",
        "lime",
        "silver",
        "gray",
        "aqua"
    ];

    // кол-во нажатий по кнопке
    let countOfClicks = 0;
    // сюда будем записывать номер каждого нажатия : какой цвет выпал при нажатии
    let colorsChange = new Object();

    $('.btn').click(function () {
        countOfClicks++;
        let generatedColor = colors[getRandomNumber(0, colors.length - 1)];
        $('body').css("background", generatedColor);
        $('.color').css("color", generatedColor);
        $('.color').text(generatedColor);
        colorsChange[countOfClicks] = generatedColor;
        $('.countOfClicks').text(countOfClicks);
        $('.lastColor').text(colorsChange[countOfClicks - 1]);
        $('.history').append($("<div class='cube'></div>").css("background", generatedColor).attr('id', countOfClicks));
    })
}())

$('#getImages').click(() => {
    if ($('#pageNumber').val() == '' || $('#count').val() == '') {
        alert('Введите ВСЕ данные.');
        return;
    }
    imagesAPI.getImages($('#pageNumber').val(), $('#count').val())
        .then(data => onImagesReceived(data))
})

const onImagesReceived = images => {
    images.forEach(el => {
        $('.images-api__content-images').append($(`<img src=${el.thumbnail}>`));
    })
}

// todo

const removeTask = (t) => {
    todoAPI.deleteTask(WIDGET_ID, $(t).parent().data('id'))
    $(t).parent().remove();
}

const toggleStatus = (t) => {
    $(t).prop('disabled', true);
    todoAPI.toggleTask(WIDGET_ID, $(t).parent().data('id'), t.checked ? true : false)
        .then(response => {
            if(response.status === 'success') {
                t.checked ? t.checked : !t.checked
                $(t).prop('disabled', false)
            }
        })
}

const onTasksReceived = tasks => {
    $('.tasks-api__content-tasks_ul').empty()
    tasks.forEach(task => {
        $('.tasks-api__content-tasks_ul').append($(`
        <li class="task" data-id=${task.id}>
            <input type="checkbox" onclick="toggleStatus(this)" class=${task.done ? 'done' : 'not-done'} ${task.done ? 'checked' : ''}>
            <span class="task-content">${task.title}</span>
            <button class="delete-task" onclick="removeTask(this)">DEL</button>
        </li>`))
    })
}

todoAPI.getTasks().then(response => {
    onTasksReceived(response)
})

$('#getTasks').click(() => {
    WIDGET_ID = $('#WIDGET_ID').val();
    todoAPI.getTasks().then(response => {
        onTasksReceived(response)
    })
})

$('#addTask').click(() => {
    if ($('#taskText').val() == '') {return}
    $('#addTask').prop('disabled', true)
    todoAPI.createTask(WIDGET_ID, $('#taskText').val()).then(response => {
        if (response.status === 'success') {
            todoAPI.getTasks().then(response => {
                onTasksReceived(response);
                $('#taskText').val('')
                $('#addTask').prop('disabled', false)
            })
        }
    })
})





























/* test
$(document).ready(function () {

    //E-mail Ajax Send
    $("form").submit(function () { //Change
        var th = $(this);
        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function () {

            setTimeout(function () {
                // Done Functions
                th.trigger("reset");
            }, 1000);
        });
        return false;
    });

});

equeals

window.onload = () => {

    document.getElementsByTagName('form').submit(function() {
        const request = new XMLHttpRequest();
        request.open('POST', 'mail.php', true);

        let promise = new Promise(resolve => {
            request.send(); // Вот сюда надо данные с формы
            resolve();
        });

        promise.then(() => {
            this.reset()
        }).bind(document.пуе('form'))

    })
}



 замыкание start
function example() {
    let counter = 0;
    return function s() {
        counter++;
        console.log(counter);
    }
}

let counting = example();

замыкание end 


Если дождик, минуты = 0.
Температура меньше нуля, или больше 35, минуты = 0.
Температура 20 - минуты 20.
*/

const bruh = () => {

    let t = 28,
        rain = false,
        min = 20;

    (rain === true || t > 35 || t < 0) ? min = 0: t > 20 ? min += (min - t) : min += (t - min)

}