import { useEffect, useState } from 'react';
import type { Venue } from '../App';

type VenueInputProps = {
    label: string;
    text: string;
    value: string;
    venues: Venue[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: (clicked: Venue) => void;
}

export const VenueInputField = ({ label, text, value, venues, onChange, onClick }: VenueInputProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [venueNames, setVenueNames] = useState<string[]>([]);
    const [filtered, setFiltered] = useState<Venue[]>([]);

    useEffect(() => {
        const onlyNames = venues.map(v => v.name.toLowerCase());
        setVenueNames(onlyNames);
    }, [venues]);

    useEffect(() => {
        if (value) {
            const found = venueNames.filter(v => v.includes(value));
            console.log('found', found);
            if (found.length > 0) {
                console.log('REALLY FOUND');
                const matches = venues.filter(v => found.includes(v.name.toLowerCase()));
                setFiltered(matches);
                setIsOpen(true);
            }
            else
            {
                setFiltered([]);
                setIsOpen(false);
            }
            
        }
        else
            setIsOpen(false);
    }, [value]);

    return (
        <>
            <label htmlFor={label} className='flex col-start-2 items-center justify-end-safe text-white'>{text}</label>
            <div className='col-start-3 relative'>
                <input id={label} type='text' value={value} placeholder='Select the venue' pattern='^[A-Za-z]+$' 
                    onChange={onChange}
                    className='border-1 border-black rounded m-1 pl-1 text-black bg-white' />
                {isOpen && (
                    <ul className='absolute top-full bg-white rounded-xl border-1 border-black'>
                        {filtered.map((v, index) => (
                            <li key={index} 
                                onClick={() => {onClick(v); setIsOpen(false);}}
                                className='text-black w-full m-1 p-1 text-sm hover:cursor-pointer'>
                                {v.name}
                            </li>))}
                    </ul>)}
            </div>
        </>
    )
}
