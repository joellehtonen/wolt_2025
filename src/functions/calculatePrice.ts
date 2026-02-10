import type { Price, VenueInfo } from "../App"

export const calculatePrice = (venueInfo: VenueInfo | null, deliveryDistance: number, cartValue: number): Price => {
    console.log('venueInfo in calculatePrice', venueInfo);
    
    if (!venueInfo)
        throw new Error('venueInfo missing from calculatePrice');

    const lastIndex = venueInfo.distanceRanges.length - 1;
    const lastValue = venueInfo.distanceRanges.at(lastIndex);
    if (lastValue && deliveryDistance > lastValue.min)
        throw new Error('distance too great, delivery not possible');

    let distanceIndex = 0;
    for (let i = 0; i < venueInfo.distanceRanges.length; i++) {
        console.log('i is', i);
        console.log('delivery distance is', deliveryDistance);
        if (deliveryDistance < venueInfo.distanceRanges[i].max) {
            distanceIndex = i;
            break ;
        }
    }

    let smallOrderSurchargeCalculation = venueInfo.minimumOrder - cartValue;
    if (smallOrderSurchargeCalculation < 0)
        smallOrderSurchargeCalculation = 0;
    console.log('surcharge calculated');

    const deliveryFeeCalculation = venueInfo.basePrice + venueInfo.distanceRanges[distanceIndex].a + (venueInfo.distanceRanges[distanceIndex].b * deliveryDistance / 10);
    const finalPrice: Price = {
        deliveryFee: deliveryFeeCalculation,
        smallOrderSurcharge: smallOrderSurchargeCalculation,
    }
    console.log('finalPrice', finalPrice);
    return finalPrice;
}