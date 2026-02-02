
type InputProps = {
    label: string;
    text: string;
    value: string;
    pattern: string;
}

export const Input = ({ label, text, value, pattern }: InputProps) => {
    return (
        <div className='p-1'>
            <label htmlFor={label} className='text-white' >
                {text}
                <input id={label} type='text' value={value} pattern={pattern} 
                    className='border-1 border-black rounded m-1 text-gray-700 bg-white' />
            </label>
        </div>
    )
}
