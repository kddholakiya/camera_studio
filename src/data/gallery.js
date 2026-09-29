// landscape 3:2 to match the camera's rear display

// shown on the display before the gallery starts flipping (not part of the gallery)
export const PLACEHOLDER_SRC =
  'https://images.pexels.com/photos/11196384/pexels-photo-11196384.png?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop'

export const GALLERY_IMAGES = [
  {
    src: 'https://images.pexels.com/photos/6529407/pexels-photo-6529407.png?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    category: 'Automotive',
    title: 'Chrome & Motion',
    description: 'Car shoot capturing speed, reflections and form.',
  },
  {
    src: 'https://images.pexels.com/photos/29034615/pexels-photo-29034615.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    category: 'Wedding',
    title: 'The First Look',
    description: 'Candid wedding moments, framed the way they felt.',
  },
  {
    src: 'https://images.pexels.com/photos/38526712/pexels-photo-38526712.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    category: 'Fashion',
    title: 'Studio Couture',
    description: 'Fashion portrait series with sculpted studio light.',
  },
  {
    src: 'https://images.pexels.com/photos/739104/pexels-photo-739104.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    category: 'Commercial',
    title: 'Brand in Focus',
    description: 'Product campaign built for print and social.',
  },
  {
    src: 'https://images.pexels.com/photos/35228602/pexels-photo-35228602.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    category: 'Portrait',
    title: 'Quiet Character',
    description: 'Personal portrait session in natural light.',
  },
  {
    src: 'https://images.pexels.com/photos/38661379/pexels-photo-38661379.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    category: 'Wedding',
    title: 'Golden Vows',
    description: 'Sunset ceremony coverage, start to last dance.',
  },
  {
    src: 'https://images.pexels.com/photos/36654508/pexels-photo-36654508.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    category: 'Food',
    title: 'Morning Table',
    description: 'Lifestyle food styling for a café lookbook.',
  },
  {
    src: 'https://images.pexels.com/photos/4388090/pexels-photo-4388090.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    category: 'Automotive',
    title: 'Night Drive',
    description: 'Low-light car shoot with light-painted streaks.',
  },
  {
    src: 'https://images.pexels.com/photos/13827110/pexels-photo-13827110.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    category: 'Commercial',
    title: 'Crafted Detail',
    description: 'Close-up product work for an artisan label.',
  },
  {
  src: 'https://images.pexels.com/photos/8296813/pexels-photo-8296813.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
  category: 'Engagement',
  title: 'Before Forever',
  description: 'Pre-wedding portraits focused on connection and storytelling.',
},
]

export const GALLERY_SRCS = GALLERY_IMAGES.map((img) => img.src)
