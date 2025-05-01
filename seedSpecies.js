require('dotenv').config();
const mongoose = require('mongoose');
const Species = require('./models/Species');

const speciesList = [
  {
    name: "Rustic Bunting",
    scientificName: "Emberiza rustica",
    status: "Vulnerable",
    location: "Northern Eurasia, migratory through Saudi Arabia",
    description: "A small passerine bird whose population is declining due to habitat loss.",
    photos: ["https://upload.wikimedia.org/wikipedia/commons/0/04/Emberiza_rustica_male.jpg"]
  },
  {
    name: "Arabian Gazelle",
    scientificName: "Gazella arabica",
    status: "Vulnerable",
    location: "Saudi Arabia",
    description: "Graceful gazelle species native to the Arabian Peninsula, threatened by hunting and habitat loss.",
    photos: ["https://upload.wikimedia.org/wikipedia/commons/e/e0/Gazella_arabica_%28Arabian_gazelle%29.jpg"]
  },
  {
    name: "Asir Magpie",
    scientificName: "Pica asirensis",
    status: "Critically Endangered",
    location: "Asir mountains, Saudi Arabia",
    description: "A bird endemic to Saudi Arabia with fewer than 150 individuals remaining in the wild.",
    photos: ["https://upload.wikimedia.org/wikipedia/commons/4/4e/Asir_magpie_1.jpg"]
  },
  {
    name: "Bateleur",
    scientificName: "Terathopius ecaudatus",
    status: "Near Threatened",
    location: "Sub-Saharan Africa, some range overlap with Saudi Arabia",
    description: "A striking medium-sized eagle with vivid facial coloring and short tail.",
    photos: ["https://upload.wikimedia.org/wikipedia/commons/6/6f/Terathopius_ecaudatus_-_Buffalo_Springs_National_Reserve.jpg"]
  },
  {
    name: "Black-legged Kittiwake",
    scientificName: "Rissa tridactyla",
    status: "Vulnerable",
    location: "Coastal cliffs and northern oceans, migratory records in Saudi Arabia",
    description: "A small gull species suffering major declines due to warming seas and reduced fish stocks.",
    photos: ["https://upload.wikimedia.org/wikipedia/commons/8/80/Rissa_tridactyla.jpg"]
  },
  {
    name: "Cape Hare",
    scientificName: "Lepus capensis",
    status: "Least Concern",
    location: "Saudi Arabian deserts and open grasslands",
    description: "Widespread hare species adapted to hot, dry environments.",
    photos: ["https://upload.wikimedia.org/wikipedia/commons/9/91/Cape_hare.jpg"]
  },
  {
    name: "Caracal",
    scientificName: "Caracal caracal",
    status: "Least Concern (Regionally Threatened)",
    location: "Southwest and central Saudi Arabia",
    description: "A medium-sized wild cat with tufted ears and strong leaping ability.",
    photos: ["https://upload.wikimedia.org/wikipedia/commons/2/2e/Caracal_caracal.jpg"]
  },
  {
    name: "Common Pochard",
    scientificName: "Aythya ferina",
    status: "Vulnerable",
    location: "Migratory through Saudi Arabia",
    description: "Diving duck species whose populations are decreasing in Europe and Asia.",
    photos: ["https://upload.wikimedia.org/wikipedia/commons/b/b2/Aythya_ferina.jpg"]
  },
  {
    name: "Egyptian Vulture",
    scientificName: "Neophron percnopterus",
    status: "Endangered",
    location: "Mountainous and arid regions of Saudi Arabia",
    description: "Scavenger bird with white plumage and a yellow face, facing poisoning and habitat loss.",
    photos: ["https://upload.wikimedia.org/wikipedia/commons/4/41/Egyptian_Vulture_%28Neophron_percnopterus%29.jpg"]
  },
  {
    name: "European Turtle Dove",
    scientificName: "Streptopelia turtur",
    status: "Vulnerable",
    location: "Migratory through Saudi Arabia",
    description: "A small dove with a melodic call, under threat due to hunting and habitat degradation.",
    photos: ["https://upload.wikimedia.org/wikipedia/commons/6/6a/Streptopelia_turtur.jpg"]
  },
  {
    name: "Great Knot",
    scientificName: "Calidris tenuirostris",
    status: "Endangered",
    location: "Migratory shorebird occasionally seen in coastal Saudi Arabia",
    description: "Long-distance migratory sandpiper that relies on wetlands for survival.",
    photos: ["https://upload.wikimedia.org/wikipedia/commons/e/e5/Calidris_tenuirostris_-_Laem_Pak_Bia.jpg"]
  },
  {
    name: "Hawksbill Turtle",
    scientificName: "Eretmochelys imbricata",
    status: "Critically Endangered",
    location: "Red Sea and Gulf coasts of Saudi Arabia",
    description: "Marine turtle hunted for its beautiful shell, now protected and endangered.",
    photos: ["https://upload.wikimedia.org/wikipedia/commons/1/18/Hawksbill_turtle_swimming_over_coral_reef.jpg"]
  },
  {
    name: "Lappet-faced Vulture",
    scientificName: "Torgos tracheliotos",
    status: "Endangered",
    location: "Dry savannas and open country, including Saudi Arabia",
    description: "Large scavenger with a bald red head and powerful build, declining due to poisoning and loss of carrion.",
    photos: ["https://upload.wikimedia.org/wikipedia/commons/e/e5/Lappet-faced_Vulture_2.jpg"]
  },
  {
    name: "Nubian Ibex",
    scientificName: "Capra nubiana",
    status: "Vulnerable",
    location: "Western Saudi Arabia mountain ranges",
    description: "Goat species with large curved horns adapted to rocky desert environments.",
    photos: ["https://upload.wikimedia.org/wikipedia/commons/f/f4/Nubian_ibex_%28Capra_nubiana%29.jpg"]
  },
  {
    name: "Rüppell's Vulture",
    scientificName: "Gyps rueppelli",
    status: "Critically Endangered",
    location: "Africa and Arabian Peninsula",
    description: "High-flying vulture that plays a crucial role in ecosystems but is highly threatened.",
    photos: ["https://upload.wikimedia.org/wikipedia/commons/4/46/Gyps_rueppelli_-San_Diego_Zoo.jpg"]
  },
  {
    name: "Saker Falcon",
    scientificName: "Falco cherrug",
    status: "Endangered",
    location: "Falconry bird native to Arabian Peninsula",
    description: "Fast, large falcon species under threat from poaching and habitat degradation.",
    photos: ["https://upload.wikimedia.org/wikipedia/commons/d/d9/Saker_falcon.jpg"]
  },
  {
    name: "Sand Cat",
    scientificName: "Felis margarita",
    status: "Near Threatened",
    location: "Deserts of Saudi Arabia",
    description: "A small wild cat with large ears and thick fur adapted to hot, sandy terrain.",
    photos: ["https://upload.wikimedia.org/wikipedia/commons/3/36/Sand_Cat_121.jpg"]
  },
  {
    name: "Sociable Lapwing",
    scientificName: "Vanellus gregarius",
    status: "Critically Endangered",
    location: "Migrates through Middle East including Saudi Arabia",
    description: "A threatened steppe bird with striking plumage and declining migratory routes.",
    photos: ["https://upload.wikimedia.org/wikipedia/commons/b/b3/Vanellus_gregarius.jpg"]
  },
  {
    name: "Sooty Falcon",
    scientificName: "Falco concolor",
    status: "Near Threatened",
    location: "Breeds on Red Sea islands and coastal cliffs",
    description: "A sleek grey falcon with limited breeding range in Saudi Arabia.",
    photos: ["https://upload.wikimedia.org/wikipedia/commons/5/54/Falco_concolor_-Israel.jpg"]
  },
  {
    name: "Steppe Eagle",
    scientificName: "Aquila nipalensis",
    status: "Endangered",
    location: "Migrates through and winters in Saudi Arabia",
    description: "Large, powerful eagle facing threats from electrocution and habitat loss.",
    photos: ["https://upload.wikimedia.org/wikipedia/commons/6/6d/Steppe_eagle_%28Aquila_nipalensis%29.jpg"]
  },
  {
    name: "White-headed Duck",
    scientificName: "Oxyura leucocephala",
    status: "Endangered",
    location: "Migrates through Middle East including Saudi Arabia",
    description: "A stiff-tailed diving duck with bright white head and distinctive blue bill.",
    photos: ["https://upload.wikimedia.org/wikipedia/commons/8/81/Oxyura_leucocephala.jpg"]
  }
];
async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Species.deleteMany(); // Optional: clear old data
    await Species.insertMany(speciesList);
    console.log("All 21 species successfully added.");
    process.exit();
  } catch (err) {
    console.error("Failed to seed species:", err.message);
    process.exit(1);
  }
}

seedData();
