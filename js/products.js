/**
 * Fish & Flora Hub - Complete Interactive Product Catalog Data
 * Pure JavaScript (ES6) with Dynamic Varieties, Sizes, and Weights
 */

const PRODUCTS_DATA = {
    fish: [
        {
            id: 'fish-1',
            name: 'Betta Fish',
            category: 'tropical',
            categoryName: 'Tropical Fish',
            temperament: 'semi-aggressive',
            price: 500,
            image: 'images/betta-fish.jpeg',
            shortDesc: 'Vibrant colors with flowing majestic fins.',
            description: 'Known as the Siamese fighting fish, famous for its magnificent flowing fins and jewel-like iridescent colors. Highly intelligent and interactive pet fish.',
            tankSize: '20 Litres minimum',
            temp: '24°C - 28°C',
            pH: '6.5 - 7.5',
            careLevel: 'Easy',
            diet: 'Carnivore (Betta pellets, bloodworms & flakes)',
            featured: true,
            bestseller: true,
            newArrival: false,
            selectionType: 'varieties',
            options: [
                {
                    name: 'Halfmoon Betta (Blue & Red)',
                    price: 500,
                    image: 'images/Halfmoon-Betta-fish.webp',
                    desc: 'Classic 180-degree halfmoon caudal fin displaying royal cobalt blue and scarlet red tones.',
                    badge: 'Popular'
                },
                {
                    name: 'Crowntail Betta (Turquoise)',
                    price: 600,
                    image: 'images/Crowntail-Betta-fish.webp',
                    desc: 'Dramatic crown-like ray extensions along all fin edges with metallic emerald turquoise sheen.',
                    badge: 'Exotic'
                },
                {
                    name: 'Dumbo Ear Betta (Platinum White)',
                    price: 750,
                    image: 'images/Dumbo-Ear-Betta-Betta-fish.webp',
                    desc: 'Enlarged pectoral fins resembling angel wings with shimmering pearl-white body coloration.',
                    badge: 'Premium'
                },
                {
                    name: 'Plakat Betta (Koi Galaxy)',
                    price: 700,
                    image: 'images/Plakat-Betta.jpeg',
                    desc: 'Short, agile fighter tail patterned with stunning marble Koi patches and cosmic blue glitter scales.',
                    badge: 'Rare'
                }
            ]
        },
        {
            id: 'fish-2',
            name: 'Guppy Fish',
            category: 'freshwater',
            categoryName: 'Freshwater Fish',
            temperament: 'peaceful',
            price: 300,
            image: 'images/guppy-fish.jpeg',
            shortDesc: 'Peaceful, lively, and colorful livebearer.',
            description: 'One of the most beloved beginner aquarium fish. Males exhibit kaleidoscopic rainbow fan tails and playful schooling habits in planted community tanks.',
            tankSize: '30 Litres minimum',
            temp: '22°C - 28°C',
            pH: '6.8 - 7.8',
            careLevel: 'Beginner',
            diet: 'Omnivore (Micro-pellets, spirulina flakes & brine shrimp)',
            featured: true,
            bestseller: true,
            newArrival: false,
            selectionType: 'varieties',
            options: [
                {
                    name: 'Red Tuxedo Guppy',
                    price: 300,
                    image: 'images/Red-Tuxedo-Guppy.jpg',
                    desc: 'Striking fire-red delta caudal tail set against a sleek velvet-black tuxedo midsection.',
                    badge: 'Beginner Choice'
                },
                {
                    name: 'Blue Grass Guppy',
                    price: 350,
                    image: 'images/Blue-Grass-Guppy.jpg',
                    desc: 'Delicate lace-patterned sky blue finnage with fine stippling and silvery body sheen.',
                    badge: 'Top Pick'
                },
                {
                    name: 'Full Gold Guppy',
                    price: 450,
                    image: 'images/Full-Gold-Guppy.png',
                    desc: 'Lustrous solid 24-karat gold metallic body and matching broad golden fan fin.',
                    badge: 'Show Quality'
                },
                {
                    name: 'Koi Guppy (Red Ear)',
                    price: 400,
                    image: 'images/Koi-Guppy.webp',
                    desc: 'Famous albino red-cap strain with vivid ruby nose, transparent body, and red finnage.',
                    badge: 'Popular'
                }
            ]
        },
        {
            id: 'fish-3',
            name: 'Goldfish',
            category: 'freshwater',
            categoryName: 'Freshwater Fish',
            temperament: 'peaceful',
            price: 450,
            image: 'images/goldfish.webp',
            shortDesc: 'Docile, friendly coldwater favorite.',
            description: 'A classic coldwater staple featuring an engaging personality, round egg-shaped body, and shimmering metallic scales. Very interactive at feeding time.',
            tankSize: '80 Litres minimum',
            temp: '18°C - 23°C (Coldwater)',
            pH: '7.0 - 8.0',
            careLevel: 'Easy',
            diet: 'Omnivore (Sinking pellets & blanched vegetables)',
            featured: false,
            bestseller: true,
            newArrival: false,
            selectionType: 'varieties',
            options: [
                {
                    name: 'Red & White Oranda',
                    price: 450,
                    image: 'images/Red-&White-Oranda.webp',
                    desc: 'Distinguished by a prominent raspberry-like cranial cap (wen) and flowing split tail.',
                    badge: 'Classic'
                },
                {
                    name: 'Black Moor Goldfish',
                    price: 500,
                    image: 'images/Black-Moor-Goldfish.jpeg',
                    desc: 'Velvety midnight-black body with charming telescoping bulbous eyes and butterfly caudal fins.',
                    badge: 'Popular'
                },
                {
                    name: 'Calico Ryukin',
                    price: 550,
                    image: 'images/Calico-Ryukin.jpg',
                    desc: 'High arched shoulder hump and tri-color mosaic scales in speckled red, black, and mother-of-pearl.',
                    badge: 'Show Grade'
                },
                {
                    name: 'Lionhead Ranchu',
                    price: 650,
                    image: 'images/Lionhead-Ranchu.jpeg',
                    desc: 'Dorsal-less Japanese show variety with a gentle arching back and prominent wen cheeks.',
                    badge: 'Exotic'
                }
            ]
        },
        {
            id: 'fish-4',
            name: 'Angelfish',
            category: 'tropical',
            categoryName: 'Tropical Fish',
            temperament: 'community',
            price: 600,
            image: 'images/angelfish.jpeg',
            shortDesc: 'Graceful diamond-shaped centerpiece cichlid.',
            description: 'Stately and majestic South American cichlid with elongated dorsal and ventral thread fins. Glides smoothly through tall stem plants.',
            tankSize: '100 Litres minimum (Tall tank)',
            temp: '25°C - 29°C',
            pH: '6.5 - 7.2',
            careLevel: 'Intermediate',
            diet: 'Omnivore (High protein flakes, mosquito larvae & pellets)',
            featured: false,
            bestseller: false,
            newArrival: true,
            selectionType: 'varieties',
            options: [
                {
                    name: 'Silver Striped Angelfish',
                    price: 600,
                    image: 'images/angelfish.jpeg',
                    desc: 'Wild-type silver body marked with three bold vertical charcoal camouflage bands.',
                    badge: 'Natural'
                },
                {
                    name: 'Marble Veil Angelfish',
                    price: 700,
                    image: 'images/Marble-Veil-Angelfish.jpg',
                    desc: 'Irregular mosaic of black, white, and golden patches with extra-long lace veil finnage.',
                    badge: 'Centerpiece'
                },
                {
                    name: 'Black Veil Angelfish',
                    price: 800,
                    image: 'images/Black-Veil-Angelfish.jpeg',
                    desc: 'Deep pitch-black velvet coloration across body and translucent black flowing trailing fins.',
                    badge: 'Premium'
                }
            ]
        },
        {
            id: 'fish-5',
            name: 'Neon Tetra',
            category: 'community',
            categoryName: 'Community Fish',
            temperament: 'peaceful',
            price: 250,
            image: 'images/neon-tetra.webp',
            shortDesc: 'Electric shimmering schoolers for planted tanks.',
            description: 'Iconic glowing electric-blue and fiery crimson stripes that glitter beneath aquarium lighting. Peaceful schooling fish ideal in groups of 6 to 12.',
            tankSize: '40 Litres minimum',
            temp: '21°C - 26°C',
            pH: '6.0 - 7.0',
            careLevel: 'Beginner',
            diet: 'Omnivore (Micro-crumbled flakes & baby brine shrimp)',
            featured: false,
            bestseller: true,
            newArrival: false,
            selectionType: 'varieties',
            options: [
                {
                    name: 'Classic Neon Tetra (Pack of 3)',
                    price: 250,
                    image: 'images/neon-tetra.webp',
                    desc: 'Classic bright turquoise stripe from nose to adipose fin with half-red abdomen.',
                    badge: 'Bestseller'
                },
                {
                    name: 'Cardinal Tetra (Pack of 3)',
                    price: 320,
                    image: 'images/Cardinal-Tetra.jpeg',
                    desc: 'Deeper vivid red stripe extending full length from head to tail under electric blue line.',
                    badge: 'Vibrant'
                },
                {
                    name: 'Black Neon Tetra (Pack of 3)',
                    price: 280,
                    image: 'images/Black-Neon-Tetra.webp',
                    desc: 'Subtle luminescent neon green line underlined with deep velvet black band.',
                    badge: 'Hardy'
                }
            ]
        },
        {
            id: 'fish-6',
            name: 'Molly Fish',
            category: 'freshwater',
            categoryName: 'Freshwater Fish',
            temperament: 'peaceful',
            price: 350,
            image: 'images/molly-fish.jpeg',
            shortDesc: 'Active, hardy, and beneficial algae grazer.',
            description: 'Highly adaptable, peaceful livebearer. Excellent for community tanks as they continuously pick at harmless algae biofilms.',
            tankSize: '45 Litres minimum',
            temp: '23°C - 28°C',
            pH: '7.2 - 8.2',
            careLevel: 'Beginner',
            diet: 'Omnivore (Spirulina flakes, boiled greens & micro pellets)',
            featured: false,
            bestseller: false,
            newArrival: true,
            selectionType: 'varieties',
            options: [
                {
                    name: 'Midnight Black Molly',
                    price: 350,
                    image: 'images/molly-fish.jpeg',
                    desc: 'Solid uniform coal-black velvety scales with majestic dorsal crest.',
                    badge: 'Classic'
                },
                {
                    name: 'Dalmatian Molly',
                    price: 380,
                    image: 'images/Dalmatian-Molly.jpg',
                    desc: 'Playful salt-and-pepper pattern with random speckled black freckles on pure white.',
                    badge: 'Popular'
                },
                {
                    name: 'Gold Dust Molly',
                    price: 420,
                    image: 'images/Gold-Dust-Molly.jpeg',
                    desc: 'Golden-orange anterior blending into deep speckled black tail section.',
                    badge: 'Colorful'
                }
            ]
        },
        {
            id: 'fish-7',
            name: 'Zebra Danio',
            category: 'community',
            categoryName: 'Community Fish',
            temperament: 'active',
            price: 300,
            image: 'images/zebra-danio.webp',
            shortDesc: 'Speedy, bulletproof horizontal schooler.',
            description: 'Exceptionally hardy and active surface darting fish with bold horizontal cobalt zebra stripes. Unaffected by slight temperature dips.',
            tankSize: '40 Litres minimum',
            temp: '18°C - 25°C',
            pH: '6.5 - 7.8',
            careLevel: 'Beginner',
            diet: 'Flakes, crushed pellets & micro worms',
            featured: false,
            bestseller: false,
            newArrival: false,
            selectionType: 'varieties',
            options: [
                {
                    name: 'Classic Striped Danio (Pack of 3)',
                    price: 300,
                    image: 'images/Classic-Striped-Danio.jpeg',
                    desc: 'Vivid metallic horizontal stripes of alternating silver-gold and navy blue.',
                    badge: 'Hardy'
                },
                {
                    name: 'Golden Zebra Danio (Pack of 3)',
                    price: 350,
                    image: 'images/Golden-Zebra-Danio.jpeg',
                    desc: 'Warm cream-gold background with soft yellow-white racing stripes.',
                    badge: 'Active'
                }
            ]
        },
        {
            id: 'fish-8',
            name: 'Swordtail',
            category: 'bottom',
            categoryName: 'Bottom Dwellers & Community',
            temperament: 'peaceful',
            price: 400,
            image: 'images/swordtail.webp',
            shortDesc: 'Distinctive male tail spike and lively swimming.',
            description: 'Named for the elongated sword-like spike extending from the male caudal fin. Bright fiery orange-red coloration and enthusiastic feeder.',
            tankSize: '50 Litres minimum',
            temp: '22°C - 27°C',
            pH: '7.0 - 8.2',
            careLevel: 'Beginner',
            diet: 'Omnivore (Flakes, pellets & vegetable treats)',
            featured: false,
            bestseller: false,
            newArrival: false,
            selectionType: 'varieties',
            options: [
                {
                    name: 'Neon Red Swordtail',
                    price: 400,
                    image: 'images/Neon-Red-Swordtail.webp',
                    desc: 'Fiery neon red body with black tail spike outline in mature males.',
                    badge: 'Popular'
                },
                {
                    name: 'Marigold Wag Swordtail',
                    price: 450,
                    image: 'images/Marigold-Wag-Swordtail.jpeg',
                    desc: 'Sunny yellow-orange torso contrasted sharply with solid pitch-black fins and sword.',
                    badge: 'Vibrant'
                }
            ]
        }
    ],

    plants: [
        {
            id: 'plant-1',
            name: 'Java Fern',
            category: 'midground',
            categoryName: 'Midground Plants',
            careLevel: 'Easy',
            lighting: 'Low to moderate',
            price: 800,
            image: 'images/java-fern.jpg',
            shortDesc: 'Care Level: Easy | Lighting: Low to moderate',
            description: 'A timeless staple of planted aquascapes. Thrives when anchored onto driftwood or porous lava rocks without burying its green rhizome.',
            placement: 'Midground / Attached to hardscape',
            temp: '20°C - 28°C',
            co2: 'Not required',
            featured: true,
            bestseller: true,
            newArrival: false,
            selectionType: 'sizes',
            options: [
                {
                    name: 'Small Bunch (3-5 Leaves)',
                    price: 450,
                    image: 'images/java-fern.jpg',
                    desc: 'Compact specimen with 3 to 5 young healthy emerald blades, ideal for nano tanks.',
                    badge: 'Starter'
                },
                {
                    name: 'Medium Bunch (6-9 Leaves)',
                    price: 800,
                    image: 'images/java-fern.jpg',
                    desc: 'Full bushy cluster with mature rhizome and developed root system ready for hardscape mounting.',
                    badge: 'Popular'
                },
                {
                    name: 'Large Mother Plant (12+ Leaves)',
                    price: 1300,
                    image: 'images/java-fern.jpg',
                    desc: 'Spectacular centerpiece display specimen with tall, mature leathery foliage.',
                    badge: 'Centerpiece'
                }
            ]
        },
        {
            id: 'plant-2',
            name: 'Anubias Nana',
            category: 'foreground',
            categoryName: 'Foreground Plants',
            careLevel: 'Easy',
            lighting: 'Low',
            price: 700,
            image: 'images/anubias.webp',
            shortDesc: 'Care Level: Easy | Leathery bulletproof leaves',
            description: 'Features broad, thick, dark-green leathery leaves virtually untouched by herbivorous fish. Highly shade tolerant.',
            placement: 'Foreground & crevices on wood/rock',
            temp: '22°C - 28°C',
            co2: 'Not required',
            featured: false,
            bestseller: true,
            newArrival: false,
            selectionType: 'sizes',
            options: [
                {
                    name: 'Bare Root Pot (Small)',
                    price: 450,
                    image: 'images/anubias.webp',
                    desc: 'Single potted rhizome with 4-5 round dark green foliage leaves.',
                    badge: 'Nano'
                },
                {
                    name: 'Full Pot (Medium)',
                    price: 700,
                    image: 'images/anubias.webp',
                    desc: 'Dense lush cluster with 8-10 leaves and extensive white aquatic root anchor.',
                    badge: 'Top Pick'
                },
                {
                    name: 'Pre-tied to Lava Stone',
                    price: 1100,
                    image: 'images/anubias.webp',
                    desc: 'Ready-to-place natural volcanic stone with mature Anubias firmly rooted.',
                    badge: 'Ready to Place'
                }
            ]
        },
        {
            id: 'plant-3',
            name: 'Java Moss',
            category: 'moss',
            categoryName: 'Aquatic Moss',
            careLevel: 'Easy',
            lighting: 'Low to High',
            price: 500,
            image: 'images/java-moss.jpg',
            shortDesc: 'Soft lush carpet & safe shrimp nursery.',
            description: 'Dense, feathery green moss that weaves intricately over rocks and driftwood. Provides essential refuge for baby fry and dwarf shrimp.',
            placement: 'Foreground carpet & wood wrap',
            temp: '15°C - 29°C',
            co2: 'Optional',
            featured: false,
            bestseller: false,
            newArrival: true,
            selectionType: 'sizes',
            options: [
                {
                    name: 'Golf Ball Portion (~50g)',
                    price: 500,
                    image: 'images/java-moss.jpg',
                    desc: 'Fresh hand-harvested clump ready to glue or tie to hardscape.',
                    badge: 'Standard'
                },
                {
                    name: 'Tennis Ball Portion (~100g)',
                    price: 900,
                    image: 'images/java-moss.jpg',
                    desc: 'Generous bulk portion suitable for complete driftwood branch coverage.',
                    badge: 'Best Value'
                },
                {
                    name: 'Stainless Steel Mesh Pad (8x8cm)',
                    price: 750,
                    image: 'images/java-moss.jpg',
                    desc: 'Pre-woven heavy steel mesh pad that sinks directly to create an instant carpet tile.',
                    badge: 'Instant Carpet'
                }
            ]
        },
        {
            id: 'plant-4',
            name: 'Amazon Sword',
            category: 'background',
            categoryName: 'Background Plants',
            careLevel: 'Moderate',
            lighting: 'Medium to High',
            price: 900,
            image: 'images/amazon-sword.jpeg',
            shortDesc: 'Care Level: Moderate | Dramatic tall centerpiece',
            description: 'Grand rosette-forming plant with towering, broad sword-like emerald blades. Consumes vast nitrate from root substrate.',
            placement: 'Background centerpiece',
            temp: '22°C - 28°C',
            co2: 'Beneficial with root tabs',
            featured: false,
            bestseller: false,
            newArrival: false,
            selectionType: 'sizes',
            options: [
                {
                    name: 'Young Plant (15-20 cm)',
                    price: 550,
                    image: 'images/amazon-sword.jpeg',
                    desc: 'Young healthy rosette with 5-6 blades ready for deep substrate planting.',
                    badge: 'Medium'
                },
                {
                    name: 'Full Specimen (25-35 cm)',
                    price: 900,
                    image: 'images/amazon-sword.jpeg',
                    desc: 'Magnificent full display plant with broad tall emerald spear leaves.',
                    badge: 'Popular'
                },
                {
                    name: 'Extra Large Mother Plant (40+ cm)',
                    price: 1400,
                    image: 'images/amazon-sword.jpeg',
                    desc: 'Show-stopping aquarium centerpiece for large 100L+ aquariums.',
                    badge: 'XL Show'
                }
            ]
        },
        {
            id: 'plant-5',
            name: 'Vallisneria Spiralis',
            category: 'background',
            categoryName: 'Background Plants',
            careLevel: 'Easy',
            lighting: 'Moderate',
            price: 600,
            image: 'images/vallisneria.webp',
            shortDesc: 'Care Level: Easy | Tall jungle background curtain',
            description: 'Ribbon-like emerald blades that sway elegantly in the tank current. Fast growing runner that quickly forms a jungle background.',
            placement: 'Background curtain',
            temp: '18°C - 28°C',
            co2: 'Not required',
            featured: false,
            bestseller: false,
            newArrival: false,
            selectionType: 'sizes',
            options: [
                {
                    name: 'Bundle of 5 Stems',
                    price: 400,
                    image: 'images/vallisneria.webp',
                    desc: 'Five rooted green runners ready to establish background accents.',
                    badge: 'Starter'
                },
                {
                    name: 'Bundle of 10 Stems',
                    price: 600,
                    image: 'images/vallisneria.webp',
                    desc: 'Ten healthy runners for establishing an entire tank corner background.',
                    badge: 'Best Seller'
                },
                {
                    name: 'Jungle Pack (20 Stems)',
                    price: 1050,
                    image: 'images/vallisneria.webp',
                    desc: 'Complete backdrop curtain coverage with vigorous runner root networks.',
                    badge: 'Value Pack'
                }
            ]
        },
        {
            id: 'plant-6',
            name: 'Water Wisteria',
            category: 'floating',
            categoryName: 'Floating & Stem Plants',
            careLevel: 'Easy',
            lighting: 'Moderate',
            price: 700,
            image: 'images/water-wisteria.jpeg',
            shortDesc: 'Lacy foliage, absorbs excess tank nutrients.',
            description: 'Deeply lobed, feathery bright-green foliage. Can be planted into substrate as a bushy midground stem or floated on the surface.',
            placement: 'Midground stem or floating cover',
            temp: '22°C - 28°C',
            co2: 'Helpful',
            featured: false,
            bestseller: false,
            newArrival: true,
            selectionType: 'sizes',
            options: [
                {
                    name: 'Bundle of 3 Stems',
                    price: 450,
                    image: 'images/water-wisteria.jpeg',
                    desc: 'Three tall rooted cuttings with vibrant lacy foliage.',
                    badge: 'Starter'
                },
                {
                    name: 'Bundle of 6 Stems',
                    price: 700,
                    image: 'images/water-wisteria.jpeg',
                    desc: 'Six healthy multi-branched stems that rapidly absorb excess nitrates.',
                    badge: 'Popular'
                }
            ]
        }
    ],

    accessories: [
        // Category 1: Aquarium Tanks
        {
            id: 'acc-1',
            name: 'Rimless Glass Aquarium Tank',
            category: 'tanks',
            categoryName: 'Aquarium Tanks',
            price: 2500,
            image: 'images/Rimless-Glass-Aquarium-Tank.png',
            shortDesc: 'Ultra-clear 92% optical clarity low-iron glass.',
            description: 'Crafted with premium high-clarity 5mm low-iron glass and crystal-clear German silicone seams. Diamond-polished beveled edges for safe, distortion-free viewing.',
            specs: 'Low-Iron Beveled Glass | Seamless Silicone | Polished Rimless',
            featured: true,
            bestseller: true,
            newArrival: false,
            selectionType: 'sizes',
            options: [
                {
                    name: 'Small (10 Litres)',
                    capacity: '10 Litres',
                    dimensions: '30 x 20 x 20 cm',
                    price: 1500,
                    image: 'images/small-aquarium-tank.jpeg',
                    desc: 'Compact desktop nano tank perfect for a single Betta or planted shrimp sanctuary.',
                    badge: 'Nano Desk'
                },
                {
                    name: 'Medium (20 Litres)',
                    capacity: '20 Litres',
                    dimensions: '40 x 25 x 25 cm',
                    price: 2500,
                    image: 'images/medium-aquarium-tank.jpeg',
                    desc: 'Ideal all-rounder aquarium for small peaceful schooling fish and live plants.',
                    badge: 'Most Popular'
                },
                {
                    name: 'Large (40 Litres)',
                    capacity: '40 Litres',
                    dimensions: '50 x 30 x 30 cm',
                    price: 4000,
                    image: 'images/large-aquarium-tank.jpeg',
                    desc: 'Spacious volume for community schools, driftwood centerpieces, and lush aquascapes.',
                    badge: 'Community'
                },
                {
                    name: 'Extra Large (60 Litres)',
                    capacity: '60 Litres',
                    dimensions: '60 x 35 x 35 cm',
                    price: 6000,
                    image: 'images/E-large-aquarium-tank.jpg',
                    desc: 'Flagship planted show tank with generous depth for elaborate rockwork and multiple fish shoals.',
                    badge: 'Master Setup'
                }
            ]
        },
        {
            id: 'acc-tank-cube',
            name: 'Rimless Cube Tank',
            category: 'tanks',
            categoryName: 'Aquarium Tanks',
            price: 2800,
            image: 'images/Rimless-Cube-Tank.png',
            shortDesc: 'Modern geometric cube aesthetic with crystal glass.',
            description: 'Equal dimensional cube tank creating deep perspective and dramatic foreground-to-background aquascaping possibilities.',
            specs: 'Cube Geometry | 91% Optical Glass | Silicone Seams',
            featured: false,
            bestseller: false,
            newArrival: true,
            selectionType: 'sizes',
            options: [
                {
                    name: 'Nano Cube (15 Litres)',
                    capacity: '15 Litres',
                    dimensions: '25 x 25 x 25 cm',
                    price: 1800,
                    image: 'images/nano-aquarium-tank.jpeg',
                    desc: 'Minimalist desktop cube for shrimp or moss.',
                    badge: 'Nano'
                },
                {
                    name: 'Studio Cube (27 Litres)',
                    capacity: '27 Litres',
                    dimensions: '30 x 30 x 30 cm',
                    price: 2800,
                    image: 'images/studio-aquarium-tank.jpeg',
                    desc: 'The gold standard for modern studio aquascapes.',
                    badge: 'Designer Pick'
                }
            ]
        },

        // Category 2: Fish Food
        {
            id: 'acc-6',
            name: 'Premium Tropical Fish Flakes',
            category: 'food',
            categoryName: 'Fish Food',
            price: 350,
            image: 'images/fish-food.png',
            shortDesc: 'Rich spirulina & shrimp meal for vibrant colors.',
            description: 'Scientifically balanced daily staple diet packed with natural carotenoids, essential Omega-3 fatty acids, garlic extract, and vitamins for vibrant coloration and strong immunity.',
            specs: 'Clean Water Formula | Rich in Omega-3 | Highly Digestible',
            featured: false,
            bestseller: true,
            newArrival: false,
            selectionType: 'weights',
            options: [
                {
                    name: '50g Trial Canister',
                    price: 220,
                    weight: '50g',
                    image: 'images/fish-food-50g.png',
                    desc: 'Moisture-sealed canister ideal for 1-2 small aquariums.',
                    badge: 'Starter'
                },
                {
                    name: '100g Standard Canister',
                    price: 350,
                    weight: '100g',
                    image: 'images/fish-food-100g.png',
                    desc: 'Full-size daily staple canister with airtight snap lid.',
                    badge: 'Popular'
                },
                {
                    name: '200g Economy Value Tub',
                    price: 600,
                    weight: '200g',
                    image: 'images/fish-food-200g.png',
                    desc: 'Bulk economy tub delivering maximum value for multiple tanks.',
                    badge: 'Best Value'
                }
            ]
        },
        {
            id: 'acc-food-pellets',
            name: 'Spirulina Color Pellets',
            category: 'food',
            categoryName: 'Fish Food',
            price: 380,
            image: 'images/fish-food2.png',
            shortDesc: 'Slow-sinking micro bites for mid & bottom feeders.',
            description: 'Slow-sinking 1.2mm pellet formula ensuring all fish throughout the water column get their fill without clouding water.',
            specs: 'Slow Sinking 1.2mm | 45% Crude Protein | 10% Spirulina',
            featured: false,
            bestseller: false,
            newArrival: true,
            selectionType: 'weights',
            options: [
                {
                    name: '60g Pouch',
                    price: 250,
                    weight: '60g',
                    image: 'images/fish-food-60.png',
                    desc: 'Resealable zip pouch preserving freshness.',
                    badge: 'Pocket Pack'
                },
                {
                    name: '120g Canister',
                    price: 380,
                    weight: '120g',
                    image: 'images/fish-food-120.png',
                    desc: 'Airtight tub suitable for daily feeding.',
                    badge: 'Recommended'
                }
            ]
        },

        // Category 3: Filters
        {
            id: 'acc-2',
            name: 'External Canister Filter',
            category: 'filters',
            categoryName: 'Filters',
            price: 2000,
            image: 'images/External-Canister-Filter.webp',
            shortDesc: 'Powerful 3-stage mechanical & biological filtration.',
            description: 'Whisper-quiet external canister system featuring quick-disconnect safety valves, multi-layer filter baskets loaded with bio-ceramic rings, activated carbon, and fine filter floss.',
            specs: 'Flow: 650 L/h | Power: 12W | Suitable for tanks up to 120L',
            featured: true,
            bestseller: true,
            newArrival: false,
            selectionType: 'single',
            options: []
        },
        {
            id: 'acc-filter-hob',
            name: 'Hang-On-Back (HOB) Filter',
            category: 'filters',
            categoryName: 'Filters',
            price: 1250,
            image: 'images/Hang-On-Back (HOB) Filter.webp',
            shortDesc: 'Slim waterfall aerating filter with surface skimmer.',
            description: 'Clips cleanly onto the tank rim. Creates a gentle bubbling waterfall return that enriches oxygen levels without taking up interior tank space.',
            specs: 'Flow: 350 L/h | Power: 5W | Rim thickness up to 15mm',
            featured: false,
            bestseller: false,
            newArrival: false,
            selectionType: 'single',
            options: []
        },

        // Category 4: Heaters & Lighting
        {
            id: 'acc-4',
            name: 'Precision Quartz Water Heater',
            category: 'heaters',
            categoryName: 'Heaters & Lighting',
            price: 1000,
            image: 'images/water-heater.jpeg',
            shortDesc: 'Shatterproof quartz tube with precise thermostat.',
            description: 'Fully submersible heater engineered with gold-plated contact points, precision temperature rotary dial (20°C - 32°C), and dual heavy-duty suction mounts.',
            specs: 'Quartz Shatterproof Glass | Auto Shut-off | 20°C - 32°C',
            featured: false,
            bestseller: false,
            newArrival: false,
            selectionType: 'sizes',
            options: [
                {
                    name: '50W (For 20 - 45L Tanks)',
                    price: 850,
                    image: 'images/water-heater-50W.png',
                    desc: 'Compact 18cm heater suitable for small desktop and nano tanks.',
                    badge: 'Nano'
                },
                {
                    name: '100W (For 50 - 100L Tanks)',
                    price: 1000,
                    image: 'images/water-heater-100W.png',
                    desc: 'Standard size for medium community aquariums.',
                    badge: 'Popular'
                },
                {
                    name: '200W (For 100 - 200L Tanks)',
                    price: 1350,
                    image: 'images/water-heater-200W.png',
                    desc: 'High output dual-element tube for large community tanks.',
                    badge: 'High Power'
                }
            ]
        },
        {
            id: 'acc-3',
            name: 'Full-Spectrum LED Plant Light',
            category: 'lights',
            categoryName: 'Heaters & Lighting',
            price: 1200,
            image: 'images/aquarium-light.png',
            shortDesc: '6500K daylight + RGB plant-growing diodes.',
            description: 'Slim brushed-aluminum fixture providing brilliant natural water shimmer and targeted 660nm deep red wavelengths for lush aquatic plant photosynthesis.',
            specs: '6500K Daylight + RGB | Extendable Brackets | 1400 Lumens',
            featured: false,
            bestseller: true,
            newArrival: false,
            selectionType: 'sizes',
            options: [
                {
                    name: 'Nano Clip-on (30-40cm / 12W)',
                    price: 950,
                    image: 'images/aquarium-light-12W.png',
                    desc: 'Flexible gooseneck clamp light for nano and cube tanks.',
                    badge: 'Compact'
                },
                {
                    name: 'Medium Light (45-60cm / 18W)',
                    price: 1200,
                    image: 'images/aquarium-light-18W.png',
                    desc: 'Extendable bracket system for standard 40-60cm aquariums.',
                    badge: 'Popular'
                },
                {
                    name: 'Large Light (60-80cm / 28W)',
                    price: 1650,
                    image: 'images/aquarium-light-28W-png',
                    desc: 'High-par output fixture for deep planted show tanks.',
                    badge: 'Pro Aquascape'
                }
            ]
        },

        // Category 5: Cleaning & Decorations
        {
            id: 'acc-5',
            name: 'Silent Dual-Outlet Air Pump',
            category: 'airpumps',
            categoryName: 'Cleaning & Equipment',
            price: 800,
            image: 'images/air-pump.webp',
            shortDesc: 'Ultra-quiet magnetic drive with twin control valves.',
            description: 'Sound-dampening rubber chambers and anti-vibration feet keep operating noise below 28 decibels while delivering vigorous aeration.',
            specs: 'Dual Adjustable Outlets | <28 dB Silent | Power: 3.5W',
            featured: false,
            bestseller: false,
            newArrival: false,
            selectionType: 'single',
            options: []
        },
        {
            id: 'acc-7',
            name: 'Natural Riverbed Gravel & Rocks',
            category: 'decorations',
            categoryName: 'Decorations & Hardscape',
            price: 450,
            image: 'images/aquarium-gravel.jpeg',
            shortDesc: 'Triple-washed pH-neutral river stones.',
            description: 'Naturally rounded smooth pebbles that do not alter tank pH or water hardness. Excellent substrate anchor for live plant roots.',
            specs: 'Weight: 2.5 kg | Particle size: 3-5mm smooth pebble',
            featured: false,
            bestseller: false,
            newArrival: false,
            selectionType: 'single',
            options: []
        },
        {
            id: 'acc-8',
            name: 'Aquarium Swim-Through Coral Cave',
            category: 'decorations',
            categoryName: 'Decorations & Hardscape',
            price: 650,
            image: 'images/coral-decor.jpeg',
            shortDesc: 'Hand-painted non-toxic resin hideout for fish.',
            description: 'Realistic aquatic reef cave formation with multiple swim-through tunnels. Gives shy territorial fish a secure resting place.',
            specs: '16 x 10 x 14 cm | 100% Non-toxic Polyresin Safe for Freshwater',
            featured: false,
            bestseller: false,
            newArrival: true,
            selectionType: 'single',
            options: []
        }
    ]
};

// Flatten all products for fast lookup
function getAllProducts() {
    return [
        ...PRODUCTS_DATA.fish,
        ...PRODUCTS_DATA.plants,
        ...PRODUCTS_DATA.accessories
    ];
}

// Find a product by base ID
function getProductById(id) {
    return getAllProducts().find(p => p.id === id);
}

// Format price with Indian Rupee formatting
function formatPrice(amount) {
    return 'Rs. ' + Number(amount).toLocaleString('en-IN');
}
