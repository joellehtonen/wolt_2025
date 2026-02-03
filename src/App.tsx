import './index.css'
import { Button } from './components/Button'
import { Input } from './components/Input'
import React, { useState } from 'react'

function App() {
    const [venue, setVenue] = useState('Select your venue')
    const [cartValue, setCartValue] = useState('Insert cart value')
    const [latitude, setLatitude] = useState('Insert your latitude')
    const [longitude, setLongitude] = useState('Insert your longitude')

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        switch (field) {
            case 'venue':
                setVenue(event.target.value)
                break
            case 'cart':
                setCartValue(event.target.value)
                break
            case 'latitude':
                setLatitude(event.target.value)
                break
            case 'longitude':
                setLongitude(event.target.value)
                break
        }
    }

    return (
        <div className='min-h-screen min-w-screen bg-[#00C2E8]'>
            <h1 className='text-white flex justify-center p-5'>Delivery Order Price Calculator</h1>
            <div className='grid grid-cols-5 gap-1'>
                <Input label='venueSlug' text='Venue' value={venue} pattern='[A-za-z]' onChange={(e) => handleInput(e, 'venue')}/>
                <Input label='cartValue' text='Cart value' value={cartValue} pattern='[A-za-z0-9]' onChange={(e) => handleInput(e, 'cart')}/>
                <Input label='userLatitude' text='Latitude' value={latitude} pattern='[A-za-z0-9]' onChange={(e) => handleInput(e, 'latitude')}/>
                <Input label='userLongitude' text='Longitude' value={longitude} pattern='[A-za-z0-9]' onChange={(e) => handleInput(e, 'longitude')}/>
                <Button text='Get location' />
                <Button text='Calculate delivery price' />
            </div>
        </div>
    )
}

export default App
