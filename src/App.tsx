import './index.css';
import { Button } from './components/Button';
import { InputField } from './components/InputField';
import { VenueInputField } from './components/VenueInputField';
import React, { useState, useEffect } from 'react';
import { fetchVenueStaticData } from './services/fetchVenueStaticData';
import { calculateDistance } from './functions/calculateDistance';

export type Venue = {
    name: string,
    slug: string,
    longitude: number,
    latitude: number,
}

function App() {
    const [venue, setVenue] = useState<Venue>();
    const [cartValue, setCartValue] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [distance, setDistance] = useState(0);
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);
    const [filtered, setFiltered] = useState<string[]>([])
    const [availableVenues, setAvailableVenues] = useState<Venue[]>([])
    const possibleVenues = [
        'home-assignment-venue-helsinki',
        'home-assignment-venue-tallinn'
    ]

    useEffect(() => {
        fetchVenueStaticData(possibleVenues)
            .then(setAvailableVenues)
            .catch(console.error)
    }, [])

    // console.log('Available venues:', availableVenues);

    // const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     console.log('CLICK');
    // }

    // const handleVenueOptionClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setVenue(event.target.value);
    //     console.log('VENUE:', venue);
    // }

    const onLocationClick = () => {

    }

    const onCalculationClick = () => {
        if (venue && latitude && longitude) {
            setDistance(calculateDistance(venue, Number(latitude), Number(longitude)));
            setPrice();
        }
    }

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        switch (field) {
            case 'venue':
                const newVenue = availableVenues.find(v => v.name === event.target.value);
                setVenue(newVenue);
                console.log('VENUE:', venue);
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
            <div className='grid grid-cols-5 relative gap-1'>
                <VenueInputField label='venueSlug' text='Venue' value={venue} 
                    onChange={(e) => handleInput(e, 'venue')} />
                <InputField label='cartValue' text='Cart value' value={cartValue} placeholder='Insert cart value' 
                    onChange={(e) => handleInput(e, 'cart')} />
                <InputField label='userLatitude' text='Latitude' value={latitude} placeholder='Insert your latitude' 
                    onChange={(e) => handleInput(e, 'latitude')} />
                <InputField label='userLongitude' text='Longitude' value={longitude} placeholder='Insert your longitude' 
                    onChange={(e) => handleInput(e, 'longitude')} />
                <Button text='Get location' onClick={onLocationClick}/>
                <Button text='Calculate delivery price' onClick={onCalculationClick}/>
            </div>
            {price && <PriceBreakdown cartValue={Number(cartValue)} distance={distance} />}
        </div>
    )
}

export default App
