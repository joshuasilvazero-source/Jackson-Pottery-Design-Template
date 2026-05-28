export interface Product {
  id: string
  name: string
  subtitle: string
  price: number
  originalPrice?: number
  category: string
  tags: string[]
  image: string
  hoverImage: string
  description: string
  dimensions: string
  material: string
  finish: string
  drainage: string
  usage: string
  weight: string
  isNew: boolean
  isBestseller: boolean
  inStock: boolean
}

export interface Testimonial {
  id: number
  name: string
  role: string
  location: string
  rating: number
  text: string
  image: string
}

export interface SpaceCategory {
  id: string
  name: string
  description: string
  image: string
  href: string
  count: number
}

export interface GalleryItem {
  id: number
  image: string
  alt: string
  span: 'normal' | 'tall' | 'wide'
}

export const products: Product[] = [
  {
    id: 'montserrat-terracotta-vessel',
    name: 'Montserrat Vessel',
    subtitle: 'Artisan Terracotta Series',
    price: 485,
    category: 'Terracotta',
    tags: ['terracotta', 'handcrafted', 'outdoor', 'indoor'],
    image: '/products/montserrat-featured.png',
    hoverImage: '/products/living-room-terracotta.png',
    description:
      'A sculptural statement piece hand-thrown from premium red clay. Each vessel carries the fingerprints of its maker — subtle variations in glaze and form that make it entirely your own.',
    dimensions: '16″H × 14″Ø',
    material: 'Premium fired terracotta clay',
    finish: 'Natural matte earth',
    drainage: 'Pre-drilled drainage hole',
    usage: 'Indoor / Outdoor',
    weight: '14 lbs',
    isNew: true,
    isBestseller: false,
    inStock: true,
  },
  {
    id: 'arcadia-glazed-planter',
    name: 'Arcadia Planter',
    subtitle: 'Glazed Ceramic Collection',
    price: 620,
    originalPrice: 780,
    category: 'Glazed',
    tags: ['glazed', 'ceramic', 'modern', 'indoor'],
    image: '/products/arcadia-featured.png',
    hoverImage: '/design-consultation.png',
    description:
      'Rich drip-glaze over high-fire stoneware — each piece unique where the glaze breaks and pools. The Arcadia embodies restrained elegance, equally at home in a modern interior or a sun-drenched garden.',
    dimensions: '14″H × 12″Ø',
    material: 'High-fire stoneware',
    finish: 'Reactive drip glaze',
    drainage: 'Pre-drilled drainage hole',
    usage: 'Indoor / Outdoor',
    weight: '11 lbs',
    isNew: false,
    isBestseller: true,
    inStock: true,
  },
  {
    id: 'villa-cast-stone-urn',
    name: 'Villa Urn',
    subtitle: 'Cast Stone Heritage Series',
    price: 1240,
    category: 'Cast Stone',
    tags: ['cast stone', 'classical', 'outdoor', 'large'],
    image: '/products/villa-urn-featured.png',
    hoverImage: '/products/outdoor-planter-patio.png',
    description:
      'A grand classical urn cast in weather-resistant composite stone. Its timeless profile suits estate gardens, grand entrances, and any space demanding a true architectural statement.',
    dimensions: '28″H × 22″Ø',
    material: 'Composite cast stone',
    finish: 'Aged limestone patina',
    drainage: 'Integrated drainage system',
    usage: 'Outdoor only',
    weight: '68 lbs',
    isNew: false,
    isBestseller: true,
    inStock: true,
  },
  {
    id: 'canyon-lightweight-planter',
    name: 'Canyon Planter',
    subtitle: 'Lightweight Architectural Series',
    price: 365,
    category: 'Lightweight',
    tags: ['lightweight', 'modern', 'balcony', 'rooftop'],
    image: '/products/canyon-featured.png',
    hoverImage: '/products/balcony-planter.png',
    description:
      'Engineered fiberglass with a hand-applied concrete finish. The Canyon brings sculptural warmth to balconies and rooftops where weight constraints demand a smarter solution.',
    dimensions: '18″H × 16″Ø',
    material: 'Fiberglass / concrete composite',
    finish: 'Raw concrete texture',
    drainage: 'Pre-drilled drainage hole',
    usage: 'Indoor / Outdoor',
    weight: '6 lbs',
    isNew: true,
    isBestseller: false,
    inStock: true,
  },
  {
    id: 'meridian-metal-vessel',
    name: 'Meridian Vessel',
    subtitle: 'Brushed Metal Collection',
    price: 895,
    category: 'Metal',
    tags: ['metal', 'contemporary', 'indoor', 'designer'],
    image: '/products/meridian-featured.png',
    hoverImage: '/products/meridian-hover.png',
    description:
      'Dark hammered and etched metalwork with a hand-finished antique patina. The Meridian commands attention — an heirloom vessel for design-forward interiors and collector spaces.',
    dimensions: '24″H × 18″Ø',
    material: 'Hammered bronze-finish metal',
    finish: 'Antique dark patina',
    drainage: 'Integrated drainage channels',
    usage: 'Indoor / Outdoor',
    weight: '22 lbs',
    isNew: false,
    isBestseller: false,
    inStock: true,
  },
  {
    id: 'solstice-glazed-bowl',
    name: 'Solstice Bowl',
    subtitle: 'Low Profile Artisan Series',
    price: 295,
    category: 'Glazed',
    tags: ['glazed', 'bowl', 'indoor', 'tabletop'],
    image: '/products/solstice-featured.png',
    hoverImage: '/products/lawn-fountain.png',
    description:
      'A wide, low-profile bowl finished in a rich crimson glaze. Perfect for trailing plants, herbs, or a sculptural display — it brings warmth and colour to any surface it rests on.',
    dimensions: '7″H × 18″Ø',
    material: 'High-fire stoneware',
    finish: 'Crimson reactive glaze',
    drainage: 'Three drainage holes',
    usage: 'Indoor / Outdoor',
    weight: '9 lbs',
    isNew: false,
    isBestseller: false,
    inStock: true,
  },
]

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Principal Landscape Architect',
    location: 'Los Angeles, CA',
    rating: 5,
    text: 'Jackson Pottery transformed my client\'s entire courtyard project. The quality is beyond exceptional — these pieces feel like living sculptures. I\'ve been recommending them to every client for three years.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&q=80&fit=crop',
  },
  {
    id: 2,
    name: 'James Holloway',
    role: 'Homeowner',
    location: 'Scottsdale, AZ',
    rating: 5,
    text: 'I spent months looking for something that felt truly special for our backyard. The Villa Urn arrived and completely transformed the space — our guests ask about it every time. Worth every penny.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&q=80&fit=crop',
  },
  {
    id: 3,
    name: 'Elena Voss',
    role: 'Hospitality Design Director',
    location: 'Miami, FL',
    rating: 5,
    text: 'We outfitted our entire hotel lobby and terrace with Jackson Pottery pieces. Guests constantly ask about them. The craftsmanship holds up beautifully in Florida\'s climate — two years and counting.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&q=80&fit=crop',
  },
]

export const spaceCategories: SpaceCategory[] = [
  {
    id: 'patio',
    name: 'Patio',
    description: 'Al fresco elegance',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=750&q=80&fit=crop',
    href: '/spaces/patio',
    count: 24,
  },
  {
    id: 'garden',
    name: 'Garden',
    description: 'Naturalistic beauty',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=750&q=80&fit=crop',
    href: '/spaces/garden',
    count: 31,
  },
  {
    id: 'office',
    name: 'Office',
    description: 'Refined workspaces',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=750&q=80&fit=crop',
    href: '/spaces/office',
    count: 18,
  },
  {
    id: 'lobby',
    name: 'Lobby',
    description: 'Grand first impressions',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=750&q=80&fit=crop',
    href: '/spaces/lobby',
    count: 15,
  },
  {
    id: 'poolside',
    name: 'Poolside',
    description: 'Resort-inspired living',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=750&q=80&fit=crop',
    href: '/spaces/poolside',
    count: 12,
  },
  {
    id: 'indoor',
    name: 'Indoor Living',
    description: 'Interior warmth',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=750&q=80&fit=crop',
    href: '/spaces/indoor',
    count: 28,
  },
]

export const galleryImages: GalleryItem[] = [
  { id: 1, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop', alt: 'Luxury patio with terracotta planters', span: 'tall' },
  { id: 2, image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=800&q=80&fit=crop', alt: 'Modern interior with ceramic vessels', span: 'normal' },
  { id: 3, image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80&fit=crop', alt: 'Botanical garden setting', span: 'normal' },
  { id: 4, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80&fit=crop', alt: 'Indoor living room with greenery', span: 'tall' },
  { id: 5, image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80&fit=crop', alt: 'Glazed ceramic collection', span: 'normal' },
  { id: 6, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80&fit=crop', alt: 'Poolside luxury planters', span: 'normal' },
  { id: 7, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&fit=crop', alt: 'Office space with designer vessels', span: 'tall' },
  { id: 8, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fit=crop', alt: 'Architectural planter detail', span: 'normal' },
]

export const faqs = [
  {
    id: 1,
    question: 'What materials are your planters made from?',
    answer:
      'Our collection spans premium terracotta clay, high-fire stoneware, cast composite stone, powder-coated corten steel, and fiberglass-concrete composites. Each material is chosen for its aesthetic qualities, durability, and suitability for the intended environment.',
  },
  {
    id: 2,
    question: 'Are your planters suitable for outdoor year-round use?',
    answer:
      'Most of our collection is engineered for year-round outdoor use. Terracotta and ceramic pieces are frost-resistant down to -10°F. Cast stone and metal pieces are fully weather-proof. We recommend bringing glazed ceramics indoors if you live in areas with extreme freeze-thaw cycles.',
  },
  {
    id: 3,
    question: 'Do all planters include drainage holes?',
    answer:
      'Yes. Every planter in our collection includes pre-drilled drainage holes or integrated drainage systems to prevent root rot. Our larger vessels feature elevated internal drainage channels for optimal airflow.',
  },
  {
    id: 4,
    question: 'How do I choose the right size planter?',
    answer:
      'As a general rule, choose a planter 2–4 inches larger in diameter than your plant\'s root ball. For statement trees or large shrubs, our Villa and Canyon series in their largest formats are ideal. Our design team is available to help with plant-to-vessel pairings.',
  },
  {
    id: 5,
    question: 'Can I use these planters indoors?',
    answer:
      'Absolutely. Our entire terracotta and glazed ceramic lines are designed equally for indoor and outdoor use. We recommend a saucer or liner for indoor use. Many clients use the same vessel design both inside and out for a seamless aesthetic flow.',
  },
  {
    id: 6,
    question: 'What is your shipping and delivery process?',
    answer:
      'We ship all planters with custom protective packaging designed to survive the journey intact. Larger pieces are delivered via white-glove freight service with in-room placement. Smaller pieces ship via insured ground courier within 3–5 business days.',
  },
]
