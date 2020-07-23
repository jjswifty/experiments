let WIDGET_ID = 226;

// API

const instance = axios.create({
    baseURL: 'https://repetitora.net/api/JS/'
});

const imagesAPI = {
    getImages(page, count) {
        return instance.get(`Images?page=${page}&count=${count}`)
            .then(response => response.data)
    }
}

const todoAPI = {
    getTasks(widgetId = WIDGET_ID, page = 1, count = 99) {
        return instance.get(`tasks?widgetId=${widgetId}&page=${page}&count=${count}`)
            .then(response => response.data)
    },

    createTask(widgetId = WIDGET_ID, title) {
        return instance.post(`Tasks`, {
                widgetId,
                title
            })
            .then(response => response.data)
    },

    deleteTask(widgetId = WIDGET_ID, taskId) {
        return instance.delete(`Tasks?widgetId=${widgetId}&taskId=${taskId}`)
            .then(response => response.data)
    },

    toggleTask(widgetId = WIDGET_ID, taskId, done) {
        return instance.put(`Tasks`, {
                widgetId,
                taskId,
                done
            })
            .then(response => response.data)
    }
}