export const fetchVenueDynamic = async (search: string) => {
    try {
        const response = await fetch(`https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${search}/dynamic`);

        if (!response.ok) {
            throw new Error('Unable to get venue');
        }

        const venue = await response.json();

        return venue;
    }
    catch (error) {
        console.error('Failed to fetch venue:', error);
        throw error;
    }
}