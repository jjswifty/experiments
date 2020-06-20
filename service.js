const WIDGET_ID = '226';

// API
const getImages = (page, count) => {
    return axios.get(`https://repetitora.net/api/JS/Images?page=${page}&count=${count}`)
        .then(response => response.data)
}

const getTasks = (widgetId = WIDGET_ID, page = 1, count = 99) => {
    return axios.get(`https://repetitora.net/api/JS/tasks?widgetId=${widgetId}&page=${page}&count=${count}`)
        .then(response => response.data)
}

const createTask = (widgetId = WIDGET_ID, title) => {
    return axios.post(`https://repetitora.net/api/JS/Tasks`,
    {
        widgetId: widgetId,
        title: title
    })
        .then(response => response.data)
}

const deleteTask = (widgetId = WIDGET_ID, taskId) => {
    return axios.delete(`https://repetitora.net/api/JS/Tasks?widgetId=${widgetId}&taskId=${taskId}`)
        .then(response => response.data)
}

const toggleTask = (widgetId = WIDGET_ID, taskId, done) => {
    return axios.put(`https://repetitora.net/api/JS/Tasks`,
    {
        widgetId: widgetId,
        taskId: taskId,
        done: done
    })
    .then(response => response.data)
}

