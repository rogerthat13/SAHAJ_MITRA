/**
 * SAHAJ MITRA (सहज मित्र) - Festive Street Vendor Assistant & POS
 * Created by: Class 12th Student (Python & JavaScript)
 */

(function () {
  "use strict";

  // --- App State ---
  const state = {
    lang: "hi", // 'hi' or 'en'
    currentView: "shop", // 'shop', 'billing', 'confirmation', 'vendor'
    selectedCategory: "all",
    searchQuery: "",
    items: [],
    itemOptions: {}, // stores selected unit per item: { [itemId]: { unitLabel, price, multiplier } }
    cart: {}, // { [cartKey]: { id, name_en, name_hi, unit, unit_price, quantity, subtotal } }
    paymentMethod: "upi", // 'upi' or 'cash'
    cashGiven: 0,
    currentOrder: null,
    waitTimerRemaining: 0,
    waitTimerTotal: 90,
    waitTimerInterval: null,
    vendorOrders: [],
    vendorStats: {},
    vendorPollingInterval: null
  };

  // --- Multilingual Translations ---
  const i18n = {
    hi: {
      appName: "सहज मित्र",
      tagline: "व्यस्त दुकानदारों का डिजिटल साथी • भीड़ में भी आसान बिक्री!",
      festiveRibbon: "✨ पावन त्योहार का शुभ पर्व! खुशियाँ बाँटें, स्थानीय दुकानदारों का साथ दें ✨",
      tabShop: "🌸 सामान चुनें (मेन्यू)",
      tabBilling: "🧾 बिल और भुगतान",
      tabVendor: "👨‍🍳 दुकानदार डैशबोर्ड",
      catAll: "सभी सामान",
      catGarlands: "मालाएँ (Flowers)",
      catLoose: "खुले फूल (1KG)",
      catCrackers: "हरित पटाखे (Crackers)",
      catSweets: "मिठाइयाँ (Sweets)",
      searchPlaceholder: "सामान खोजें... (उदा: गेंदा, काजू कतली, अनार, 1kg)",
      perKg: "प्रति 1 किलो",
      perGarland: "प्रति माला",
      perPack: "प्रति पैकेट",
      perBox: "प्रति बॉक्स",
      perPiece: "प्रति पीस",
      addBtn: "+ जोड़ें",
      cartItems: "सामान",
      cartTotal: "कुल बिल",
      checkoutBtn: "बिलिंग के लिए आगे बढ़ें →",
      emptyCartMsg: "आपकी टोकरी खाली है! कृपया मेन्यू से सामान चुनें।",
      quoteTitle: "अतिथि देवो भव | आपके आगमन से हमारा उत्सव रोशन है!",
      quoteBody: "आपके सहयोग से एक छोटे दुकानदार के घर भी त्योहार की खुशियाँ महकती हैं। हम आपको शुद्ध, ताज़ा और उत्तम सामान देने के लिए पूरी तरह समर्पित हैं।",
      reviewHeading: "आपके चुने हुए सामान की सूची",
      thItem: "सामान का नाम",
      thUnit: "इकाई / भार",
      thRate: "दर (₹)",
      thQty: "मात्रा",
      thTotal: "कुल (₹)",
      upsellTitle: "क्या आपकी खरीदारी पूरी हो गई या कुछ और चाहिए?",
      upsellSub: "त्योहार की पूजा में काम आने वाले छोटे जरूरी सामान एक क्लिक में जोड़ें:",
      backToShop: "← कुछ और सामान चुनना चाहते हैं? मेन्यू पर लौटें",
      customerDetailsHeading: "ग्राहक विवरण (डिजिटल बिल प्राप्ति हेतु)",
      lblName: "ग्राहक का नाम",
      lblPhone: "मोबाइल नंबर (10 अंक)",
      phoneHint: "बिल की पूरी रसीद और टोकन नंबर आपके इस मोबाइल नंबर पर तुरंत SMS / WhatsApp द्वारा भेजी जाएगी।",
      paymentHeading: "भुगतान का माध्यम चुनें (Payment Mode)",
      cashTitle: "नकद भुगतान (Cash)",
      cashDesc: "काउंटर पर सीधे नकद राशि दें",
      upiTitle: "ऑनलाइन UPI / QR Code",
      upiDesc: "Google Pay, PhonePe, Paytm, BHIM द्वारा तुरंत स्कैन व पे करें",
      upiScanPrompt: "नीचे दिए गए QR कोड को किसी भी UPI ऐप से स्कैन करके ₹",
      upiConfirmBtn: "✅ भुगतान कर दिया (Verify & Complete)",
      cashTip: "काउंटर पर ₹{amount} दें। यदि खुल्ले नहीं हैं, तो नीचे दर्ज करें:",
      cashGivenPlaceholder: "ग्राहक ने कितने रुपये दिए?",
      changeToReturn: "दुकानदार वापस करेगा: ₹",
      placeOrderBtn: "ऑर्डर पक्का करें और टोकन लें (Confirm Order)",
      tokenHeading: "आपका ऑर्डर टोकन नंबर",
      tokenSub: "कृपया यह टोकन नंबर याद रखें अथवा काउंटर पर दिखाएं",
      waitTitle: "अनुमानित प्रतीक्षा समय (Waiting Time):",
      waitRemaining: "शेष समय",
      stepReceived: "ऑर्डर प्राप्त हुआ",
      stepPacking: "पैकिंग जारी है",
      stepReady: "काउंटर पर तैयार है!",
      smsBanner: "डिजिटल बिल और टोकन रसीद आपके मोबाइल नंबर पर सफलतापूर्वक भेज दी गई है!",
      thankYouHeading: "हार्दिक धन्यवाद एवं मंगलमय शुभकामनाएँ!",
      thankYouText: "सहज मित्र और दुकानदार परिवार की ओर से आपका बहुत-बहुत आभार! यह पावन पर्व आपके और आपके पूरे परिवार के जीवन में सुख, शांति, समृद्धि और अपार खुशियाँ लेकर आए।",
      printReceiptBtn: "🖨️ रसीद प्रिंट करें",
      newOrderBtn: "✨ अगला नया ऑर्डर लें"
    },
    en: {
      appName: "SAHAJ MITRA",
      tagline: "Street Vendor's Digital Queue & Billing Companion",
      festiveRibbon: "✨ Blessed Festive Season! Spread Joy, Support Local Street Vendors ✨",
      tabShop: "🌸 Catalog (Menu)",
      tabBilling: "🧾 Billing & Checkout",
      tabVendor: "👨‍🍳 Vendor Dashboard",
      catAll: "All Items",
      catGarlands: "Garlands",
      catLoose: "Loose Flowers (1KG)",
      catCrackers: "Green Crackers",
      catSweets: "Festive Sweets",
      searchPlaceholder: "Search items... (e.g. Marigold, Kaju Katli, Anar, 1kg)",
      perKg: "per 1 kg",
      perGarland: "per garland",
      perPack: "per pack",
      perBox: "per box",
      perPiece: "per piece",
      addBtn: "+ Add",
      cartItems: "Items",
      cartTotal: "Total Bill",
      checkoutBtn: "Proceed to Billing →",
      emptyCartMsg: "Your cart is empty! Please select items from the catalog.",
      quoteTitle: "Atithi Devo Bhava | Your Presence Brightens Our Festival!",
      quoteBody: "By shopping locally, you directly light up the homes of humble street vendors. We are honored to serve you pure, fresh, and auspicious festive supplies.",
      reviewHeading: "Order Review & Itemized Bill",
      thItem: "Item Name",
      thUnit: "Unit / Weight",
      thRate: "Rate (₹)",
      thQty: "Quantity",
      thTotal: "Total (₹)",
      upsellTitle: "Are you done or want to add something?",
      upsellSub: "Essential festive pooja add-ons you might need:",
      backToShop: "← Want to add more items? Return to catalog",
      customerDetailsHeading: "Customer Registration (For Digital Receipt)",
      lblName: "Customer Name",
      lblPhone: "Mobile Number (10 digits)",
      phoneHint: "Digital billing details and invoice will be dispatched to this registered number via SMS/WhatsApp.",
      paymentHeading: "Choose Payment Mode",
      cashTitle: "Cash Payment",
      cashDesc: "Pay cash at counter upon pickup",
      upiTitle: "Online UPI / QR Code",
      upiDesc: "Instant scan & pay with Google Pay, PhonePe, Paytm, BHIM",
      upiScanPrompt: "Scan the QR code with any UPI app to pay ₹",
      upiConfirmBtn: "✅ Payment Completed (Verify & Continue)",
      cashTip: "Please pay ₹{amount} at the counter. Need change? Enter tendered amount:",
      cashGivenPlaceholder: "Cash amount handed over",
      changeToReturn: "Change to return: ₹",
      placeOrderBtn: "Place Order & Get Token →",
      tokenHeading: "Your Order Token Number",
      tokenSub: "Please keep this token handy for pickup at counter",
      waitTitle: "Estimated Waiting Time:",
      waitRemaining: "Remaining",
      stepReceived: "Order Received",
      stepPacking: "Packing in Progress",
      stepReady: "Ready for Pickup!",
      smsBanner: "Billing receipt & token details successfully dispatched to your registered mobile number!",
      thankYouHeading: "Heartfelt Thanks & Festive Blessings!",
      thankYouText: "Sahaj Mitra and the vendor family sincerely thank you for supporting local businesses. May this festival shower eternal health, wealth, and joyous moments upon you and your family!",
      printReceiptBtn: "🖨️ Print Receipt",
      newOrderBtn: "✨ Start New Order"
    }
  };

  function t(key) {
    const langObj = i18n[state.lang] || i18n.hi;
    return langObj[key] || i18n.hi[key] || key;
  }

  // --- Audio Synthesis (Web Audio API) ---
  const audioCtx = (function () {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      return AudioContext ? new AudioContext() : null;
    } catch (e) {
      return null;
    }
  })();

  function playSound(type) {
    if (!audioCtx) return;
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    const now = audioCtx.currentTime;

    if (type === "add") {
      // Cheerful 2-tone chime (C5 -> G5)
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.12); // G5
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === "success") {
      // Festive triad chord (C5 - E5 - G5 - C6)
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.18, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.6);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.6);
      });
    } else if (type === "bell") {
      // Temple bell resonance
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 1.2);
    }
  }

  // --- Voice Speech Announcement (Web Speech API) ---
  function speakAnnouncement(text) {
    if (!("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = state.lang === "hi" ? "hi-IN" : "en-IN";
      utterance.rate = 1.0;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis not available", e);
    }
  }

  // --- Initialize App ---
  async function init() {
    setupEventListeners();
    await fetchItems();
    renderAll();
  }

  // --- Default Items Seed (Offline / Resilient Fallback) ---
  const DEFAULT_ITEMS = [
    { id: "garland_marigold", category: "garland", name_en: "Fresh Marigold Garland (Genda)", name_hi: "ताज़ा गेंदा फूल माला", description: "Vibrant orange & yellow auspicious marigold garland for pooja & welcoming guests.", price: 40.0, unit_type: "piece", unit_label: "per garland", image_url: "/static/images/garland_marigold.svg", piece_price: 0 },
    { id: "garland_dahlia", category: "garland", name_en: "Royal Dahlia Garland (Dahlia)", name_hi: "शाही डहेलिया फूल माला", description: "Large velvety Dahlia blooms woven with fragrant sacred leaves.", price: 70.0, unit_type: "piece", unit_label: "per garland", image_url: "/static/images/garland_dahlia.svg", piece_price: 0 },
    { id: "garland_bluebell", category: "garland", name_en: "Divine Blue Bell Garland (Aparajita / Blue Bell)", name_hi: "दिव्य ब्लू बेल / अपराजिता माला", description: "Sacred blue bell flowers beloved by Lord Shiva & Vishnu, premium hand-threaded.", price: 85.0, unit_type: "piece", unit_label: "per garland", image_url: "/static/images/garland_bluebell.svg", piece_price: 0 },
    { id: "garland_poppy", category: "garland", name_en: "Exotic Poppy Flower Garland (Khas-Khas / Poppy)", name_hi: "मनमोहक पोस्ता (पॉपी) फूल माला", description: "Bright, delicate scarlet and pink poppy blooms crafted for temple and doorway festivity.", price: 95.0, unit_type: "piece", unit_label: "per garland", image_url: "/static/images/garland_poppy.svg", piece_price: 0 },
    { id: "loose_marigold", category: "loose_flower", name_en: "Fresh Loose Marigold (1 Kg / Genda Petals)", name_hi: "खुला गेंदा फूल (1 किलो / वज़नानुसार)", description: "Fresh plucked whole marigold flowers for Rangoli, havan, and festive pooja thali.", price: 120.0, unit_type: "weight", unit_label: "per 1 kg", image_url: "/static/images/loose_marigold.svg", piece_price: 0 },
    { id: "loose_dahlia", category: "loose_flower", name_en: "Fresh Dahlia Petals (1 Kg / loose)", name_hi: "डहेलिया पंखुड़ियाँ (1 किलो / खुला)", description: "Soft multi-colored Dahlia blooms and petals, ideal for doorstep floral carpets.", price: 160.0, unit_type: "weight", unit_label: "per 1 kg", image_url: "/static/images/loose_dahlia.svg", piece_price: 0 },
    { id: "loose_rose", category: "loose_flower", name_en: "Desi Fragrant Red Rose (1 Kg / loose)", name_hi: "खुला देसी लाल गुलाब (1 किलो / खुला)", description: "Intensely aromatic natural desi red rose petals for sacred aarti and floral decoration.", price: 180.0, unit_type: "weight", unit_label: "per 1 kg", image_url: "/static/images/loose_rose.svg", piece_price: 0 },
    { id: "cracker_sparklers", category: "cracker", name_en: "Eco Green Sparklers (Phuljhadi - 10 Pcs Pack)", name_hi: "हरित फुलझड़ी (10 पीस पैकेट)", description: "CSIR-NEERI certified low-smoke eco-friendly sparkling sticks with golden glitter.", price: 90.0, unit_type: "piece", unit_label: "per pack", image_url: "/static/images/cracker_sparklers.svg", piece_price: 0 },
    { id: "cracker_chakri", category: "cracker", name_en: "Green Ground Whirlwind Chakri (10 Pcs Box)", name_hi: "इको-फ्रेंडली ज़मीनी चकरी (10 पीस बॉक्स)", description: "Smooth spinning green spark ground wheel with zero harmful chemical fallout.", price: 140.0, unit_type: "piece", unit_label: "per box", image_url: "/static/images/cracker_chakri.svg", piece_price: 0 },
    { id: "cracker_anar", category: "cracker", name_en: "Green Floral Fountain Anar (5 Pcs Deluxe)", name_hi: "हरित पुष्प फव्वारा (अनार - 5 पीस)", description: "Magnificent high-rise golden fountain spray with 30% reduced particulate emission.", price: 190.0, unit_type: "piece", unit_label: "per box", image_url: "/static/images/cracker_anar.svg", piece_price: 0 },
    { id: "cracker_skyshot", category: "cracker", name_en: "Eco Multi-Color Sky Shot (Single Pipe / Tube)", name_hi: "हरित स्काई शॉट (रंगीन आकाशीय धमाका)", description: "Safe vertical ascent bursting into brilliant emerald and ruby stars high in the sky.", price: 150.0, unit_type: "piece", unit_label: "per piece", image_url: "/static/images/cracker_skyshot.svg", piece_price: 0 },
    { id: "cracker_ladi", category: "cracker", name_en: "Green Safe Sound Ladi (100 Walas)", name_hi: "हरित सुरक्षित लड़ी (100 लड़)", description: "Certified decibel-safe green firecracker garland for festive celebration without choking smoke.", price: 110.0, unit_type: "piece", unit_label: "per pack", image_url: "/static/images/cracker_ladi.svg", piece_price: 0 },
    { id: "sweet_kaju_katli", category: "sweet", name_en: "Shahi Kaju Katli (काजू कतली)", name_hi: "शाही काजू कतली (शुद्ध काजू)", description: "Diamond cut premium silver-foiled sweet made from pure cashew paste and cardamom.", price: 850.0, unit_type: "weight", unit_label: "per 1 kg", image_url: "/static/images/sweet_kaju_katli.svg", piece_price: 25.0 },
    { id: "sweet_barfi", category: "sweet", name_en: "Pure Khoya Mawa Barfi (खोया बर्फी)", name_hi: "शुद्ध खोया मावा बर्फी", description: "Classic melt-in-mouth milk sweet prepared with slow-reduced pure milk & pistachios.", price: 520.0, unit_type: "weight", unit_label: "per 1 kg", image_url: "/static/images/sweet_barfi.svg", piece_price: 18.0 },
    { id: "sweet_gulab_jamun", category: "sweet", name_en: "Desi Ghee Gulab Jamun (गुलाब जामुन)", name_hi: "देसी घी गुलाब जामुन", description: "Hot, golden-brown khoya dumplings soaked in saffron-rose aromatic sugar syrup.", price: 440.0, unit_type: "weight", unit_label: "per 1 kg", image_url: "/static/images/sweet_gulab_jamun.svg", piece_price: 15.0 },
    { id: "sweet_imarti", category: "sweet", name_en: "Crispy Kesari Imarti (केसरी इमरती)", name_hi: "कुरकुरी केसरी इमरती", description: "Artisan flower-patterned urad dal delicacy fried crisp in desi ghee and dipped in syrup.", price: 480.0, unit_type: "weight", unit_label: "per 1 kg", image_url: "/static/images/sweet_imarti.svg", piece_price: 16.0 },
    { id: "sweet_rasgulla", category: "sweet", name_en: "Spongy Kolkata Rasgulla (रसगुल्ला)", name_hi: "रसभरा स्पंजी रसगुल्ला", description: "Light, fluffy, juicy cottage cheese dumplings simmered in crystal clear sweet nectar.", price: 400.0, unit_type: "weight", unit_label: "per 1 kg", image_url: "/static/images/sweet_rasgulla.svg", piece_price: 15.0 },
    { id: "sweet_rasmalai", category: "sweet", name_en: "Royal Kesari Rasmalai (रसमलाई)", name_hi: "शाही केसर पिस्ता रसमलाई", description: "Velvety chenna discs dipped in thickened saffron-infused pistachio rabdi milk.", price: 600.0, unit_type: "weight", unit_label: "per 1 kg", image_url: "/static/images/sweet_rasmalai.svg", piece_price: 35.0 },
    { id: "sweet_soan_papdi", category: "sweet", name_en: "Flaky Desi Ghee Soan Papdi (सोन पापड़ी)", name_hi: "खस्ता देसी घी सोन पापड़ी", description: "Crispy, flaky, melt-on-tongue gram flour sweet layered with crunchy almonds & pistachios.", price: 360.0, unit_type: "weight", unit_label: "per 1 kg", image_url: "/static/images/sweet_soan_papdi.svg", piece_price: 12.0 }
  ];

  // Fetch Items from Backend REST API
  async function fetchItems() {
    try {
      const res = await fetch("/api/items");
      const data = await res.json();
      if (data.success && data.items && data.items.length > 0) {
        state.items = data.items;
        return;
      }
    } catch (e) {
      console.warn("Backend API not reachable directly, using offline cache:", e);
    }
    state.items = DEFAULT_ITEMS;
  }

  // --- Event Listeners ---
  function setupEventListeners() {
    // Language Toggle
    const langBtn = document.getElementById("langToggleBtn");
    if (langBtn) {
      langBtn.addEventListener("click", () => {
        state.lang = state.lang === "hi" ? "en" : "hi";
        renderAll();
      });
    }

    // View Navigation Tabs
    const tabShop = document.getElementById("tabShop");
    const tabBilling = document.getElementById("tabBilling");
    const tabVendor = document.getElementById("tabVendor");

    if (tabShop) {
      tabShop.addEventListener("click", () => switchView("shop"));
    }
    if (tabBilling) {
      tabBilling.addEventListener("click", () => {
        if (Object.keys(state.cart).length === 0) {
          alert(t("emptyCartMsg"));
          return;
        }
        switchView("billing");
      });
    }
    if (tabVendor) {
      tabVendor.addEventListener("click", () => switchView("vendor"));
    }

    // Search bar
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        state.searchQuery = e.target.value.toLowerCase().trim();
        renderProducts();
      });
    }

    // Sticky Cart Bar proceed button
    const proceedBtn = document.getElementById("proceedToCheckoutBtn");
    if (proceedBtn) {
      proceedBtn.addEventListener("click", () => {
        if (Object.keys(state.cart).length === 0) {
          alert(t("emptyCartMsg"));
          return;
        }
        switchView("billing");
      });
    }
  }

  // Switch View Router
  function switchView(viewName) {
    state.currentView = viewName;

    // View tabs highlight
    document.querySelectorAll(".view-tab").forEach((tab) => tab.classList.remove("active"));
    if (viewName === "shop") document.getElementById("tabShop")?.classList.add("active");
    if (viewName === "billing") document.getElementById("tabBilling")?.classList.add("active");
    if (viewName === "vendor") document.getElementById("tabVendor")?.classList.add("active");

    // Show/hide sections
    const shopView = document.getElementById("shopView");
    const billingView = document.getElementById("billingView");
    const confirmationView = document.getElementById("confirmationView");
    const vendorView = document.getElementById("vendorView");
    const stickyCartBar = document.getElementById("stickyCartBar");

    if (shopView) shopView.style.display = viewName === "shop" ? "block" : "none";
    if (billingView) billingView.style.display = viewName === "billing" ? "block" : "none";
    if (confirmationView) confirmationView.style.display = viewName === "confirmation" ? "block" : "none";
    if (vendorView) vendorView.style.display = viewName === "vendor" ? "block" : "none";

    // Manage sticky cart visibility
    updateStickyCartBar();

    // Start or stop vendor polling
    if (viewName === "vendor") {
      fetchVendorOrders();
      if (!state.vendorPollingInterval) {
        state.vendorPollingInterval = setInterval(fetchVendorOrders, 5000);
      }
    } else {
      if (state.vendorPollingInterval) {
        clearInterval(state.vendorPollingInterval);
        state.vendorPollingInterval = null;
      }
    }

    // Render relevant view
    if (viewName === "shop") {
      renderProducts();
    } else if (viewName === "billing") {
      renderBillingPage();
    } else if (viewName === "vendor") {
      renderVendorDashboard();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // --- Cart Calculations ---
  function getCartTotals() {
    let totalQty = 0;
    let totalPrice = 0;
    for (const key in state.cart) {
      const item = state.cart[key];
      totalQty += item.quantity;
      totalPrice += item.subtotal;
    }
    return { totalQty, totalPrice: Math.round(totalPrice * 100) / 100 };
  }

  function updateStickyCartBar() {
    const stickyBar = document.getElementById("stickyCartBar");
    if (!stickyBar) return;
    const totals = getCartTotals();

    if (totals.totalQty > 0 && state.currentView === "shop") {
      stickyBar.classList.add("visible");
      const badge = document.getElementById("cartCountBadge");
      const totalDisplay = document.getElementById("cartTotalDisplay");
      const itemsText = document.getElementById("cartItemsCountText");

      if (badge) badge.textContent = totals.totalQty;
      if (totalDisplay) totalDisplay.textContent = `₹${totals.totalPrice.toFixed(2)}`;
      if (itemsText) itemsText.textContent = `${totals.totalQty} ${t("cartItems")}`;
    } else {
      stickyBar.classList.remove("visible");
    }
  }

  // Modify cart item quantity
  function modifyCart(cartKey, itemObj, unitLabel, unitPrice, delta) {
    if (!state.cart[cartKey]) {
      if (delta > 0) {
        state.cart[cartKey] = {
          id: itemObj.id,
          name_en: itemObj.name_en,
          name_hi: itemObj.name_hi,
          unit: unitLabel,
          unit_price: unitPrice,
          quantity: delta,
          subtotal: unitPrice * delta
        };
        playSound("add");
      }
    } else {
      state.cart[cartKey].quantity += delta;
      if (state.cart[cartKey].quantity <= 0) {
        delete state.cart[cartKey];
      } else {
        state.cart[cartKey].subtotal = state.cart[cartKey].quantity * unitPrice;
        if (delta > 0) playSound("add");
      }
    }

    updateStickyCartBar();
    renderProducts();
    if (state.currentView === "billing") {
      renderBillingPage();
    }
  }

  // --- Rendering Functions ---

  function renderAll() {
    renderHeaderAndRibbon();
    renderCategories();
    renderProducts();
    updateStickyCartBar();
  }

  function renderHeaderAndRibbon() {
    const brandName = document.getElementById("brandName");
    const brandTagline = document.getElementById("brandTagline");
    const festiveRibbon = document.getElementById("festiveRibbon");
    const langBtn = document.getElementById("langToggleBtn");

    if (brandName) brandName.textContent = t("appName");
    if (brandTagline) brandTagline.textContent = t("tagline");
    if (festiveRibbon) festiveRibbon.innerHTML = t("festiveRibbon");
    if (langBtn) langBtn.textContent = state.lang === "hi" ? "English 🌐" : "हिंदी 🇮🇳";

    const tabShop = document.getElementById("tabShop");
    const tabBilling = document.getElementById("tabBilling");
    const tabVendor = document.getElementById("tabVendor");

    if (tabShop) tabShop.innerHTML = t("tabShop");
    if (tabBilling) tabBilling.innerHTML = t("tabBilling");
    if (tabVendor) tabVendor.innerHTML = t("tabVendor");

    const searchInput = document.getElementById("searchInput");
    if (searchInput) searchInput.placeholder = t("searchPlaceholder");
  }

  // Category Selector Bar
  function renderCategories() {
    const catContainer = document.getElementById("categoriesBar");
    if (!catContainer) return;

    const cats = [
      { id: "all", label: t("catAll"), icon: "✨" },
      { id: "garland", label: t("catGarlands"), icon: "🌺" },
      { id: "loose_flower", label: t("catLoose"), icon: "⚖️" },
      { id: "cracker", label: t("catCrackers"), icon: "🎆" },
      { id: "sweet", label: t("catSweets"), icon: "🍯" }
    ];

    catContainer.innerHTML = cats
      .map(
        (c) => `
      <button class="cat-pill ${state.selectedCategory === c.id ? "active" : ""}" data-cat="${c.id}">
        <span class="cat-icon">${c.icon}</span>
        <span>${c.label}</span>
      </button>
    `
      )
      .join("");

    catContainer.querySelectorAll(".cat-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.selectedCategory = btn.dataset.cat;
        renderCategories();
        renderProducts();
      });
    });
  }

  // Products Grid (Page 1)
  function renderProducts() {
    const grid = document.getElementById("productsGrid");
    if (!grid) return;

    const filtered = state.items.filter((item) => {
      // Category filter
      if (state.selectedCategory !== "all" && item.category !== state.selectedCategory) {
        return false;
      }
      // Search filter
      if (state.searchQuery) {
        const text = `${item.name_en} ${item.name_hi} ${item.description}`.toLowerCase();
        if (!text.includes(state.searchQuery)) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; background: #fff; border-radius: 16px; border: 1px dashed #FFD54F;">
          <div style="font-size: 3rem; margin-bottom: 12px;">🔍</div>
          <h3 style="color: #D84315; font-weight: 800; margin-bottom: 6px;">कोई सामान नहीं मिला (No items found)</h3>
          <p style="color: #757575; font-size: 0.9rem;">कृपया किसी अन्य श्रेणी या नाम से खोजें।</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map((item) => renderProductCardHtml(item)).join("");
    attachProductCardEvents(grid);
  }

  function renderProductCardHtml(item) {
    const isLooseFlower = item.category === "loose_flower";
    const isSweet = item.category === "sweet";
    const isCracker = item.category === "cracker";

    // Determine current active option/unit
    let activeOption = state.itemOptions[item.id];
    if (!activeOption) {
      if (isLooseFlower) {
        activeOption = { label: "1 Kg", price: item.price, multiplier: 1.0 };
      } else if (isSweet) {
        activeOption = { label: "1 Kg", price: item.price, multiplier: 1.0 };
      } else {
        activeOption = { label: item.unit_label || "1 Pc", price: item.price, multiplier: 1.0 };
      }
      state.itemOptions[item.id] = activeOption;
    }

    const cartKey = `${item.id}_${activeOption.label}`;
    const cartItem = state.cart[cartKey];
    const currentQty = cartItem ? cartItem.quantity : 0;
    const currentSubtotal = cartItem ? cartItem.subtotal : 0;

    // Build unit buttons if applicable
    let unitPillsHtml = "";
    if (isLooseFlower) {
      const units = [
        { label: "250g", mult: 0.25 },
        { label: "500g", mult: 0.5 },
        { label: "1 Kg", mult: 1.0 },
        { label: "2 Kg", mult: 2.0 }
      ];
      unitPillsHtml = `
        <div class="unit-selector-wrapper">
          <span class="unit-selector-label">वज़न चुनें (Select Weight):</span>
          <div class="unit-pill-group">
            ${units
              .map(
                (u) => `
              <button class="unit-pill ${activeOption.label === u.label ? "active" : ""}" 
                data-item-id="${item.id}" data-label="${u.label}" data-mult="${u.mult}" data-base-price="${item.price}">
                ${u.label}
              </button>
            `
              )
              .join("")}
          </div>
        </div>
      `;
    } else if (isSweet) {
      const piecePrice = item.piece_price || 20;
      const units = [
        { label: "1 Pc (₹" + piecePrice + ")", mult: piecePrice / item.price, isPiece: true, price: piecePrice },
        { label: "250g", mult: 0.25 },
        { label: "500g", mult: 0.5 },
        { label: "1 Kg", mult: 1.0 }
      ];
      unitPillsHtml = `
        <div class="unit-selector-wrapper">
          <span class="unit-selector-label">मात्रा / वज़न (Pack / Piece):</span>
          <div class="unit-pill-group">
            ${units
              .map((u) => {
                const uPrice = u.isPiece ? u.price : Math.round(item.price * u.mult);
                return `
                <button class="unit-pill ${activeOption.label === u.label ? "active" : ""}" 
                  data-item-id="${item.id}" data-label="${u.label}" data-mult="${u.mult}" data-exact-price="${uPrice}">
                  ${u.label}
                </button>
              `;
              })
              .join("")}
          </div>
        </div>
      `;
    }

    const title = state.lang === "hi" ? item.name_hi : item.name_en;
    const subTitle = state.lang === "hi" ? item.name_en : item.name_hi;

    return `
      <div class="product-card" data-item-id="${item.id}">
        <div class="card-img-container">
          <img src="${item.image_url}" alt="${title}" class="card-img" loading="lazy">
          <span class="category-badge">${item.category.replace("_", " ")}</span>
          ${isCracker ? `<span class="eco-badge">🌿 100% ECO GREEN</span>` : ""}
        </div>
        <div class="card-body">
          <h3 class="product-title">${title}</h3>
          <div class="product-hindi-name">${subTitle}</div>
          <p class="product-desc">${item.description}</p>
          
          ${unitPillsHtml}

          <div class="price-action-row">
            <div class="price-tag">
              <span class="amount">₹${activeOption.price.toFixed(0)}</span>
              <span class="unit-label">${activeOption.label}</span>
              ${currentQty > 0 ? `<span style="font-size:0.75rem; color:#2E7D32; font-weight:800;">कुल: ₹${currentSubtotal.toFixed(0)}</span>` : ""}
            </div>

            <div class="action-btn-area">
              ${
                currentQty === 0
                  ? `
                <button class="add-first-btn" data-cart-key="${cartKey}" data-item-id="${item.id}">
                  <span>${t("addBtn")}</span>
                </button>
              `
                  : `
                <div class="qty-control">
                  <button class="qty-btn btn-minus" data-cart-key="${cartKey}" data-item-id="${item.id}">−</button>
                  <span class="qty-display">${currentQty}</span>
                  <button class="qty-btn btn-plus" data-cart-key="${cartKey}" data-item-id="${item.id}">+</button>
                </div>
              `
              }
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function attachProductCardEvents(container) {
    // Unit pill switches (250g, 500g, 1kg, 1pc)
    container.querySelectorAll(".unit-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        const itemId = btn.dataset.itemId;
        const label = btn.dataset.label;
        let calculatedPrice = 0;

        if (btn.dataset.exactPrice) {
          calculatedPrice = parseFloat(btn.dataset.exactPrice);
        } else {
          const mult = parseFloat(btn.dataset.mult);
          const basePrice = parseFloat(btn.dataset.basePrice || "0");
          calculatedPrice = Math.round(basePrice * mult);
        }

        state.itemOptions[itemId] = {
          label: label,
          price: calculatedPrice,
          multiplier: parseFloat(btn.dataset.mult)
        };
        renderProducts();
      });
    });

    // Add first button
    container.querySelectorAll(".add-first-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const itemId = btn.dataset.itemId;
        const itemObj = state.items.find((i) => i.id === itemId);
        const opt = state.itemOptions[itemId];
        const cartKey = `${itemId}_${opt.label}`;
        modifyCart(cartKey, itemObj, opt.label, opt.price, 1);
      });
    });

    // Minus button
    container.querySelectorAll(".btn-minus").forEach((btn) => {
      btn.addEventListener("click", () => {
        const itemId = btn.dataset.itemId;
        const itemObj = state.items.find((i) => i.id === itemId);
        const cartKey = btn.dataset.cartKey;
        const currentItem = state.cart[cartKey];
        if (currentItem) {
          modifyCart(cartKey, itemObj, currentItem.unit, currentItem.unit_price, -1);
        }
      });
    });

    // Plus button
    container.querySelectorAll(".btn-plus").forEach((btn) => {
      btn.addEventListener("click", () => {
        const itemId = btn.dataset.itemId;
        const itemObj = state.items.find((i) => i.id === itemId);
        const cartKey = btn.dataset.cartKey;
        const currentItem = state.cart[cartKey];
        if (currentItem) {
          modifyCart(cartKey, itemObj, currentItem.unit, currentItem.unit_price, 1);
        }
      });
    });
  }

  // --- Page 2: Billing & Value-Add Screen ---
  function renderBillingPage() {
    const billingContainer = document.getElementById("billingPageContainer");
    if (!billingContainer) return;

    const totals = getCartTotals();
    const cartEntries = Object.entries(state.cart);

    if (cartEntries.length === 0) {
      billingContainer.innerHTML = `
        <div style="text-align: center; padding: 60px 20px; background: #fff; border-radius: 20px; border: 2px dashed #FFD54F;">
          <div style="font-size: 3.5rem; margin-bottom: 14px;">🛒</div>
          <h2 style="color: #D84315; font-weight: 900; margin-bottom: 8px;">${t("emptyCartMsg")}</h2>
          <button class="action-btn-primary" id="returnShopFromBillingBtn" style="margin-top: 16px;">
            ${t("backToShop")}
          </button>
        </div>
      `;
      document.getElementById("returnShopFromBillingBtn")?.addEventListener("click", () => switchView("shop"));
      return;
    }

    billingContainer.innerHTML = `
      <!-- 1. Warm Positive Festive Thoughts -->
      <div class="festive-quote-card">
        <h3 class="quote-title">${t("quoteTitle")}</h3>
        <p class="quote-body">${t("quoteBody")}</p>
      </div>

      <!-- 2. Itemized Review Table -->
      <div class="review-card">
        <h3 class="card-heading">
          <span>🧾</span>
          <span>${t("reviewHeading")}</span>
        </h3>
        
        <table class="order-items-table">
          <thead>
            <tr>
              <th>${t("thItem")}</th>
              <th>${t("thUnit")}</th>
              <th>${t("thRate")}</th>
              <th>${t("thQty")}</th>
              <th style="text-align:right;">${t("thTotal")}</th>
            </tr>
          </thead>
          <tbody>
            ${cartEntries
              .map(([key, it]) => {
                const displayName = state.lang === "hi" ? it.name_hi : it.name_en;
                const subName = state.lang === "hi" ? it.name_en : it.name_hi;
                return `
                <tr>
                  <td class="item-name-cell">
                    <strong>${displayName}</strong>
                    <span class="hindi-sub">${subName}</span>
                  </td>
                  <td><span class="unit-pill" style="font-size:0.75rem;">${it.unit}</span></td>
                  <td>₹${it.unit_price.toFixed(0)}</td>
                  <td>
                    <div class="qty-control" style="transform: scale(0.85); transform-origin: left center;">
                      <button class="qty-btn billing-minus" data-cart-key="${key}">−</button>
                      <span class="qty-display">${it.quantity}</span>
                      <button class="qty-btn billing-plus" data-cart-key="${key}">+</button>
                    </div>
                  </td>
                  <td style="text-align:right; font-weight:800; color:#D84315;">₹${it.subtotal.toFixed(2)}</td>
                </tr>
              `;
              })
              .join("")}
            <tr class="table-total-row">
              <td colspan="4"><strong>${t("cartTotal")} (Payable Amount):</strong></td>
              <td style="text-align:right;"><strong>₹${totals.totalPrice.toFixed(2)}</strong></td>
            </tr>
          </tbody>
        </table>

        <!-- 3. Friendly Upsell Prompt: "Are you done or want to add something?" -->
        <div class="upsell-box">
          <h4 class="upsell-title">
            <span>❓</span>
            <span>${t("upsellTitle")}</span>
          </h4>
          <p class="upsell-subtitle">${t("upsellSub")}</p>
          <div class="quick-addon-chips">
            <button class="addon-chip" data-addon="roli" data-name-hi="पूजा रोली-चावल पैकेट" data-name-en="Pooja Roli-Chawal Pack" data-price="10">
              ➕ रोली-चावल पैकेट (₹10)
            </button>
            <button class="addon-chip" data-addon="diyas" data-name-hi="मिट्टी के दीये (12 पीस पैकेट)" data-name-en="Earthen Diyas (12 Pcs Pack)" data-price="25">
              ➕ 12 मिट्टी के दीये (₹25)
            </button>
            <button class="addon-chip" data-addon="matchbox" data-name-hi="सुरक्षित माचिस बंडल (5 पीस)" data-name-en="Matchbox Bundle (5 Pcs)" data-price="10">
              ➕ माचिस बंडल (₹10)
            </button>
            <button class="addon-chip" data-addon="prasad" data-name-hi="इलायची दाना प्रसाद (100g)" data-name-en="Elaichi Dana Prasad (100g)" data-price="20">
              ➕ इलायची दाना प्रसाद (₹20)
            </button>
          </div>
          <button class="back-to-shop-btn" id="returnToShopLink">${t("backToShop")}</button>
        </div>
      </div>

      <!-- 4. Customer Registration Details -->
      <div class="review-card">
        <h3 class="card-heading">
          <span>📱</span>
          <span>${t("customerDetailsHeading")}</span>
        </h3>
        <div class="customer-form-grid">
          <div class="form-field">
            <label class="form-label">${t("lblName")} *</label>
            <input type="text" id="custNameInput" class="form-input" placeholder="उदा: रमेश शर्मा / Ramesh Sharma" value="त्योहार ग्राहक (Customer)">
          </div>
          <div class="form-field">
            <label class="form-label">${t("lblPhone")} *</label>
            <input type="tel" id="custPhoneInput" class="form-input" placeholder="9876543210" maxlength="10">
            <span class="sms-guarantee-note">
              <span>🔔</span>
              <span>${t("phoneHint")}</span>
            </span>
          </div>
        </div>
      </div>

      <!-- 5. Payment Method Choices -->
      <div class="review-card">
        <h3 class="card-heading">
          <span>💳</span>
          <span>${t("paymentHeading")}</span>
        </h3>

        <div class="payment-methods-grid">
          <!-- UPI Option -->
          <div class="payment-card-choice ${state.paymentMethod === "upi" ? "selected" : ""}" id="chooseUpiCard">
            <div class="payment-card-header">
              <div class="payment-icon upi">📱</div>
              <div>
                <div class="payment-name">${t("upiTitle")}</div>
                <div class="payment-desc">${t("upiDesc")}</div>
              </div>
            </div>
          </div>

          <!-- Cash Option -->
          <div class="payment-card-choice ${state.paymentMethod === "cash" ? "selected" : ""}" id="chooseCashCard">
            <div class="payment-card-header">
              <div class="payment-icon cash">💵</div>
              <div>
                <div class="payment-name">${t("cashTitle")}</div>
                <div class="payment-desc">${t("cashDesc")}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Dynamic Payment Panels -->
        <div id="paymentDetailsPanel">
          ${renderPaymentDetailsPanel(totals.totalPrice)}
        </div>
      </div>

      <!-- 6. Big Final Order Submit Button -->
      <button class="final-order-submit-btn" id="finalSubmitOrderBtn">
        <span>✨</span>
        <span>${t("placeOrderBtn")} (₹${totals.totalPrice.toFixed(2)})</span>
        <span>→</span>
      </button>
    `;

    attachBillingEvents(totals.totalPrice);
  }

  function renderPaymentDetailsPanel(totalAmount) {
    if (state.paymentMethod === "upi") {
      return `
        <div class="upi-panel">
          <div class="qr-instructions">
            <span>📲 ${t("upiScanPrompt")}<strong>${totalAmount.toFixed(2)}</strong></span>
          </div>
          <div class="qr-code-wrapper" id="upiQrCodeContainer">
            <!-- Canvas QR code rendered here -->
          </div>
          <div class="upi-apps-row">
            <span class="upi-app-badge">🟢 Google Pay</span>
            <span class="upi-app-badge">🟣 PhonePe</span>
            <span class="upi-app-badge">🔵 Paytm</span>
            <span class="upi-app-badge">🟠 BHIM UPI</span>
          </div>
          <button class="confirm-upi-paid-btn" id="confirmUpiSimulationBtn">
            <span>${t("upiConfirmBtn")}</span>
          </button>
        </div>
      `;
    } else {
      const change = Math.max(0, state.cashGiven - totalAmount);
      return `
        <div class="cash-panel">
          <div class="cash-tip-header">
            💵 ${t("cashTip").replace("{amount}", totalAmount.toFixed(2))}
          </div>
          <div class="cash-calc-row">
            <input type="number" id="cashTenderedInput" class="cash-calc-input" placeholder="${t("cashGivenPlaceholder")}" value="${state.cashGiven > 0 ? state.cashGiven : ""}">
            <div class="cash-change-result">
              ${state.cashGiven >= totalAmount ? `${t("changeToReturn")}${change.toFixed(2)}` : ""}
            </div>
          </div>
        </div>
      `;
    }
  }

  function attachBillingEvents(totalAmount) {
    // Return to shop link
    document.getElementById("returnToShopLink")?.addEventListener("click", () => switchView("shop"));

    // Table item quantity controls
    document.querySelectorAll(".billing-minus").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.cartKey;
        const it = state.cart[key];
        if (it) {
          const itemObj = state.items.find((i) => i.id === it.id);
          modifyCart(key, itemObj, it.unit, it.unit_price, -1);
        }
      });
    });

    document.querySelectorAll(".billing-plus").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.cartKey;
        const it = state.cart[key];
        if (it) {
          const itemObj = state.items.find((i) => i.id === it.id);
          modifyCart(key, itemObj, it.unit, it.unit_price, 1);
        }
      });
    });

    // Quick add-on chips
    document.querySelectorAll(".addon-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const addonId = "addon_" + chip.dataset.addon;
        const nameHi = chip.dataset.nameHi;
        const nameEn = chip.dataset.nameEn;
        const price = parseFloat(chip.dataset.price);

        const dummyItem = {
          id: addonId,
          name_hi: nameHi,
          name_en: nameEn
        };
        modifyCart(`${addonId}_1 Pc`, dummyItem, "1 Pc", price, 1);
      });
    });

    // Payment method choices
    const upiCard = document.getElementById("chooseUpiCard");
    const cashCard = document.getElementById("chooseCashCard");

    if (upiCard) {
      upiCard.addEventListener("click", () => {
        state.paymentMethod = "upi";
        renderBillingPage();
      });
    }

    if (cashCard) {
      cashCard.addEventListener("click", () => {
        state.paymentMethod = "cash";
        renderBillingPage();
      });
    }

    // Render UPI QR code if UPI selected
    if (state.paymentMethod === "upi") {
      const qrContainer = document.getElementById("upiQrCodeContainer");
      if (qrContainer && window.QRCode) {
        const upiUri = `upi://pay?pa=sahajmitra.vendor@upi&pn=Mata%20Rani%20Festive%20Stall&am=${totalAmount.toFixed(2)}&cu=INR&tn=Festive%20Order`;
        new window.QRCode(qrContainer, {
          text: upiUri,
          width: 180,
          height: 180,
          colorDark: "#212121",
          colorLight: "#FFFFFF"
        });
      }

      document.getElementById("confirmUpiSimulationBtn")?.addEventListener("click", () => {
        playSound("success");
        speakAnnouncement(`UPI payment of rupees ${Math.round(totalAmount)} received!`);
        submitOrder();
      });
    } else {
      // Cash tendered calculation
      const cashInput = document.getElementById("cashTenderedInput");
      if (cashInput) {
        cashInput.addEventListener("input", (e) => {
          state.cashGiven = parseFloat(e.target.value) || 0;
          const changeResult = document.querySelector(".cash-change-result");
          if (changeResult) {
            const change = Math.max(0, state.cashGiven - totalAmount);
            changeResult.textContent = state.cashGiven >= totalAmount ? `${t("changeToReturn")}${change.toFixed(2)}` : "";
          }
        });
      }
    }

    // Final Order Submit
    const finalSubmitBtn = document.getElementById("finalSubmitOrderBtn");
    if (finalSubmitBtn) {
      finalSubmitBtn.addEventListener("click", submitOrder);
    }
  }

  // --- Place / Submit Order to Backend ---
  async function submitOrder() {
    const custName = (document.getElementById("custNameInput")?.value || "त्योहार ग्राहक").trim();
    let custPhone = (document.getElementById("custPhoneInput")?.value || "").trim();

    // Default mock phone if not entered for demo ease
    if (!custPhone || custPhone.length < 10) {
      custPhone = "9876543210";
    }

    const itemsPayload = [];
    for (const key in state.cart) {
      const it = state.cart[key];
      itemsPayload.push({
        item_id: it.id,
        item_name: `${it.name_hi} / ${it.name_en}`,
        quantity: it.quantity,
        unit: it.unit,
        unit_price: it.unit_price,
        subtotal: it.subtotal
      });
    }

    const payload = {
      customer_name: custName,
      customer_phone: custPhone,
      payment_method: state.paymentMethod,
      customer_note: "Festive Pooja Purchase",
      items: itemsPayload
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        playSound("success");
        state.currentOrder = data;
        state.waitTimerTotal = data.estimated_wait_seconds || 90;
        state.waitTimerRemaining = state.waitTimerTotal;

        // Reset cart
        state.cart = {};
        updateStickyCartBar();

        // Switch to Confirmation view
        switchView("confirmation");
        renderConfirmationPage();

        // Voice announcement
        speakAnnouncement(`धन्यवाद! आपका टोकन नंबर है ${data.token_number}। कृपया 1 से 2 मिनट प्रतीक्षा करें।`);
      } else {
        alert("ऑर्डर सबमिट करने में समस्या: " + (data.error || "कृपया पुनः प्रयास करें"));
      }
    } catch (e) {
      console.error("Order submission error:", e);
      alert("सर्वर से संपर्क नहीं हो पाया। कृपया पुनः प्रयास करें।");
    }
  }

  // --- Page 3: Token Confirmation & Festive Wishes ---
  function renderConfirmationPage() {
    const confContainer = document.getElementById("confirmationPageContainer");
    if (!confContainer) return;

    const ord = state.currentOrder;
    if (!ord) {
      confContainer.innerHTML = `<div style="text-align:center; padding: 40px;">कोई सक्रिय टोकन नहीं है।</div>`;
      return;
    }

    confContainer.innerHTML = `
      <!-- Token Card -->
      <div class="token-hero-card">
        <div class="token-label-small">${t("tokenHeading")}</div>
        <div class="token-big-number">#${ord.token_number}</div>
        <p style="color:#616161; font-weight:600; font-size:0.95rem;">${t("tokenSub")}</p>

        <!-- Live Wait Time Countdown (1-2 Minutes) -->
        <div class="wait-timer-box">
          <div class="wait-timer-title">
            <span>⏳</span>
            <span>${t("waitTitle")} 1 - 2 मिनट (${t("waitRemaining")})</span>
          </div>
          <div class="timer-countdown-digits" id="countdownDigits">01:30</div>
          <div class="timer-progress-bar-bg">
            <div class="timer-progress-fill" id="timerProgressFill"></div>
          </div>
        </div>

        <!-- 3-Step Live Status Tracker -->
        <div class="status-tracker-row">
          <div class="status-step active done" id="step1">
            <div class="step-circle">1</div>
            <span class="step-text">${t("stepReceived")}</span>
          </div>
          <div class="status-step active" id="step2">
            <div class="step-circle">2</div>
            <span class="step-text">${t("stepPacking")}</span>
          </div>
          <div class="status-step" id="step3">
            <div class="step-circle">3</div>
            <span class="step-text">${t("stepReady")}</span>
          </div>
        </div>
      </div>

      <!-- SMS Notification Guarantee Banner -->
      <div class="sms-sent-banner">
        <span class="sms-icon">📲</span>
        <div>
          <div>${t("smsBanner")}</div>
          <div style="font-size:0.8rem; opacity:0.9; margin-top:2px;">
            रजिस्टर्ड मोबाइल: <strong>+91 ${ord.customer_phone}</strong> • बिल राशि: <strong>₹${ord.total_amount.toFixed(2)}</strong>
          </div>
        </div>
      </div>

      <!-- Heartfelt Thank You Note & Festive Wishes -->
      <div class="thank-you-wishes-card">
        <div class="wishes-diya-icon">🪔✨🪔</div>
        <h2 class="wishes-heading">${t("thankYouHeading")}</h2>
        <p class="wishes-text">${t("thankYouText")}</p>
        <div class="student-credit-tag">
          💡 Built with ❤️ for Street Vendors by Class 12th Student (Sahaj Mitra Initiative)
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="confirmation-actions">
        <button class="action-btn-secondary" id="printReceiptBtn">
          <span>${t("printReceiptBtn")}</span>
        </button>
        <button class="action-btn-primary" id="startNewOrderBtn">
          <span>${t("newOrderBtn")}</span>
        </button>
      </div>

      <!-- Hidden Printable Receipt for Browser Print Dialog -->
      <div class="receipt-printable print-only" style="padding: 20px; font-family: monospace;">
        <h2 style="text-align:center;">SAHAJ MITRA - DUKAAN RECEIPT</h2>
        <p style="text-align:center;">Mata Rani Festive Stall • Token: #${ord.token_number}</p>
        <hr>
        <p>Customer: ${ord.customer_name} | Mobile: ${ord.customer_phone}</p>
        <p>Payment: ${ord.payment_method.toUpperCase()} (${ord.payment_status})</p>
        <hr>
        <p><strong>Total Bill Amount: ₹${ord.total_amount.toFixed(2)}</strong></p>
        <hr>
        <p style="text-align:center;">Shubh Deepavali & Festive Blessings!</p>
      </div>
    `;

    // Start live countdown timer
    startCountdownTimer();

    // Event listeners
    document.getElementById("printReceiptBtn")?.addEventListener("click", () => {
      window.print();
    });

    document.getElementById("startNewOrderBtn")?.addEventListener("click", () => {
      state.currentOrder = null;
      if (state.waitTimerInterval) clearInterval(state.waitTimerInterval);
      switchView("shop");
    });
  }

  function startCountdownTimer() {
    if (state.waitTimerInterval) clearInterval(state.waitTimerInterval);

    function updateDisplay() {
      const mins = Math.floor(state.waitTimerRemaining / 60);
      const secs = state.waitTimerRemaining % 60;
      const displayElem = document.getElementById("countdownDigits");
      const progressElem = document.getElementById("timerProgressFill");
      const step2 = document.getElementById("step2");
      const step3 = document.getElementById("step3");

      if (displayElem) {
        displayElem.textContent = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
      }

      if (progressElem) {
        const pct = (state.waitTimerRemaining / state.waitTimerTotal) * 100;
        progressElem.style.width = `${pct}%`;
      }

      // Progressively update step tracker
      if (state.waitTimerRemaining <= state.waitTimerTotal / 2) {
        if (step2) step2.classList.add("done");
      }
      if (state.waitTimerRemaining <= 10) {
        if (step3) {
          step3.classList.add("active");
          step3.classList.add("done");
        }
      }

      if (state.waitTimerRemaining <= 0) {
        clearInterval(state.waitTimerInterval);
        if (displayElem) {
          displayElem.textContent = "00:00 (Ready!)";
          displayElem.style.color = "#2E7D32";
        }
        playSound("bell");
        speakAnnouncement(`टोकन नंबर ${state.currentOrder.token_number} काउंटर पर तैयार है!`);
      } else {
        state.waitTimerRemaining--;
      }
    }

    updateDisplay();
    state.waitTimerInterval = setInterval(updateDisplay, 1000);
  }

  // --- Page 4: Vendor Dashboard ---
  async function fetchVendorOrders() {
    try {
      const [ordersRes, statsRes] = await Promise.all([
        fetch("/api/orders?status=all"),
        fetch("/api/stats")
      ]);
      const ordersData = await ordersRes.json();
      const statsData = await statsRes.json();

      if (ordersData.success) state.vendorOrders = ordersData.orders || [];
      if (statsData.success) state.vendorStats = statsData;

      if (state.currentView === "vendor") {
        renderVendorDashboard();
      }
    } catch (e) {
      console.error("Vendor fetch error:", e);
    }
  }

  function renderVendorDashboard() {
    const vendorContainer = document.getElementById("vendorDashboardContainer");
    if (!vendorContainer) return;

    const stats = state.vendorStats;

    vendorContainer.innerHTML = `
      <!-- Stats Summary -->
      <div class="vendor-stats-grid">
        <div class="vendor-stat-card">
          <div class="stat-icon revenue">💰</div>
          <div class="stat-details">
            <div class="stat-val">₹${(stats.total_revenue || 0).toFixed(0)}</div>
            <div class="stat-label">आज की कुल बिक्री (Today's Sales)</div>
          </div>
        </div>
        <div class="vendor-stat-card">
          <div class="stat-icon orders">📦</div>
          <div class="stat-details">
            <div class="stat-val">${stats.total_orders || 0}</div>
            <div class="stat-label">कुल ऑर्डर्स (Total Orders)</div>
          </div>
        </div>
        <div class="vendor-stat-card">
          <div class="stat-icon pending">⏳</div>
          <div class="stat-details">
            <div class="stat-val">${stats.pending_orders || 0}</div>
            <div class="stat-label">लंबित कतार (Pending Queue)</div>
          </div>
        </div>
        <div class="vendor-stat-card">
          <div class="stat-icon payment">📲</div>
          <div class="stat-details">
            <div class="stat-val">UPI: ${stats.upi_count || 0} | नकद: ${stats.cash_count || 0}</div>
            <div class="stat-label">भुगतान विभाजन (Payment Split)</div>
          </div>
        </div>
      </div>

      <!-- Active Orders Queue Header -->
      <div class="queue-header-bar">
        <h3 class="queue-title">
          <span>🔔</span>
          <span>लाइव ग्राहक कतार (Live Token Queue)</span>
        </h3>
        <span style="font-size:0.85rem; color:#757575;">* हर 5 सेकंड में स्वतः अपडेट होता है</span>
      </div>

      <!-- Orders Cards Grid -->
      <div class="queue-cards-grid">
        ${
          state.vendorOrders.length === 0
            ? `<div style="grid-column: 1 / -1; text-align:center; padding: 40px; background:#fff; border-radius:14px;">अभी कोई सक्रिय ऑर्डर नहीं है।</div>`
            : state.vendorOrders.map((ord) => renderVendorOrderCard(ord)).join("")
        }
      </div>
    `;

    attachVendorEvents(vendorContainer);
  }

  function renderVendorOrderCard(ord) {
    const isPaid = ord.payment_status === "paid";
    return `
      <div class="queue-order-card status-${ord.status}">
        <div class="queue-order-top">
          <span class="queue-token-pill">#${ord.token_number}</span>
          <span class="payment-status-badge ${ord.payment_status}">
            ${isPaid ? "✅ PAID (UPI)" : "💵 CASH AT COUNTER"}
          </span>
        </div>

        <div style="font-size:0.9rem; font-weight:700; color:#37474F;">
          👤 ${ord.customer_name} • 📞 ${ord.customer_phone}
        </div>

        <div class="queue-items-list">
          ${ord.items
            .map(
              (it) => `
            <div class="queue-item-row">
              <span><strong>${it.quantity} ${it.unit}</strong> × ${it.item_name}</span>
              <span>₹${it.subtotal.toFixed(0)}</span>
            </div>
          `
            )
            .join("")}
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; font-weight:800; font-size:1.05rem; color:#D84315;">
          <span>कुल बिल:</span>
          <span>₹${ord.total_amount.toFixed(2)}</span>
        </div>

        <div class="queue-actions-row">
          ${
            ord.status === "received"
              ? `<button class="vendor-action-btn btn-start-pack" data-id="${ord.id}" data-action="packing">📦 पैक करना शुरू करें</button>`
              : ""
          }
          ${
            ord.status === "packing"
              ? `<button class="vendor-action-btn btn-mark-ready" data-id="${ord.id}" data-action="ready">🔔 काउंटर पर तैयार (Call)</button>`
              : ""
          }
          ${
            ord.status === "ready"
              ? `<button class="vendor-action-btn btn-mark-delivered" data-id="${ord.id}" data-action="delivered">✅ ग्राहक को दिया (Done)</button>`
              : ""
          }
          ${
            ord.status === "delivered"
              ? `<span style="font-size:0.85rem; color:#2E7D32; font-weight:800; width:100%; text-align:center;">✨ पूर्ण हो गया (Delivered)</span>`
              : ""
          }
        </div>
      </div>
    `;
  }

  function attachVendorEvents(container) {
    container.querySelectorAll(".vendor-action-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const ordId = btn.dataset.id;
        const nextStatus = btn.dataset.action;

        try {
          const res = await fetch(`/api/orders/${ordId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: nextStatus, payment_status: "paid" })
          });
          const data = await res.json();
          if (data.success) {
            if (nextStatus === "ready") {
              playSound("bell");
            } else {
              playSound("add");
            }
            await fetchVendorOrders();
          }
        } catch (e) {
          console.error("Failed to update status:", e);
        }
      });
    });
  }

  // --- Bootstrap on DOM Ready ---
  document.addEventListener("DOMContentLoaded", init);
})();
