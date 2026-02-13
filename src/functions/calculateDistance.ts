import type { Venue } from "../App";

const degreeToRadius = (degree: number) => {
        return (degree * Math.PI) / 180;
    }

//ERROR CASE if not all required numbers
export const calculateDistance = (venue: Venue, userLatitude: number, userLongitude: number) => {
    const earthRadius = 6371;
    const venueLatRadius = degreeToRadius(venue.latitude);
    const venueLonRadius = degreeToRadius(venue.longitude);
    const userLatRadius = degreeToRadius(userLatitude);
    const userLonRadius = degreeToRadius(userLongitude);

    const distance = Math.acos(
        Math.sin(venueLatRadius) * Math.sin(userLatRadius) +
        Math.cos(venueLatRadius) * Math.cos(userLatRadius) *
        Math.cos(venueLonRadius - userLonRadius))
        * earthRadius;
    
    console.log('distance is', distance);
    if (distance <= 0) {
        throw Error('Delivery distance cannot be negative');
    }

    return Math.round(distance);
}