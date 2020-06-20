(function colourful() {
    // функция генерирует рандомное число из заданного интервала, 
    // включая в себя минимальное и максимальное значение
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
// запрос на сервер после загрузки window
window.onload = (() => getTasks(WIDGET_ID).then(data => onTasksReceived(data)))

$('#getImages').click(() => {
    if ($('#pageNumber').val() == '' || $('#count').val() == '') {
        alert('Введите ВСЕ данные.');
        return;
    }
    getImages($('#pageNumber').val(), $('#count').val())
        .then(data => onDataReceived(data))
})

const onDataReceived = images => {
    images.forEach(el => {
        $('.images-api__content-images').append($(`<img src=${el.thumbnail}>`));
    })
}

$('#addTask').click(() => {
    if ($('#taskText').val() == '') {
        alert('Введите текст задачи.');
        return;
    }
    createTask(WIDGET_ID, $('#taskText').val())
        .then(() => {
            getTasks(WIDGET_ID)
                .then(data => {
                    $('.tasks-api__content-tasks_ul')
                        .append(
                            $(` <div class="task-div" ${data[data.length - 1].done ? 'done' : ''} 
                                    data-id=${data[data.length - 1].id}> 
                                    <input type="checkbox" class="toggleStatus"
                                    maxlength="32"
                                    ${data[data.length - 1].done ? ' checked ' : ''}
                                    ${data[data.length - 1].done ? ' disabled ' : ''}>
                                        <li class="task"> ${data[data.length - 1].title} </li> 
                                        <span class="close">+</span> 
                                </div>`));
                                addListeners()
                })
                
                    
                
        })
        
    $('#taskText').val('');

// limit делаем 30
})

const closeTask = (t) => {
    deleteTask(WIDGET_ID, $(t).attr('data-id'));
    $(t).remove();
}

const doneTask = (t) => {
    toggleTask(WIDGET_ID, $(t).attr('data-id'), true);
    $(t).toggleClass('done');
}

const addListeners = () => {
    $('.close').click((e) => {
        closeTask($(e.target).parent())
    })
    $('.toggleStatus').click((e) => {
        console.log(e.target)
        e.target.disabled = true;
        doneTask($(e.target).parent())
    });
}


const onTasksReceived = tasks => {
    tasks.forEach(el => {
        $('.tasks-api__content-tasks_ul')
            .append(
            $(` <div class="task-div ${el.done ? 'done' : ''}" data-id=${el.id}> 
                    <input type="checkbox" class="toggleStatus"
                    maxlength="32"
                    ${el.done ? ' checked ' : ''}
                    ${el.done ? ' disabled ' : ''}>
                    <li class="task"> ${el.title} </li> 
                    <span class="close">+</span> 
                </div>`));
                console.log(el.done)
    })
    addListeners()
}





/* замыкание start

function example() {
    let counter = 0;
    return function s() {
        counter++;
        console.log(counter);
    }
}

let counting = example();

замыкание end */