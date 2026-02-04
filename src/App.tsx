import './index.css'
import { Button } from './components/Button'
import { Input } from './components/Input'
import React, { useState, useEffect } from 'react'
import { fetchVenueStaticData } from './services/fetchVenueStaticData'

function App() {
    const [venue, setVenue] = useState('Select your venue');
    const [cartValue, setCartValue] = useState('Insert cart value');
    const [latitude, setLatitude] = useState('Insert your latitude');
    const [longitude, setLongitude] = useState('Insert your longitude');
    const [availableVenues, setAvailableVenues] = useState([])
    const [loading, setLoading] = useState(false);
    const slugs = [
        'home-assignment-venue-helsinki',
        'home-assignment-venue-tallinn'
    ]

    useEffect(() => {
        fetchVenueStaticData(slugs)
        .then(set)

    }, [])

    const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('CLICK');

        if (event.target.value === event.target.defaultValue) {
            event.target.value = '';
        }
    }

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        switch (field) {
            case 'venue':
                setVenue(event.target.value);
                break;
            case 'cart':
                setCartValue(event.target.value);
                break;
            case 'latitude':
                setLatitude(event.target.value);
                break;
            case 'longitude':
                setLongitude(event.target.value);
                break;
        }
    }

    return (
        <div className='min-h-screen min-w-screen bg-[#00C2E8]'>
            <h1 className='text-white flex justify-center p-5'>Delivery Order Price Calculator</h1>
            <div className='grid grid-cols-5 gap-1'>
                <Input label='venueSlug' text='Venue' value={venue} pattern='^[A-Za-z]+$' onChange={(e) => handleInput(e, 'venue')} onClick={handleClick} />
                <Input label='cartValue' text='Cart value' value={cartValue} pattern='^[A-Za-z0-9]+$' onChange={(e) => handleInput(e, 'cart')} onClick={handleClick} />
                <Input label='userLatitude' text='Latitude' value={latitude} pattern='^[A-Za-z0-9]+$' onChange={(e) => handleInput(e, 'latitude')} onClick={handleClick} />
                <Input label='userLongitude' text='Longitude' value={longitude} pattern='^[A-Za-z0-9]+$' onChange={(e) => handleInput(e, 'longitude')} onClick={handleClick} />
                <Button text='Get location' />
                <Button text='Calculate delivery price' />
            </div>
        </div>
    )
}

export default App
