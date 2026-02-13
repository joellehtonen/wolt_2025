type HeaderProps = {
    text: string;
};

export const Header = ({ text }: HeaderProps) => {
    return (
      <h1 className='font-["Oswald"] text-4xl tracking-wider text-white text-shadow-lg flex justify-center p-5'>
        {text}</h1>
    )
}

// [text-shadow:2px_2px_0_rgba(0,0,0,1)]