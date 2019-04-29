export function first(array: any[]): any {
    if (array.length) {
        return array[0]
    }
    return null
}

export function last(array: any[]): any {
    if (array.length) {
        return array[array.length - 1]
    }
    return null
}

export function debug(msg: any, type: 'log' | 'warn' | 'error' = 'log') {
    switch (type) {
        case 'log':
            console.log(msg)
            break
        case 'warn':
            console.warn(msg)
            break
        case 'error':
            console.error(msg)
            break
    }
}