import { useState } from "react"

const useForm = <T extends Record<string, any>>(initialState: T) => {

    const [formState, setFormState] = useState<T>(initialState)

    const onChangeState = (field: keyof T, value: string) => {
        setFormState((prev: T) => ({
            ...prev,
            [field]: {
                ...prev[field],
                value: value
            }
        }))
        validateField(field, value)

    }

    const validateField = (field: keyof T, value: string): void => {
        for (const func of formState[field].validation) {
            let errorMessage = func(value)

            if (errorMessage) {
                setFormState((prev: T) => ({
                    ...prev,
                    [field]: {
                        ...prev[field as keyof T],
                        errorMessage
                    }
                }))
                break
            }
            else {
                setFormState((prev: T) => ({
                    ...prev,
                    [field]: {
                        ...prev[field as keyof T],
                        errorMessage: ''
                    }
                }))
            }
        }

    }
    const validateFields = () => {
        let isValid = true
        Object.entries(formState).forEach(([key, value]: [keyof T, any]) => {
            let prevErrorMessage = ''
            value.validation.forEach((func: Function) => {
                let errorMessage = func(value.value)
                if (errorMessage && prevErrorMessage === '') {
                    prevErrorMessage = errorMessage
                    isValid = false
                    setFormState((prev: T) => ({
                        ...prev,
                        [key]: {
                            ...prev[key as keyof T],
                            errorMessage
                        }
                    }))
                }
            })

        })
        return isValid
    }

    return { validateFields, formState, onChangeState }

}

export default useForm