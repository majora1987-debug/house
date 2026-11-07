// Default Static Data Fallback for Adam's House Showcase & Project Hub
// Used when offline or before initial Firestore synchronization

window.DEFAULT_DATA = {
  houseInfo: {
    title: "Adam's Place",
    subtitle: "House Showcase, Project Log & Gift Wishlist",
    tagline: "3 Bed · 2 Bath · 1 Car · Soldiers Hill VIC",
    settlementDate: "October 2026",
    overview: "A modern, low-maintenance 3-bedroom brick home in Soldiers Hill, featuring an open-plan kitchen and living zone, private master suite, dedicated creative/sim studio, and ducted heating."
  },

  rooms: [
    {
      id: "living-dining",
      name: "Open Living & Dining",
      subtitle: "Heart of the Home & Entertaining Space",
      badge: "Open Plan",
      heroImage: "assets/photos/rooms/living-dining-gym-bare.jpg",
      gallery: [
        { src: "assets/photos/rooms/living-dining-gym-bare.jpg", caption: "Wide perspective looking from entry towards kitchen island & courtyard doors" },
        { src: "assets/photos/rooms/living-media-tv-bare.jpg", caption: "Courtyard glass sliding door wall & media lounge zone" },
        { src: "assets/photos/rooms/kitchen-island-ac-bare.jpg", caption: "Kitchen island bench, high wall split-system AC & tile-to-carpet boundary" }
      ],
      vision: "Creating a warm, unified space with a dedicated dining setting on the tiled floor near the kitchen island, and a comfortable conversational lounge on the carpeted section. Planning a DC ceiling fan in the central light position to assist airflow from the courtyard to the bedrooms.",
      specs: {
        lighting: "Central oyster globe point + kitchen recessed downlights",
        climate: "Wall-mounted reverse-cycle split-system AC + ceiling ducted heating vent",
        flooring: "Durable ceramic tiles in kitchen/dining zone transitioning to taupe carpet in lounge",
        outdoorAccess: "Direct sliding door access to north-facing courtyard garden"
      }
    },
    {
      id: "lounge-media",
      name: "Lounge & Media Area",
      subtitle: "Relaxation & Home Theatre Corner",
      badge: "Living Zone",
      heroImage: "assets/photos/rooms/lounge-sofa-bare.jpg",
      gallery: [
        { src: "assets/photos/rooms/lounge-sofa-bare.jpg", caption: "Main lounge wall with high architectural highlight window" },
        { src: "assets/photos/rooms/living-media-tv-bare.jpg", caption: "TV wall perspective opposite the sofa position" }
      ],
      vision: "Positioning a deep modular sofa along the high highlight window wall, paired with a lowline timber TV credenza along the internal media wall. Testing subtle warm perimeter LED bias lighting for evening movie and music sessions.",
      specs: {
        lighting: "Switched to lighting circuit 1 (10A, RCD 1)",
        windows: "High highlight awning window providing natural afternoon ambient light with complete privacy",
        outlets: "Dual double GPOs along the media wall for AV receiver, TV, and console gear"
      }
    },
    {
      id: "master-bedroom",
      name: "Master Bedroom & Ensuite",
      subtitle: "Private Retreat with Walk-in Feel",
      badge: "Master Suite",
      heroImage: "assets/photos/rooms/master-bed-windows-bare.jpg",
      gallery: [
        { src: "assets/photos/rooms/master-bed-windows-bare.jpg", caption: "Looking across the bedroom towards double garden windows and ensuite entry" },
        { src: "assets/photos/rooms/master-bed-corner-bare.jpg", caption: "Bedhead wall corner with dual power points" },
        { src: "assets/photos/rooms/master-bed-floor-bare.jpg", caption: "Wide floor view looking back to triple sliding mirrored wardrobes" }
      ],
      vision: "Planning a queen upholstered timber bedhead centered between the double windows, flanked by minimalist floating nightstands. Top priority project is replacing the central flush oyster fitting with a quiet DC-motor ceiling fan with built-in warm LED light and remote.",
      specs: {
        lighting: "Central flush B22 oyster fitting (Circuit 2, 10A, Legrand 30mA RCD) — ceiling fan ready",
        heating: "Ceiling circular gas ducted heating register",
        storage: "Triple sliding door wardrobe with full-width hanging and top hat shelf",
        ensuite: "Private ensuite bathroom with walk-in shower, porcelain vanity, and toilet"
      }
    },
    {
      id: "bedroom-2",
      name: "Bedroom 2 (Guest Suite)",
      subtitle: "Peaceful Guest Room overlooking Courtyard",
      badge: "Guest Suite",
      heroImage: "assets/photos/rooms/bedroom-2-central-light-bare.jpg",
      gallery: [
        { src: "assets/photos/rooms/bedroom-2-central-light-bare.jpg", caption: "Clean view showing neutral walls, carpet floor, and central light fitting" },
        { src: "assets/photos/rooms/bedroom-2-courtyard-window-bare.jpg", caption: "Courtyard window view bringing in natural daylight" },
        { src: "assets/photos/rooms/bedroom-2-robe-bare.jpg", caption: "Double built-in robe doors and entry doorway from hallway" }
      ],
      vision: "Setting up a welcoming guest sanctuary with a double bed, soft linen bedding, and bedside task lighting. The window looks straight out into the private courtyard, giving it great morning natural light.",
      specs: {
        lighting: "Central B22 oyster fitting on lighting circuit 2",
        heating: "Dedicated ceiling ducted heating register",
        storage: "Double-door built-in wardrobe with overhead storage"
      }
    },
    {
      id: "studio-office",
      name: "Bedroom 3 (Studio / Office)",
      subtitle: "Sim-Racing Rig & High-Tech Workstation",
      badge: "Creative Lab",
      heroImage: "assets/photos/rooms/studio-simrig-bare.jpg",
      gallery: [
        { src: "assets/photos/rooms/studio-simrig-bare.jpg", caption: "Studio room canvas cleared for sim-rig and ergonomic workspace layout" },
        { src: "assets/photos/rooms/studio-desk-corner-bare.jpg", caption: "Window corner showing power outlets and natural light angle" },
        { src: "assets/photos/rooms/studio-robe-light-bare.jpg", caption: "Looking back towards double built-in robe and central light point" }
      ],
      vision: "Dedicated dual-purpose creative space: custom aluminium profile sim-racing cockpit situated along the internal wall, paired with a motorized sit-stand desk by the window. Planning dedicated cable raceways and acoustic wall treatment.",
      specs: {
        power: "Protected under Power Circuit 2 (20A HPM breaker via Legrand RCD 2)",
        lighting: "Central B22 fixture ready for high-efficiency DC ceiling fan",
        storage: "Full double built-in wardrobe ideal for computer cases, audio gear, and storage"
      }
    },
    {
      id: "hallway-entry",
      name: "Central Hallway & Entry",
      subtitle: "Circulation Spine & Storage Hub",
      badge: "Infrastructure",
      heroImage: "assets/photos/rooms/hallway-looking-to-bedrooms.jpg",
      gallery: [
        { src: "assets/photos/rooms/hallway-looking-to-bedrooms.jpg", caption: "Central corridor leading to master bedroom, guest bedrooms, and main bathroom" },
        { src: "assets/photos/rooms/hallway-linen-cupboard.jpg", caption: "Built-in 4-tier linen storage press outside Bedroom 2" },
        { src: "assets/photos/rooms/hallway-floor-transition.jpg", caption: "Clean transition from dining tiles to bedroom carpet runner" }
      ],
      vision: "Keeping circulation completely clear with minimalist gallery wall art. The large 4-tier built-in linen press provides ample bulk storage for towels, sheets, and household supplies.",
      specs: {
        safety: "Mains 240V interconnected smoke detector wired into Light Circuit 2",
        heating: "Central hallway floor/wall ducted gas return-air intake grille",
        switchboard: "Flush-mount PDL distribution cabinet concealed behind entry door"
      }
    }
  ],

  blueprint: {
    switchboard: {
      enclosure: "PDL (Schneider Electric) DBF 15",
      capacity: "15 modular DIN rail poles (18mm width)",
      currentUsed: "11 poles used · 4 spare poles available",
      mainSwitch: "Lanson LANMCB6140 C40 (40A, 240V~, 6kA) Single Phase",
      earthing: "Multiple Earthed Neutral (MEN) & earth stake at external property meter pillar",
      circuits: [
        { pole: 1, name: "MAIN SWITCH", type: "Main Isolator", rating: "40A (C40)", rcd: "Upstream isolator", scope: "Isolates total unit power supply" },
        { pole: 2, name: "WALL OVEN", type: "Dedicated Appliance MCB", rating: "20A (C20)", rcd: "Dedicated MCB", scope: "Hardwired electric kitchen wall oven" },
        { pole: "3-4", name: "SAFETY SWITCH 1", type: "RCD (Residual Current)", rating: "40A, 30mA", rcd: "Legrand 089 10", scope: "Earth leakage protection for zone 1" },
        { pole: 5, name: "POWER 1", type: "Sub-circuit MCB", rating: "20A (C20)", rcd: "Protected by RCD 1", scope: "Kitchen & living general power outlets (GPOs)" },
        { pole: 6, name: "LIGHT 1", type: "Sub-circuit MCB", rating: "10A (C10)", rcd: "Protected by RCD 1", scope: "Living area, kitchen & exterior light fittings" },
        { pole: "7-8", name: "SAFETY SWITCH 2", type: "RCD (Residual Current)", rating: "40A, 30mA", rcd: "Legrand 089 10", scope: "Earth leakage protection for zone 2" },
        { pole: 9, name: "POWER 2", type: "Sub-circuit MCB", rating: "20A (C20)", rcd: "Protected by RCD 2", scope: "Bedrooms, studio & bathroom power outlets" },
        { pole: 10, name: "LIGHT 2", type: "Sub-circuit MCB", rating: "10A (C10)", rcd: "Protected by RCD 2", scope: "Bedrooms, hallway & hardwired 240V smoke alarm (SD)" },
        { pole: 11, name: "AIR COND.", type: "Dedicated A/C MCB", rating: "20A (C20)", rcd: "Clipsal MCB4-120", scope: "Living room reverse-cycle split-system air conditioner" },
        { pole: "12-15", name: "SPARE CAPACITY", type: "Modular Blanks", rating: "4 Spare DIN Poles", rcd: "Ready for RCBOs", scope: "Allows adding second bedroom AC, induction cooktop, or EV charger without replacing board" }
      ]
    },
    lighting: {
      type: "Standard Australian B22 Bayonet Cap (BC) Surface Mount Oyster Bases",
      voltage: "240V AC ~ 50Hz on 10A circuits",
      bulbsInstalled: "9W 6500K Daylight LED globes (806 lumens, 70mA, RCM compliant)",
      fanCompatibility: "100% Compatible. DC-motor ceiling fans draw only ~30W (0.15A–0.2A) and can replace existing oyster bases directly using existing lighting wiring with remote/wall cradles.",
      downlights: "Kitchen/living ceiling recessed downlights use spring canisters with MR16 / GU5.3 ceramic bi-pin connectors"
    },
    hvac: {
      heating: "Central Brivis ducted gas heating system with ceiling discharge registers in every room & hallway return grille",
      cooling: "Wall-mounted high-efficiency reverse-cycle split-system air conditioner in open living zone"
    }
  },

  initialWishlist: [
    {
      id: "wl-1",
      name: "DC Ceiling Fans with LED Light (x3)",
      room: "Bedrooms & Living",
      status: "must-have",
      notes: "Quiet brushless DC motor with winter reverse mode, wireless remote, and warm/natural LED light. Replaces existing B22 oyster fittings.",
      link: "https://www.beaconlighting.com.au/fans",
      estCost: "$250–$350 ea"
    },
    {
      id: "wl-2",
      name: "Sturdy 3-Step Safety Ladder",
      room: "General",
      status: "must-have",
      notes: "Compact folding aluminium ladder with wide non-slip treads for changing light globes, ceiling vent cleaning, and picture hanging.",
      link: "https://www.bunnings.com.au",
      estCost: "$70–$90"
    },
    {
      id: "wl-3",
      name: "Cordless Stick Vacuum (Dyson / Shark)",
      room: "General",
      status: "must-have",
      notes: "Lightweight cordless vacuum with multi-surface head for seamless transition between tiles and bedroom carpets.",
      link: "",
      estCost: "$400–$600"
    },
    {
      id: "wl-4",
      name: "Smart Wi-Fi Air Conditioner Controller (Sensibo)",
      room: "Open Living & Dining",
      status: "nice-to-have",
      notes: "Smart IR controller to schedule split-system cooling from phone before arriving home on hot Ballarat summer days.",
      link: "https://sensibo.com",
      estCost: "$120"
    },
    {
      id: "wl-5",
      name: "Cast Iron Dutch Oven / Skillet Set",
      room: "Kitchen",
      status: "nice-to-have",
      notes: "Heavy-duty enameled Dutch oven (e.g., Le Creuset / Chasseur / Lodge) for weekend meal prep, sourdough, and braises.",
      link: "",
      estCost: "$150–$250"
    },
    {
      id: "wl-6",
      name: "Compact 2-Seater Courtyard Bistro Setting",
      room: "Courtyard",
      status: "nice-to-have",
      notes: "Weatherproof powder-coated metal table and 2 folding chairs for morning coffee in the sunny courtyard.",
      link: "https://www.bunnings.com.au",
      estCost: "$120–$180"
    },
    {
      id: "wl-7",
      name: "Motorized Sit-Stand Desk Frame (150cm)",
      room: "Studio (Bed 3)",
      status: "could-have",
      notes: "Dual-motor electric standing desk base for the creative lab/office setup.",
      link: "https://desky.com.au",
      estCost: "$450–$600"
    },
    {
      id: "wl-8",
      name: "Smart Automated Roller Blinds (Aqara / Eve)",
      room: "Master Bedroom",
      status: "could-have",
      notes: "Thread/Matter motorized roller blind motors for scheduling automatic sunrise opening.",
      link: "",
      estCost: "$180 ea"
    },
    {
      id: "wl-9",
      name: "LED Daylight Globes (9W B22 6500K)",
      room: "All Rooms",
      status: "purchased",
      notes: "Installed 806 lumen daylight B22 globes across all rooms for bright, clean visibility.",
      link: "",
      estCost: "Completed"
    },
    {
      id: "wl-10",
      name: "High-Performance Wi-Fi 6 Router",
      room: "Living Zone",
      status: "purchased",
      notes: "Configured central high-speed Wi-Fi network covering living area, studio, and all bedrooms.",
      link: "",
      estCost: "Completed"
    }
  ],

  initialUpdates: [
    {
      id: "upd-1",
      roomId: "blueprint",
      title: "Electrical Switchboard & Capacity Verified",
      status: "Completed",
      date: "2026-11-07T15:35:00.000Z",
      content: "Completed full audit of entry switchboard (PDL DBF 15). Confirmed 40A main supply, dual 40A 30mA safety switches, dedicated 20A AC circuit, and 4 empty DIN rail slots ready for future expansion."
    },
    {
      id: "upd-2",
      roomId: "master-bedroom",
      title: "Ceiling Fan Feasibility Confirmed",
      status: "Planning",
      date: "2026-11-07T15:40:00.000Z",
      content: "Inspected central ceiling oyster fixture. Verified standard 240V lighting circuit with 10A breaker and Legrand RCD protection. Brushless DC ceiling fans with integrated LED light can be installed straight onto existing points without cutting plaster."
    },
    {
      id: "upd-3",
      roomId: "living-dining",
      title: "Space Planning & Bare Canvas Created",
      status: "In Progress",
      date: "2026-11-07T14:50:00.000Z",
      content: "Generated clean bare room perspectives to finalize floor layout. Planning furniture zoning: 6-seater dining table on tiled zone adjacent to kitchen island; modular lounge along the north-facing courtyard window wall."
    },
    {
      id: "upd-4",
      roomId: "studio-office",
      title: "Studio & Sim-Rig Layout Blueprint",
      status: "Planning",
      date: "2026-11-07T14:55:00.000Z",
      content: "Cleared room dimensions. Sim-racing chassis will sit along the interior party wall, keeping the window wall clear for a dedicated workstation with natural light."
    }
  ]
};
