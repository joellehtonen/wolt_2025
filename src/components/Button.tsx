type ButtonProps = {
    text: string;
    onClick: () => void;
}

export const Button = ({ text }: ButtonProps) => {
    return (
        <div>
            <button type='button' className='m-1'>{text}</button>
        </div>
    )
}
