import { useState } from 'react'
import { API } from 'services'

import './SignUp.scss'
import { isRequired, min } from 'shared/validation/validation'

enum FormFields {
    email = 'email',
    password = 'password',
    nickname = 'nickname',
    phone_number = 'phone_number'
}

const SighIn = () => {

    const [formState, setFormState] = useState({
        email: {
            value: '',
            message: '',
            blured: false,
            validation: [isRequired, min(20)]
        },
        password: {
            value: '',
            message: '',
            blured: false,
            validation: [isRequired, min]
        },
        nickname: {
            value: '',
            message: '',
            blured: false,
            validation: [isRequired, min]
        },
        phone_number: {
            value: '',
            message: '',
            blured: false,
            validation: [isRequired, min]
        },
    })

    const [response, setResponse] = useState({ message: '', error: '' })
    const [validationMessage, setValidationMessage] = useState('')

    const { auth } = API.gameService()

    const signUp = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        validateFields()
    }

    const registerUser = () => {

        const data = {
            email: formState.email.value,
            password: formState.password.value,
            nickname: formState.nickname.value,
            phone_number: formState.phone_number.value
        }

        auth(`${process.env.REACT_APP_AUTH_API_PATH}/signUp`, 'POST', data)
            .then((data: any) => setResponse(data))

        formState.email.value = ''
        formState.password.value = ''
        formState.nickname.value = ''
        formState.phone_number.value = ''

        setValidationMessage('')

    }

    const validateFields = () => {
        Object.entries(formState).forEach(([key, value]) => {
            if (value.blured) {
                value.validation.forEach((func: Function) => {
                    let message = func(value.value)
                    if (message) {
                        setFormState((prev: any) => ({
                            ...prev,
                            [key]: {
                                ...prev[key],
                                message
                            }
                        }))
                    } else {
                        setFormState((prev: any) => ({
                            ...prev,
                            [key]: {
                                ...prev[key],
                                message: ''
                            }
                        }))
                    }
                })
            }

        })
    }

    const validateField = (field: FormFields, value: string) => {
        formState[field].validation?.forEach((func: Function) => {
            let message = func(value)

            console.log(message)

            if (message) {
                setFormState((prev: any) => ({
                    ...prev,
                    [field]: {
                        ...prev[field],
                        message
                    }
                }))
            } else {
                setFormState((prev: any) => ({
                    ...prev,
                    [field]: {
                        ...prev[field],
                        message: ''
                    }
                }))
            }
        });
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <section className='signin'>
                <form className='signin-form'>
                    <h1 className='signin-form-label'>Register</h1>
                    <div className="inputbox">
                        <input
                            type="email"
                            value={formState.email.value}
                            onChange={(e) => {
                                setFormState((prev) => ({
                                    ...prev,
                                    email: {
                                        ...prev.email,
                                        value: e.target.value
                                    }
                                }))
                                validateField(FormFields.email, e.target.value)
                            }
                            }
                            onBlur={(e) => {
                                setFormState((prev) => ({
                                    ...prev,
                                    email: {
                                        ...prev.email,
                                        blured: true
                                    }
                                }))
                                validateField(FormFields.email, e.target.value)
                            }}
                            required
                        />
                        <label htmlFor="">{formState.email.message || 'Email'}</label>
                    </div>
                    <div className="inputbox">
                        <input
                            type="password"
                            value={formState.password.value}
                            onChange={(e) => setFormState((prev) => ({
                                ...prev,
                                password: {
                                    ...prev.password,
                                    value: e.target.value
                                }
                            }))}
                            onBlur={() => setFormState((prev) => ({
                                ...prev,
                                password: {
                                    ...prev.password,
                                    blured: true
                                }
                            }))}
                            required />
                        <label htmlFor="">Create a password</label>
                    </div>
                    <div className="inputbox">
                        <input
                            type="text"
                            value={formState.nickname.value}
                            onChange={(e) => setFormState((prev) => ({
                                ...prev,
                                nickname: {
                                    ...prev.nickname,
                                    value: e.target.value
                                }
                            }))}
                            onBlur={() => setFormState((prev) => ({
                                ...prev,
                                nickname: {
                                    ...prev.nickname,
                                    blured: true
                                }
                            }))}
                            required />
                        <label htmlFor="">Nickname</label>
                    </div>
                    <div className="inputbox">
                        <input
                            type="phone"
                            value={formState.phone_number.value}
                            onChange={(e) => setFormState((prev) => ({
                                ...prev,
                                phone_number: {
                                    ...prev.phone_number,
                                    value: e.target.value
                                }
                            }))}
                            onBlur={() => setFormState((prev) => ({
                                ...prev,
                                phone_number: {
                                    ...prev.phone_number,
                                    blured: true
                                }
                            }))}
                            required />
                        <label htmlFor="">Phone number</label>
                    </div>
                    <button
                        className='signin-form-button'
                        onClick={(e) => signUp(e)}
                    >Register</button>
                </form>

            </section>

            <div>
                <span>{(response.error) && <span>User already exists</span>}</span>
                <span>{(response.message) && <span>User was created successfully</span>}</span>
                <span>{validationMessage && validationMessage}</span>
            </div>

        </div>
    )
}

export default SighIn