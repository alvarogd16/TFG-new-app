export const get = async (route = '') => {
    return await fetch('/api' + route)
}

export const post = async (route = '', body = {}) => {
    return await fetch('/api' + route, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const put = async (route = '', body = {}) => {
    return await fetch('/api' + route, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}