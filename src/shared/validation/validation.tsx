
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
    // if (value.trim().length === 0) {
    //     return 'this field is required'
    // }
    return ''

}

export const max = (size = 20) => (value: string) => {
    if (value.trim().length > size) {
        return `max ${size} simbol is required`
    }
    return ''
}

export const email = (value: string) => {
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    if (!EMAIL_REGEXP.test(value)) {
        return 'valid E-mail required'
    }
    return ''

}