"use client";

import { useMemo, useState, useEffect } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  isTopSelling?: boolean;
};

// --- تشكيلة المتجر الكاملة (52 قطعة) بالـ Categories ---
const products: Product[] = [
  // Rings
  { id: 1, name: "Royal Lion Gold Ring", price: 350, image: "/RING 1.jpg", category: "RINGS" },
  { id: 2, name: "Imperial Lion Signet", price: 400, image: "/RING 2.jpg", category: "RINGS", isTopSelling: true },
  { id: 3, name: "Textured Gold Band", price: 300, image: "/RING 3.jpg", category: "RINGS" },
  { id: 4, name: "Vintage Engraved Ring", price: 450, image: "/Light Weight engraving hand carved 22k Yellow Gold Ring Indian Men Gold Ring Jewelry Handmade Edwardian Vintage Design Jewelry , K2234.jpg", category: "RINGS" },
  { id: 6, name: "Venus Sculpted Silver", price: 400, image: "/“VENUS RING”.jpg", category: "RINGS" },
  { id: 7, name: "Greek Onyx Signet", price: 450, image: "/Men's Silver Black Onyx Signet Ring - Vintage Greek Ring - Sterling Silver Ring - Classic Jewelry for Him - 925 Sterling Silver - Mens Ring.jpg", category: "RINGS", isTopSelling: true },
  { id: 20, name: "Silver Iced Cluster", price: 400, image: "/HarlemBling Solid 925 Sterling Silver Men's Ring Iced Out King Crown Ring - Icy Hip Hop Round Cluster Men's Ring - Large 18mm (12).jpg", category: "RINGS", isTopSelling: true },
  { id: 42, name: "Gold Diamond Square", price: 450, image: "/j_24665272_1732152954923_bg_processed.jpg", category: "RINGS" },

  // Chains
  { id: 5, name: "Onyx Pillar Pendant", price: 500, image: "/download (7).jpg", category: "CHAINS" },
  { id: 12, name: "Silver Spider Pendant", price: 250, image: "/download (4).jpg", category: "CHAINS" },
  { id: 13, name: "Silver Lightning", price: 200, image: "/homens Colar de pingente relâmpago.jpg", category: "CHAINS" },
  { id: 14, name: "Classic 3mm Rope", price: 250, image: "/ROPE CHAIN 3MM.jpg", category: "CHAINS" },
  { id: 15, name: "Gold Lion Necklace", price: 350, image: "/1pc Fashionable Lion Head Charm Necklace For Men For Daily Decoration Copper Jewelry.jpg", category: "CHAINS" },
  { id: 16, name: "Iced Silver Cuban", price: 500, image: "/Men's necklace｜Mens accessory& Mens jewelry｜outfits with necklace｜necklace outfits.jpg", category: "CHAINS", isTopSelling: true },
  { id: 17, name: "18K Gold Iced Cuban", price: 500, image: "/Men's 18K Gold ICED Cuban Chain.jpg", category: "CHAINS", isTopSelling: true },
  { id: 18, name: "Diamond Boss Crown", price: 400, image: "/1pc Glamorous Zinc Alloy Rhinestone Letter & Crown Pendant Necklace For Men For Daily Decoration, For Jewelry Gift And Party.jpg", category: "CHAINS" },
  { id: 19, name: "Iced #23 Pendant", price: 450, image: "/1pc #23 Shaped Pendant With 9mm Cuban Chain, Classic Retro Punk Necklace, Unisex Hip Hop Numeral Pendant Necklace, Suitable For Daily Wear Or Party, 2 Chain Styles Available.jpg", category: "CHAINS" },
  { id: 37, name: "Silver Iced Cuban", price: 450, image: "/8mm-iced-cuban-link-chain-white-gold-adamans-1_1600x.jpg", category: "CHAINS" },
  { id: 40, name: "Gold Iced Tiger", price: 500, image: "/71OSi37XnCL._AC_UF350,350_QL80_.jpg", category: "CHAINS", isTopSelling: true },

  // Bracelets
  { id: 8, name: "Classic Cuban Gold", price: 500, image: "/download (6).jpg", category: "BRACELETS" },
  { id: 9, name: "Engraved Vision", price: 350, image: "/Браслет с глазами🥷😍.jpg", category: "BRACELETS" },
  { id: 10, name: "Iced Crystal Bracelet", price: 500, image: "/download (5).jpg", category: "BRACELETS" },
  { id: 11, name: "Silver Tennis Bracelet", price: 350, image: "/Men's Silver Iced Out Tennis Bracelet, Hip Hop Zircon Bracelet for Men, Bling Jewelry.jpg", category: "BRACELETS" },
  { id: 38, name: "Silver Iced Cuban", price: 400, image: "/images (2).jpg", category: "BRACELETS" },
  { id: 39, name: "Textured Link Bracelet", price: 350, image: "/1.jpg", category: "BRACELETS" },

  // Fragrances
  { id: 21, name: "1 Million EDT", price: 1000, image: "/Paco Rabanne One Million edt H 5ml.jpg", category: "FRAGRANCES" },
  { id: 22, name: "Born In Roma Intense", price: 1000, image: "/VALENTINO BORN IN ROMA INTENSE EAU DE PARFUM SPRAY 100ML.jpg", category: "FRAGRANCES", isTopSelling: true },
  { id: 23, name: "Versace Eros", price: 1000, image: "/Versace Eros.jpg", category: "FRAGRANCES" },

  // Eyewear
  { id: 24, name: "LV Clash Square", price: 400, image: "/Louis Vuitton® LV Clash Square Sunglasses.jpg", category: "EYEWEAR", isTopSelling: true },
  { id: 25, name: "Crimson Rimless", price: 400, image: "/Men Tinted Lens Rimless Fashion Glasses With Glasses Rope.jpg", category: "EYEWEAR" },
  { id: 26, name: "Gold Panther Rimless", price: 400, image: "/Men Rimless Fashion Glasses.jpg", category: "EYEWEAR" },
  { id: 27, name: "Y2K Black Square", price: 400, image: "/1 Peça Óculos de Sol de Praia Fashion Y2K Preto de Armação Quadrada para Homens e Mulheres Acessórios Vintage de Proteção Solar.jpg", category: "EYEWEAR" },
  { id: 43, name: "Blue Tint Sunglasses", price: 400, image: "/69ae3cffafec8744ba0dbb88.jpg", category: "EYEWEAR" },

  // Belts & Wallets
  { id: 28, name: "Gold Rhinestone Belt", price: 500, image: "/Rhinestone Decor Belt.jpg", category: "LEATHER GOODS" },
  { id: 29, name: "White Crystal Belt", price: 500, image: "/download (3).jpg", category: "LEATHER GOODS" },
  { id: 30, name: "AMIRI White Belt", price: 500, image: "/download (2).jpg", category: "LEATHER GOODS" },
  { id: 31, name: "Gucci Signature Belt", price: 500, image: "/download (1).jpg", category: "LEATHER GOODS" },
  { id: 32, name: "Gucci Canvas Belt", price: 500, image: "/Gucci - 4cm Leather-Trimmed Monogrammed Coated-Canvas Belt.jpg", category: "LEATHER GOODS", isTopSelling: true },
  { id: 33, name: "LV x NBA Wallet", price: 500, image: "/Louis Vuitton Bag LV xNBA Virgil Abloh Multiple Wallet M80105.jpg", category: "LEATHER GOODS" },
  { id: 34, name: "LV Eclipse Wallet", price: 500, image: "/Louis Vuitton 100% Coatead Canvas Black Multiple Wallet Monogram Eclipse Canvas One size - 16% off.jpg", category: "LEATHER GOODS" },
  { id: 44, name: "LV Gradient Wallet", price: 500, image: "/images (1).jpg", category: "LEATHER GOODS" },
  { id: 45, name: "LV Red Monogram Belt", price: 500, image: "/s-l1200.jpg", category: "LEATHER GOODS" },

  // Watches
  { id: 35, name: "RM Sapphire Watch", price: 800, image: "/download.jpg", category: "WATCHES" },
  { id: 36, name: "RM McLaren Blue", price: 800, image: "/Richard Mille watch.jpg", category: "WATCHES", isTopSelling: true },
  { id: 41, name: "RM Smiley Edition", price: 800, image: "/105451_MAIN_5920.jpg", category: "WATCHES", isTopSelling: true },
  { id: 46, name: "RM Orange Carbon", price: 800, image: "/images.jpg", category: "WATCHES" },

  // Bags
  { id: 47, name: "Gucci Signature Bag", price: 500, image: "/image_1.jpg", category: "BAGS", isTopSelling: true },
  { id: 48, name: "Goyard Duffle Bag", price: 500, image: "/image_2.jpg", category: "BAGS" },
  { id: 49, name: "LV Embossed Keepall", price: 500, image: "/image_3.jpg", category: "BAGS" },
  { id: 50, name: "Gray LV Keepall", price: 500, image: "/image_4.jpg", category: "BAGS" },
  { id: 51, name: "Gray LV Backpack", price: 500, image: "/image_5.jpg", category: "BAGS", isTopSelling: true },
  { id: 52, name: "Black LV Backpack", price: 500, image: "/image_6.jpg", category: "BAGS" }
];

const ALL_CATEGORIES = ["ALL", ...Array.from(new Set(products.map(p => p.category)))];

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const [currentView, setCurrentView] = useState("home");
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedPayment, setSelectedPayment] = useState("Visa");
  const [activeCategory, setActiveCategory] = useState("ALL");

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index: number) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
  };

  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  }, [cart]);

  const topSellingProducts = useMemo(() => {
    return products.filter(p => p.isTopSelling);
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "ALL") return products;
    return products.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const navigateToView = (view: string) => {
    setCurrentView(view);
    window.scrollTo(0, 0); 
  };

  // --- شاشة البداية (Splash Screen) ---
  if (!hasEntered) {
    return (
      <div style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#050505", 
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Courier New', Courier, monospace"
      }}>
        <div style={{ position: "absolute", top: "10%", left: "20%", width: "60vw", height: "60vw", background: "radial-gradient(circle, rgba(0, 102, 255, 0.4) 0%, rgba(0,0,0,0) 70%)", filter: "blur(80px)", borderRadius: "50%", zIndex: 1 }}></div>
        <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(200, 200, 200, 0.1) 0%, rgba(0,0,0,0) 70%)", filter: "blur(100px)", borderRadius: "50%", zIndex: 1 }}></div>

        <div style={{ zIndex: 10, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
          
          <h1 style={{ 
            fontSize: "clamp(80px, 20vw, 250px)", 
            fontWeight: 900, 
            letterSpacing: "-10px", 
            color: "#F9F6F0", 
            margin: 0,
            textShadow: "0 0 40px rgba(0, 102, 255, 0.5)",
            animation: "pulseText 3s infinite alternate"
          }}>
            APOLLO
          </h1>

          <button 
            onClick={() => setHasEntered(true)}
            style={{
              padding: "16px 45px",
              background: "transparent",
              color: "#F9F6F0",
              border: "2px solid #F9F6F0",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
              borderRadius: "999px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginTop: "30px",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = "#F9F6F0"; e.currentTarget.style.color = "#000"; }}
            onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#F9F6F0"; }}
          >
            EXPLORE COLLECTION
          </button>
        </div>
        <style dangerouslySetInnerHTML={{__html: `@keyframes pulseText { 0% { opacity: 0.9; transform: scale(0.98); } 100% { opacity: 1; transform: scale(1.02); } }`}} />
      </div>
    );
  }

  // --- الموقع الأساسي ---
  return (
    <main
      style={{
        backgroundColor: "#F9F6F0", // اللون الكريمي للصورة
        color: "#000",
        minHeight: "100vh",
        fontFamily: "'Courier New', Courier, monospace", // خط الآلة الكاتبة (Brutalist)
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; width: 100%; scroll-behavior: smooth; }
        
        .fade-in { animation: fadeIn 0.6s ease forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        /* Product Card Styling */
        .editorial-img { transition: opacity 0.4s ease; mix-blend-mode: multiply; }
        .product-card:hover .editorial-img { opacity: 0.8; transform: scale(1.02); }
        .product-img-box { background: #EFEBE1; height: 350px; display: flex; align-items: center; justify-content: center; position: relative; transition: 0.3s; }
        
        /* Buttons - جميع الزراير باللون الكحلي الفخم */
        .btn-buy { color: #001a33; font-size: 24px; font-weight: bold; border-bottom: 3px solid #001a33; padding-bottom: 2px; cursor: pointer; display: inline-block; transition: all 0.3s; }
        .btn-buy:hover { padding-right: 15px; letter-spacing: 1px; }

        .cat-btn { background: transparent; border: 1px solid #001a33; color: #001a33; padding: 10px 20px; border-radius: 99px; cursor: pointer; font-family: inherit; font-size: 14px; font-weight: bold; transition: 0.3s; white-space: nowrap; }
        .cat-btn.active { background: #001a33; color: #F9F6F0; }
        .cat-btn:hover:not(.active) { background: #001a33; color: #F9F6F0; }

        .pill-nav { background: rgba(249, 246, 240, 0.9); padding: 10px 20px; border-radius: 99px; display: inline-flex; gap: 15px; font-size: 14px; font-weight: bold; border: 1px solid #001a33; color: #001a33; cursor: pointer; }

        .hero-banner { background-color: #000; color: #F9F6F0; position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 80vh; padding: 20px; text-align: center; }
        .hero-text { font-size: clamp(100px, 25vw, 300px); font-weight: 900; letter-spacing: -10px; line-height: 0.8; margin-top: auto; }

        .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 50px 20px; padding: 40px; }
        
        @media (max-width: 768px) {
          .products-grid { grid-template-columns: 1fr 1fr; padding: 20px; gap: 30px 15px; }
          .product-img-box { height: 220px; }
          .btn-buy { font-size: 16px; }
          .hero-text { letter-spacing: -5px; }
        }
      `}} />

      {/* HEADER / HERO SECTION */}
      <div className="hero-banner">
        {/* اللوجو في الخلفية مع Blur (حل مشكلة السواد) */}
        <div style={{ 
          position: "absolute", 
          top: "-30px", left: "-30px", right: "-30px", bottom: "-30px", // ممدودة شوية عشان الحواف الضبابية
          backgroundImage: "url(/logo.jpg)", 
          backgroundSize: "cover", 
          backgroundPosition: "center", 
          filter: "blur(20px)", 
          zIndex: 1, 
          opacity: 0.5 // خفيفة عشان النص يفضل مقروء
        }} />

        {/* Top Navbar Area */}
        <div style={{ position: "absolute", top: 20, left: 20, right: 20, display: "flex", justifyContent: "space-between", zIndex: 10 }}>
          <img src="/logo.jpg" alt="Logo" style={{ height: "30px", borderRadius: "4px" }} />
          <div style={{ display: "flex", alignItems: "center" }}>
             <button 
                onClick={() => navigateToView("checkout")} 
                style={{ background: "#001a33", color: "#F9F6F0", border: "none", padding: "10px 20px", borderRadius: "99px", fontWeight: "bold", fontFamily: "inherit", cursor: "pointer" }}>
               CART ({cart.length})
             </button>
          </div>
        </div>

        {/* Giant Overlapping Text */}
        <h1 className="hero-text" style={{ zIndex: 10, position: "relative" }}>APOLLO</h1>

        {/* Pill Navigation (الزراير الكحلي) */}
        <div className="pill-nav" style={{ zIndex: 10, position: "relative", marginTop: "20px", marginBottom: "20px" }}>
          <span onClick={() => navigateToView("home")} style={{ textDecoration: currentView === "home" ? "underline" : "none" }}>Home</span> | 
          <span onClick={() => navigateToView("shop")} style={{ textDecoration: currentView === "shop" ? "underline" : "none" }}>Shop</span> | 
          <span onClick={() => navigateToView("about")} style={{ textDecoration: currentView === "about" ? "underline" : "none" }}>About</span>
        </div>
      </div>

      {/* --- HOME VIEW --- */}
      {currentView === "home" && (
        <div className="fade-in">
          <div style={{ padding: "50px 40px 10px" }}>
            <h2 style={{ fontSize: "clamp(40px, 8vw, 80px)", fontWeight: "normal", letterSpacing: "-2px", color: "#001a33" }}>Bestseller Now</h2>
          </div>
          
          <div className="products-grid">
            {topSellingProducts.slice(0, 8).map((product) => (
              <div key={product.id} className="product-card" style={{ display: "flex", flexDirection: "column" }}>
                <div className="product-img-box">
                  <img src={product.image} className="editorial-img" style={{ width: "90%", height: "90%", objectFit: "contain" }} />
                  <span style={{ position: "absolute", top: "15px", right: "15px", fontSize: "20px", color: "#001a33" }}>♥</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px", fontSize: "14px", textTransform: "uppercase", fontWeight: "bold", color: "#001a33" }}>
                  <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "75%" }}>{product.name}</span>
                  <span>${product.price}</span>
                </div>
                <div style={{ marginTop: "20px", textAlign: "right" }}>
                   <span className="btn-buy" onClick={() => addToCart(product)}>BUY NOW &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- SHOP VIEW (With Filter Categories) --- */}
      {currentView === "shop" && (
        <div className="fade-in">
          <div style={{ padding: "50px 40px 20px" }}>
            <h2 style={{ fontSize: "clamp(40px, 8vw, 80px)", fontWeight: "normal", letterSpacing: "-2px", marginBottom: "30px", color: "#001a33" }}>Collection</h2>
            
            {/* Scrollable Categories Row */}
            <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "15px", scrollbarWidth: "none" }}>
               {ALL_CATEGORIES.map(cat => (
                 <button 
                    key={cat} 
                    className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                 >
                   {cat}
                 </button>
               ))}
            </div>
          </div>

          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card" style={{ display: "flex", flexDirection: "column" }}>
                <div className="product-img-box">
                  <img src={product.image} className="editorial-img" style={{ width: "90%", height: "90%", objectFit: "contain" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px", fontSize: "14px", textTransform: "uppercase", fontWeight: "bold", color: "#001a33" }}>
                  <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "75%" }}>{product.name}</span>
                  <span>${product.price}</span>
                </div>
                <div style={{ marginTop: "20px", textAlign: "right" }}>
                   <span className="btn-buy" onClick={() => addToCart(product)}>BUY NOW &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- ABOUT VIEW --- */}
      {currentView === "about" && (
        <div className="fade-in" style={{ padding: "80px 40px", textAlign: "center", minHeight: "70vh", color: "#001a33" }}>
           <h2 style={{ fontSize: "clamp(60px, 10vw, 120px)", letterSpacing: "-5px", marginBottom: "30px", fontWeight: 900 }}>The Studio</h2>
           <p style={{ maxWidth: "600px", margin: "0 auto 50px", fontSize: "18px", lineHeight: "1.8", fontWeight: "bold" }}>
             APOLLO represents the intersection of brutalist architecture and modern street luxury. Crafted for the bold.
           </p>
           
           <div style={{ border: "2px solid #001a33", padding: "40px", maxWidth: "500px", margin: "0 auto", background: "#EFEBE1" }}>
              <p style={{ fontSize: "24px", fontWeight: "900", marginBottom: "20px", letterSpacing: "-1px" }}>CONTACT US</p>
              <p style={{ fontSize: "18px", marginBottom: "15px", fontWeight: "bold" }}>T: 0112441902</p>
              <p style={{ fontSize: "16px", fontWeight: "bold" }}>E: itsmahmoudmagdy@gmail.com</p>
           </div>
        </div>
      )}

      {/* --- CHECKOUT VIEW --- */}
      {currentView === "checkout" && (
        <div className="fade-in" style={{ padding: "60px 40px", maxWidth: "900px", margin: "0 auto", minHeight: "70vh", color: "#001a33" }}>
           <h2 style={{ fontSize: "50px", letterSpacing: "-2px", borderBottom: "3px solid #001a33", paddingBottom: "20px", marginBottom: "40px", fontWeight: 900 }}>BAG ({cart.length})</h2>

           {cart.length === 0 ? (
             <div style={{ textAlign: "center", padding: "40px 0" }}>
                <p style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "30px" }}>Your bag is empty.</p>
                <span className="btn-buy" onClick={() => navigateToView("shop")}>Continue Shopping &rarr;</span>
             </div>
           ) : (
             <div>
               {cart.map((item, index) => (
                 <div key={index} style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #ccc", paddingBottom: "20px", marginBottom: "20px" }}>
                    <div style={{ background: "#EFEBE1", width: "100px", height: "100px", display: "flex", justifyContent: "center", alignItems: "center", marginRight: "20px" }}>
                       <img src={item.image} style={{ width: "80%", height: "80%", objectFit: "contain", mixBlendMode: "multiply" }} />
                    </div>
                    <div style={{ flex: 1 }}>
                       <p style={{ fontWeight: "900", textTransform: "uppercase", fontSize: "18px" }}>{item.name}</p>
                       <p style={{ fontSize: "16px", marginTop: "5px", fontWeight: "bold" }}>${item.price}</p>
                    </div>
                    <button onClick={() => removeFromCart(index)} style={{ background: "transparent", color: "#001a33", border: "1px solid #001a33", padding: "8px 15px", borderRadius: "99px", cursor: "pointer", fontWeight: "bold", fontFamily: "inherit" }}>
                      Remove
                    </button>
                 </div>
               ))}

               <div style={{ textAlign: "right", marginTop: "50px" }}>
                  <p style={{ fontSize: "36px", fontWeight: "900", marginBottom: "30px", letterSpacing: "-1px" }}>TOTAL: ${total}</p>
                  
                  <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginBottom: "40px", flexWrap: "wrap" }}>
                    {["Visa", "Mastercard", "InstaPay", "Cash"].map(method => (
                      <button key={method} onClick={() => setSelectedPayment(method)} className={`cat-btn ${selectedPayment === method ? 'active' : ''}`}>
                        {method}
                      </button>
                    ))}
                  </div>

                  <button style={{ background: "#001a33", color: "#F9F6F0", border: "none", padding: "20px 40px", fontSize: "18px", fontWeight: "bold", cursor: "pointer", width: "100%", maxWidth: "450px", fontFamily: "inherit" }}>
                     CHECKOUT WITH {selectedPayment.toUpperCase()} &rarr;
                  </button>
               </div>
             </div>
           )}
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ borderTop: "2px solid #001a33", padding: "40px", marginTop: "60px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "20px", fontSize: "14px", fontWeight: "bold", textTransform: "uppercase", color: "#001a33" }}>
         <div>© 2026 APOLLO STUDIO</div>
         <div style={{ display: "flex", gap: "30px" }}>
            <span style={{ cursor: "pointer", textDecoration: "underline" }}>Instagram</span>
            <span style={{ cursor: "pointer", textDecoration: "underline" }}>TikTok</span>
         </div>
      </footer>
    </main>
  );
}