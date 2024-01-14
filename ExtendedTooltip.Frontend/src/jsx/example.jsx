import React from "react";
const Example = ({ react, setupController }) => {
    const [dropdownSelection, setDropdownSelection] = react.useState("");

    const maskIcons = ["advisor",
        "angle",
        "arrow-circular",
        "arrow-left",
        "arrow-right",
        "check",
        "circle",
        "clear",
        "close",
        "copy",
        "credits",
        "dev-point",
        "dice",
        "education",
        "eye-closed",
        "eye",
        "solid-arrow-left",
        "solid-arrow-right",
        "gdk-cloud",
        "gear",
        "solid-heart",
        "heart",
        "info",
        "length",
        "lock",
        "money",
        "on-off",
        "pdx-cloud",
        "pen",
        "plus",
        "progress",
        "residence",
        "save",
        "school",
        "pause",
        "play",
        "speed1",
        "speed2",
        "speed3",
        "slope",
        "solid-star",
        "star",
        "steam-cloud",
        "stroke-arrow-down",
        "stroke-arrow-up",
        "student",
        "thick-stroke-arrow-down",
        "thick-stroke-arrow-left",
        "thick-stroke-arrow-right",
        "thick-stroke-arrow-up",
        "trash",
        "trend-down",
        "trend-down-high",
        "trend-down-med",
        "trend-up",
        "trend-up-high",
        "trend-up-med",
        "triangle-arrow-left",
        "view-info",
        "warning",
        "wide-arrow-down",
        "wide-arrow-up",
        "workplace"];

    const faBrands = ["square-reddit",
        "square-instagram",
        "github-alt",
        "linkedin-in",
        "steam",
        "square-twitter",
        "square-youtube",
        "wikipedia-w",
        "skype",
        "reddit",
        "discord",
        "square-steam",
        "square-github",
        "paypal",
        "reddit-alien",
        "patreon",
        "facebook-f",
        "soundcloud",
        "facebook-messenger",
        "x-twitter",
        "tiktok",
        "square-facebook",
        "linkedin",
        "twitch",
        "instagram",
        "facebook",
        "pinterest-p",
        "deviantart",
        "square-tumblr",
        "github",
        "youtube",
        "twitter",
        "pinterest",
        "tumblr",
        "square-x-twitter",
        "teamspeak",
        "steam-symbol"];

    const faRegIcons = ["trash-can",
        "message",
        "file-lines",
        "calendar-days",
        "hand-point-right",
        "face-smile-beam",
        "face-grin-stars",
        "address-book",
        "comments",
        "paste",
        "face-grin-tongue-squint",
        "face-flushed",
        "square-caret-right",
        "square-minus",
        "compass",
        "square-caret-down",
        "face-kiss-beam",
        "lightbulb",
        "flag",
        "square-check",
        "circle-dot",
        "face-dizzy",
        "futbol",
        "pen-to-square",
        "hourglass-half",
        "eye-slash",
        "hand",
        "hand-spock",
        "face-kiss",
        "face-grin-tongue",
        "chess-bishop",
        "face-grin-wink",
        "face-grin-wide",
        "face-frown-open",
        "hand-point-up",
        "bookmark",
        "hand-point-down",
        "folder",
        "user",
        "square-caret-left",
        "star",
        "chess-knight",
        "face-laugh-squint",
        "face-laugh",
        "folder-open",
        "clipboard",
        "chess-queen",
        "hand-back-fist",
        "square-caret-up",
        "chart-bar",
        "window-restore",
        "square-plus",
        "image",
        "folder-closed",
        "lemon",
        "handshake",
        "gem",
        "circle-play",
        "circle-check",
        "circle-stop",
        "id-badge",
        "face-laugh-beam",
        "registered",
        "address-card",
        "face-tired",
        "face-smile-wink",
        "file-word",
        "file-powerpoint",
        "envelope-open",
        "file-zipper",
        "square",
        "snowflake",
        "newspaper",
        "face-kiss-wink-heart",
        "star-half-stroke",
        "file-excel",
        "face-grin-beam",
        "object-ungroup",
        "circle-right",
        "face-rolling-eyes",
        "object-group",
        "heart",
        "face-surprise",
        "circle-pause",
        "circle",
        "circle-up",
        "file-audio",
        "file-image",
        "circle-question",
        "face-meh-blank",
        "eye",
        "face-sad-cry",
        "file-code",
        "window-maximize",
        "face-frown",
        "floppy-disk",
        "comment-dots",
        "face-grin-squint",
        "hand-pointer",
        "hand-scissors",
        "face-grin-tears",
        "calendar-xmark",
        "file-video",
        "file-pdf",
        "comment",
        "envelope",
        "hourglass",
        "calendar-check",
        "hard-drive",
        "face-grin-squint-tears",
        "rectangle-list",
        "calendar-plus",
        "circle-left",
        "money-bill-1",
        "clock",
        "keyboard",
        "closed-captioning",
        "images",
        "face-grin",
        "face-meh",
        "id-card",
        "sun",
        "face-laugh-wink",
        "circle-down",
        "thumbs-down",
        "chess-pawn",
        "credit-card",
        "bell",
        "file",
        "hospital",
        "chess-rook",
        "star-half",
        "chess-king",
        "circle-user",
        "copy",
        "share-from-square",
        "copyright",
        "map",
        "bell-slash",
        "hand-lizard",
        "face-smile",
        "hand-peace",
        "face-grin-hearts",
        "building",
        "face-grin-beam-sweat",
        "moon",
        "calendar",
        "face-grin-tongue-wink",
        "clone",
        "face-angry",
        "rectangle-xmark",
        "paper-plane",
        "life-ring",
        "face-grimace",
        "calendar-minus",
        "circle-xmark",
        "thumbs-up",
        "window-minimize",
        "square-full",
        "note-sticky",
        "face-sad-tear",
        "hand-point-left"];

    const faSolidIcons = ["0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "fill-drip",
        "arrows-to-circle",
        "circle-chevron-right",
        "at",
        "trash-can",
        "text-height",
        "user-xmark",
        "stethoscope",
        "message",
        "info",
        "down-left-and-up-right-to-center",
        "explosion",
        "file-lines",
        "wave-square",
        "ring",
        "building-un",
        "dice-three",
        "calendar-days",
        "anchor-circle-check",
        "building-circle-arrow-right",
        "volleyball",
        "arrows-up-to-line",
        "sort-down",
        "circle-minus",
        "door-open",
        "right-from-bracket",
        "atom",
        "soap",
        "icons",
        "microphone-lines-slash",
        "bridge-circle-check",
        "pump-medical",
        "fingerprint",
        "hand-point-right",
        "magnifying-glass-location",
        "forward-step",
        "face-smile-beam",
        "flag-checkered",
        "football",
        "school-circle-exclamation",
        "crop",
        "angles-down",
        "users-rectangle",
        "people-roof",
        "people-line",
        "beer-mug-empty",
        "diagram-predecessor",
        "arrow-up-long",
        "fire-flame-simple",
        "person",
        "laptop",
        "file-csv",
        "menorah",
        "truck-plane",
        "record-vinyl",
        "face-grin-stars",
        "bong",
        "spaghetti-monster-flying",
        "arrow-down-up-across-line",
        "spoon",
        "jar-wheat",
        "envelopes-bulk",
        "file-circle-exclamation",
        "circle-h",
        "pager",
        "address-book",
        "strikethrough",
        "k",
        "landmark-flag",
        "pencil",
        "backward",
        "caret-right",
        "comments",
        "paste",
        "code-pull-request",
        "clipboard-list",
        "truck-ramp-box",
        "user-check",
        "vial-virus",
        "sheet-plastic",
        "blog",
        "user-ninja",
        "person-arrow-up-from-line",
        "scroll-torah",
        "broom-ball",
        "toggle-off",
        "box-archive",
        "person-drowning",
        "arrow-down-9-1",
        "face-grin-tongue-squint",
        "spray-can",
        "truck-monster",
        "w",
        "earth-africa",
        "rainbow",
        "circle-notch",
        "tablet-screen-button",
        "paw",
        "cloud",
        "trowel-bricks",
        "face-flushed",
        "hospital-user",
        "tent-arrow-left-right",
        "gavel",
        "binoculars",
        "microphone-slash",
        "box-tissue",
        "motorcycle",
        "bell-concierge",
        "pen-ruler",
        "people-arrows",
        "mars-and-venus-burst",
        "square-caret-right",
        "scissors",
        "sun-plant-wilt",
        "toilets-portable",
        "hockey-puck",
        "table",
        "magnifying-glass-arrow-right",
        "tachograph-digital",
        "users-slash",
        "clover",
        "reply",
        "star-and-crescent",
        "house-fire",
        "square-minus",
        "helicopter",
        "compass",
        "square-caret-down",
        "file-circle-question",
        "laptop-code",
        "swatchbook",
        "prescription-bottle",
        "bars",
        "people-group",
        "hourglass-end",
        "heart-crack",
        "square-up-right",
        "face-kiss-beam",
        "film",
        "ruler-horizontal",
        "people-robbery",
        "lightbulb",
        "caret-left",
        "circle-exclamation",
        "school-circle-xmark",
        "arrow-right-from-bracket",
        "circle-chevron-down",
        "unlock-keyhole",
        "cloud-showers-heavy",
        "headphones-simple",
        "sitemap",
        "circle-dollar-to-slot",
        "memory",
        "road-spikes",
        "fire-burner",
        "flag",
        "hanukiah",
        "feather",
        "volume-low",
        "comment-slash",
        "cloud-sun-rain",
        "compress",
        "wheat-awn",
        "ankh",
        "hands-holding-child",
        "asterisk",
        "square-check",
        "peseta-sign",
        "heading",
        "ghost",
        "list",
        "square-phone-flip",
        "cart-plus",
        "gamepad",
        "circle-dot",
        "face-dizzy",
        "egg",
        "house-medical-circle-xmark",
        "campground",
        "folder-plus",
        "futbol",
        "paintbrush",
        "lock",
        "gas-pump",
        "hot-tub-person",
        "map-location",
        "house-flood-water",
        "tree",
        "bridge-lock",
        "sack-dollar",
        "pen-to-square",
        "car-side",
        "share-nodes",
        "heart-circle-minus",
        "hourglass-half",
        "microscope",
        "sink",
        "bag-shopping",
        "arrow-down-z-a",
        "mitten",
        "person-rays",
        "users",
        "eye-slash",
        "flask-vial",
        "hand",
        "om",
        "worm",
        "house-circle-xmark",
        "plug",
        "chevron-up",
        "hand-spock",
        "stopwatch",
        "face-kiss",
        "bridge-circle-xmark",
        "face-grin-tongue",
        "chess-bishop",
        "face-grin-wink",
        "ear-deaf",
        "road-circle-check",
        "dice-five",
        "square-rss",
        "land-mine-on",
        "i-cursor",
        "stamp",
        "stairs",
        "i",
        "hryvnia-sign",
        "pills",
        "face-grin-wide",
        "tooth",
        "v",
        "bangladeshi-taka-sign",
        "bicycle",
        "staff-snake",
        "head-side-cough-slash",
        "truck-medical",
        "wheat-awn-circle-exclamation",
        "snowman",
        "mortar-pestle",
        "road-barrier",
        "school",
        "igloo",
        "joint",
        "angle-right",
        "horse",
        "q",
        "g",
        "notes-medical",
        "temperature-half",
        "dong-sign",
        "capsules",
        "poo-storm",
        "face-frown-open",
        "hand-point-up",
        "money-bill",
        "bookmark",
        "align-justify",
        "umbrella-beach",
        "helmet-un",
        "bullseye",
        "bacon",
        "hand-point-down",
        "arrow-up-from-bracket",
        "folder",
        "file-waveform",
        "radiation",
        "chart-simple",
        "mars-stroke",
        "vial",
        "gauge",
        "wand-magic-sparkles",
        "e",
        "pen-clip",
        "bridge-circle-exclamation",
        "user",
        "school-circle-check",
        "dumpster",
        "van-shuttle",
        "building-user",
        "square-caret-left",
        "highlighter",
        "key",
        "bullhorn",
        "globe",
        "synagogue",
        "person-half-dress",
        "road-bridge",
        "location-arrow",
        "c",
        "tablet-button",
        "building-lock",
        "pizza-slice",
        "money-bill-wave",
        "chart-area",
        "house-flag",
        "person-circle-minus",
        "ban",
        "camera-rotate",
        "spray-can-sparkles",
        "star",
        "repeat",
        "cross",
        "box",
        "venus-mars",
        "arrow-pointer",
        "maximize",
        "charging-station",
        "shapes",
        "shuffle",
        "person-running",
        "mobile-retro",
        "grip-lines-vertical",
        "spider",
        "hands-bound",
        "file-invoice-dollar",
        "plane-circle-exclamation",
        "x-ray",
        "spell-check",
        "slash",
        "computer-mouse",
        "arrow-right-to-bracket",
        "shop-slash",
        "server",
        "virus-covid-slash",
        "shop-lock",
        "hourglass-start",
        "blender-phone",
        "building-wheat",
        "person-breastfeeding",
        "right-to-bracket",
        "venus",
        "passport",
        "heart-pulse",
        "people-carry-box",
        "temperature-high",
        "microchip",
        "crown",
        "weight-hanging",
        "xmarks-lines",
        "file-prescription",
        "weight-scale",
        "user-group",
        "arrow-up-a-z",
        "chess-knight",
        "face-laugh-squint",
        "wheelchair",
        "circle-arrow-up",
        "toggle-on",
        "person-walking",
        "l",
        "fire",
        "bed-pulse",
        "shuttle-space",
        "face-laugh",
        "folder-open",
        "heart-circle-plus",
        "code-fork",
        "city",
        "microphone-lines",
        "pepper-hot",
        "unlock",
        "colon-sign",
        "headset",
        "store-slash",
        "road-circle-xmark",
        "user-minus",
        "mars-stroke-up",
        "champagne-glasses",
        "clipboard",
        "house-circle-exclamation",
        "file-arrow-up",
        "wifi",
        "bath",
        "underline",
        "user-pen",
        "signature",
        "stroopwafel",
        "bold",
        "anchor-lock",
        "building-ngo",
        "manat-sign",
        "not-equal",
        "border-top-left",
        "map-location-dot",
        "jedi",
        "square-poll-vertical",
        "mug-hot",
        "car-battery",
        "gift",
        "dice-two",
        "chess-queen",
        "glasses",
        "chess-board",
        "building-circle-check",
        "person-chalkboard",
        "mars-stroke-right",
        "hand-back-fist",
        "square-caret-up",
        "cloud-showers-water",
        "chart-bar",
        "hands-bubbles",
        "less-than-equal",
        "train",
        "eye-low-vision",
        "crow",
        "sailboat",
        "window-restore",
        "square-plus",
        "torii-gate",
        "frog",
        "bucket",
        "image",
        "microphone",
        "cow",
        "caret-up",
        "screwdriver",
        "folder-closed",
        "house-tsunami",
        "square-nfi",
        "arrow-up-from-ground-water",
        "martini-glass",
        "rotate-left",
        "table-columns",
        "lemon",
        "head-side-mask",
        "handshake",
        "gem",
        "dolly",
        "smoking",
        "minimize",
        "monument",
        "snowplow",
        "angles-right",
        "cannabis",
        "circle-play",
        "tablets",
        "ethernet",
        "euro-sign",
        "chair",
        "circle-check",
        "circle-stop",
        "compass-drafting",
        "plate-wheat",
        "icicles",
        "person-shelter",
        "neuter",
        "id-badge",
        "marker",
        "face-laugh-beam",
        "helicopter-symbol",
        "universal-access",
        "circle-chevron-up",
        "lari-sign",
        "volcano",
        "person-walking-dashed-line-arrow-right",
        "sterling-sign",
        "viruses",
        "square-person-confined",
        "user-tie",
        "arrow-down-long",
        "tent-arrow-down-to-line",
        "certificate",
        "reply-all",
        "suitcase",
        "person-skating",
        "filter-circle-dollar",
        "camera-retro",
        "circle-arrow-down",
        "file-import",
        "square-arrow-up-right",
        "box-open",
        "scroll",
        "spa",
        "location-pin-lock",
        "pause",
        "hill-avalanche",
        "temperature-empty",
        "bomb",
        "registered",
        "address-card",
        "scale-unbalanced-flip",
        "subscript",
        "diamond-turn-right",
        "burst",
        "house-laptop",
        "face-tired",
        "money-bills",
        "smog",
        "crutch",
        "cloud-arrow-up",
        "palette",
        "arrows-turn-right",
        "vest",
        "ferry",
        "arrows-down-to-people",
        "seedling",
        "left-right",
        "boxes-packing",
        "circle-arrow-left",
        "group-arrows-rotate",
        "bowl-food",
        "candy-cane",
        "arrow-down-wide-short",
        "cloud-bolt",
        "text-slash",
        "face-smile-wink",
        "file-word",
        "file-powerpoint",
        "arrows-left-right",
        "house-lock",
        "cloud-arrow-down",
        "children",
        "chalkboard",
        "user-large-slash",
        "envelope-open",
        "handshake-simple-slash",
        "mattress-pillow",
        "guarani-sign",
        "arrows-rotate",
        "fire-extinguisher",
        "cruzeiro-sign",
        "greater-than-equal",
        "shield-halved",
        "book-atlas",
        "virus",
        "envelope-circle-check",
        "layer-group",
        "arrows-to-dot",
        "archway",
        "heart-circle-check",
        "house-chimney-crack",
        "file-zipper",
        "square",
        "martini-glass-empty",
        "couch",
        "cedi-sign",
        "italic",
        "church",
        "comments-dollar",
        "democrat",
        "z",
        "person-skiing",
        "road-lock",
        "a",
        "temperature-arrow-down",
        "feather-pointed",
        "p",
        "snowflake",
        "newspaper",
        "rectangle-ad",
        "circle-arrow-right",
        "filter-circle-xmark",
        "locust",
        "sort",
        "list-ol",
        "person-dress-burst",
        "money-check-dollar",
        "vector-square",
        "bread-slice",
        "language",
        "face-kiss-wink-heart",
        "filter",
        "question",
        "file-signature",
        "up-down-left-right",
        "house-chimney-user",
        "hand-holding-heart",
        "puzzle-piece",
        "money-check",
        "star-half-stroke",
        "code",
        "whiskey-glass",
        "building-circle-exclamation",
        "magnifying-glass-chart",
        "arrow-up-right-from-square",
        "cubes-stacked",
        "won-sign",
        "virus-covid",
        "austral-sign",
        "f",
        "leaf",
        "road",
        "taxi",
        "person-circle-plus",
        "chart-pie",
        "bolt-lightning",
        "sack-xmark",
        "file-excel",
        "file-contract",
        "fish-fins",
        "building-flag",
        "face-grin-beam",
        "object-ungroup",
        "poop",
        "location-pin",
        "kaaba",
        "toilet-paper",
        "helmet-safety",
        "eject",
        "circle-right",
        "plane-circle-check",
        "face-rolling-eyes",
        "object-group",
        "chart-line",
        "mask-ventilator",
        "arrow-right",
        "signs-post",
        "cash-register",
        "person-circle-question",
        "h",
        "tarp",
        "screwdriver-wrench",
        "arrows-to-eye",
        "plug-circle-bolt",
        "heart",
        "mars-and-venus",
        "house-user",
        "dumpster-fire",
        "house-crack",
        "martini-glass-citrus",
        "face-surprise",
        "bottle-water",
        "circle-pause",
        "toilet-paper-slash",
        "apple-whole",
        "kitchen-set",
        "r",
        "temperature-quarter",
        "cube",
        "bitcoin-sign",
        "shield-dog",
        "solar-panel",
        "lock-open",
        "elevator",
        "money-bill-transfer",
        "money-bill-trend-up",
        "house-flood-water-circle-arrow-right",
        "square-poll-horizontal",
        "circle",
        "backward-fast",
        "recycle",
        "user-astronaut",
        "plane-slash",
        "trademark",
        "basketball",
        "satellite-dish",
        "circle-up",
        "mobile-screen-button",
        "volume-high",
        "users-rays",
        "wallet",
        "clipboard-check",
        "file-audio",
        "burger",
        "wrench",
        "bugs",
        "rupee-sign",
        "file-image",
        "circle-question",
        "plane-departure",
        "handshake-slash",
        "book-bookmark",
        "code-branch",
        "hat-cowboy",
        "bridge",
        "phone-flip",
        "truck-front",
        "cat",
        "anchor-circle-exclamation",
        "truck-field",
        "route",
        "clipboard-question",
        "panorama",
        "comment-medical",
        "teeth-open",
        "file-circle-minus",
        "tags",
        "wine-glass",
        "forward-fast",
        "face-meh-blank",
        "square-parking",
        "house-signal",
        "bars-progress",
        "faucet-drip",
        "cart-flatbed",
        "ban-smoking",
        "terminal",
        "mobile-button",
        "house-medical-flag",
        "basket-shopping",
        "tape",
        "bus-simple",
        "eye",
        "face-sad-cry",
        "audio-description",
        "person-military-to-person",
        "file-shield",
        "user-slash",
        "pen",
        "tower-observation",
        "file-code",
        "signal",
        "bus",
        "heart-circle-xmark",
        "house-chimney",
        "window-maximize",
        "face-frown",
        "prescription",
        "shop",
        "floppy-disk",
        "vihara",
        "scale-unbalanced",
        "sort-up",
        "comment-dots",
        "plant-wilt",
        "diamond",
        "face-grin-squint",
        "hand-holding-dollar",
        "bacterium",
        "hand-pointer",
        "drum-steelpan",
        "hand-scissors",
        "hands-praying",
        "arrow-rotate-right",
        "biohazard",
        "location-crosshairs",
        "mars-double",
        "child-dress",
        "users-between-lines",
        "lungs-virus",
        "face-grin-tears",
        "phone",
        "calendar-xmark",
        "child-reaching",
        "head-side-virus",
        "user-gear",
        "arrow-up-1-9",
        "door-closed",
        "shield-virus",
        "dice-six",
        "mosquito-net",
        "bridge-water",
        "person-booth",
        "text-width",
        "hat-wizard",
        "pen-fancy",
        "person-digging",
        "trash",
        "gauge-simple",
        "book-medical",
        "poo",
        "quote-right",
        "shirt",
        "cubes",
        "divide",
        "tenge-sign",
        "headphones",
        "hands-holding",
        "hands-clapping",
        "republican",
        "arrow-left",
        "person-circle-xmark",
        "ruler",
        "align-left",
        "dice-d6",
        "restroom",
        "j",
        "users-viewfinder",
        "file-video",
        "up-right-from-square",
        "table-cells",
        "file-pdf",
        "book-bible",
        "o",
        "suitcase-medical",
        "user-secret",
        "otter",
        "person-dress",
        "comment-dollar",
        "business-time",
        "table-cells-large",
        "book-tanakh",
        "phone-volume",
        "hat-cowboy-side",
        "clipboard-user",
        "child",
        "lira-sign",
        "satellite",
        "plane-lock",
        "tag",
        "comment",
        "cake-candles",
        "envelope",
        "angles-up",
        "paperclip",
        "arrow-right-to-city",
        "ribbon",
        "lungs",
        "arrow-up-9-1",
        "litecoin-sign",
        "border-none",
        "circle-nodes",
        "parachute-box",
        "indent",
        "truck-field-un",
        "hourglass",
        "mountain",
        "user-doctor",
        "circle-info",
        "cloud-meatball",
        "camera",
        "square-virus",
        "meteor",
        "car-on",
        "sleigh",
        "arrow-down-1-9",
        "hand-holding-droplet",
        "water",
        "calendar-check",
        "braille",
        "prescription-bottle-medical",
        "landmark",
        "truck",
        "crosshairs",
        "person-cane",
        "tent",
        "vest-patches",
        "check-double",
        "arrow-down-a-z",
        "money-bill-wheat",
        "cookie",
        "arrow-rotate-left",
        "hard-drive",
        "face-grin-squint-tears",
        "dumbbell",
        "rectangle-list",
        "tarp-droplet",
        "house-medical-circle-check",
        "person-skiing-nordic",
        "calendar-plus",
        "plane-arrival",
        "circle-left",
        "train-subway",
        "chart-gantt",
        "indian-rupee-sign",
        "crop-simple",
        "money-bill-1",
        "left-long",
        "dna",
        "virus-slash",
        "minus",
        "chess",
        "arrow-left-long",
        "plug-circle-check",
        "street-view",
        "franc-sign",
        "volume-off",
        "hands-asl-interpreting",
        "gear",
        "droplet-slash",
        "mosque",
        "mosquito",
        "star-of-david",
        "person-military-rifle",
        "cart-shopping",
        "vials",
        "plug-circle-plus",
        "place-of-worship",
        "grip-vertical",
        "arrow-turn-up",
        "u",
        "square-root-variable",
        "clock",
        "backward-step",
        "pallet",
        "faucet",
        "baseball-bat-ball",
        "s",
        "timeline",
        "keyboard",
        "caret-down",
        "house-chimney-medical",
        "temperature-three-quarters",
        "mobile-screen",
        "plane-up",
        "piggy-bank",
        "battery-half",
        "mountain-city",
        "coins",
        "khanda",
        "sliders",
        "folder-tree",
        "network-wired",
        "map-pin",
        "hamsa",
        "cent-sign",
        "flask",
        "person-pregnant",
        "wand-sparkles",
        "ellipsis-vertical",
        "ticket",
        "power-off",
        "right-long",
        "flag-usa",
        "laptop-file",
        "tty",
        "diagram-next",
        "person-rifle",
        "house-medical-circle-exclamation",
        "closed-captioning",
        "person-hiking",
        "venus-double",
        "images",
        "calculator",
        "people-pulling",
        "n",
        "cable-car",
        "cloud-rain",
        "building-circle-xmark",
        "ship",
        "arrows-down-to-line",
        "download",
        "face-grin",
        "delete-left",
        "eye-dropper",
        "file-circle-check",
        "forward",
        "mobile",
        "face-meh",
        "align-center",
        "book-skull",
        "id-card",
        "outdent",
        "heart-circle-exclamation",
        "house",
        "calendar-week",
        "laptop-medical",
        "b",
        "file-medical",
        "dice-one",
        "kiwi-bird",
        "arrow-right-arrow-left",
        "rotate-right",
        "utensils",
        "arrow-up-wide-short",
        "mill-sign",
        "bowl-rice",
        "skull",
        "tower-broadcast",
        "truck-pickup",
        "up-long",
        "stop",
        "code-merge",
        "upload",
        "hurricane",
        "mound",
        "toilet-portable",
        "compact-disc",
        "file-arrow-down",
        "caravan",
        "shield-cat",
        "bolt",
        "glass-water",
        "oil-well",
        "vault",
        "mars",
        "toilet",
        "plane-circle-xmark",
        "yen-sign",
        "ruble-sign",
        "sun",
        "guitar",
        "face-laugh-wink",
        "horse-head",
        "bore-hole",
        "industry",
        "circle-down",
        "arrows-turn-to-dots",
        "florin-sign",
        "arrow-down-short-wide",
        "less-than",
        "angle-down",
        "car-tunnel",
        "head-side-cough",
        "grip-lines",
        "thumbs-down",
        "user-lock",
        "arrow-right-long",
        "anchor-circle-xmark",
        "ellipsis",
        "chess-pawn",
        "kit-medical",
        "person-through-window",
        "toolbox",
        "hands-holding-circle",
        "bug",
        "credit-card",
        "car",
        "hand-holding-hand",
        "book-open-reader",
        "mountain-sun",
        "arrows-left-right-to-line",
        "dice-d20",
        "truck-droplet",
        "file-circle-xmark",
        "temperature-arrow-up",
        "medal",
        "bed",
        "square-h",
        "podcast",
        "temperature-full",
        "bell",
        "superscript",
        "plug-circle-xmark",
        "star-of-life",
        "phone-slash",
        "paint-roller",
        "handshake-angle",
        "location-dot",
        "file",
        "greater-than",
        "person-swimming",
        "arrow-down",
        "droplet",
        "eraser",
        "earth-americas",
        "person-burst",
        "dove",
        "battery-empty",
        "socks",
        "inbox",
        "section",
        "gauge-high",
        "envelope-open-text",
        "hospital",
        "wine-bottle",
        "chess-rook",
        "bars-staggered",
        "dharmachakra",
        "hotdog",
        "person-walking-with-cane",
        "drum",
        "ice-cream",
        "heart-circle-bolt",
        "fax",
        "paragraph",
        "check-to-slot",
        "star-half",
        "boxes-stacked",
        "link",
        "ear-listen",
        "tree-city",
        "play",
        "font",
        "rupiah-sign",
        "magnifying-glass",
        "table-tennis-paddle-ball",
        "person-dots-from-line",
        "trash-can-arrow-up",
        "naira-sign",
        "cart-arrow-down",
        "walkie-talkie",
        "file-pen",
        "receipt",
        "square-pen",
        "suitcase-rolling",
        "person-circle-exclamation",
        "chevron-down",
        "battery-full",
        "skull-crossbones",
        "code-compare",
        "list-ul",
        "school-lock",
        "tower-cell",
        "down-long",
        "ranking-star",
        "chess-king",
        "person-harassing",
        "brazilian-real-sign",
        "landmark-dome",
        "arrow-up",
        "tv",
        "shrimp",
        "list-check",
        "jug-detergent",
        "circle-user",
        "user-shield",
        "wind",
        "car-burst",
        "y",
        "person-snowboarding",
        "truck-fast",
        "fish",
        "user-graduate",
        "circle-half-stroke",
        "clapperboard",
        "circle-radiation",
        "baseball",
        "jet-fighter-up",
        "diagram-project",
        "copy",
        "volume-xmark",
        "hand-sparkles",
        "grip",
        "share-from-square",
        "child-combatant",
        "gun",
        "square-phone",
        "plus",
        "expand",
        "computer",
        "xmark",
        "arrows-up-down-left-right",
        "chalkboard-user",
        "peso-sign",
        "building-shield",
        "baby",
        "users-line",
        "quote-left",
        "tractor",
        "trash-arrow-up",
        "arrow-down-up-lock",
        "lines-leaning",
        "ruler-combined",
        "copyright",
        "equals",
        "blender",
        "teeth",
        "shekel-sign",
        "map",
        "rocket",
        "photo-film",
        "folder-minus",
        "store",
        "arrow-trend-up",
        "plug-circle-minus",
        "sign-hanging",
        "bezier-curve",
        "bell-slash",
        "tablet",
        "school-flag",
        "fill",
        "angle-up",
        "drumstick-bite",
        "holly-berry",
        "chevron-left",
        "bacteria",
        "hand-lizard",
        "notdef",
        "disease",
        "briefcase-medical",
        "genderless",
        "chevron-right",
        "retweet",
        "car-rear",
        "pump-soap",
        "video-slash",
        "battery-quarter",
        "radio",
        "baby-carriage",
        "traffic-light",
        "thermometer",
        "vr-cardboard",
        "hand-middle-finger",
        "percent",
        "truck-moving",
        "glass-water-droplet",
        "display",
        "face-smile",
        "thumbtack",
        "trophy",
        "person-praying",
        "hammer",
        "hand-peace",
        "rotate",
        "spinner",
        "robot",
        "peace",
        "gears",
        "warehouse",
        "arrow-up-right-dots",
        "splotch",
        "face-grin-hearts",
        "dice-four",
        "sim-card",
        "transgender",
        "mercury",
        "arrow-turn-down",
        "person-falling-burst",
        "award",
        "ticket-simple",
        "building",
        "angles-left",
        "qrcode",
        "clock-rotate-left",
        "face-grin-beam-sweat",
        "file-export",
        "shield",
        "arrow-up-short-wide",
        "house-medical",
        "golf-ball-tee",
        "circle-chevron-left",
        "house-chimney-window",
        "pen-nib",
        "tent-arrow-turn-left",
        "tents",
        "wand-magic",
        "dog",
        "carrot",
        "moon",
        "wine-glass-empty",
        "cheese",
        "yin-yang",
        "music",
        "code-commit",
        "temperature-low",
        "person-biking",
        "broom",
        "shield-heart",
        "gopuram",
        "earth-oceania",
        "square-xmark",
        "hashtag",
        "up-right-and-down-left-from-center",
        "oil-can",
        "t",
        "hippo",
        "chart-column",
        "infinity",
        "vial-circle-check",
        "person-arrow-down-to-line",
        "voicemail",
        "fan",
        "person-walking-luggage",
        "up-down",
        "cloud-moon-rain",
        "calendar",
        "trailer",
        "bahai",
        "sd-card",
        "dragon",
        "shoe-prints",
        "circle-plus",
        "face-grin-tongue-wink",
        "hand-holding",
        "plug-circle-exclamation",
        "link-slash",
        "clone",
        "person-walking-arrow-loop-left",
        "arrow-up-z-a",
        "fire-flame-curved",
        "tornado",
        "file-circle-plus",
        "book-quran",
        "anchor",
        "border-all",
        "face-angry",
        "cookie-bite",
        "arrow-trend-down",
        "rss",
        "draw-polygon",
        "scale-balanced",
        "gauge-simple-high",
        "shower",
        "desktop",
        "m",
        "table-list",
        "comment-sms",
        "book",
        "user-plus",
        "check",
        "battery-three-quarters",
        "house-circle-check",
        "angle-left",
        "diagram-successor",
        "truck-arrow-right",
        "arrows-split-up-and-left",
        "hand-fist",
        "cloud-moon",
        "briefcase",
        "person-falling",
        "image-portrait",
        "user-tag",
        "rug",
        "earth-europe",
        "cart-flatbed-suitcase",
        "rectangle-xmark",
        "baht-sign",
        "book-open",
        "book-journal-whills",
        "handcuffs",
        "triangle-exclamation",
        "database",
        "share",
        "bottle-droplet",
        "mask-face",
        "hill-rockslide",
        "right-left",
        "paper-plane",
        "road-circle-exclamation",
        "dungeon",
        "align-right",
        "money-bill-1-wave",
        "life-ring",
        "hands",
        "calendar-day",
        "water-ladder",
        "arrows-up-down",
        "face-grimace",
        "wheelchair-move",
        "turn-down",
        "person-walking-arrow-right",
        "square-envelope",
        "dice",
        "bowling-ball",
        "brain",
        "bandage",
        "calendar-minus",
        "circle-xmark",
        "gifts",
        "hotel",
        "earth-asia",
        "id-card-clip",
        "magnifying-glass-plus",
        "thumbs-up",
        "user-clock",
        "hand-dots",
        "file-invoice",
        "window-minimize",
        "mug-saucer",
        "brush",
        "mask",
        "magnifying-glass-minus",
        "ruler-vertical",
        "user-large",
        "train-tram",
        "user-nurse",
        "syringe",
        "cloud-sun",
        "stopwatch-20",
        "square-full",
        "magnet",
        "jar",
        "note-sticky",
        "bug-slash",
        "arrow-up-from-water-pump",
        "bone",
        "user-injured",
        "face-sad-tear",
        "plane",
        "tent-arrows-down",
        "exclamation",
        "arrows-spin",
        "print",
        "turkish-lira-sign",
        "dollar-sign",
        "x",
        "magnifying-glass-dollar",
        "users-gear",
        "person-military-pointing",
        "building-columns",
        "umbrella",
        "trowel",
        "d",
        "stapler",
        "masks-theater",
        "kip-sign",
        "hand-point-left",
        "handshake-simple",
        "jet-fighter",
        "square-share-nodes",
        "barcode",
        "plus-minus",
        "video",
        "graduation-cap",
        "hand-holding-medical",
        "person-circle-check",
        "turn-up"];

    const colContent = (text) => {
        return <div className="p-4 bg-white-trans-faded rounded-sm">
            {text}
        </div>;
    };

    const { model } = setupController();

    const [sliderValue, setSliderValue] = react.useState(0);

    const exampleOptions = [
        {
            label: "Apple",
            value: "apple"
        }, {
            label: "Peach",
            value: "peach"
        }, {
            label: "Pear",
            value: "pear"
        }, {
            label: "Banana",
            value: "banana"
        }];
    const gridCode = "<Grid auto>\n" +
        "    <div>Content</div>\n" +
        "    <div>Content</div>\n" +
        "</Grid>\n";
    const { FormCheckBox, FormGroup, TextBox, Icon, Button, Grid, Code, RadioGroup, Slider, GradientSlider, RadioItem, ToolTip, ToolTipContent, Scrollable, TabModal, Dropdown, CheckBox, CheckBoxGroup } = window.$_gooee.framework;
    const icon = <div className="fa fa-eye"></div>;
    const tabs = [
        {
            name: "GRIDS",
            label: <div className="d-flex flex-row w-x">
                <div className="align-self-flex-start icon-sm fa fa-solid-border-all mr-2"></div>
                <div className="flex-1 w-x">Grids</div>
            </div>,
            content: <div>
                <h2 className="text-primary mb-1">Grids</h2>
                <div className="bg-black-trans-less-faded rounded-sm mb-4 p-4">
                    <p className="mb-2" cohinline="cohinline">
                        You can define grids using the following syntax:
                    </p>
                    <Code htmlString={gridCode}></Code>
                </div>
                <Grid className="mb-4">
                    <div className="col-3">
                        {colContent("col-3")}
                    </div>
                    <div className="col-9">
                        {colContent("col-9")}
                    </div>
                </Grid>
                <Grid className="mb-4">
                    <div className="col-9">
                        {colContent("col-9")}
                    </div>
                    <div className="col-3">
                        {colContent("col-3")}
                    </div>
                </Grid>
                <Grid className="mb-4" auto>
                    <div>
                        {colContent("col-6")}
                    </div>
                    <div>
                        {colContent("col-6")}
                    </div>
                </Grid>
                <Grid className="mb-4" auto>
                    <div>
                        {colContent("col-4")}
                    </div>
                    <div>
                        {colContent("col-4")}
                    </div>
                    <div>
                        {colContent("col-4")}
                    </div>
                </Grid>
                <Grid className="mb-4" auto>
                    <div>
                        {colContent("col-3")}
                    </div>
                    <div>
                        {colContent("col-3")}
                    </div>
                    <div>
                        {colContent("col-3")}
                    </div>
                    <div>
                        {colContent("col-3")}
                    </div>
                </Grid>
                <Grid className="mb-4" auto>
                    <div>
                        {colContent("col-2")}
                    </div>
                    <div>
                        {colContent("col-2")}
                    </div>
                    <div>
                        {colContent("col-2")}
                    </div>
                    <div>
                        {colContent("col-2")}
                    </div>
                    <div>
                        {colContent("col-2")}
                    </div>
                    <div>
                        {colContent("col-2")}
                    </div>
                </Grid>
                <Grid className="mb-4" auto>
                    <div>
                        {colContent("col-1")}
                    </div>
                    <div>
                        {colContent("col-1")}
                    </div>
                    <div>
                        {colContent("col-1")}
                    </div>
                    <div>
                        {colContent("col-1")}
                    </div>
                    <div>
                        {colContent("col-1")}
                    </div>
                    <div>
                        {colContent("col-1")}
                    </div>
                    <div>
                        {colContent("col-1")}
                    </div>
                    <div>
                        {colContent("col-1")}
                    </div>
                    <div>
                        {colContent("col-1")}
                    </div>
                    <div>
                        {colContent("col-1")}
                    </div>
                    <div>
                        {colContent("col-1")}
                    </div>
                    <div>
                        {colContent("col-1")}
                    </div>
                </Grid>
            </div>
        },
        {
            name: "BUTTONS",
            label: <div className="d-flex flex-row w-x">
                <div className="align-self-flex-start icon-sm fa fa-solid-stop mr-2"></div>
                <div className="flex-1 w-x">Buttons</div>
            </div>,
            content: <Grid auto>
                <div>
                    <h2 className="text-primary">Buttons</h2>
                    <h3 className="text-muted mb-1">Colours</h3>
                    <div className="bg-black-trans-less-faded rounded-sm mb-4">
                        <Code htmlString={"<Button color=\"name\">Button</Button>"}></Code>
                        <div className="p-4">
                            <div className="d-flex flex-row flex-wrap">
                                <Button className="mr-1" color="primary">Primary</Button>
                                <Button className="mr-1" color="secondary">Secondary</Button>
                                <Button className="mr-1" color="info">Info</Button>
                                <Button className="mr-1" color="success">Success</Button>
                                <Button className="mr-1" color="warning">Warning</Button>
                                <Button color="danger">Danger</Button>
                            </div>
                            <div className="mt-2 d-flex flex-row flex-wrap">
                                <Button className="mr-1" color="light">Light</Button>
                                <Button className="mr-1" color="dark">Dark</Button>
                                <Button className="mr-1" color="white">White</Button>
                                <Button color="black">Black</Button>
                            </div>
                        </div>
                    </div>
                    <h3 className="text-muted mb-1">Styles</h3>
                    <div className="bg-black-trans-less-faded rounded-sm mb-4">
                        <Code htmlString={"<Button style=\"outline\">Outline</Button>\n<Button style=\"trans\">Translucent</Button>\n<Button disabled>Disabled</Button>\n<Button isBlock>Block</Button>"}></Code>
                        <div className="d-flex flex-row flex-wrap align-items-start m-4">
                            <Button className="mr-1" color="light" style="outline">Outline</Button>
                            <Button className="mr-1" color="light" style="trans">Translucent</Button>
                            <Button color="light" disabled>Disabled</Button>
                        </div>
                        <div className="d-flex flex-row flex-wrap align-items-start pl-4 pr-4 pb-4">
                            <Button color="light" isBlock>Block</Button>
                        </div>
                    </div>
                    <h3 className="text-muted mb-1">Sizes</h3>
                    <div className="bg-black-trans-less-faded rounded-sm mb-4">
                        <Code htmlString={"<Button size=\"sm\">Small Button</Button>\n<Button size=\"lg\">Large Button</Button>"}></Code>
                        <div className="d-flex flex-row flex-wrap align-items-start m-4">
                            <Button className="mr-1" color="primary" size="lg">Large Button</Button>
                            <Button className="mr-1" color="secondary" size="lg">Large Button</Button>
                            <Button className="mr-1" color="primary" size="sm">Small Button</Button>
                            <Button color="secondary" size="sm">Small Button</Button>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="text-muted mb-1">Icon Buttons</h3>
                    <div className="bg-black-trans-less-faded rounded-sm mb-4">
                        <Code htmlString={"<Button icon>\n    <Icon icon=\"close\" mask />\n</Button>"}></Code>
                        <div className="d-flex flex-row flex-wrap align-items-start m-4">
                            <Button className="mr-1" size="sm" icon>
                                <div className="icon mask-icon icon-close"></div>
                            </Button>
                            <Button className="mr-1" icon>
                                <div className="icon mask-icon icon-close"></div>
                            </Button>
                            <Button className="mr-1" size="lg" icon>
                                <div className="icon mask-icon icon-close"></div>
                            </Button>
                        </div>
                    </div>
                    <h3 className="text-muted mb-1">Icon Buttons (Bordered Circular)</h3>
                    <div className="bg-black-trans-less-faded rounded-sm mb-4">
                        <Code htmlString={"<Button border icon circular>\n    <Icon icon=\"close\" mask />\n</Button>"}></Code>
                        <div className="d-flex flex-row flex-wrap align-items-start m-4">
                            <Button className="mr-1" size="sm" border icon circular>
                                <Icon icon="close" mask />
                            </Button>
                            <Button className="mr-1" border icon circular>
                                <Icon icon="close" mask />
                            </Button>
                            <Button className="mr-1" size="lg" border icon circular>
                                <Icon icon="close" mask />
                            </Button>
                        </div>
                    </div>
                    <h2 className="text-primary">Button Groups</h2>
                    <div className="row no-gutter mb-4">
                        <div className="col-6 pr-2">
                            <h3 className="text-muted mb-1">Horizontal</h3>
                            <div className="bg-black-trans-less-faded rounded-sm">
                                <code>
                                    btn-group
                                </code>
                                <div className="p-4">
                                    <div className="btn-group">
                                        <Button color="primary">One</Button>
                                        <Button color="danger">Two</Button>
                                        <Button color="success">Three</Button>
                                        <Button color="warning">Four</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 pl-2">
                            <h3 className="text-muted mb-1">Vertical</h3>
                            <div className="bg-black-trans-less-faded rounded-sm">
                                <code>
                                    btn-group-vertical
                                </code>
                                <div className="p-4">
                                    <div className="btn-group-vertical">
                                        <Button color="primary">One</Button>
                                        <Button color="danger">Two</Button>
                                        <Button color="success">Three</Button>
                                        <Button color="warning">Four</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Grid>
        },
        {
            name: "TYPOGRAPHY",
            label: <div className="d-flex flex-row w-x">
                <div className="align-self-flex-start icon-sm fa fa-solid-font mr-2"></div>
                <div className="flex-1 w-x">Typography</div>
            </div>,
            content: <Grid auto>
                <div>
                    <div className="mb-4">
                        <h2 className="text-primary">Typography</h2>
                        <h3 className="text-muted mb-1">Headers</h3>
                        <div className="bg-black-trans-less-faded rounded-sm p-4">
                            <h1>h1.Header</h1>
                            <h2>h2.Header</h2>
                            <h4>h4.Header</h4>
                            <h5>h5.Header</h5>
                            <h6>h6.Header</h6>
                        </div>
                        <h3 className="text-muted mt-4 mb-1">Paragraph</h3>
                        <div className="bg-black-trans-less-faded rounded-sm p-4">
                            <p cohinline="cohinline">
                                Dolorem delectus et laborum voluptatum animi. Et placeat reiciendis qui minima officiis ullam consequatur excepturi.&nbsp;<b>Et id delectus aut</b>.&nbsp;Ullam dicta ut adipisci aut iure quos aut. Quam illum sint non&nbsp;<b>voluptatem</b>&nbsp;earum commodi eos impedit.
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                </div>
            </Grid>
        },
        ,
        {
            name: "MISC",
            label: <div className="d-flex flex-row w-x">
                <div className="align-self-flex-start icon-sm fa fa-solid-font mr-2"></div>
                <div className="flex-1 w-x">Misc</div>
            </div>,
            content: <Grid auto>
                <div>
                    <h2 className="text-primary">Badges</h2>
                    <div className="bg-black-trans-less-faded rounded-sm mb-4 p-4 d-flex flex-row flex-wrap">
                        <div class="badge badge-primary mr-1">
                            badge-primary
                        </div>
                        <div class="badge badge-secondary mr-1">
                            badge-secondary
                        </div>
                        <div class="badge badge-success mr-1">
                            badge-success
                        </div>
                        <div class="badge badge-danger mr-1">
                            badge-danger
                        </div>
                    </div>
                    <h3 className="text-muted mb-1">Pill</h3>
                    <div className="bg-black-trans-less-faded rounded-sm p-4 d-flex flex-row flex-wrap">
                        <div class="badge badge-primary badge-pill mr-1">
                            badge-primary
                        </div>
                        <div class="badge badge-secondary badge-pill mr-1">
                            badge-secondary
                        </div>
                        <div class="badge badge-success badge-pill mr-1">
                            badge-success
                        </div>
                        <div class="badge badge-danger badge-pill mr-1">
                            badge-danger
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-primary">Alerts</h2>
                    <div className="bg-black-trans-less-faded rounded-sm p-4">
                        <div class="alert alert-primary mb-4">
                            A simple primary alert-check it out!
                        </div>
                        <div class="alert alert-secondary mb-4">
                            A simple secondary alert-check it out!
                        </div>
                        <div class="alert alert-success mb-4">
                            A simple success alert-check it out!
                        </div>
                        <div class="alert alert-danger mb-4">
                            A simple danger alert-check it out!
                        </div>
                        <div class="alert alert-warning mb-4">
                            A simple warning alert-check it out!
                        </div>
                        <div class="alert alert-info mb-4">
                            A simple info alert-check it out!
                        </div>
                        <div class="alert alert-light mb-4">
                            A simple light alert-check it out!
                        </div>
                        <div class="alert alert-dark">
                            A simple dark alert-check it out!
                        </div>
                    </div>
                </div>
            </Grid>
        },
        {
            name: "FORMS",
            label: <div className="d-flex flex-row w-x">
                <div className="align-self-flex-start icon-sm fa fa-solid-square-check mr-2"></div>
                <div className="flex-1 w-x">Forms</div>
            </div>,
            content: <div>
                <h2 className="text-primary">Forms</h2>
                <Grid auto>
                    <div>
                        <h3 className="text-muted mb-1">Text</h3>
                        <div className="bg-black-trans-less-faded rounded-sm mb-4">
                            <Code htmlString={"<TextBox />"}></Code>
                            <div className="p-4">
                                <TextBox />
                            </div>
                        </div>
                        <h3 className="text-muted mb-1">Sizing</h3>
                        <div className="bg-black-trans-less-faded rounded-sm mb-4">
                            <Code htmlString={"<TextBox size=\"sm\" />\n<TextBox size=\"lg\" />"}></Code>
                            <div className="p-4">
                                <TextBox className="mb-4" size="sm" />
                                <TextBox size="lg" />
                            </div>
                        </div>
                        <h3 className="text-muted mb-1">Text Area</h3>
                        <div className="bg-black-trans-less-faded rounded-sm mb-4">
                            <Code htmlString={"<TextBox rows=\"3\" />"}></Code>
                            <div className="p-4">
                                <TextBox rows="3" />
                            </div>
                        </div>
                        <h3 className="text-muted mb-1">Disabled</h3>
                        <div className="bg-black-trans-less-faded rounded-sm">
                            <Code htmlString={"<TextBox disabled />"}></Code>
                            <div className="p-4">
                                <TextBox disabled />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-muted mb-1">Dropdown</h3>
                        <div className="bg-black-trans-less-faded rounded-sm p-4 mb-4">
                            <FormGroup label="Fruit">
                                <Dropdown options={exampleOptions} selected={dropdownSelection} onSelectionChanged={(val) => setDropdownSelection(val)} />
                            </FormGroup>
                        </div>
                        <h3 className="text-muted mb-1">Slider</h3>
                        <div className="bg-black-trans-less-faded rounded-sm p-4 mb-4">
                            <FormGroup label="Some setting" className="form-group">
                                <Grid>
                                    <div className="col-10">
                                        <Slider onValueChanged={(val) => setSliderValue(val)} />
                                    </div>
                                    <div className="col-2 align-items-center justify-content-center text-muted">
                                        {sliderValue + "%"}
                                    </div>
                                </Grid>
                                <small className="form-text text-muted">Some example muted text.</small>

                            </FormGroup>
                        </div>
                        <h3 className="text-muted mb-1">Gradient Slider</h3>
                        <div className="bg-black-trans-less-faded rounded-sm p-4">
                            <FormGroup label="Some setting" className="form-group">
                                <Grid>
                                    <div className="col-10">
                                        <GradientSlider className="form-control-sm" spectrum onValueChanged={(val) => setSliderValue(val)} />
                                    </div>
                                    <div className="col-2 align-items-center justify-content-center text-muted">
                                        {sliderValue + "%"}
                                    </div>
                                </Grid>
                                <small className="form-text text-muted">Some example muted text.</small>

                            </FormGroup>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-muted mb-1">Checkbox</h3>
                        <div className="bg-black-trans-less-faded rounded-sm p-4 mb-4">
                            <FormGroup label="Fruit">
                                <CheckBoxGroup options={exampleOptions}>
                                </CheckBoxGroup>
                            </FormGroup>
                        </div>
                        <h3 className="text-muted mb-1">Radio Group</h3>
                        <div className="bg-black-trans-less-faded rounded-sm p-4 mb-4">
                            <FormGroup label="Fruit">
                                <RadioGroup options={exampleOptions}>
                                </RadioGroup>
                            </FormGroup>
                        </div>
                        <h3 className="text-muted mb-1">Validation</h3>
                        <div className="bg-black-trans-less-faded rounded-sm p-4">
                            <div className="form was-validated">
                                <FormGroup label="Email address">
                                    <TextBox type="email" />
                                </FormGroup>
                                <FormGroup label="Password">
                                    <TextBox type="password" className="is-invalid" />
                                    <div class="invalid-feedback">More example invalid feedback text</div>
                                </FormGroup>
                            </div>
                        </div>
                    </div>
                </Grid>
            </div>
        },
        {
            name: "ICONS",
            label: <div className="d-flex flex-row w-x">
                <div className="align-self-flex-start icon-sm fa fa-solid-icons mr-2"></div>
                <div className="flex-1 w-x">Icons</div>
            </div>,
            content: <div>
                <Grid>
                    <div className="col-4">
                        <h2 className="text-primary">Game Icons</h2>
                        <h4 className="text-muted mb-1">Sizing</h4>
                        <div className="bg-black-trans-less-faded rounded-sm mb-4">
                            <code>
                                icon-sm<br />
                                icon-lg
                            </code>
                            <div className="d-flex flex-row flex-wrap align-items-center m-4">
                                <div className="w-33 d-flex flex-row align-items-center" key={maskIcons[0]}>
                                    <div className={`icon mask-icon icon-sm icon-${maskIcons[0]} mr-2`}></div>
                                    <div className="flex-1 w-x">Small</div>
                                </div>
                                <div className="w-33 d-flex flex-row align-items-center" key={maskIcons[0]}>
                                    <div className={`icon mask-icon icon-${maskIcons[0]} mr-2`}></div>
                                    <div className="flex-1 w-x">Normal</div>
                                </div>
                                <div className="w-33 d-flex flex-row align-items-center" key={maskIcons[0]}>
                                    <div className={`icon mask-icon icon-lg icon-${maskIcons[0]} mr-2`}></div>
                                    <div className="flex-1 w-x">Large</div>
                                </div>
                            </div>
                        </div>
                        <h4 className="text-muted mb-1">Animations</h4>
                        <div className="bg-black-trans-less-faded rounded-sm mb-4">
                            <code>
                                icon-spin
                            </code>
                            <div className="d-flex flex-row flex-wrap align-items-center m-4">
                                <div className="fa icon-spin icon-lg fa-solid-spinner mr-2"></div>
                                <div className="fa icon-spin icon-lg fa-solid-rotate-right mr-2"></div>
                                <div className="fa icon-spin icon-lg fa-solid-rotate mr-2"></div>
                                <div className="fa icon-spin icon-lg fa-solid-circle-notch mr-2"></div>
                                <div className="fa icon-spin icon-lg fa-solid-arrows-spin mr-2"></div>
                                <div className="fa icon-spin icon-lg fa-solid-dharmachakra mr-2"></div>
                                <div className="fa icon-spin icon-lg fa-solid-asterisk mr-2"></div>
                                <div className="fa icon-spin icon-lg fa-solid-life-ring mr-2"></div>
                                <div className="fa icon-spin icon-lg fa-solid-hurricane mr-2"></div>
                                <div className="fa icon-spin icon-lg fa-solid-fan"></div>
                            </div>
                        </div>
                        <h4 className="text-muted mb-1">Mask</h4>
                        <div className="bg-black-trans-less-faded rounded-sm mb-4">
                            <code>
                                mask-icon icon-[name]
                            </code>
                            <div className="d-flex flex-row flex-wrap align-items-start m-4">
                                {maskIcons.map((icon, index) => {
                                    const iconClassName = `icon mask-icon icon-sm icon-${icon} mr-2`;
                                    return <div className="w-50 d-flex flex-row align-items-center" key={icon}>
                                        <div className={iconClassName}></div>
                                        <div className="flex-1 w-x">{icon}</div>
                                    </div>;
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <h2 className="text-primary">FontAwesome v6 Icons</h2>
                        <h4 className="text-muted mb-1">Regular</h4>
                        <div className="bg-black-trans-less-faded rounded-sm mb-4">
                            <code>
                                fa fa-[name]
                            </code>
                            <div className="d-flex flex-row flex-wrap align-items-start m-4">
                                {faRegIcons.map((icon, index) => {
                                    const iconClassName = `fa fa-${icon} mr-2`;
                                    return <div className="w-33 d-flex flex-row align-items-center" key={icon}>
                                        <div className={iconClassName}></div>
                                        <div className="flex-1 w-x">{icon}</div>
                                    </div>;
                                })}
                            </div>
                        </div>
                        <h4 className="text-muted mb-1">Solid</h4>
                        <div className="bg-black-trans-less-faded rounded-sm mb-4">
                            <code>
                                fa fa-solid-[name]
                            </code>
                            <div className="d-flex flex-row flex-wrap align-items-start m-4">
                                {faSolidIcons.map((icon, index) => {
                                    const iconClassName = `fa fa-solid-${icon} mr-2`;
                                    return <div className="w-33 d-flex flex-row align-items-center" key={icon}>
                                        <div className={iconClassName}></div>
                                        <div className="flex-1 w-x">{icon}</div>
                                    </div>;
                                })}
                            </div>
                        </div>
                        <h4 className="text-muted mb-1">Brands</h4>
                        <div className="bg-black-trans-less-faded rounded-sm">
                            <code>
                                fa fa-brand-[name]
                            </code>
                            <div className="d-flex flex-row flex-wrap align-items-start m-4">
                                {faBrands.map((icon, index) => {
                                    const iconClassName = `fa fa-brand-${icon} mr-2`;
                                    return <div className="w-33 d-flex flex-row align-items-center" key={icon}>
                                        <div className={iconClassName}></div>
                                        <div className="flex-1 w-x">{icon}</div>
                                    </div>;
                                })}
                            </div>
                        </div>
                    </div>
                </Grid>
            </div>
        }
    ];

    return model.ShowExample ? <TabModal fixed size="lg" title="Gooee - Example" icon={icon} tabs={tabs} /> : null;
};
export default Example;