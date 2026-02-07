import { useEffect, useState } from 'react'
import { Dropdown } from './Dropdown';

type VenueInputProps = {
    label: string;
    text: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSelect: (event: React.MouseEvent<HTMLInputElement>) => void;
}

export const VenueInputField = ({ label, text, value, onChange, onSelect }: VenueInputProps) => {
    // const [isOpen, setIsOpen] = useState(false)

    // useEffect(() => {
    //     if (value)
    //         setIsOpen(true);
    //     else
    //         setIsOpen(false);
    // }, [value])

    return (
        <>
            <label htmlFor={label} className='flex col-start-2 items-center justify-end-safe text-white'>{text}</label>
            <div className='col-start-3 relative'>
                <input id={label} type='text' value={value} placeholder='Select the venue' pattern='^[A-Za-z]+$' 
                    onChange={onChange}
                    className='border-1 border-black rounded m-1 pl-1 text-black bg-white' />
                {/* {isOpen && (
                    <Dropdown />
                )} */}
            </div>
        </>
    )
}
