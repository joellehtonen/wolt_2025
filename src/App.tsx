import './index.css'
import { Button } from './components/Button'
import { Input } from './components/Input'

function App() {
  return (
    <div className='min-h-screen min-w-screen bg-[#00C2E8]'>
        <h1 className='text-white flex justify-center'>Delivery Order Price Calculator</h1>
        <div className='flex flex-col items-center'>
            <Input label='venueSlug' text='Venue' value='Select your venue' pattern='[A-za-z]' />
            <Input label='cartValue' text='Cart value' value='Insert cart value' pattern='[A-za-z0-9]' />
            <Input label='userLatitude' text='Latitude' value='Type user latitude' pattern='[A-za-z0-9]' />
            <Input label='userLongitude' text='Longitude' value='Type user longitude' pattern='[A-za-z0-9]' />
            <Button text='Get location' />
            <Button text='Calculate delivery price' />
        </div>
    </div>
  )
}

export default App
