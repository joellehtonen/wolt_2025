type InputProps = {
    label: string;
    text: string;
    value: string;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField = ({ label, text, value, placeholder, onChange }: InputProps) => {
    return (
        <>
            <label htmlFor={label} className='flex col-start-2 items-center justify-end-safe text-white'>{text}</label>
            <div className='col-start-3'>
                <input id={label} type='text' value={value} placeholder={placeholder} pattern='^[A-Za-z0-9]+$' onChange={onChange}
                    className='border-1 border-black rounded m-1 pl-1 text-black bg-white' />
            </div>    
        </>
    )
}
