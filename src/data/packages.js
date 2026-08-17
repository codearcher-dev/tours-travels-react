const packages = [
    {
        id: "Darjeeling-Delight",
        name: "Darjeeling Delight",
        location: {
            name: "Darjeeling, India",
            url: "https://maps.app.goo.gl/mThQPfvHsAuKSaK67",
        },
        coord: "Darjeeling, India · 27.52°N 88.26°E",
        duration: {
            days: 7,
            nights: 6
        },
        places: ["Darjeeling", "Mirik", "Tiger Hill", "Batasia Loop", "Ghoom Monastery", "Rock Garden", "Peace Pagoda"],
        price: {
            currency: "INR",
            symbol: "₹",
            originalPrice: 8599,
            discountedPrice: 4999
        },
        description: "Tea gardens, Himalayan vistas, and a ride on the Darjeeling Himalayan Railway.",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOSFm7-8OxOPoCuQBR73kmzQ-up9298Dr4JhFTy2NxUg&s=10",
        images: [
            "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80",
            "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=80",
            "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200&q=80",
        ]
    },
    {
        id: "bali-bliss",
        name: "Bali Bliss",
        location: {
            name: "Bali, Indonesia",
            url: "https://maps.app.goo.gl/FT2Mv6phBkCMRgdx8"
        },
        coord: "Bali, Indonesia · 8.34°S 115.09°E",
        duration: {
            days: 7,
            nights: 6
        },
        places: ["Ubud", "Tegallalang Rice Terraces", "Tanah Lot Temple", "Seminyak Beach"],
        price: {
            currency: "INR",
            symbol: "₹",
            originalPrice: 59999,
            discountedPrice: 49999
        },
        description: "Rice terraces at dawn, temple ceremonies, and a private villa above Ubud’s canopy.",
        img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&q=80",
        images: [
            "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80",
            "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=80",
            "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200&q=80",
        ]
    },
    {
        id: "sunset-escape",
        name: "Sunset Escape",
        location: {
            name: "Santorini, Greece",
            url: "https://maps.app.goo.gl/9MMbvxfoQqJFze879"
        },
        coord: "Santorini, Greece · 36.39°N 25.46°E",
        duration: {
            days: 7,
            nights: 6
        },
        places: ["Ubud", "Tegallalang Rice Terraces", "Tanah Lot Temple", "Seminyak Beach"],
        price: {
            currency: "INR",
            symbol: "₹",
            originalPrice: 59999,
            discountedPrice: 49999
        },
        description: "Caldera-view suites, a private catamaran sail, and dinner in Oia as the sky turns gold.",
        img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&q=80",
        images: [
            "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=80",
            "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80",
            "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200&q=80",
        ]
    },
    {
        id: "kyoto-in-bloom",
        name: "Kyoto in Bloom",
        location: {
            name: "Kyoto, Japan",
            url: "https://maps.app.goo.gl/R3iwrSi8KQE1XL919"
        },
        coord: "Kyoto, Japan · 35.01°N 135.77°E",
        duration: {
            days: 7,
            nights: 6
        },
        places: ["Ubud", "Tegallalang Rice Terraces", "Tanah Lot Temple", "Seminyak Beach"],
        price: {
            currency: "INR",
            symbol: "₹",
            originalPrice: 59999,
            discountedPrice: 49999
        },
        description: "Bamboo groves, tea ceremonies, and a machiya stay steps from Gion’s lantern-lit lanes.",
        img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&q=80",
        images: [
            "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80",
            "https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?w=1200&q=80",
            "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&q=80",
        ]
    },
    {
        id: "andes-explorer",
        name: "Andes Explorer",
        location: {
            name: "Cusco, Peru",
            url: "https://maps.app.goo.gl/2GmA7ooHZBxCbT3v5"
        },
        coord: "Cusco, Peru",
        duration: {
            days: 7,
            nights: 6
        },
        places: ["Ubud", "Tegallalang Rice Terraces", "Tanah Lot Temple", "Seminyak Beach"],
        price: {
            currency: "INR",
            symbol: "₹",
            originalPrice: 59999,
            discountedPrice: 49999
        },
        description: "Sacred Valley, Inca Trail trek, sunrise at Machu Picchu.",
        img: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&q=80",
        images: [
            "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1200&q=80",
            "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=1200&q=80",
            "https://images.unsplash.com/photo-1580914856000-0e1ce57c79e6?w=1200&q=80",
        ]
    },
    {
        id: "medina-sahara",
        name: "Medina & Sahara",
        location: {
            name: "Marrakech, Morocco",
            url: "https://maps.app.goo.gl/UQwfyL6HaveDWQLh9"
        },
        coord: "Marrakech, Morocco",
        duration: {
            days: 7,
            nights: 6
        },
        places: ["Ubud", "Tegallalang Rice Terraces", "Tanah Lot Temple", "Seminyak Beach"],
        price: {
            currency: "INR",
            symbol: "₹",
            originalPrice: 59999,
            discountedPrice: 49999
        },
        description: "Riad courtyards, spice souks, overnight desert camp.",
        img: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=500&q=80",
        images: [
            "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=1200&q=80",
            "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1200&q=80",
            "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80",
        ]
    },
    {
        id: "ring-road-circuit",
        name: "Ring Road Circuit",
        location: {
            name: "Reykjavik, Iceland",
            url: "https://maps.app.goo.gl/WPX4fKSCGtW8FxseA"
        },
        coord: "Reykjavik, Iceland",
        duration: {
            days: 7,
            nights: 6
        },
        places: ["Ubud", "Tegallalang Rice Terraces", "Tanah Lot Temple", "Seminyak Beach"],
        price: {
            currency: "INR",
            symbol: "₹",
            originalPrice: 59999,
            discountedPrice: 49999
        },
        description: "Waterfalls, glacier hikes, and the northern lights.",
        img: "https://images.unsplash.com/photo-1490080885921-7b1b3f6a4980?w=500&q=80",
        images: [
            "https://images.unsplash.com/photo-1490080885921-7b1b3f6a4980?w=1200&q=80",
            "https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=1200&q=80",
            "https://images.unsplash.com/photo-1520687796593-5f81e64627d7?w=1200&q=80",
        ]
    }
];

export default packages;
