import sqlite3
import os
import random

DB_FILE = os.path.join(os.path.dirname(__file__), "sahaj_mitra.db")

INITIAL_ITEMS = [
    # --- Flower Garlands (फूल मालाएँ) ---
    {
        "id": "garland_marigold",
        "category": "garland",
        "name_en": "Fresh Marigold Garland (Genda)",
        "name_hi": "ताज़ा गेंदा फूल माला",
        "description": "Vibrant orange & yellow auspicious marigold garland for pooja & welcoming guests.",
        "price": 40.0,
        "unit_type": "piece",
        "unit_label": "per garland",
        "image_url": "/static/images/garland_marigold.svg",
        "options": ["1 Garland (माला)", "2 Garlands", "5 Garlands Pack", "10 Garlands Bulk"]
    },
    {
        "id": "garland_dahlia",
        "category": "garland",
        "name_en": "Royal Dahlia Garland (Dahlia)",
        "name_hi": "शाही डहेलिया फूल माला",
        "description": "Large velvety Dahlia blooms woven with fragrant sacred leaves.",
        "price": 70.0,
        "unit_type": "piece",
        "unit_label": "per garland",
        "image_url": "/static/images/garland_dahlia.svg",
        "options": ["1 Garland (माला)", "2 Garlands", "4 Garlands Pack"]
    },
    {
        "id": "garland_bluebell",
        "category": "garland",
        "name_en": "Divine Blue Bell Garland (Aparajita / Blue Bell)",
        "name_hi": "दिव्य ब्लू बेल / अपराजिता माला",
        "description": "Sacred blue bell flowers beloved by Lord Shiva & Vishnu, premium hand-threaded.",
        "price": 85.0,
        "unit_type": "piece",
        "unit_label": "per garland",
        "image_url": "/static/images/garland_bluebell.svg",
        "options": ["1 Garland (माला)", "2 Garlands", "4 Garlands Pack"]
    },
    {
        "id": "garland_poppy",
        "category": "garland",
        "name_en": "Exotic Poppy Flower Garland (Khas-Khas / Poppy)",
        "name_hi": "मनमोहक पोस्ता (पॉपी) फूल माला",
        "description": "Bright, delicate scarlet and pink poppy blooms crafted for temple and doorway festivity.",
        "price": 95.0,
        "unit_type": "piece",
        "unit_label": "per garland",
        "image_url": "/static/images/garland_poppy.svg",
        "options": ["1 Garland (माला)", "2 Garlands", "4 Garlands Pack"]
    },

    # --- Loose Individual Flowers (खुले फूल - 1KG / Per Weight) ---
    {
        "id": "loose_marigold",
        "category": "loose_flower",
        "name_en": "Fresh Loose Marigold (1 Kg / Genda Petals)",
        "name_hi": "खुला गेंदा फूल (1 किलो / वज़नानुसार)",
        "description": "Fresh plucked whole marigold flowers for Rangoli, havan, and festive pooja thali.",
        "price": 120.0,
        "unit_type": "weight",
        "unit_label": "per 1 kg",
        "image_url": "/static/images/loose_marigold.svg",
        "weight_multipliers": {"250g": 0.25, "500g": 0.5, "1kg": 1.0, "2kg": 2.0}
    },
    {
        "id": "loose_dahlia",
        "category": "loose_flower",
        "name_en": "Fresh Dahlia Petals (1 Kg / loose)",
        "name_hi": "डहेलिया पंखुड़ियाँ (1 किलो / खुला)",
        "description": "Soft multi-colored Dahlia blooms and petals, ideal for doorstep floral carpets.",
        "price": 160.0,
        "unit_type": "weight",
        "unit_label": "per 1 kg",
        "image_url": "/static/images/loose_dahlia.svg",
        "weight_multipliers": {"250g": 0.25, "500g": 0.5, "1kg": 1.0, "2kg": 2.0}
    },
    {
        "id": "loose_rose",
        "category": "loose_flower",
        "name_en": "Desi Fragrant Red Rose (1 Kg / loose)",
        "name_hi": "खुला देसी लाल गुलाब (1 किलो / खुला)",
        "description": "Intensely aromatic natural desi red rose petals for sacred aarti and floral decoration.",
        "price": 180.0,
        "unit_type": "weight",
        "unit_label": "per 1 kg",
        "image_url": "/static/images/loose_rose.svg",
        "weight_multipliers": {"250g": 0.25, "500g": 0.5, "1kg": 1.0, "2kg": 2.0}
    },

    # --- Green Firecrackers (हरित एवं सुरक्षित पटाखे) ---
    {
        "id": "cracker_sparklers",
        "category": "cracker",
        "name_en": "Eco Green Sparklers (Phuljhadi - 10 Pcs Pack)",
        "name_hi": "हरित फुलझड़ी (10 पीस पैकेट)",
        "description": "CSIR-NEERI certified low-smoke eco-friendly sparkling sticks with golden glitter.",
        "price": 90.0,
        "unit_type": "piece",
        "unit_label": "per pack",
        "image_url": "/static/images/cracker_sparklers.svg"
    },
    {
        "id": "cracker_chakri",
        "category": "cracker",
        "name_en": "Green Ground Whirlwind Chakri (10 Pcs Box)",
        "name_hi": "इको-फ्रेंडली ज़मीनी चकरी (10 पीस बॉक्स)",
        "description": "Smooth spinning green spark ground wheel with zero harmful chemical fallout.",
        "price": 140.0,
        "unit_type": "piece",
        "unit_label": "per box",
        "image_url": "/static/images/cracker_chakri.svg"
    },
    {
        "id": "cracker_anar",
        "category": "cracker",
        "name_en": "Green Floral Fountain Anar (5 Pcs Deluxe)",
        "name_hi": "हरित पुष्प फव्वारा (अनार - 5 पीस)",
        "description": "Magnificent high-rise golden fountain spray with 30% reduced particulate emission.",
        "price": 190.0,
        "unit_type": "piece",
        "unit_label": "per box",
        "image_url": "/static/images/cracker_anar.svg"
    },
    {
        "id": "cracker_skyshot",
        "category": "cracker",
        "name_en": "Eco Multi-Color Sky Shot (Single Pipe / Tube)",
        "name_hi": "हरित स्काई शॉट (रंगीन आकाशीय धमाका)",
        "description": "Safe vertical ascent bursting into brilliant emerald and ruby stars high in the sky.",
        "price": 150.0,
        "unit_type": "piece",
        "unit_label": "per piece",
        "image_url": "/static/images/cracker_skyshot.svg"
    },
    {
        "id": "cracker_ladi",
        "category": "cracker",
        "name_en": "Green Safe Sound Ladi (100 Walas)",
        "name_hi": "हरित सुरक्षित लड़ी (100 लड़)",
        "description": "Certified decibel-safe green firecracker garland for festive celebration without choking smoke.",
        "price": 110.0,
        "unit_type": "piece",
        "unit_label": "per pack",
        "image_url": "/static/images/cracker_ladi.svg"
    },

    # --- Traditional Sweets / Mithai (पारंपरिक ताज़ा मिठाइयाँ) ---
    {
        "id": "sweet_kaju_katli",
        "category": "sweet",
        "name_en": "Shahi Kaju Katli (काजू कतली)",
        "name_hi": "शाही काजू कतली (शुद्ध काजू)",
        "description": "Diamond cut premium silver-foiled sweet made from pure cashew paste and cardamom.",
        "price": 850.0,
        "unit_type": "weight",
        "unit_label": "per 1 kg",
        "image_url": "/static/images/sweet_kaju_katli.svg",
        "piece_price": 25.0,
        "weight_multipliers": {"1 Piece (₹25)": "piece", "250g": 0.25, "500g": 0.5, "1kg": 1.0}
    },
    {
        "id": "sweet_barfi",
        "category": "sweet",
        "name_en": "Pure Khoya Mawa Barfi (खोया बर्फी)",
        "name_hi": "शुद्ध खोया मावा बर्फी",
        "description": "Classic melt-in-mouth milk sweet prepared with slow-reduced pure milk & pistachios.",
        "price": 520.0,
        "unit_type": "weight",
        "unit_label": "per 1 kg",
        "image_url": "/static/images/sweet_barfi.svg",
        "piece_price": 18.0,
        "weight_multipliers": {"1 Piece (₹18)": "piece", "250g": 0.25, "500g": 0.5, "1kg": 1.0}
    },
    {
        "id": "sweet_gulab_jamun",
        "category": "sweet",
        "name_en": "Desi Ghee Gulab Jamun (गुलाब जामुन)",
        "name_hi": "देसी घी गुलाब जामुन",
        "description": "Hot, golden-brown khoya dumplings soaked in saffron-rose aromatic sugar syrup.",
        "price": 440.0,
        "unit_type": "weight",
        "unit_label": "per 1 kg",
        "image_url": "/static/images/sweet_gulab_jamun.svg",
        "piece_price": 15.0,
        "weight_multipliers": {"1 Piece (₹15)": "piece", "250g": 0.25, "500g": 0.5, "1kg": 1.0}
    },
    {
        "id": "sweet_imarti",
        "category": "sweet",
        "name_en": "Crispy Kesari Imarti (केसरी इमरती)",
        "name_hi": "कुरकुरी केसरी इमरती",
        "description": "Artisan flower-patterned urad dal delicacy fried crisp in desi ghee and dipped in syrup.",
        "price": 480.0,
        "unit_type": "weight",
        "unit_label": "per 1 kg",
        "image_url": "/static/images/sweet_imarti.svg",
        "piece_price": 16.0,
        "weight_multipliers": {"1 Piece (₹16)": "piece", "250g": 0.25, "500g": 0.5, "1kg": 1.0}
    },
    {
        "id": "sweet_rasgulla",
        "category": "sweet",
        "name_en": "Spongy Kolkata Rasgulla (रसगुल्ला)",
        "name_hi": "रसभरा स्पंजी रसगुल्ला",
        "description": "Light, fluffy, juicy cottage cheese dumplings simmered in crystal clear sweet nectar.",
        "price": 400.0,
        "unit_type": "weight",
        "unit_label": "per 1 kg",
        "image_url": "/static/images/sweet_rasgulla.svg",
        "piece_price": 15.0,
        "weight_multipliers": {"1 Piece (₹15)": "piece", "250g": 0.25, "500g": 0.5, "1kg": 1.0}
    },
    {
        "id": "sweet_rasmalai",
        "category": "sweet",
        "name_en": "Royal Kesari Rasmalai (रसमलाई)",
        "name_hi": "शाही केसर पिस्ता रसमलाई",
        "description": "Velvety chenna discs dipped in thickened saffron-infused pistachio rabdi milk.",
        "price": 600.0,
        "unit_type": "weight",
        "unit_label": "per 1 kg",
        "image_url": "/static/images/sweet_rasmalai.svg",
        "piece_price": 35.0,
        "weight_multipliers": {"1 Piece (₹35)": "piece", "250g": 0.25, "500g": 0.5, "1kg": 1.0}
    },
    {
        "id": "sweet_soan_papdi",
        "category": "sweet",
        "name_en": "Flaky Desi Ghee Soan Papdi (सोन पापड़ी)",
        "name_hi": "खस्ता देसी घी सोन पापड़ी",
        "description": "Crispy, flaky, melt-on-tongue gram flour sweet layered with crunchy almonds & pistachios.",
        "price": 360.0,
        "unit_type": "weight",
        "unit_label": "per 1 kg",
        "image_url": "/static/images/sweet_soan_papdi.svg",
        "piece_price": 12.0,
        "weight_multipliers": {"1 Piece (₹12)": "piece", "250g": 0.25, "500g": 0.5, "1kg": 1.0}
    }
]

def get_db_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Table: items
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS items (
        id TEXT PRIMARY KEY,
        category TEXT NOT NULL,
        name_en TEXT NOT NULL,
        name_hi TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        unit_type TEXT NOT NULL,
        unit_label TEXT,
        image_url TEXT,
        piece_price REAL DEFAULT 0,
        in_stock INTEGER DEFAULT 1
    )
    """)

    # Table: orders
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        token_number TEXT NOT NULL,
        customer_name TEXT NOT NULL,
        customer_phone TEXT NOT NULL,
        total_amount REAL NOT NULL,
        payment_method TEXT NOT NULL,
        payment_status TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'received',
        estimated_wait_seconds INTEGER DEFAULT 90,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        customer_note TEXT
    )
    """)

    # Table: order_items
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER NOT NULL,
        item_id TEXT NOT NULL,
        item_name TEXT NOT NULL,
        quantity REAL NOT NULL,
        unit TEXT NOT NULL,
        unit_price REAL NOT NULL,
        subtotal REAL NOT NULL,
        FOREIGN KEY(order_id) REFERENCES orders(id)
    )
    """)

    # Seed initial items if table is empty
    cursor.execute("SELECT COUNT(*) FROM items")
    count = cursor.fetchone()[0]
    if count == 0:
        for it in INITIAL_ITEMS:
            cursor.execute("""
            INSERT INTO items (id, category, name_en, name_hi, description, price, unit_type, unit_label, image_url, piece_price, in_stock)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
            """, (
                it["id"],
                it["category"],
                it["name_en"],
                it["name_hi"],
                it["description"],
                it["price"],
                it["unit_type"],
                it.get("unit_label", ""),
                it.get("image_url", ""),
                it.get("piece_price", 0.0)
            ))
        conn.commit()

    conn.close()

def get_next_token():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM orders")
    total_orders = cursor.fetchone()[0]
    conn.close()
    # E.g., #SM-101 onwards
    return f"SM-{101 + total_orders}"

if __name__ == "__main__":
    init_db()
    print("Database initialized successfully with festival items!")
