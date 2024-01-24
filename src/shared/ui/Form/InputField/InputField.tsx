interface Props {
    type: string
    value: string
    label: string
    errorMessage: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void

}

const InputField = ({ type, value, label, errorMessage, onChange }: Props) => {
    return (
        <div className="inputbox">
            <input
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onChange}
                required
            />
            {errorMessage ? <label htmlFor="" style={{ color: '#f24e4e' }}>{errorMessage}</label> : <label htmlFor="">{label}</label>}
        </div>
    )
}

export default InputField