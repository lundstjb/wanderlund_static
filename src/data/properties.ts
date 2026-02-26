export interface Property {
  id: string;
  slug: string;
  title: string;
  location: string;
  price: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  image: string;
  description: string;
  amenities: string[];
}

export const properties: Property[] = [
  {
    id: '1',
    slug: 'modern-mountain-retreat',
    title: 'Modern Mountain Retreat',
    location: 'Shenandoah Valley, VA',
    price: '$250/night',
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800',
    description: 'A stunning modern retreat nestled in the heart of the Shenandoah Valley. Perfect for families looking for a peaceful getaway.',
    amenities: ['Hot Tub', 'Wi-Fi', 'Full Kitchen', 'Mountain View', 'Fire Pit']
  },
  {
    id: '2',
    slug: 'cozy-hudson-cabin',
    title: 'Cozy Hudson Cabin',
    location: 'Hudson Valley, NY',
    price: '$180/night',
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    image: 'https://images.unsplash.com/photo-1449156001437-37c64b6e50b7?auto=format&fit=crop&q=80&w=800',
    description: 'Experience the magic of the Hudson Valley in this charming, hand-crafted log cabin. Close to hiking trails and local farm stands.',
    amenities: ['Fireplace', 'Pet Friendly', 'Deck', 'Hiking Trails', 'Gas Grill']
  },
  {
    id: '3',
    slug: 'teton-luxury-villa',
    title: 'Teton Luxury Villa',
    location: 'Driggs, ID',
    price: '$450/night',
    guests: 10,
    bedrooms: 5,
    bathrooms: 4,
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=800',
    description: 'Premier luxury living in Teton Valley. This expansive villa offers breathtaking views and top-of-the-line amenities for groups.',
    amenities: ['Chef\'s Kitchen', 'Theater Room', 'Sauna', 'Ski-in/Ski-out', 'Panoramic Views']
  }
];
