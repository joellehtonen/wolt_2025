import './index.css';
import React, { useState, useEffect } from 'react';
import { Button } from './components/Button';
import { InputField } from './components/InputField';
import { VenueInputField } from './components/VenueInputField';
import { PriceBreakdown } from './components/PriceBreakdown';
import { Header } from './components/Header';
import { fetchVenueStaticData } from './services/fetchVenueStaticData';
import { calculateDistance } from './functions/calculateDistance';
import { calculatePrice } from './functions/calculatePrice';
import { fetchVenueDynamicData } from './services/fetchVenueDynamicData';

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
    const [cartValueInput, setCartValueInput] = useState('');
    const [cartValueLocked, setCartValueLocked] = useState(0);
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
        try {
            if (!venue || !latitude || !longitude) 
                throw Error('Something missing'); //produce an error to UI
            if (!cartValueInput) 
                throw Error('Cartvalue missing'); //produce an error to UI

            setLoading(true);
            setCartValueLocked(Number(cartValueInput));

            const venueDynamicData = await fetchVenueDynamicData(venue.slug);
            const distance = calculateDistance(venue, Number(latitude), Number(longitude));
            console.log('venueINFO in calculation click', venueDynamicData);
            const priceCalculation = calculatePrice(venueDynamicData, distance, cartValueLocked);

            setVenueInfo(venueDynamicData);
            setDeliveryDistance(distance);
            setPrice(priceCalculation);

            console.log('distance', distance);
            console.log('distance in set', deliveryDistance);
            console.log('price', priceCalculation);
            console.log('price in state', price);
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
                setCartValueInput(event.target.value);
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
    console.log('cartValue', cartValueLocked);
    console.log('distance', deliveryDistance);

    return (
        <div className='min-h-screen min-w-screen bg-[#2D68C4]'>
            <Header text='Delivery Order Price Calculator'></Header>
            <div className='grid grid-cols-5 grid-rows-5 relative gap-1'>
                <VenueInputField label='venueSlug' text='Venue' value={venueInput} venues={availableVenues}
                    onChange={(e) => handleInput(e, 'venue')} onClick={handleVenueOptionClick}/>
                <InputField label='cartValue' text='Cart value' value={cartValueInput} placeholder='Insert cart value' 
                    onChange={(e) => handleInput(e, 'cart')} />
                <InputField label='userLatitude' text='Latitude' value={latitude} placeholder='Insert your latitude' 
                    onChange={(e) => handleInput(e, 'latitude')} className='' />
                <InputField label='userLongitude' text='Longitude' value={longitude} placeholder='Insert your longitude' 
                    onChange={(e) => handleInput(e, 'longitude')} className='' />
                <Button text='Get location' onClick={onLocationClick} 
                    className='row-start-3 col-start-4 row-span-2 m-7' />
                <Button text='Calculate delivery price' onClick={onCalculationClick}
                    className='col-start-3 !bg-[#50C878]' />
                {loading && 
                    <h2 className='font-["Oswald"] uppercase text-shadow-lg/20 flex col-start-3 m-2 text-2xl text-white tracking-wider justify-center'>Loading...</h2>}
                {price && !loading && 
                    <PriceBreakdown price={price} cartValue={cartValueLocked} distance={deliveryDistance} />}
            </div>
        </div>
    )
}

export default App
