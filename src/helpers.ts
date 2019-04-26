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