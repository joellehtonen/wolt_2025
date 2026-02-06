export const Dropdown = (onSelect) => {
    return (
        <ul className='absolute top-full bg-white rounded-xl border-1 border-black'>
            <li onSelect={onSelect} className='text-black w-full m-1 p-1 text-sm hover:cursor-pointer'>home-assignment-venue-helsinki</li>
            <li className='text-black w-full m-1 p-1 text-sm hover:cursor-pointer'>home-assignment-venue-tallin</li>
        </ul>
    )
}