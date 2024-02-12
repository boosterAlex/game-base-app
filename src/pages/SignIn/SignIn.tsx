import { useState } from "react"
import { Link } from "react-router-dom"

import { ROUTES } from "shared/consts"
import { API } from 'services'

import { isRequired, min, email, password } from 'shared/validation/validation'
import { useForm } from 'shared/lib/hooks'
import { InputField } from "shared/ui"

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

    const [response, setResponse] = useState({ message: null, error: null })

    const { auth } = API.gameService()

    const signIn = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (validateFields()) {
            const data = {
                email: formState.email.value,
                password: formState.password.value,
            }

            auth(`${process.env.REACT_APP_AUTH_API_PATH}/signIn`, data)
                .then((data: any) => setResponse(data))

            formState.email.value = ''
            formState.password.value = ''
        }

    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <section className='signin'>
                <form className='signin-form'>
                    <h1 className='signin-form-label'>Log in</h1>
                    <InputField
                        type='text'
                        value={formState.email.value}
                        label="E-mail"
                        errorMessage={formState.email.errorMessage}
                        onChange={(e) => {
                            onChangeState('email', e.target.value)
                        }}
                    />
                    <InputField
                        type='password'
                        value={formState.password.value}
                        label="Create a password"
                        errorMessage={formState.password.errorMessage}
                        onChange={(e) => {
                            onChangeState('password', e.target.value)
                        }}
                    />
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
                {response.error && <span>{response.error}</span>}
                {response.message && <span>{response.message}</span>}
            </div>
        </div>
    )
}

export default SignIn