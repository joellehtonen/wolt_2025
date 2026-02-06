type VenueInputProps = {
    label: string;
    text: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: () => void;
    isOpen: boolean;
}

export const VenueInputField = ({ label, text, value, onChange, onClick }: VenueInputProps) => {

    return (
        <>
            <label htmlFor={label} className='flex col-start-2 items-center justify-end-safe text-white'>{text}</label>
            <input id={label} type='text' value={value} placeholder='Select the venue' pattern='^[A-Za-z]+$' onChange={onChange} onClick={onClick}
                className='col-start-3 border-1 border-black rounded m-1 pl-1 text-gray-700 bg-white' />
        </>
    )
}
