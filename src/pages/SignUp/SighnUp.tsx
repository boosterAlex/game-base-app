import { useState } from 'react'
import { API } from 'services'

import './SignUp.scss'
import { isRequired, min, max, email } from 'shared/validation/validation'

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
            validation: [email],
        },
        password: {
            value: '',
            message: '',
            blured: false,
            validation: [isRequired, min()],
        },
        nickname: {
            value: '',
            message: '',
            blured: false,
            validation: [isRequired, min()],
        },
        phone_number: {
            value: '',
            message: '',
            blured: false,
            validation: [isRequired, min()],
        },
    })

    const [response, setResponse] = useState({ message: '', error: '' })
    const [validationMessage, setValidationMessage] = useState('')

    const { auth } = API.gameService()

    const signUp = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (validateFields()) {
            registerUser()
        }

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
        let isValid = true
        Object.entries(formState).forEach(([key, value]) => {
            let prevMessage = ''
            value.validation.forEach((func: Function) => {
                let message = func(value.value)
                if (message && prevMessage === '') {
                    prevMessage = message
                    isValid = false
                    setFormState((prev: any) => ({
                        ...prev,
                        [key]: {
                            ...prev[key],
                            message
                        }
                    }))
                }
            })

        })
        return isValid
    }

    const validateField = (field: FormFields, value: string) => {
        for (const func of formState[field].validation) {
            let message = func(value)

            if (message) {
                setFormState((prev: any) => ({
                    ...prev,
                    [field]: {
                        ...prev[field],
                        message
                    }
                }))
                break
            }
            else {
                setFormState((prev: any) => ({
                    ...prev,
                    [field]: {
                        ...prev[field],
                        message: ''
                    }
                }))
            }
        }

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
                        {formState.email.message ? <label htmlFor="" style={{ color: '#f24e4e' }}>{formState.email.message}</label> : <label htmlFor="">Email</label>}
                    </div>
                    <div className="inputbox">
                        <input
                            name='password'
                            type="password"
                            value={formState.password.value}
                            onChange={(e) => {
                                setFormState((prev) => ({
                                    ...prev,
                                    password: {
                                        ...prev.password,
                                        value: e.target.value
                                    }
                                }))
                                validateField(FormFields.password, e.target.value)
                            }
                            }
                            onBlur={(e) => {
                                setFormState((prev) => ({
                                    ...prev,
                                    password: {
                                        ...prev.password,
                                        blured: true
                                    }
                                }))
                                validateField(FormFields.password, e.target.value)
                            }}
                            required />
                        {formState.password.message ? <label htmlFor="password" style={{ color: '#f24e4e' }}>{formState.password.message}</label> : <label htmlFor="password">Create a password</label>}
                    </div>
                    <div className="inputbox">
                        <input
                            type="text"
                            value={formState.nickname.value}
                            onChange={(e) => {
                                setFormState((prev) => ({
                                    ...prev,
                                    nickname: {
                                        ...prev.nickname,
                                        value: e.target.value
                                    }
                                }))
                                validateField(FormFields.nickname, e.target.value)
                            }
                            }
                            onBlur={(e) => {
                                setFormState((prev) => ({
                                    ...prev,
                                    nickname: {
                                        ...prev.nickname,
                                        blured: true
                                    }
                                }))
                                validateField(FormFields.nickname, e.target.value)
                            }}
                            required />
                        {formState.nickname.message ? <label htmlFor="" style={{ color: '#f24e4e' }}>{formState.nickname.message}</label> : <label htmlFor="">Nickname</label>}
                    </div>
                    <div className="inputbox">
                        <input
                            type="phone"
                            value={formState.phone_number.value}
                            onChange={(e) => {
                                setFormState((prev) => ({
                                    ...prev,
                                    phone_number: {
                                        ...prev.phone_number,
                                        value: e.target.value
                                    }
                                }))
                                validateField(FormFields.phone_number, e.target.value)
                            }
                            }
                            onBlur={(e) => {
                                setFormState((prev) => ({
                                    ...prev,
                                    phone_number: {
                                        ...prev.phone_number,
                                        blured: true
                                    }
                                }))
                                validateField(FormFields.phone_number, e.target.value)
                            }}
                            required />
                        {formState.phone_number.message ? <label htmlFor="" style={{ color: '#f24e4e' }}>{formState.phone_number.message}</label> : <label htmlFor="">Phone number</label>}
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