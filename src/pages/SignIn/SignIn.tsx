import { useState } from "react"
import { Link } from "react-router-dom"
import { ROUTES } from "shared/consts"

import { API } from 'services'

import { isRequired, min, email, password } from 'shared/validation/validation'
import { useForm } from 'shared/hooks'

enum FormFields {
    email = 'email',
    password = 'password',
    nickname = 'nickname',
    phone_number = 'phone_number'
}

const SignIn = () => {

    const { validateFields, formState, onChangeState } = useForm({
        email: {
            value: '',
            errorMessage: '',
            blured: false,
            validation: [email]
        },
        password: {
            value: '',
            errorMessage: '',
            blured: false,
            validation: [isRequired, min(8), password]
        }
    })

    const [response, setResponse] = useState({ message: '', error: '' })

    const { auth } = API.gameService()

    const signIn = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (validateFields()) {
            const data = {
                email: formState.email.value,
                password: formState.password.value,

            }

            auth(`${process.env.REACT_APP_AUTH_API_PATH}/signIn`, 'POST', data)
                .then((data: any) => setResponse(data))

            formState.email.value = ''
            formState.password.value = ''
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
                    <h1 className='signin-form-label'>Log in</h1>
                    {inputBox('email', 'text', 'E-mail')}
                    {inputBox('password', 'password', 'Create a password')}
                    <div className="forget">
                        <label htmlFor=""><input type="checkbox" />Remember Me</label>
                        <a href="#">Forget Password</a>
                    </div>
                    <button
                        className='signin-form-button'
                        onClick={(e) => signIn(e)}
                    >Log in
                    </button>
                    <div className="register">
                        <p>Don't have a account
                            <Link
                                to={ROUTES.SIGNUP}
                            >
                                Register
                            </Link></p>
                    </div>
                </form>
            </section>
            <div>
                <span>{response.error || response.message}</span>
            </div>
        </div>
    )
}

export default SignIn