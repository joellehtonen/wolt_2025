export const fetchVenueDynamicData = async (venueSlug: string): Promise<Object> => {
    try {
        const baseURL = 'https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues';
        const response = await fetch(`${baseURL}/${venueSlug}/dynamic`);

        if (!response.ok) {
            throw new Error('Unable to get venue');
        }

        const venueData = await response.json();

        return venueData;
    }
    catch (error) {
        console.error('Failed to fetch venue:', error);
        throw error;
    }
}