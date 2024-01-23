
export const isRequired = (value: string) => {

    if (value.trim().length === 0) {
        return 'This field is required'
    }
    return ''
}

export const min = (size = 10) => (value: string) => {
    if (value.trim().length < size) {
        return `Min ${size} simbol is required`
    }
    return ''

}

export const max = (size = 20) => (value: string) => {
    if (value.trim().length > size) {
        return `Max ${size} simbol is required`
    }
    return ''
}

export const email = (value: string) => {
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    if (!EMAIL_REGEXP.test(value)) {
        return 'Valid E-mail is required'
    }
    return ''

}
export const password = (value: string) => {
    const patterns = {
        numeric: /(?=.*[0-9])/g,
        lower: /(?=.*[a-z])/g,
        upper: /(?=.*[A-Z])/g,
        count: /[0-9a-zA-Z!@#$%^&*]{8,}/g
    }

    if (!patterns.numeric.test(value)) {
        return 'Сontains a number'
    } else if
        (!patterns.lower.test(value)) {
        return 'Сontains a lowercase letter'
    } else if
        (!patterns.upper.test(value)) {
        return 'Contains a uppercase letter'
    }
    return ''
}
export const phone = (value: string) => {
    const PHONE_REGEXP = /\+375\d{9}/g

    if (!PHONE_REGEXP.test(value)) {
        return 'Number in the format +375XXXXXXXXX'
    }
    return ''
}