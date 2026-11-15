import os

SVG_DIR = os.path.join(os.path.dirname(__file__), "static", "images")
os.makedirs(SVG_DIR, exist_ok=True)

svgs = {
    "logo.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFE082" />
      <stop offset="100%" stop-color="#FF6F00" />
    </radialGradient>
    <linearGradient id="flameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#FF3D00"/>
      <stop offset="60%" stop-color="#FF9100"/>
      <stop offset="100%" stop-color="#FFFF00"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="url(#sunGlow)" opacity="0.2"/>
  <circle cx="50" cy="50" r="44" stroke="#D84315" stroke-width="3" fill="none" stroke-dasharray="6,4"/>
  <!-- Diya base -->
  <path d="M22 60 Q50 90 78 60 Q85 64 80 72 Q50 96 20 72 Z" fill="#8D6E63"/>
  <path d="M22 60 Q50 72 78 60 Q50 54 22 60 Z" fill="#D7CCC8"/>
  <ellipse cx="50" cy="59" rx="26" ry="6" fill="#BF360C"/>
  <!-- Flame -->
  <path d="M50 20 C42 35 40 46 44 54 C47 58 53 58 56 54 C60 46 58 35 50 20 Z" fill="url(#flameGrad)"/>
  <circle cx="50" cy="46" r="4" fill="#FFF9C4"/>
  <!-- Sparkles -->
  <circle cx="28" cy="30" r="3" fill="#FFD54F"/>
  <circle cx="72" cy="32" r="2.5" fill="#FFD54F"/>
</svg>""",

    "garland_marigold.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="100%" height="100%">
  <defs>
    <linearGradient id="bgM" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF8E1" />
      <stop offset="100%" stop-color="#FFECB3" />
    </linearGradient>
    <radialGradient id="flowerO" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#FFEA00" />
      <stop offset="70%" stop-color="#FF6D00" />
      <stop offset="100%" stop-color="#DD2C00" />
    </radialGradient>
    <radialGradient id="flowerY" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#FFFF8D" />
      <stop offset="70%" stop-color="#FFD600" />
      <stop offset="100%" stop-color="#FF9100" />
    </radialGradient>
  </defs>
  <rect width="300" height="200" rx="16" fill="url(#bgM)" />
  <!-- Sacred Thread Curve -->
  <path d="M 30 50 Q 150 190 270 50" fill="none" stroke="#2E7D32" stroke-width="6" stroke-linecap="round"/>
  <!-- Hanging Marigolds -->
  <!-- Left Side -->
  <circle cx="50" cy="65" r="20" fill="url(#flowerO)"/>
  <circle cx="85" cy="95" r="22" fill="url(#flowerY)"/>
  <circle cx="120" cy="120" r="22" fill="url(#flowerO)"/>
  <!-- Center Tassel -->
  <circle cx="150" cy="130" r="26" fill="url(#flowerY)"/>
  <circle cx="150" cy="130" r="16" fill="url(#flowerO)"/>
  <!-- Right Side -->
  <circle cx="180" cy="120" r="22" fill="url(#flowerO)"/>
  <circle cx="215" cy="95" r="22" fill="url(#flowerY)"/>
  <circle cx="250" cy="65" r="20" fill="url(#flowerO)"/>
  <!-- Mango Leaves accent -->
  <polygon points="150,130 144,165 156,165" fill="#388E3C"/>
  <polygon points="120,120 115,150 125,150" fill="#2E7D32"/>
  <polygon points="180,120 175,150 185,150" fill="#2E7D32"/>
  <text x="150" y="185" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="14" fill="#E65100">ताज़ा गेंदा माला (Marigold Garland)</text>
</svg>""",

    "garland_dahlia.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="100%" height="100%">
  <defs>
    <linearGradient id="bgD" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCE4EC" />
      <stop offset="100%" stop-color="#F8BBD0" />
    </linearGradient>
    <radialGradient id="dahliaP" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="30%" stop-color="#FF4081" />
      <stop offset="80%" stop-color="#C2185B" />
      <stop offset="100%" stop-color="#880E4F" />
    </radialGradient>
  </defs>
  <rect width="300" height="200" rx="16" fill="url(#bgD)" />
  <path d="M 40 55 Q 150 180 260 55" fill="none" stroke="#33691E" stroke-width="5" stroke-dasharray="4,2"/>
  <!-- Dahlia Bloom 1 -->
  <g transform="translate(60,75)">
    <circle cx="0" cy="0" r="24" fill="url(#dahliaP)"/>
    <circle cx="0" cy="0" r="10" fill="#FFD54F"/>
  </g>
  <!-- Dahlia Bloom 2 -->
  <g transform="translate(110,110)">
    <circle cx="0" cy="0" r="25" fill="url(#dahliaP)"/>
    <circle cx="0" cy="0" r="10" fill="#FFD54F"/>
  </g>
  <!-- Center Dahlia Bloom -->
  <g transform="translate(150,130)">
    <circle cx="0" cy="0" r="30" fill="url(#dahliaP)"/>
    <circle cx="0" cy="0" r="12" fill="#FFE082"/>
  </g>
  <!-- Dahlia Bloom 4 -->
  <g transform="translate(190,110)">
    <circle cx="0" cy="0" r="25" fill="url(#dahliaP)"/>
    <circle cx="0" cy="0" r="10" fill="#FFD54F"/>
  </g>
  <!-- Dahlia Bloom 5 -->
  <g transform="translate(240,75)">
    <circle cx="0" cy="0" r="24" fill="url(#dahliaP)"/>
    <circle cx="0" cy="0" r="10" fill="#FFD54F"/>
  </g>
  <text x="150" y="185" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="14" fill="#880E4F">शाही डहेलिया माला (Royal Dahlia)</text>
</svg>""",

    "garland_bluebell.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="100%" height="100%">
  <defs>
    <linearGradient id="bgB" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E8EAF6" />
      <stop offset="100%" stop-color="#C5CAE9" />
    </linearGradient>
    <radialGradient id="blueG" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#8C9EFF" />
      <stop offset="60%" stop-color="#304FFE" />
      <stop offset="100%" stop-color="#1A237E" />
    </radialGradient>
  </defs>
  <rect width="300" height="200" rx="16" fill="url(#bgB)" />
  <path d="M 35 50 Q 150 185 265 50" fill="none" stroke="#2E7D32" stroke-width="5"/>
  <!-- Blue bell flowers along the garland -->
  <circle cx="60" cy="70" r="18" fill="url(#blueG)"/>
  <circle cx="95" cy="100" r="20" fill="url(#blueG)"/>
  <circle cx="125" cy="122" r="22" fill="#E8EAF6"/>
  <circle cx="125" cy="122" r="18" fill="url(#blueG)"/>
  <!-- Center focal flower -->
  <circle cx="150" cy="132" r="26" fill="url(#blueG)"/>
  <circle cx="150" cy="132" r="9" fill="#FFF59D"/>
  <circle cx="175" cy="122" r="22" fill="#E8EAF6"/>
  <circle cx="175" cy="122" r="18" fill="url(#blueG)"/>
  <circle cx="205" cy="100" r="20" fill="url(#blueG)"/>
  <circle cx="240" cy="70" r="18" fill="url(#blueG)"/>
  <text x="150" y="185" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1A237E">अपराजिता / ब्लू बेल माला (Blue Bell)</text>
</svg>""",

    "garland_poppy.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="100%" height="100%">
  <defs>
    <linearGradient id="bgPo" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFEBEE" />
      <stop offset="100%" stop-color="#FFCDD2" />
    </linearGradient>
    <radialGradient id="poppyRed" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#FF5252" />
      <stop offset="70%" stop-color="#D50000" />
      <stop offset="100%" stop-color="#800000" />
    </radialGradient>
  </defs>
  <rect width="300" height="200" rx="16" fill="url(#bgPo)" />
  <path d="M 40 50 Q 150 180 260 50" fill="none" stroke="#1B5E20" stroke-width="5"/>
  <!-- Poppies -->
  <g transform="translate(65, 75)">
    <circle cx="0" cy="0" r="20" fill="url(#poppyRed)"/>
    <circle cx="0" cy="0" r="6" fill="#212121"/>
  </g>
  <g transform="translate(105, 105)">
    <circle cx="0" cy="0" r="22" fill="url(#poppyRed)"/>
    <circle cx="0" cy="0" r="7" fill="#212121"/>
  </g>
  <g transform="translate(150, 128)">
    <circle cx="0" cy="0" r="26" fill="url(#poppyRed)"/>
    <circle cx="0" cy="0" r="8" fill="#212121"/>
    <circle cx="0" cy="0" r="3" fill="#FFF59D"/>
  </g>
  <g transform="translate(195, 105)">
    <circle cx="0" cy="0" r="22" fill="url(#poppyRed)"/>
    <circle cx="0" cy="0" r="7" fill="#212121"/>
  </g>
  <g transform="translate(235, 75)">
    <circle cx="0" cy="0" r="20" fill="url(#poppyRed)"/>
    <circle cx="0" cy="0" r="6" fill="#212121"/>
  </g>
  <text x="150" y="185" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="14" fill="#B71C1C">पोस्ता (पॉपी) माला (Poppy Garland)</text>
</svg>""",

    "loose_marigold.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="100%" height="100%">
  <rect width="300" height="200" rx="16" fill="#FFF3E0" />
  <!-- Earthen basket / thali -->
  <ellipse cx="150" cy="130" rx="95" ry="32" fill="#8D6E63"/>
  <ellipse cx="150" cy="125" rx="90" ry="28" fill="#D7CCC8"/>
  <!-- Mountain of loose marigolds -->
  <circle cx="150" cy="95" r="24" fill="#FF6D00"/>
  <circle cx="120" cy="110" r="22" fill="#FFD600"/>
  <circle cx="180" cy="110" r="22" fill="#FF9100"/>
  <circle cx="100" cy="125" r="18" fill="#FF6D00"/>
  <circle cx="150" cy="120" r="20" fill="#FFD600"/>
  <circle cx="200" cy="125" r="18" fill="#FFAB00"/>
  <circle cx="135" cy="80" r="16" fill="#FFD600"/>
  <circle cx="165" cy="80" r="16" fill="#FF6D00"/>
  <!-- 1KG Badge -->
  <rect x="20" y="20" width="75" height="30" rx="8" fill="#E65100"/>
  <text x="57" y="40" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="13" fill="#FFFFFF">1 KG / भार</text>
  <text x="150" y="185" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="14" fill="#BF360C">खुला गेंदा (रंगोली व पूजा हेतु)</text>
</svg>""",

    "loose_dahlia.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="100%" height="100%">
  <rect width="300" height="200" rx="16" fill="#FCE4EC" />
  <ellipse cx="150" cy="130" rx="95" ry="32" fill="#6D4C41"/>
  <ellipse cx="150" cy="125" rx="90" ry="28" fill="#CFD8DC"/>
  <!-- Petals scattered -->
  <ellipse cx="150" cy="100" rx="26" ry="16" fill="#E91E63"/>
  <ellipse cx="120" cy="112" rx="22" ry="14" fill="#F06292"/>
  <ellipse cx="180" cy="112" rx="22" ry="14" fill="#C2185B"/>
  <ellipse cx="100" cy="126" rx="20" ry="12" fill="#AD1457"/>
  <ellipse cx="150" cy="122" rx="24" ry="15" fill="#EC407A"/>
  <ellipse cx="200" cy="126" rx="20" ry="12" fill="#D81B60"/>
  <!-- 1KG Badge -->
  <rect x="20" y="20" width="75" height="30" rx="8" fill="#AD1457"/>
  <text x="57" y="40" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="13" fill="#FFFFFF">1 KG / खुला</text>
  <text x="150" y="185" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="14" fill="#880E4F">डहेलिया पंखुड़ियाँ (Dahlia Loose)</text>
</svg>""",

    "loose_rose.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="100%" height="100%">
  <rect width="300" height="200" rx="16" fill="#FFEBEE" />
  <ellipse cx="150" cy="130" rx="95" ry="32" fill="#5D4037"/>
  <ellipse cx="150" cy="125" rx="90" ry="28" fill="#FFE082"/>
  <!-- Rose Petals -->
  <path d="M130 95 C120 70 160 70 150 95 Z" fill="#D50000"/>
  <path d="M150 95 C140 70 180 70 170 95 Z" fill="#C62828"/>
  <circle cx="150" cy="108" r="22" fill="#B71C1C"/>
  <circle cx="120" cy="118" r="20" fill="#D32F2F"/>
  <circle cx="180" cy="118" r="20" fill="#E53935"/>
  <circle cx="145" cy="128" r="18" fill="#C62828"/>
  <circle cx="100" cy="130" r="16" fill="#D32F2F"/>
  <circle cx="200" cy="130" r="16" fill="#B71C1C"/>
  <!-- 1KG Badge -->
  <rect x="20" y="20" width="75" height="30" rx="8" fill="#B71C1C"/>
  <text x="57" y="40" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="13" fill="#FFFFFF">1 KG / खुला</text>
  <text x="150" y="185" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="14" fill="#B71C1C">देसी लाल गुलाब पंखुड़ी (Rose Loose)</text>
</svg>""",

    "cracker_sparklers.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="100%" height="100%">
  <rect width="300" height="200" rx="16" fill="#E8F5E9" />
  <!-- Sparkler stick -->
  <line x1="80" y1="160" x2="200" y2="50" stroke="#78909C" stroke-width="4" stroke-linecap="round"/>
  <line x1="120" y1="123" x2="200" y2="50" stroke="#43A047" stroke-width="8" stroke-linecap="round"/>
  <!-- Green Sparkles Starburst -->
  <circle cx="205" cy="45" r="8" fill="#FFFF00"/>
  <circle cx="205" cy="45" r="16" fill="#00E676" opacity="0.4"/>
  <line x1="205" y1="45" x2="235" y2="25" stroke="#00E676" stroke-width="3"/>
  <line x1="205" y1="45" x2="245" y2="55" stroke="#76FF03" stroke-width="2.5"/>
  <line x1="205" y1="45" x2="215" y2="15" stroke="#FFD600" stroke-width="3"/>
  <line x1="205" y1="45" x2="175" y2="25" stroke="#69F0AE" stroke-width="2.5"/>
  <line x1="205" y1="45" x2="225" y2="75" stroke="#00E676" stroke-width="2"/>
  <!-- Eco Certified Badge -->
  <rect x="18" y="18" width="95" height="26" rx="6" fill="#2E7D32"/>
  <text x="65" y="35" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="11" fill="#FFFFFF">GREEN CRACKER</text>
  <text x="150" y="185" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1B5E20">हरित फुलझड़ी (Eco Sparklers)</text>
</svg>""",

    "cracker_chakri.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="100%" height="100%">
  <rect width="300" height="200" rx="16" fill="#F1F8E9" />
  <!-- Spinning spiral chakri -->
  <g transform="translate(150, 95)">
    <circle cx="0" cy="0" r="48" fill="#C8E6C9" stroke="#43A047" stroke-width="4"/>
    <path d="M0 0 L25 -35 A45 45 0 0 1 45 0 Z" fill="#00C853"/>
    <path d="M0 0 L-25 35 A45 45 0 0 1 -45 0 Z" fill="#00C853"/>
    <path d="M0 0 L-35 -25 A45 45 0 0 1 0 -45 Z" fill="#76FF03"/>
    <path d="M0 0 L35 25 A45 45 0 0 1 0 45 Z" fill="#76FF03"/>
    <circle cx="0" cy="0" r="14" fill="#FFD600"/>
    <circle cx="0" cy="0" r="6" fill="#DD2C00"/>
  </g>
  <!-- Spark trails around it -->
  <circle cx="85" cy="80" r="4" fill="#00E676"/>
  <circle cx="215" cy="115" r="4" fill="#76FF03"/>
  <circle cx="160" cy="35" r="3" fill="#FFD600"/>
  <!-- Eco Certified Badge -->
  <rect x="18" y="18" width="95" height="26" rx="6" fill="#2E7D32"/>
  <text x="65" y="35" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="11" fill="#FFFFFF">GREEN CRACKER</text>
  <text x="150" y="185" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1B5E20">ज़मीनी चकरी (Green Chakri)</text>
</svg>""",

    "cracker_anar.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="100%" height="100%">
  <rect width="300" height="200" rx="16" fill="#E8F5E9" />
  <!-- Fountain sparks -->
  <path d="M 150 75 Q 110 30 80 45" fill="none" stroke="#76FF03" stroke-width="3" stroke-dasharray="3,3"/>
  <path d="M 150 75 Q 150 15 150 10" fill="none" stroke="#FFD600" stroke-width="4"/>
  <path d="M 150 75 Q 190 30 220 45" fill="none" stroke="#00E676" stroke-width="3" stroke-dasharray="3,3"/>
  <circle cx="150" cy="70" r="10" fill="#FFFF00"/>
  <!-- Anar Cone body -->
  <polygon points="150,75 110,155 190,155" fill="#2E7D32"/>
  <polygon points="150,85 120,150 180,150" fill="#43A047"/>
  <!-- Pattern on cone -->
  <line x1="125" y1="130" x2="175" y2="130" stroke="#FFD600" stroke-width="3"/>
  <circle cx="150" cy="115" r="6" fill="#FF5722"/>
  <!-- Eco Certified Badge -->
  <rect x="18" y="18" width="95" height="26" rx="6" fill="#2E7D32"/>
  <text x="65" y="35" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="11" fill="#FFFFFF">GREEN CRACKER</text>
  <text x="150" y="185" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1B5E20">पुष्प फव्वारा (Green Anar)</text>
</svg>""",

    "cracker_skyshot.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="100%" height="100%">
  <rect width="300" height="200" rx="16" fill="#E0F2F1" />
  <!-- Rocket Pipe Tube -->
  <rect x="135" y="90" width="30" height="65" rx="5" fill="#00695C"/>
  <polygon points="130,90 150,60 170,90" fill="#FF5722"/>
  <line x1="150" y1="155" x2="150" y2="175" stroke="#5D4037" stroke-width="3"/>
  <!-- Sky burst stars -->
  <circle cx="85" cy="40" r="4" fill="#00E676"/>
  <circle cx="115" cy="25" r="5" fill="#FFEA00"/>
  <circle cx="185" cy="25" r="5" fill="#00E5FF"/>
  <circle cx="215" cy="40" r="4" fill="#76FF03"/>
  <!-- Eco Certified Badge -->
  <rect x="18" y="18" width="95" height="26" rx="6" fill="#00695C"/>
  <text x="65" y="35" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="11" fill="#FFFFFF">GREEN CRACKER</text>
  <text x="150" y="185" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="14" fill="#004D40">आकाशीय स्काई शॉट (Sky Shot)</text>
</svg>""",

    "cracker_ladi.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="100%" height="100%">
  <rect width="300" height="200" rx="16" fill="#E8F5E9" />
  <!-- Fuse cord -->
  <path d="M 70 50 Q 150 160 230 50" fill="none" stroke="#D84315" stroke-width="4"/>
  <!-- Crackers in garland string -->
  <rect x="85" y="75" width="10" height="25" rx="2" fill="#2E7D32"/>
  <rect x="105" y="95" width="10" height="25" rx="2" fill="#C62828"/>
  <rect x="125" y="112" width="10" height="25" rx="2" fill="#2E7D32"/>
  <rect x="145" y="120" width="10" height="25" rx="2" fill="#C62828"/>
  <rect x="165" y="112" width="10" height="25" rx="2" fill="#2E7D32"/>
  <rect x="185" y="95" width="10" height="25" rx="2" fill="#C62828"/>
  <rect x="205" y="75" width="10" height="25" rx="2" fill="#2E7D32"/>
  <!-- Eco Certified Badge -->
  <rect x="18" y="18" width="95" height="26" rx="6" fill="#2E7D32"/>
  <text x="65" y="35" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="11" fill="#FFFFFF">GREEN CRACKER</text>
  <text x="150" y="185" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="14" fill="#1B5E20">सुरक्षित 100 लड़ी (Green Ladi)</text>
</svg>""",

    "sweet_kaju_katli.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="100%" height="100%">
  <rect width="300" height="200" rx="16" fill="#FFFDE7" />
  <!-- Serving Plate -->
  <ellipse cx="150" cy="115" rx="110" ry="45" fill="#CFD8DC"/>
  <ellipse cx="150" cy="112" rx="104" ry="40" fill="#ECEFF1"/>
  <!-- Kaju Katli Diamonds with silver foil sheen -->
  <!-- Left -->
  <polygon points="90,105 115,85 140,105 115,125" fill="#FFF9C4" stroke="#B0BEC5" stroke-width="2"/>
  <polygon points="100,100 115,90 125,100 115,112" fill="#FFFFFF" opacity="0.8"/>
  <!-- Center top -->
  <polygon points="135,90 160,70 185,90 160,110" fill="#FFF9C4" stroke="#B0BEC5" stroke-width="2"/>
  <polygon points="145,85 160,75 170,85 160,98" fill="#FFFFFF" opacity="0.8"/>
  <!-- Center bottom -->
  <polygon points="125,125 150,105 175,125 150,145" fill="#FFF9C4" stroke="#B0BEC5" stroke-width="2"/>
  <!-- Right -->
  <polygon points="170,110 195,90 220,110 195,130" fill="#FFF9C4" stroke="#B0BEC5" stroke-width="2"/>
  <!-- Silver foil shine lines -->
  <text x="150" y="185" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="14" fill="#F57F17">शाही काजू कतली (Kaju Katli)</text>
</svg>""",

    "sweet_barfi.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="100%" height="100%">
  <rect width="300" height="200" rx="16" fill="#FFF8E1" />
  <ellipse cx="150" cy="115" rx="110" ry="45" fill="#D7CCC8"/>
  <ellipse cx="150" cy="112" rx="104" ry="40" fill="#EFEBE9"/>
  <!-- Khoya Barfi Cubes -->
  <!-- Cube 1 -->
  <polygon points="95,95 130,85 150,105 115,115" fill="#FFF9C4"/>
  <polygon points="95,95 115,115 115,130 95,110" fill="#FFE082"/>
  <polygon points="115,115 150,105 150,120 115,130" fill="#FFD54F"/>
  <circle cx="122" cy="100" r="3" fill="#2E7D32"/>
  <circle cx="128" cy="98" r="2" fill="#D84315"/>
  <!-- Cube 2 -->
  <polygon points="145,95 180,85 200,105 165,115" fill="#FFF9C4"/>
  <polygon points="145,95 165,115 165,130 145,110" fill="#FFE082"/>
  <polygon points="165,115 200,105 200,120 165,130" fill="#FFD54F"/>
  <circle cx="172" cy="100" r="3" fill="#2E7D32"/>
  <circle cx="178" cy="98" r="2" fill="#D84315"/>
  <text x="150" y="185" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="14" fill="#BF360C">शुद्ध खोया मावा बर्फी (Mawa Barfi)</text>
</svg>""",

    "sweet_gulab_jamun.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="100%" height="100%">
  <defs>
    <radialGradient id="gjGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FFB74D"/>
      <stop offset="35%" stop-color="#8D4925"/>
      <stop offset="80%" stop-color="#4E260E"/>
      <stop offset="100%" stop-color="#260E03"/>
    </radialGradient>
  </defs>
  <rect width="300" height="200" rx="16" fill="#FBE9E7" />
  <!-- Earthen Matka/Bowl -->
  <ellipse cx="150" cy="120" rx="100" ry="42" fill="#8D6E63"/>
  <!-- Sweet syrup -->
  <ellipse cx="150" cy="116" rx="92" ry="36" fill="#FFB74D" opacity="0.6"/>
  <!-- Jamuns -->
  <circle cx="115" cy="105" r="22" fill="url(#gjGrad)"/>
  <circle cx="185" cy="105" r="22" fill="url(#gjGrad)"/>
  <circle cx="150" cy="95" r="25" fill="url(#gjGrad)"/>
  <circle cx="150" cy="120" r="20" fill="url(#gjGrad)"/>
  <!-- Saffron strands & pistachio garnish -->
  <line x1="145" y1="88" x2="155" y2="92" stroke="#FF3D00" stroke-width="2"/>
  <circle cx="148" cy="90" r="2" fill="#388E3C"/>
  <text x="150" y="185" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="14" fill="#4E260E">देसी घी गुलाब जामुन (Gulab Jamun)</text>
</svg>""",

    "sweet_imarti.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="100%" height="100%">
  <rect width="300" height="200" rx="16" fill="#FFF3E0" />
  <ellipse cx="150" cy="115" rx="105" ry="45" fill="#FFE082"/>
  <!-- Spiral flower shaped Imarti -->
  <g transform="translate(150, 105)">
    <circle cx="0" cy="0" r="42" fill="none" stroke="#FF6D00" stroke-width="9"/>
    <!-- Petal loops around -->
    <circle cx="0" cy="-38" r="10" fill="none" stroke="#FF9100" stroke-width="5"/>
    <circle cx="27" cy="-27" r="10" fill="none" stroke="#FF9100" stroke-width="5"/>
    <circle cx="38" cy="0" r="10" fill="none" stroke="#FF9100" stroke-width="5"/>
    <circle cx="27" cy="27" r="10" fill="none" stroke="#FF9100" stroke-width="5"/>
    <circle cx="0" cy="38" r="10" fill="none" stroke="#FF9100" stroke-width="5"/>
    <circle cx="-27" cy="27" r="10" fill="none" stroke="#FF9100" stroke-width="5"/>
    <circle cx="-38" cy="0" r="10" fill="none" stroke="#FF9100" stroke-width="5"/>
    <circle cx="-27" cy="-27" r="10" fill="none" stroke="#FF9100" stroke-width="5"/>
    <circle cx="0" cy="0" r="20" fill="none" stroke="#E65100" stroke-width="7"/>
  </g>
  <text x="150" y="185" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="14" fill="#E65100">कुरकुरी केसरी इमरती (Crispy Imarti)</text>
</svg>""",

    "sweet_rasgulla.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="100%" height="100%">
  <defs>
    <radialGradient id="rgGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="70%" stop-color="#FFF9C4"/>
      <stop offset="100%" stop-color="#E0E0E0"/>
    </radialGradient>
  </defs>
  <rect width="300" height="200" rx="16" fill="#EDE7F6" />
  <!-- Bowl -->
  <ellipse cx="150" cy="120" rx="95" ry="40" fill="#B0BEC5"/>
  <ellipse cx="150" cy="116" rx="88" ry="34" fill="#E0F7FA"/>
  <!-- White spongy rasgullas -->
  <circle cx="115" cy="105" r="22" fill="url(#rgGrad)" stroke="#E0E0E0"/>
  <circle cx="185" cy="105" r="22" fill="url(#rgGrad)" stroke="#E0E0E0"/>
  <circle cx="150" cy="95" r="25" fill="url(#rgGrad)" stroke="#E0E0E0"/>
  <circle cx="150" cy="120" r="19" fill="url(#rgGrad)" stroke="#E0E0E0"/>
  <text x="150" y="185" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="14" fill="#37474F">रसभरा स्पंजी रसगुल्ला (Rasgulla)</text>
</svg>""",

    "sweet_rasmalai.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="100%" height="100%">
  <defs>
    <radialGradient id="rmGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FFF9C4"/>
      <stop offset="70%" stop-color="#FFE082"/>
      <stop offset="100%" stop-color="#FFD54F"/>
    </radialGradient>
  </defs>
  <rect width="300" height="200" rx="16" fill="#FFFDE7" />
  <ellipse cx="150" cy="120" rx="95" ry="40" fill="#CFD8DC"/>
  <!-- Rabdi milk pool -->
  <ellipse cx="150" cy="116" rx="88" ry="34" fill="#FFF59D"/>
  <!-- Rasmalai patties -->
  <ellipse cx="118" cy="108" rx="24" ry="16" fill="url(#rmGrad)"/>
  <ellipse cx="182" cy="108" rx="24" ry="16" fill="url(#rmGrad)"/>
  <ellipse cx="150" cy="96" rx="26" ry="17" fill="url(#rmGrad)"/>
  <!-- Saffron & Pistachio garnishes -->
  <line x1="146" y1="92" x2="154" y2="94" stroke="#D84315" stroke-width="2"/>
  <circle cx="150" cy="96" r="2.5" fill="#2E7D32"/>
  <circle cx="118" cy="106" r="2.5" fill="#2E7D32"/>
  <circle cx="182" cy="106" r="2.5" fill="#2E7D32"/>
  <text x="150" y="185" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="14" fill="#F57F17">शाही केसर रसमलाई (Rasmalai)</text>
</svg>""",

    "sweet_soan_papdi.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="100%" height="100%">
  <rect width="300" height="200" rx="16" fill="#FFF8E1" />
  <ellipse cx="150" cy="120" rx="100" ry="42" fill="#D7CCC8"/>
  <ellipse cx="150" cy="116" rx="92" ry="36" fill="#F5F5F5"/>
  <!-- Flaky Soan Papdi Cubes with dry fruits -->
  <g transform="translate(100, 85)">
    <polygon points="0,15 25,0 55,10 30,25" fill="#FFE082"/>
    <polygon points="0,15 30,25 30,45 0,35" fill="#FFD54F"/>
    <polygon points="30,25 55,10 55,30 30,45" fill="#FFCA28"/>
    <circle cx="28" cy="14" r="2" fill="#388E3C"/>
    <circle cx="36" cy="11" r="2" fill="#8D6E63"/>
  </g>
  <g transform="translate(145, 95)">
    <polygon points="0,15 25,0 55,10 30,25" fill="#FFE082"/>
    <polygon points="0,15 30,25 30,45 0,35" fill="#FFD54F"/>
    <polygon points="30,25 55,10 55,30 30,45" fill="#FFCA28"/>
    <circle cx="26" cy="13" r="2" fill="#388E3C"/>
  </g>
  <text x="150" y="185" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="14" fill="#BF360C">खस्ता देसी घी सोन पापड़ी (Soan Papdi)</text>
</svg>"""
}

for filename, content in svgs.items():
    file_path = os.path.join(SVG_DIR, filename)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content.strip())

print(f"Generated {len(svgs)} custom festive SVG illustrations in {SVG_DIR}")
