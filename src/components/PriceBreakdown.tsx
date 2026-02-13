import type { Price } from "../App"

type PriceProps = {
    price: Price,
    cartValue: number,
    distance: number
}

export const PriceBreakdown = ({ price, cartValue, distance }: PriceProps) => {

    const textClass = 'text-right';
    const valueClass = 'text-center';
    const smallOrderSurchargeCorrected = price.smallOrderSurcharge / 100;
    const deliveryFeeCorrected = price.deliveryFee / 100;

    return (
            <div className='grid grid-cols-2 col-start-2 col-span-2 text-white font-["Overpass"] gap-y-3 my-5'>
                <span className={textClass}>Cart value</span>
                <span className={valueClass}>{cartValue}€</span>
                <span className={textClass}>Distance</span>
                <span className={valueClass}>{distance}m</span>
                <span className={textClass}>Small order surcharge</span>
                <span className={valueClass}>{smallOrderSurchargeCorrected}€</span>
                <span className={textClass}>Delivery fee</span>
                <span className={valueClass}>{deliveryFeeCorrected}0€</span>
                <span className={`${textClass}`}>IN TOTAL</span>
                <span className={`${valueClass} text-xl font-bold`}>{cartValue + smallOrderSurchargeCorrected + deliveryFeeCorrected}0€</span>
            </div>
    )
}



