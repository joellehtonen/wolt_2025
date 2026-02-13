type ButtonProps = {
    text: string;
    onClick: () => void;
    className?: string;
}

export const Button = ({ text, onClick, className }: ButtonProps) => {
    return (
        <button type='button' onClick={onClick} 
            className={`${className} 
                font-["PT_Sans"] col-span-1 rounded-full bg-[#EFBF04] border-4 border-white 
                hover:border-black hover:shadow-lg transition ease-in-out`}>
            {text}</button>
    )
}
