import { useState } from "react"
import { Link } from "react-router-dom"
import { ROUTES } from "shared/consts"

import { API } from 'services'

const SignIn = () => {

    const [formState, setFormState] = useState({
        email: {
            value: '',
            message: '',
            blured: false
        },
        password: {
            value: '',
            message: '',
            blured: false
        }
    })

    const [response, setResponse] = useState({ message: '', error: '' })

    const { auth } = API.gameService()

    const AUTH_API_PATH = 'http://localhost/auth'

    const signIn = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        const data = {
            email: formState.email.value,
            password: formState.password.value,

        }

        auth(`${AUTH_API_PATH}/signIn`, 'POST', data)
            .then((data: any) => setResponse(data))

        formState.email.value = ''
        formState.password.value = ''
    }

    console.log(response)

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <section className='signin'>
                <form className='signin-form'>
                    <h1 className='signin-form-label'>Log in</h1>
                    <div className="inputbox">
                        <input
                            type="email"
                            value={formState.email.value}
                            onChange={(e) => setFormState((prev) => ({
                                ...prev,
                                email: {
                                    ...prev.email,
                                    value: e.target.value
                                }
                            }))}
                            onBlur={() => setFormState((prev) => ({
                                ...prev,
                                email: {
                                    ...prev.email,
                                    blured: true
                                }
                            }))}
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
                        <p>Don't have a account      <Link
                            to={ROUTES.SIGNUP}
                        >
                            Register
                        </Link></p>
                    </div>
                </form>
            </section>
            <div>
                <span>{(response.error === 'wrong email or password') ? <span>Wrong email or password</span> : <span>You have successfully logged in</span>}</span>
            </div>
        </div>
    )
}

export default SignIn