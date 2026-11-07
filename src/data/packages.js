export const samplePackages = [
    {
        _id: "pkg-darjeeling-01",
        id: "darjeeling-delight",
        slug: "darjeeling-delight",
        name: "Darjeeling Queen of Hills Experience",
        type: "Couple",
        location: {
            name: "Darjeeling",
            state: "West Bengal",
            url: "https://maps.app.goo.gl/mThQPfvHsAuKSaK67",
        },
        coord: "27.0410° N, 88.2663° E",
        duration: {
            days: 5,
            nights: 4
        },
        price: {
            currency: "INR",
            actual: 18999,
            discounted: 13499
        },
        description: "Enjoy beautiful views of Mount Kanchenjunga from Tiger Hill, ride the famous toy train, visit Happy Valley tea garden, and explore the Mall Road.",
        img: {
            url: "https://images.unsplash.com/photo-1620903376453-25f5a6fd533e?w=1200&q=80"
        },
        images: [
            { url: "https://images.unsplash.com/photo-1620903376453-25f5a6fd533e?w=1200&q=80" },
            { url: "https://images.unsplash.com/photo-1600402808924-9c591a6dace8?w=1200&q=80" },
            { url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80" }
        ],
        destinations: ["Tiger Hill", "Batasia Loop", "Happy Valley Tea Estate", "Peace Pagoda", "Ghoom Monastery", "Mall Road"],
        inclusions: [
            "Comfortable hotel rooms with mountain views",
            "Daily breakfast & dinner",
            "Private car with an experienced mountain driver",
            "Toy train ride tickets (Darjeeling-Ghoom)",
            "Sightseeing permits & entry tickets"
        ],
        exclusions: [
            "Airfare or train tickets to Siliguri/Bagdogra",
            "Personal expenses, laundry & tips",
            "Any optional joy rides or photography fees"
        ],
        itinerary: [
            {
                dayNumber: 1,
                title: "Arrival at Bagdogra / NJP & Scenic Drive to Darjeeling",
                description: "Meet your tour coordinator at Bagdogra Airport or NJP station. Embark on a picturesque 3-hour journey through winding tea terraces and pine forests up to Darjeeling (6,700 ft). Evening at leisure on Chowrasta Mall.",
                mealsIncluded: { breakfast: false, lunch: false, dinner: true },
                activities: [
                    { name: "Chauffeur pickup with welcome drink", isExtraCharge: false },
                    { name: "Evening stroll through Chowrasta Mall & heritage Bakeries", isExtraCharge: false }
                ]
            },
            {
                dayNumber: 2,
                title: "Tiger Hill Sunrise & Classic 7-Point Sightseeing",
                description: "Early morning 4:00 AM excursion to Tiger Hill for sunrise over Mount Kanchenjunga. Visit Batasia Loop war memorial and historic Ghoom Monastery. Afternoon visit to Himalayan Mountaineering Institute and Padmaja Naidu Himalayan Zoological Park.",
                mealsIncluded: { breakfast: true, lunch: false, dinner: true },
                activities: [
                    { name: "Kanchenjunga Golden Peak Sunrise at Tiger Hill", isExtraCharge: false },
                    { name: "Batasia Loop Heritage Spiral Garden", isExtraCharge: false },
                    { name: "Snow Leopard & Red Panda Breeding Center visit", isExtraCharge: false }
                ]
            },
            {
                dayNumber: 3,
                title: "Heritage Tea Estate Walk & Rock Garden Expedition",
                description: "Immerse yourself in Darjeeling's famous tea history at Happy Valley Tea Estate. Walk through lush slopes and discover the art of orthodox black tea tasting. Afternoon drive to Chunnu Summer Falls & Rock Garden.",
                mealsIncluded: { breakfast: true, lunch: false, dinner: true },
                activities: [
                    { name: "Guided Tea Plucking & Tasting Masterclass", isExtraCharge: false },
                    { name: "Rock Garden tiered waterfall tour", isExtraCharge: false }
                ]
            },
            {
                dayNumber: 4,
                title: "Mirik Lake & Pashupati Nepal Border Excursion",
                description: "Day excursion to the peaceful Sumendu Lake at Mirik surrounded by cardamom plantations and cryptomeria pine groves. Boating and horse riding available. Short transit via Indo-Nepal Pashupati market.",
                mealsIncluded: { breakfast: true, lunch: false, dinner: true },
                activities: [
                    { name: "Mirik Lake footbridge crossing & boating", isExtraCharge: false },
                    { name: "Pashupati Indo-Nepal market visit", isExtraCharge: false }
                ]
            },
            {
                dayNumber: 5,
                title: "Farewell Darjeeling — Drop to NJP / Bagdogra",
                description: "Enjoy a final cup of Darjeeling first-flush tea at sunrise. Check out and embark on the descent drive to Bagdogra airport or NJP railway station with lifelong memories.",
                mealsIncluded: { breakfast: true, lunch: false, dinner: false },
                activities: [
                    { name: "Return private transfer with scenic viewpoint stops", isExtraCharge: false }
                ]
            }
        ]
    },
    {
        _id: "pkg-sikkim-02",
        id: "magical-north-sikkim",
        slug: "magical-north-sikkim",
        name: "North Sikkim: Lachung, Lachen & Gurudongmar Lake",
        type: "Group",
        location: {
            name: "North Sikkim",
            state: "Sikkim",
            url: "https://maps.app.goo.gl/9MMbvxfoQqJFze879",
        },
        coord: "27.7025° N, 88.7431° E",
        duration: {
            days: 6,
            nights: 5
        },
        price: {
            currency: "INR",
            actual: 29999,
            discounted: 22499
        },
        description: "An exciting trip to North Sikkim. Visit the Yumthang Valley of Flowers, see snow at Zero Point, and visit the sacred Gurudongmar Lake at 17,800 ft.",
        img: {
            url: "https://images.unsplash.com/photo-1632726823875-43dd9adad495?w=1200&q=80"
        },
        images: [
            { url: "https://images.unsplash.com/photo-1632726823875-43dd9adad495?w=1200&q=80" },
            { url: "https://images.unsplash.com/photo-1671711847762-b8308b444a42?w=1200&q=80" }
        ],
        destinations: ["Lachen", "Lachung", "Gurudongmar Lake", "Yumthang Valley", "Zero Point", "Chungthang"],
        inclusions: [
            "North Sikkim inner-line permits included",
            "Cozy wooden stays in Lachen & Lachung",
            "Reliable 4x4 Bolero / Scorpio with all permits",
            "All meals included (Hot Breakfast, Lunch, Dinner)",
            "Experienced local mountain driver"
        ],
        exclusions: [
            "Zero Point excursion supplement (payable on spot depending on snow clearance)",
            "Warm clothing or winter boot rentals"
        ],
        itinerary: [
            {
                dayNumber: 1,
                title: "Gangtok to Lachen via Seven Sisters Waterfall",
                description: "Drive north along the roaring Teesta river, passing Seven Sisters Waterfall and Singhik Viewpoint. Reach the high alpine village of Lachen (9,000 ft) by evening.",
                mealsIncluded: { breakfast: true, lunch: true, dinner: true },
                activities: [{ name: "Seven Sisters Waterfall Photo Stop", isExtraCharge: false }]
            },
            {
                dayNumber: 2,
                title: "Gurudongmar Lake (17,800 ft) & Transfer to Lachung",
                description: "Start at 4:30 AM through the cold desert of Chopta Valley to the breathtaking turquoise Gurudongmar Lake. Drive back to Lachen for lunch and proceed to Lachung.",
                mealsIncluded: { breakfast: true, lunch: true, dinner: true },
                activities: [{ name: "Sacred Gurudongmar Lake pilgrimage", isExtraCharge: false }]
            },
            {
                dayNumber: 3,
                title: "Yumthang Valley of Flowers & Zero Point Expedition",
                description: "Visit Yumthang Valley surrounded by rhododendron sanctuary and snow-dusted peaks. Proceed to Yumesamdong (Zero Point) at the snowline.",
                mealsIncluded: { breakfast: true, lunch: true, dinner: true },
                activities: [{ name: "Yumthang Valley nature walk & hot sulfur spring", isExtraCharge: false }]
            }
        ]
    },
    {
        _id: "pkg-gangtok-03",
        id: "gangtok-tsomgo-lake",
        slug: "gangtok-tsomgo-lake",
        name: "Gangtok & Glacial Tsomgo Lake Getaway",
        type: "Solo",
        location: {
            name: "Gangtok",
            state: "Sikkim",
            url: "https://maps.app.goo.gl/9MMbvxfoQqJFze879",
        },
        coord: "27.3389° N, 88.6065° E",
        duration: {
            days: 4,
            nights: 3
        },
        price: {
            currency: "INR",
            actual: 14500,
            discounted: 9999
        },
        description: "Explore Gangtok town, walk along MG Marg, visit Rumtek Monastery, and travel to scenic Tsomgo Lake with Baba Mandir and Nathula Pass.",
        img: {
            url: "https://images.unsplash.com/photo-1671984247482-1acf238bba0c?w=1200&q=80"
        },
        images: [
            { url: "https://images.unsplash.com/photo-1671984247482-1acf238bba0c?w=1200&q=80" }
        ],
        destinations: ["Gangtok", "Tsomgo Lake", "Baba Mandir", "MG Marg", "Rumtek Monastery"],
        inclusions: [
            "3 Nights hotel stay in Gangtok",
            "Breakfast & Dinner included",
            "Private car for Tsomgo Lake & Gangtok sightseeing",
            "Tsomgo Lake pass & travel permits"
        ],
        exclusions: [
            "Nathula Pass supplement (subject to Army clearance and permit lottery)",
            "Yak ride charges at Tsomgo lake"
        ],
        itinerary: [
            {
                dayNumber: 1,
                title: "Siliguri to Gangtok — Welcome to the Mountain State",
                description: "Scenic drive from Bagdogra/NJP ascending to Gangtok (5,500 ft). Evening leisurely walk on pedestrian-only MG Marg.",
                mealsIncluded: { breakfast: false, lunch: false, dinner: true },
                activities: [{ name: "MG Marg Cafe & Souvenir Walk", isExtraCharge: false }]
            },
            {
                dayNumber: 2,
                title: "Glacial Tsomgo Lake & Sacred Baba Harbhajan Mandir",
                description: "Drive along the ancient Silk Route to oval-shaped Tsomgo Lake (12,310 ft) reflecting snow peaks.",
                mealsIncluded: { breakfast: true, lunch: false, dinner: true },
                activities: [{ name: "Tsomgo Lake excursion & Baba Mandir visit", isExtraCharge: false }]
            }
        ]
    },
    {
        _id: "pkg-kalimpong-04",
        id: "kalimpong-serene-retreat",
        slug: "kalimpong-serene-retreat",
        name: "Kalimpong & Lava Rishop Heritage Trails",
        type: "Couple",
        location: {
            name: "Kalimpong",
            state: "West Bengal",
            url: "https://maps.app.goo.gl/9MMbvxfoQqJFze879",
        },
        coord: "27.0667° N, 88.4667° E",
        duration: {
            days: 4,
            nights: 3
        },
        price: {
            currency: "INR",
            actual: 15999,
            discounted: 11999
        },
        description: "Famous for beautiful flower nurseries, peaceful monasteries, classic heritage stays like Morgan House, and clear views of Mount Kanchenjunga.",
        img: {
            url: "https://images.unsplash.com/photo-1600402808924-9c591a6dace8?w=1200&q=80"
        },
        images: [
            { url: "https://images.unsplash.com/photo-1600402808924-9c591a6dace8?w=1200&q=80" }
        ],
        destinations: ["Deolo Hill", "Morgan House", "Durpin Monastery", "Pine View Cactus Nursery", "Lava Pine Forest"],
        inclusions: [
            "Comfortable homestay in Kalimpong",
            "All transfers by private car",
            "Daily Breakfast and Dinner"
        ],
        exclusions: [
            "Entry tickets to Deolo park & nurseries"
        ],
        itinerary: [
            {
                dayNumber: 1,
                title: "Siliguri to Kalimpong via Coronation Bridge",
                description: "Drive through Sevoke forest and the historic Coronation bridge into the quiet hill town of Kalimpong.",
                mealsIncluded: { breakfast: false, lunch: false, dinner: true },
                activities: [{ name: "Coronation bridge scenic view", isExtraCharge: false }]
            }
        ]
    }
];

export default samplePackages;
