import './index.css';
import { Button } from './components/Button';
import { InputField } from './components/InputField';
import { VenueInputField } from './components/VenueInputField';
import React, { useState, useEffect } from 'react';
import { fetchVenueStaticData } from './services/fetchVenueStaticData';
import { calculateDistance } from './functions/calculateDistance';
import { calculatePrice } from './functions/calculatePrice';
import { fetchVenueDynamicData } from './services/fetchVenueDynamicData';
import { PriceBreakdown } from './components/PriceBreakdown';

export type Venue = {
    name: string,
    slug: string,
    longitude: number,
    latitude: number
}

export type VenueInfo = {
    minimumOrder: number,
    basePrice: number,
    distanceRanges: DistanceRanges[]
}

export type DistanceRanges = {
    min: number,
    max: number,
    a: number,
    b: number
}

export type Price = {
    deliveryFee: number,
    smallOrderSurcharge: number
}

function App() {
    const [venue, setVenue] = useState<Venue | null>(null);
    const [venueInfo, setVenueInfo] = useState<VenueInfo | null>(null);
    const [venueInput, setVenueInput] = useState('');
    const [cartValue, setCartValue] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [deliveryDistance, setDeliveryDistance] = useState(0);
    const [price, setPrice] = useState<Price | null>(null);
    const [loading, setLoading] = useState(false);
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

    console.log('Available venues:', availableVenues);


    const handleVenueOptionClick = (clickedVenue: Venue) => {
        const rightVenue = availableVenues.find(v => v.name === clickedVenue.name);
        console.log('clickedVenue', clickedVenue);
        console.log('rightVenue', rightVenue);
        if (rightVenue) {
            setVenue(rightVenue);
            setVenueInput(rightVenue.name);
            fetchVenueDynamicData(rightVenue.slug)
                .then(setVenueInfo);
        }
        console.log('CHOSEN VENUE:', venue);
    }

    const onLocationClick = () => {

    }

    const onCalculationClick = async () => {
        if (!venue || !latitude || !longitude) 
            return ; //produce an error to UI

        try {
            setLoading(true);

            const venueDynamicData = await fetchVenueDynamicData(venue.slug);
            const distance = calculateDistance(venue, Number(latitude), Number(longitude));
            console.log('venueINFO in calculation click', venueDynamicData);
            const priceCalculation = calculatePrice(venueDynamicData, distance, Number(cartValue));

            setVenueInfo(venueDynamicData);
            setDeliveryDistance(distance);
            setPrice(priceCalculation);

            console.log('distance', distance);
            console.log('price', priceCalculation);
            setLoading(false);
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        switch (field) {
            case 'venue':
                setVenueInput(event.target.value);
                const match = availableVenues.find(v => v.name === event.target.value);
                if (match)
                    setVenue(match);
                console.log('venue:', venue);
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

    console.log('CHOSEN VENUE:', venue);

    return (
        <div className='min-h-screen min-w-screen bg-[#00C2E8]'>
            <h1 className='text-white flex justify-center p-5'>Delivery Order Price Calculator</h1>
            <div className='grid grid-cols-5 relative gap-1'>
                <VenueInputField label='venueSlug' text='Venue' value={venueInput} venues={availableVenues}
                    onChange={(e) => handleInput(e, 'venue')} onClick={handleVenueOptionClick}/>
                <InputField label='cartValue' text='Cart value' value={cartValue} placeholder='Insert cart value' 
                    onChange={(e) => handleInput(e, 'cart')} />
                <InputField label='userLatitude' text='Latitude' value={latitude} placeholder='Insert your latitude' 
                    onChange={(e) => handleInput(e, 'latitude')} />
                <InputField label='userLongitude' text='Longitude' value={longitude} placeholder='Insert your longitude' 
                    onChange={(e) => handleInput(e, 'longitude')} />
                <Button text='Get location' onClick={onLocationClick}/>
                <Button text='Calculate delivery price' onClick={onCalculationClick}/>
                {loading && 
                    <h2 className='flex col-start-3 m-2 text-xl font-bold tracking-wide justify-center'>Loading</h2>}
            </div>
            {price && 
                <PriceBreakdown price={price} cartValue={Number(cartValue)} distance={deliveryDistance} />}
        </div>
    )
}

export default App
