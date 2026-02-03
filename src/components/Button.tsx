type ButtonProps = {
    text: string;
    onClick: () => void;
}

export const Button = ({ text, onClick }: ButtonProps) => {
    return (
        <button type='button' onClick={onClick} 
            className='col-span-1 col-start-3 rounded-full m-1 bg-blue-500'>{text}</button>
    )
}
