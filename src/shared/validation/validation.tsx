
export const isRequired = (value: string) => {

    if (value.trim().length === 0) {
        return 'this field is required'
    }
    return ''
}

export const min = (size = 10) => (value: string) => {
    if (value.trim().length < size) {
        return `min ${size} simbol is required`
    }
    return ''

}
