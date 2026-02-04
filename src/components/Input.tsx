type InputProps = {
    label: string;
    text: string;
    value: string;
    pattern: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: () => void;
}

export const Input = ({ label, text, value, pattern, onChange, onClick }: InputProps) => {
    return (
        <>
            <label htmlFor={label} className='flex col-start-2 items-center justify-end-safe text-white'>{text}</label>
            <input id={label} type='text' value={value} pattern={pattern} onChange={onChange} onClick={onClick}
                className='col-start-3 border-1 border-black rounded m-1 pl-1 text-gray-700 bg-white' />
        </>
    )
}
