export interface Property {
  id: string;
  slug: string;
  title: string;
  location: string;
  price: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  image: string;
  description: string;
  amenities: string[];
}

export const properties: Property[] = [
  {
    id: '1',
    slug: 'jackson-flat-old-city-knoxville',
    title: 'Jackson Flat Old City Knoxville',
    location: 'Knoxville, TN',
    price: '$250/night',
    guests: 6,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    image: '/wanderlund-static-website/images/properties/jackson/EL8A9726.jpg',
    description: "Discover the charm of downtown in our new beautifully appointed 2BR/2BA condo in the historic JFG Flats building, situated in the heart of Old City. Enjoy FREE PARKING, a king & queen bed, smart TVs in each room, & fully equipped kitchen. Steps from your door, you'll discover acclaimed restaurants, lively breweries & bars and the new Covenant Health Stadium. Whether you're in town for a weekend getaway, UT sporting event, wedding, or exploring Knoxville, our condo offers the ideal urban retreat!",
    amenities: ['Free Parking', 'Wi-Fi', 'Full Kitchen', 'Smart TVs', 'Walking Distance to Restaurants and Breweries', 'Walking Distance to Covenant Health Stadium']
  },
  {
    id: '2',
    slug: 'white-lily-old-city-knoxville',
    title: 'White Lily Old City Knoxville',
    location: 'Knoxville, TN',
    price: '$180/night',
    guests: 6,
    bedrooms: 2,
    beds: 3,
    bathrooms: 1,
    image: '/wanderlund-static-website/images/properties/white_lily/3fd1c5db-d174-4376-b57d-88d78d10e04d.jpeg',
    description: 'This new modern 2 bedroom industrial condo in the heart of Old City is the ideal place for couples, friends,  wedding guests, or small families traveling together. Enjoy FREE PARKING, two king beds, a queen pull-out couch, an oversized living/dining area, one bathroom with dual sinks and a fully equipped kitchen.  Explore restaurants, bars, breweries, shops, Smokies/ One Knox games, UT sporting events and wedding/entertainment venues such as the Mill and Mine just steps from your front door.',
    amenities: ['Free Parking', 'Wi-Fi', 'Full Kitchen', 'Smart TVs', 'Walking Distance to Restaurants and Breweries', 'Walking Distance to Covenant Health Stadium']
  },
    {
    id: '3',
    slug: 'urban-wilderness-south-knoxville',
    title: 'Urban Wilderness South Knoxville',
    location: 'Knoxville, TN',
    price: '$180/night',
    guests: 8,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    image: '/wanderlund-static-website/images/properties/sevier/1b77c686ab592bd499ae754be8b14481-uncropped_scaled_within_1536_1152.jpg',
    description: 'placeholder',
    amenities: ['Free Parking', 'Wi-Fi', 'Full Kitchen', 'Smart TVs']
  }
];

