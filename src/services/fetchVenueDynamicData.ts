import type { VenueInfo } from '../App';

export const fetchVenueDynamicData = async (venueSlug: string): Promise<VenueInfo> => {
    console.log('IN FETCH DYNAMIC');
    try {
        const baseURL = 'https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues';
        const response = await fetch(`${baseURL}/${venueSlug}/dynamic`);

        if (!response.ok) {
            throw new Error('Unable to get venue');
        }

        const venueRawData = await response.json();
        const venueInfo: VenueInfo = {
            minimum_order: venueRawData.venue_raw.delivery_specs.order_minimum_no_surcharge,
            base_price: venueRawData.venue_raw.delivery_specs.delivery_pricing.base_price,
            distance_ranges: venueRawData.venue_raw.delivery_specs.delivery_pricing.distance_ranges
        };
        console.log('venueInfo', venueInfo);
        return venueInfo;
    }
    catch (error) {
        console.error('Failed to fetch venue:', error);
        throw error;
    }
}