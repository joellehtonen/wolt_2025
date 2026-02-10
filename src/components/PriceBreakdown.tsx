import type { Price } from "../App"

export const PriceBreakdown = (price: Price, cartValue: number, distance: number) => {

    return (
        <>
            <h2>THIS IS THE CART VALUE: {cartValue}</h2>
            <h2>THIS IS THE DISTANCE: {distance}</h2>
            <h2>THIS IS THE SMALL ORDER THING: {price.smallOrderSurcharge}</h2>
            <h2>THIS IS THE DELIVERY FEE: {price.deliveryFee}</h2>
            <h2>IN TOTAL: {cartValue + price.smallOrderSurcharge + price.deliveryFee}</h2>
        </>
    )
}