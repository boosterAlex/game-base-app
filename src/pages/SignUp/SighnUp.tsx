import { useState } from 'react'
import { API } from 'services'

import './SignUp.scss'
import { isRequired, min, max, email, password, phone } from 'shared/validation/validation'
import { useForm } from 'shared/hooks'

enum FormFields {
    email = 'email',
    password = 'password',
    nickname = 'nickname',
    phone_number = 'phone_number'
}

const SighIn = () => {

    const { validateFields, formState, onChangeState } = useForm({
        email: {
            value: '',
            errorMessage: '',
            blured: false,
            validation: [email],
        },
        password: {
            value: '',
            errorMessage: '',
            blured: false,
            validation: [isRequired, min(8), password],
        },
        nickname: {
            value: '',
            errorMessage: '',
            blured: false,
            validation: [isRequired, min(3), max(12)],
        },
        phone_number: {
            value: '',
            errorMessage: '',
            blured: false,
            validation: [isRequired, phone],
        },
    })

    const [response, setResponse] = useState({ message: '', error: '' })
    const [validationMessage, setValidationMessage] = useState('')

    const { auth } = API.gameService()

    const signUp = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (validateFields()) {
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

    }

    const inputBox = (field: keyof typeof formState, type: string, label: string) => {
        return (
            <div className="inputbox">
                <input
                    type={type}
                    value={formState[field].value}
                    onChange={(e) => {
                        onChangeState(FormFields[field], e.target.value)
                    }
                    }
                    onBlur={(e) => {
                        onChangeState(FormFields[field], e.target.value)
                    }}
                    required
                />
                {formState[field].errorMessage ? <label htmlFor="" style={{ color: '#f24e4e' }}>{formState[field].errorMessage}</label> : <label htmlFor="">{label}</label>}
            </div>
        )
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <section className='signin'>
                <form className='signin-form'>
                    <h1 className='signin-form-label'>Register</h1>
                    {inputBox('email', 'text', 'E-mail')}
                    {inputBox('password', 'password', 'Create a password')}
                    {inputBox('nickname', 'text', 'Nickname')}
                    {inputBox('phone_number', 'text', 'Phone number')}
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