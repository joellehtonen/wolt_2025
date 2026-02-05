export const fetchVenueStaticData = async (venueSlugs: string[]) => {
    try {
        const availableVenues = [];
        const baseURL = 'https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues';
        
        for (const slug of venueSlugs) {
            const response = await fetch(`${baseURL}/${slug}/static`);

            if (!response.ok) {
                throw new Error('Unable to get a venue');
            }

            const newVenue = await response.json();
            availableVenues.push(newVenue);
        }

        return availableVenues;
    }
    catch (error) {
        console.error('Failed to fetch venue:', error);
        throw error;
    }
}