type InputProps = {
    label: string;
    text: string;
    value: string;
    placeholder: string;
    className?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField = ({ label, text, value, placeholder, className, onChange }: InputProps) => {
    return (
        <>
            <label htmlFor={label} className='font-["Overpass"] tracking-wide text-shadow-lg flex col-start-2 items-center justify-end text-white'>{text}</label>
            <div className='flex col-start-3 items-center'>
                <input id={label} type='text' value={value} placeholder={placeholder} pattern='^[A-Za-z0-9]+$' onChange={onChange}
                    className={`${className} rounded m-1 pl-1 text-black bg-white`} />
            </div>    
        </>
    )
}
