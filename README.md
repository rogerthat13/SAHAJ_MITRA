# 🪔 सहज मित्र (SAHAJ MITRA)
### Festive Street Vendor POS, Smart Billing & Token Queue Assistant
> **A Class 12th Student Project developed with Python & JavaScript**  
> *"अपनी दुकान का डिजिटल साथी — भीड़ में भी बिना टेंशन बिक्री और ज़्यादा मुनाफ़ा!"*

---

## 📌 1. The Real-World Problem (Background & Context)

During festival rushes (Diwali, Chhath Puja, Durga Puja, Eid, Ganesh Chaturthi), roadside street vendors and corner stall owners selling **flower garlands, loose flowers for pooja, eco-friendly green firecrackers, and fresh sweets** face intense rush:
1. **Losing Hurried Customers:** Long queues form at the stall. Customers who don't know the exact price or see a crowd get frustrated and walk away to another shop.
2. **Helper Wage Burden:** The vendor is forced to hire 3–4 neighborhood helpers just to shout prices, weigh items, and calculate totals. Paying ₹500–₹800/day per helper wipes out almost all the festive profit margins!
3. **Calculation & Billing Errors:** In the noisy rush, mental or scrap-paper math leads to undercharging or overcharging, creating arguments, delays, and direct financial loss.
4. **Payment Chaos:** Mixing cash payments, hunting for loose change (खुल्ले पैसे), and waiting for UPI confirmations slows down the entire queue.

---

## 💡 2. The Solution: SAHAJ MITRA (सहज मित्र)

As a Class 12th student with knowledge of Python and JavaScript, I built **Sahaj Mitra**—a lightweight, fast, and festive digital POS & Queue web app that street vendors can run on a budget smartphone, tablet, or laptop.

It empowers customers to view clear prices, select items by weight or count, review the total bill with warm festive respect, choose Cash or UPI, and receive an instant **Order Token with a 1–2 minute live countdown** while an SMS receipt is dispatched to their phone.

Meanwhile, the shopkeeper can see a **Live Kitchen/Packing Queue** on their own phone screen, eliminating the need for 3–4 helpers!

---

## 🌟 3. Key Features

### 🌸 Page 1: Festive Product Catalog & Real-time Selection
- **Flower Garlands (फूल मालाएँ):**
  - Fresh Marigold (गेंदा)
  - Royal Dahlia (डहेलिया)
  - Divine Blue Bell / Aparajita (ब्लू बेल)
  - Exotic Poppy / Khas-Khas (पोस्ता / पॉपी)
  - Clear garland prices, unit options (Single, 2 Pcs, Bulk packs).
- **Loose Flowers by Weight (खुले फूल - 1KG / भार):**
  - Fresh Marigold Petals, Dahlia Petals, Desi Red Rose Petals.
  - **Dynamic Weight Selector:** Choose **250g, 500g, 1 Kg, or 2 Kg** with live price recalculation!
- **Green Firecrackers (हरित पटाखे):**
  - CSIR-NEERI certified low-smoke eco-friendly firecrackers with illustrations and prices:
  - Eco Sparklers (हरी फुलझड़ी), Green Ground Chakri (इको चकरी), Floral Fountain Anar (अनार), Multi-Color Sky Shot (आकाशीय स्काई शॉट), Safe Sound 100 Ladi (सुरक्षित लड़ी).
- **Festive Sweets & Mithai (पारंपरिक ताज़ा मिठाइयाँ):**
  - Kaju Katli (काजू कतली), Khoya Barfi (बर्फी), Gulab Jamun (गुलाब जामुन), Kesari Imarti (इमरती), Kolkata Rasgulla (रसगुल्ला), Kesari Rasmalai (रसमलाई), Soan Papdi (सोन पापड़ी).
  - **Unit Selector:** Order **Per Piece** (e.g. ₹25 for Kaju Katli, ₹15 for Gulab Jamun) or **By Weight (250g, 500g, 1 Kg)**.
- **Interactive Cart & Real-Time Counters:**
  - `+` and `−` quantity controls with live subtotal display on each card.
  - **Sticky Bottom Cart Bar:** Displays total item count, total payable ₹ amount, and a big one-tap checkout button.
- **Dual Language Support:** Instant 1-tap toggle between **Hindi (हिंदी)** and **English**.
- **Audio Sound Chimes (Web Audio API):** Friendly pleasant tones for item additions and order completion.

### 🧾 Page 2: Billing, Customer Warmth & Value-Add
- **Itemized Bill Review:** Shows item names (in Hindi & English), chosen unit/weight, rate, quantity, and line total.
- **Positive Festive Thoughts (*अतिथि देवो भव*):**
  - Uplifting message welcoming the customer, appreciating their support for small local vendors, and wishing them happiness and prosperity.
- **Interactive Prompt: *"क्या आपकी खरीदारी पूरी हो गई या कुछ और चाहिए?"* (Are you done or want to add something?):**
  - 1-click festive impulse add-ons (Pooja Roli-Chawal packet for ₹10, Earthen Diyas pack for ₹25, Matchbox bundle for ₹10, Elaichi Dana Prasad for ₹20).
  - *"← कुछ और सामान चुनना चाहते हैं? मेन्यू पर लौटें"* button to return to catalog without losing cart.
- **Customer Registration:**
  - Name and 10-digit Mobile Number.
  - Clear guarantee: *"डिजिटल बिल की रसीद और टोकन नंबर आपके इस मोबाइल नंबर पर तुरंत SMS / WhatsApp द्वारा भेजी जाएगी।"*
- **Payment Options:**
  - **UPI Transaction (ऑनलाइन UPI / QR Code):**
    - Dynamic QR code generated with pre-filled exact bill amount.
    - Quick-pay badges for Google Pay, PhonePe, Paytm, and BHIM UPI.
    - Instant simulated verification button with speech announcement (*"UPI payment of ₹X received!"*).
  - **Cash Payment (नकद भुगतान):**
    - Built-in Change Calculator: Enter cash note handed over (e.g. ₹500 or ₹2000), and the app instantly displays the exact change the vendor must return.

### 🎫 Page 3: Token Confirmation, Live Countdown & Heartfelt Wishes
- **High-Visibility Token Number:** Big bold token display (e.g., `#SM-101`) for effortless counter call-outs.
- **Estimated Waiting Time (1–2 Minutes Live Countdown):**
  - Real-time countdown timer (e.g., 01:30) with an animated progress bar.
  - 3-Step Live Order Tracker:
    1. *Order Received (ऑर्डर प्राप्त हुआ)*
    2. *Packing in Progress (सामान पैक हो रहा है)*
    3. *Ready for Pickup at Counter! (काउंटर पर लेने के लिए तैयार)*
- **SMS / Notification Dispatch Alert:**
  - Informs the customer that their itemized digital invoice has been sent to their registered mobile number.
- **Warm Thank You Note & Hearty Festive Wishes:**
  - Sincere blessings and festival wishes from the vendor family to the customer and their loved ones.
- **Print / Save Receipt Button:** Instant printable receipt formatting.
- **"Start New Order" Button:** Cleans state for the next waiting customer.

### 👨‍🍳 Page 4: Shopkeeper / Vendor Live Dashboard
- **Revenue & Order Summary:** Today's Total Sales (₹), Total Orders Handled, Active Pending Queue, and Cash vs UPI breakdown.
- **Real-Time Packing Queue:** Shows incoming tokens, exact items to pack, customer phone number, and payment status (`PAID (UPI)` vs `CASH AT COUNTER`).
- **One-Click Order Workflow:** `पैक करना शुरू करें (Start Packing)` → `काउंटर पर तैयार (Call)` (rings a bell chime) → `ग्राहक को दिया (Delivered)`.
- Eliminates the need for 3–4 helpers, directly putting all profits back into the street vendor's pocket!

---

## 🛠️ 4. Technical Architecture

### Zero External Dependencies:
As a Class 12th student, I designed the backend using **Pure Python 3 Standard Library**:
- `http.server.ThreadingHTTPServer` for multi-threaded high-concurrency HTTP/REST requests.
- `sqlite3` for persistent, relational database management.
- `json`, `os`, `random` for data interchange and order processing.
- **No virtual environment or external `pip install` required!** Anyone can clone the repo and run it on macOS, Linux, or Windows with default Python 3.

### Tech Stack:
- **Backend:** Python 3 (`server.py`, `database.py`)
- **Database:** SQLite 3 (`sahaj_mitra.db`)
- **Frontend:** Vanilla JavaScript (ES6+), Modern Semantic HTML5, CSS3 with CSS Variables and Flexbox/Grid
- **Graphics:** High-quality handcrafted vector SVGs for flowers, garlands, green crackers, sweets, and diya logo (`static/images/`)
- **Audio:** Web Audio API synthesized tones (zero external audio files needed)
- **Speech:** Web Speech API for Hindi/English counter voice announcements

---

## 🚀 5. How to Run & Deploy

### A. Local Development:
1. Open your terminal in the project directory:
   ```bash
   cd SAHAJ_MITRA
   ```

2. Start the Flask application:
   ```bash
   python3 server.py
   # OR:
   ./run.sh
   ```

3. Open your web browser and navigate to:
   ```
   http://localhost:8080
   ```

---

### B. PythonAnywhere Deployment Guide (Step-by-Step):

The app is fully prepared for PythonAnywhere with the top-level Flask variable `app`:

1. **Upload / Clone Project:**
   In PythonAnywhere Bash Console, clone or extract your project files to `/home/<your-username>/SAHAJ_MITRA`.

2. **Web Tab Configuration:**
   - Go to the **Web** tab on PythonAnywhere.
   - Click **Add a new web app**.
   - Select **Manual configuration** (or Flask) and choose **Python 3.9** (or 3.10).
   - In the **Code** section:
     - **Source code:** `/home/<your-username>/SAHAJ_MITRA`
     - **Working directory:** `/home/<your-username>/SAHAJ_MITRA`

3. **Edit WSGI Configuration File:**
   Click the link to your WSGI configuration file (e.g. `/var/www/<your-username>_pythonanywhere_com_wsgi.py`), clear default boilerplate, and enter:
   ```python
   import sys
   import os

   # Path to your project directory
   project_home = '/home/<your-username>/SAHAJ_MITRA'
   if project_home not in sys.path:
       sys.path.insert(0, project_home)

   # Import the Flask app as 'application' for WSGI
   from server import app as application
   ```

4. **Static Files Mapping (Optional but Recommended for Speed):**
   In the **Static files** section of the Web tab:
   - **URL:** `/static/`
   - **Directory:** `/home/<your-username>/SAHAJ_MITRA/static/`

5. **Reload Web App:**
   Click the green **Reload <your-username>.pythonanywhere.com** button.  
   Your app is now live for street vendors and customers worldwide! 🎉

---

## 🗄️ 6. Database Schema & REST API

### Database Tables:
1. `items`: Catalog of items (`id`, `category`, `name_en`, `name_hi`, `description`, `price`, `unit_type`, `unit_label`, `image_url`, `piece_price`, `in_stock`).
2. `orders`: Customer orders (`id`, `token_number`, `customer_name`, `customer_phone`, `total_amount`, `payment_method`, `payment_status`, `status`, `estimated_wait_seconds`, `created_at`, `customer_note`).
3. `order_items`: Line items linked to orders (`id`, `order_id`, `item_id`, `item_name`, `quantity`, `unit`, `unit_price`, `subtotal`).

### REST API Endpoints:
- `GET /api/items`: Returns all items grouped by category.
- `POST /api/orders`: Submits a new customer order, generates unique token `#SM-xxx`, sets 1–2 min wait time, saves to DB, and simulates SMS dispatch.
- `GET /api/orders`: Retrieves order queue for vendor dashboard.
- `PATCH /api/orders/<id>`: Updates order status (`packing`, `ready`, `delivered`) and payment status.
- `GET /api/stats`: Returns live dashboard metrics (revenue, total orders, cash vs UPI).
- `GET /api/health`: Health status.

---

## 🎓 7. Student Note
*This project was created as a Class 12 Computer Science practical application to show how simple, thoughtful technology using Python and JavaScript can empower grassroots Indian micro-entrepreneurs and roadside vendors during festive rush seasons.*
