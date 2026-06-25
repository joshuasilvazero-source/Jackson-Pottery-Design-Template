export interface Product {
  id: string
  name: string
  subtitle: string
  price: number
  wholesalePrice: number
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
  wholesaleOnly: boolean
}

export const products: Product[] = [
  {
    id: 'montserrat-terracotta-vessel',
    name: 'Montserrat Vessel',
    subtitle: 'Artisan Terracotta Series',
    price: 485,
    wholesalePrice: 291,
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
    wholesaleOnly: false,
  },
  {
    id: 'arcadia-glazed-planter',
    name: 'Arcadia Planter',
    subtitle: 'Glazed Ceramic Collection',
    price: 620,
    wholesalePrice: 372,
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
    wholesaleOnly: false,
  },
  {
    id: 'villa-cast-stone-urn',
    name: 'Villa Urn',
    subtitle: 'Cast Stone Heritage Series',
    price: 1240,
    wholesalePrice: 744,
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
    wholesaleOnly: true,
  },
  {
    id: 'canyon-lightweight-planter',
    name: 'Canyon Planter',
    subtitle: 'Lightweight Architectural Series',
    price: 365,
    wholesalePrice: 219,
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
    wholesaleOnly: false,
  },
  {
    id: 'meridian-metal-vessel',
    name: 'Meridian Vessel',
    subtitle: 'Brushed Metal Collection',
    price: 895,
    wholesalePrice: 537,
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
    wholesaleOnly: true,
  },
  {
    id: 'solstice-glazed-bowl',
    name: 'Solstice Bowl',
    subtitle: 'Low Profile Artisan Series',
    price: 295,
    wholesalePrice: 177,
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
    wholesaleOnly: false,
  },
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
