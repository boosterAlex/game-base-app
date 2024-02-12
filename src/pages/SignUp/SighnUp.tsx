import { API } from 'services'

import './SignUp.scss'
import { isRequired, min, max, email, password, phone } from 'shared/validation/validation'
import { useForm } from 'shared/lib/hooks'
import { InputField } from 'shared/ui'

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

            auth(`${process.env.REACT_APP_AUTH_API_PATH}/signUp`, data)

            formState.email.value = ''
            formState.password.value = ''
            formState.nickname.value = ''
            formState.phone_number.value = ''
        }

    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <section className='signin'>
                <form className='signin-form'>
                    <h1 className='signin-form-label'>Register</h1>
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
                    <InputField
                        type='text'
                        value={formState.nickname.value}
                        label="Nickname"
                        errorMessage={formState.nickname.errorMessage}
                        onChange={(e) => {
                            onChangeState('nickname', e.target.value)
                        }}
                    />
                    <InputField
                        type='phone'
                        value={formState.phone_number.value}
                        label="Phone number"
                        errorMessage={formState.phone_number.errorMessage}
                        onChange={(e) => {
                            onChangeState('phone_number', e.target.value)
                        }}
                    />
                    <button
                        className='signin-form-button'
                        onClick={(e) => signUp(e)}
                    >Register</button>
                </form>
            </section>
        </div>
    )
}

export default SighIn