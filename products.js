// Product Data
const attarImages = [
    "https://images.unsplash.com/photo-1615484477201-9f4953340fab?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1563170351-be82bc888bb4?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1585232351009-aa87416fca90?auto=format&fit=crop&w=600&q=80"
];

const categories = ["Woody", "Floral", "Fresh", "Spicy"];
const prefixes = ["Oud", "Royal", "Kashmir", "Mysore", "Vedic", "Midnight", "Golden", "Temple", "Saffron", "Celestial"];
const suffixes = ["Musk", "Amber", "Rose", "Sandal", "Mist", "Soul", "Bloom", "Earth", "Essence", "Spice"];

const products = [];
for (let i = 1; i <= 60; i++) {
    products.push({
        id: i,
        name: `${prefixes[i % 10]} ${suffixes[Math.floor(Math.random() * 10)]}`,
        price: 800 + (i * 50),
        image: attarImages[i % attarImages.length],
        category: categories[i % categories.length]
    });
}