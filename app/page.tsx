"use client";

import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  isTopSelling?: boolean;
  inStock?: boolean;
  description?: string;
};

// --- تشكيلة المتجر الكاملة (52 قطعة) ---
const products: Product[] = [
  // Rings
  { id: 1, name: "Royal Lion Gold Ring", price: 350, image: "/RING 1.jpg", category: "RINGS", inStock: true },
  { id: 2, name: "Imperial Lion Signet", price: 400, image: "/RING 2.jpg", category: "RINGS", isTopSelling: true, inStock: true },
  { id: 3, name: "Textured Gold Band", price: 300, image: "/RING 3.jpg", category: "RINGS", inStock: false }, // Out of stock example
  { id: 4, name: "Vintage Engraved Ring", price: 450, image: "/Light Weight engraving hand carved 22k Yellow Gold Ring Indian Men Gold Ring Jewelry Handmade Edwardian Vintage Design Jewelry , K2234.jpg", category: "RINGS", inStock: true },
  { id: 6, name: "Venus Sculpted Silver", price: 400, image: '/"VENUS RING".jpg', category: "RINGS", inStock: true },
  { id: 7, name: "Greek Onyx Signet", price: 450, image: "/Men's Silver Black Onyx Signet Ring - Vintage Greek Ring - Sterling Silver Ring - Classic Jewelry for Him - 925 Sterling Silver - Mens Ring.jpg", category: "RINGS", isTopSelling: true, inStock: true },
  { id: 20, name: "Silver Iced Cluster", price: 400, image: "/HarlemBling Solid 925 Sterling Silver Men's Ring Iced Out King Crown Ring - Icy Hip Hop Round Cluster Men's Ring - Large 18mm (12).jpg", category: "RINGS", isTopSelling: true, inStock: true },
  { id: 42, name: "Gold Diamond Square", price: 450, image: "/j_24665272_1732152954923_bg_processed.jpg", category: "RINGS", inStock: true },

  // Chains
  { id: 5, name: "Onyx Pillar Pendant", price: 500, image: "/download (7).jpg", category: "CHAINS", inStock: true },
  { id: 12, name: "Silver Spider Pendant", price: 250, image: "/download (4).jpg", category: "CHAINS", inStock: true },
  { id: 13, name: "Silver Lightning", price: 200, image: "/homens Colar de pingente relâmpago.jpg", category: "CHAINS", inStock: true },
  { id: 14, name: "Classic 3mm Rope", price: 250, image: "/ROPE CHAIN 3MM.jpg", category: "CHAINS", inStock: true },
  { id: 15, name: "Gold Lion Necklace", price: 350, image: "/1pc Fashionable Lion Head Charm Necklace For Men For Daily Decoration Copper Jewelry.jpg", category: "CHAINS", inStock: true },
  { id: 16, name: "Iced Silver Cuban", price: 500, image: "/Men's necklace｜Mens accessory& Mens jewelry｜outfits with necklace｜necklace outfits.jpg", category: "CHAINS", isTopSelling: true, inStock: true },
  { id: 17, name: "18K Gold Iced Cuban", price: 500, image: "/Men's 18K Gold ICED Cuban Chain.jpg", category: "CHAINS", isTopSelling: true, inStock: true },
  { id: 18, name: "Diamond Boss Crown", price: 400, image: "/1pc Glamorous Zinc Alloy Rhinestone Letter & Crown Pendant Necklace For Men For Daily Decoration, For Jewelry Gift And Party.jpg", category: "CHAINS", inStock: true },
  { id: 37, name: "Silver Iced Cuban", price: 450, image: "/8mm-iced-cuban-link-chain-white-gold-adamans-1_1600x.jpg", category: "CHAINS", inStock: true },
  { id: 40, name: "Gold Iced Tiger", price: 500, image: "/71OSi37XnCL._AC_UF350,350_QL80_.jpg", category: "CHAINS", isTopSelling: true, inStock: true },

  // Bracelets
  { id: 8, name: "Classic Cuban Gold", price: 500, image: "/download (6).jpg", category: "BRACELETS", inStock: true },
  { id: 9, name: "Engraved Vision", price: 350, image: "/Браслет с глазами🥷😍.jpg", category: "BRACELETS", inStock: true },
  { id: 10, name: "Iced Crystal Bracelet", price: 500, image: "/download (5).jpg", category: "BRACELETS", inStock: true },
  { id: 11, name: "Silver Tennis Bracelet", price: 350, image: "/Men's Silver Iced Out Tennis Bracelet, Hip Hop Zircon Bracelet for Men, Bling Jewelry.jpg", category: "BRACELETS", inStock: true },
  { id: 38, name: "Silver Iced Cuban", price: 400, image: "/images (2).jpg", category: "BRACELETS", inStock: true },
  { id: 39, name: "Textured Link Bracelet", price: 350, image: "/1.jpg", category: "BRACELETS", inStock: true },

  // Fragrances
  { id: 21, name: "1 Million EDT", price: 1000, image: "/Paco Rabanne One Million edt H 5ml.jpg", category: "FRAGRANCES", inStock: true },
  { id: 22, name: "VALENTINO", price: 1000, image: "/VALENTINO BORN IN ROMA INTENSE EAU DE PARFUM SPRAY 100ML.jpg", category: "FRAGRANCES", isTopSelling: true, inStock: true },
  { id: 23, name: "Versace Eros", price: 1000, image: "/Versace Eros.jpg", category: "FRAGRANCES", inStock: true },

  // Eyewear
  { id: 24, name: "LV Clash Square", price: 400, image: "/Louis Vuitton® LV Clash Square Sunglasses.jpg", category: "EYEWEAR", isTopSelling: true, inStock: true },
  { id: 25, name: "Crimson Rimless", price: 400, image: "/Men Tinted Lens Rimless Fashion Glasses With Glasses Rope.jpg", category: "EYEWEAR", inStock: true },
  { id: 26, name: "Gold Panther Rimless", price: 400, image: "/Men Rimless Fashion Glasses.jpg", category: "EYEWEAR", inStock: true },
  { id: 27, name: "Y2K Black Square", price: 400, image: "/1 Peça Óculos de Sol de Praia Fashion Y2K Preto de Armação Quadrada para Homens e Mulheres Acessórios Vintage de Proteção Solar.jpg", category: "EYEWEAR", inStock: true },
  { id: 43, name: "Blue Tint Sunglasses", price: 400, image: "/69ae3cffafec8744ba0dbb88.jpg", category: "EYEWEAR", inStock: true },

  // Leather Goods
  { id: 28, name: "Gold Rhinestone Belt", price: 500, image: "/Rhinestone Decor Belt.jpg", category: "LEATHER GOODS", inStock: true },
  { id: 29, name: "White Crystal Belt", price: 500, image: "/download (3).jpg", category: "LEATHER GOODS", inStock: true },
  { id: 30, name: "AMIRI White Belt", price: 500, image: "/download (2).jpg", category: "LEATHER GOODS", inStock: true },
  { id: 31, name: "Gucci Signature Belt", price: 500, image: "/download (1).jpg", category: "LEATHER GOODS", inStock: true },
  { id: 32, name: "Gucci Canvas Belt", price: 500, image: "/Gucci - 4cm Leather-Trimmed Monogrammed Coated-Canvas Belt.jpg", category: "LEATHER GOODS", isTopSelling: true, inStock: true },
  { id: 33, name: "LV x NBA Wallet", price: 500, image: "/Louis Vuitton Bag LV xNBA Virgil Abloh Multiple Wallet M80105.jpg", category: "LEATHER GOODS", inStock: true },
  { id: 44, name: "LV Gradient Wallet", price: 500, image: "/images (1).jpg", category: "LEATHER GOODS", inStock: true },
  { id: 45, name: "LV Red Monogram Belt", price: 500, image: "/s-l1200.jpg", category: "LEATHER GOODS", inStock: true },

  // Watches
  { id: 35, name: "RM Sapphire Watch", price: 800, image: "/download.jpg", category: "WATCHES", inStock: true },
  { id: 36, name: "RM McLaren Blue", price: 800, image: "/Richard Mille watch.jpg", category: "WATCHES", isTopSelling: true, inStock: true },
  { id: 41, name: "RM Smiley Edition", price: 800, image: "/105451_MAIN_5920.jpg", category: "WATCHES", isTopSelling: true, inStock: true },
  { id: 46, name: "RM Orange Carbon", price: 800, image: "/images.jpg", category: "WATCHES", inStock: true },

  // Bags
  { id: 47, name: "Gucci Signature Bag", price: 500, image: "/image_1.jpg", category: "BAGS", isTopSelling: true, inStock: true },
  { id: 48, name: "Goyard Duffle Bag", price: 500, image: "/image_2.jpg", category: "BAGS", inStock: false }, // Out of stock example
  { id: 49, name: "LV Embossed Keepall", price: 500, image: "/image_3.jpg", category: "BAGS", inStock: true },
  { id: 50, name: "Gray LV Keepall", price: 500, image: "/image_4.jpg", category: "BAGS", inStock: true },
  { id: 51, name: "Gray LV Backpack", price: 500, image: "/image_5.jpg", category: "BAGS", isTopSelling: true, inStock: true },
  { id: 52, name: "Black LV Backpack", price: 500, image: "/image_6.jpg", category: "BAGS", inStock: true },
];

const ALL_CATEGORIES = ["ALL", ...Array.from(new Set(products.map((p) => p.category)))];

export default function Home() {
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<string>("home");
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  
  // Product Details State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productQuantity, setProductQuantity] = useState<number>(1);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [checkoutStep, setCheckoutStep] = useState<"cart" | "shipping" | "payment_demo" | "success">("cart");
  const [shippingZone, setShippingZone] = useState<string>("cairo"); // cairo or governorate
  const [shippingType, setShippingType] = useState<string>("standard"); // standard or express
  const [selectedPayment, setSelectedPayment] = useState<string>("Visa");
  const [demoOrderId, setDemoOrderId] = useState<string>("");

  const activeClass = (view: string): string =>
    currentView === view ? "active" : "";

  // Show Toast Animation
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    const itemsToAdd = Array(quantity).fill(product);
    setCart([...cart, ...itemsToAdd]);
    showToast(`${quantity}x ${product.name} added to cart!`);
  };

  const removeFromCart = (index: number) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setProductQuantity(1);
    setCurrentView("product");
    window.scrollTo(0, 0);
  };

  // Calculations
  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price, 0), [cart]);
  
  // Shipping Logic
  const isFreeShipping = cartTotal >= 1000;
  const baseShippingCost = shippingZone === "cairo" ? 50 : 60;
  const expressSurcharge = shippingType === "express" ? 20 : 0;
  const shippingFee = isFreeShipping ? expressSurcharge : baseShippingCost + expressSurcharge;

  // Payment Logic
  const codSurcharge = selectedPayment === "Cash" ? 5 : 0;
  const grandTotal = cartTotal > 0 ? cartTotal + shippingFee + codSurcharge : 0;
  
  // Deposit Logic
  const requiresDeposit = cartTotal >= 1000 && selectedPayment === "Cash";
  const depositAmount = requiresDeposit ? Math.round(grandTotal * 0.25) : 0;

  const topSellingProducts = useMemo(() => {
    return products.filter((p) => p.isTopSelling);
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "ALL") return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const navigateToView = (view: string) => {
    setCurrentView(view);
    if (view === "checkout") setCheckoutStep("cart"); 
    window.scrollTo(0, 0);
  };

  if (!hasEntered) {
    return (
      <div style={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#050505", position: "relative", overflow: "hidden", fontFamily: "'Courier New', Courier, monospace" }}>
        <div style={{ position: "absolute", top: "10%", left: "20%", width: "60vw", height: "60vw", background: "radial-gradient(circle, rgba(0, 102, 255, 0.4) 0%, rgba(0,0,0,0) 70%)", filter: "blur(80px)", borderRadius: "50%", zIndex: 1 }}></div>
        <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(200, 200, 200, 0.1) 0%, rgba(0,0,0,0) 70%)", filter: "blur(100px)", borderRadius: "50%", zIndex: 1 }}></div>
        <div style={{ zIndex: 10, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
          <h1 style={{ fontSize: "clamp(80px, 20vw, 250px)", fontWeight: 900, letterSpacing: "-10px", color: "#F9F6F0", margin: 0, textShadow: "0 0 40px rgba(0, 102, 255, 0.5)", animation: "pulseText 3s infinite alternate" }}>APOLLO</h1>
          <button onClick={() => setHasEntered(true)} style={{ padding: "16px 45px", background: "transparent", color: "#F9F6F0", border: "2px solid #F9F6F0", fontSize: "14px", fontWeight: "bold", cursor: "pointer", borderRadius: "999px", letterSpacing: "2px", textTransform: "uppercase", marginTop: "30px", transition: "all 0.3s ease" }} onMouseOver={(e) => { e.currentTarget.style.background = "#F9F6F0"; e.currentTarget.style.color = "#000"; }} onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#F9F6F0"; }}>EXPLORE COLLECTION</button>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `@keyframes pulseText { 0% { opacity: 0.9; transform: scale(0.98); } 100% { opacity: 1; transform: scale(1.02); } }` }} />
      </div>
    );
  }

  return (
    <main style={{ color: "#333", minHeight: "100vh", fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif", position: "relative" }}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; width: 100%; scroll-behavior: smooth; }
        .fade-in { animation: fadeIn 0.6s ease forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .text-gold { color: #d4af37; }
        .bg-gold { background-color: #d4af37; }
        .border-gold { border-color: #d4af37; }

        .form-input { width: 100%; padding: 15px; margin-bottom: 15px; border: 1px solid #ccc; border-radius: 8px; font-family: inherit; font-size: 14px; background: rgba(255,255,255,0.8); }
        .form-input:focus { outline: none; border-color: #d4af37; }

        .cloud-background { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-image: url('/Background (2).jpg'); background-size: cover; background-position: center; filter: blur(15px); opacity: 0.85; z-index: -1; }
        .hero-banner { width: 100%; min-height: 85vh; background-image: url('/Panner 2 (2).jpg'); background-size: cover; background-position: center 25%; position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .hero-gradient { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.5) 100%); }
        .top-bar { position: relative; z-index: 10; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 8px 40px; display: flex; justify-content: space-between; font-size: 12px; color: #ccc; }
        .nav-main { position: relative; z-index: 10; padding: 20px 40px; display: flex; justify-content: space-between; align-items: center; }
        .nav-link { color: #fff; text-decoration: none; font-weight: 500; font-size: 15px; cursor: pointer; transition: color 0.3s; text-transform: uppercase; letter-spacing: 1px; }
        .nav-link:hover, .nav-link.active { color: #d4af37; font-weight: 700; }
        .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 30px; padding: 0 40px 60px; max-width: 1400px; margin: 0 auto; position: relative; z-index: 2; }
        .large-products-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 30px; padding: 0 40px 60px; max-width: 1400px; margin: 0 auto; position: relative; z-index: 2; }
        .large-product-img-box { height: 450px !important; }
        .product-card { text-align: center; cursor: pointer; background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(10px); border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); transition: transform 0.3s; }
        .product-card:hover { transform: translateY(-8px); box-shadow: 0 12px 30px rgba(0,0,0,0.3); }
        .product-img-box { background: rgba(255,255,255,0.5); height: 300px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; border-bottom: 1px solid rgba(0,0,0,0.05); }
        .product-img-box img { width: 85%; height: 85%; object-fit: contain; transition: transform 0.5s ease; mix-blend-mode: multiply; }
        .product-card:hover .product-img-box img { transform: scale(1.08); }
        
        .badge { position: absolute; top: 15px; left: 15px; background: #d4af37; color: #fff; font-size: 11px; padding: 4px 8px; border-radius: 3px; font-weight: bold; text-transform: uppercase; z-index: 5; }
        .add-to-cart-overlay { position: absolute; bottom: -50px; left: 0; width: 100%; background: #001a33; color: #fff; padding: 12px 0; font-size: 13px; font-weight: bold; text-transform: uppercase; transition: bottom 0.3s ease; z-index: 5; }
        .product-card:hover .add-to-cart-overlay { bottom: 0; }
        .product-title { font-size: 14px; color: #001a33; margin-bottom: 8px; font-weight: 700; text-transform: uppercase; padding: 15px 10px 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .product-price { font-size: 16px; color: #d4af37; font-weight: 800; padding-bottom: 15px; }
        .cat-filter { display: flex; justify-content: center; gap: 20px; margin-bottom: 40px; flex-wrap: wrap; position: relative; z-index: 2; }
        .cat-btn { background: rgba(255,255,255,0.8); backdrop-filter: blur(5px); border: 1px solid transparent; border-radius: 99px; padding: 10px 20px; font-size: 14px; color: #333; cursor: pointer; transition: 0.3s; font-weight: bold; text-transform: uppercase; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .cat-btn.active, .cat-btn:hover { background: #001a33; color: #fff; border-color: #001a33; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee-container { overflow: hidden; background: transparent; padding: 40px 0; margin-top: 40px; position: relative; z-index: 2; border-top: 1px solid rgba(212, 175, 55, 0.3); border-bottom: 1px solid rgba(212, 175, 55, 0.3); }
        .marquee-content { display: inline-flex; white-space: nowrap; animation: marquee 20s linear infinite; }
        .marquee-text { font-size: clamp(40px, 8vw, 80px); font-weight: 900; letter-spacing: 2px; color: transparent; -webkit-text-stroke: 1.5px #d4af37; text-shadow: 0 0 15px rgba(212, 175, 55, 0.8), 0 0 30px rgba(212, 175, 55, 0.4); margin: 0 20px; }
        .section-header { text-align: center; margin: 60px 0 40px; position: relative; z-index: 2; }
        .section-header h2 { font-size: 40px; font-weight: 900; color: #fff; text-transform: uppercase; text-shadow: 0 2px 10px rgba(0,0,0,0.5); }
        .section-header p { font-size: 16px; color: #f0f0f0; margin-top: 10px; text-shadow: 0 1px 5px rgba(0,0,0,0.5); font-weight: bold; }
        .footer-banner { position: relative; background-image: url('/Panner 2 (1).jpg'); background-size: cover; background-position: center 30%; color: #fff; margin-top: 80px; z-index: 2; box-shadow: 0 -10px 30px rgba(0,0,0,0.5); }
        .footer-gradient { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 100%); }
        .footer-content { position: relative; z-index: 2; padding: 80px 40px 40px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; }
        .footer-col h4 { font-size: 18px; color: #d4af37; margin-bottom: 20px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
        .footer-col p, .footer-col a { font-size: 14px; color: #ccc; display: block; margin-bottom: 12px; text-decoration: none; cursor: pointer; transition: 0.3s; }
        .footer-col a:hover { color: #d4af37; padding-left: 5px; }

        /* ✨ Toast Notification Animation ✨ */
        .toast-notification {
          position: fixed;
          bottom: 80px;
          right: 20px;
          background: #001a33;
          color: #d4af37;
          padding: 15px 25px;
          border-radius: 8px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          z-index: 10000;
          font-weight: bold;
          border-left: 4px solid #d4af37;
          animation: slideIn 0.3s ease forwards, fadeOut 0.3s ease 2.7s forwards;
        }
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes fadeOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }

        @media (max-width: 768px) {
          .top-bar { flex-direction: column; text-align: center; gap: 5px; }
          .nav-main { flex-direction: column; padding: 15px; gap: 15px; }
          .nav-links { gap: 15px; flex-wrap: wrap; justify-content: center; }
          .products-grid { grid-template-columns: 1fr 1fr; padding: 0 15px 40px; gap: 15px; }
          .large-products-grid { grid-template-columns: 1fr; padding: 0 15px 40px; }
          .product-img-box { height: 200px; }
          .large-product-img-box { height: 350px !important; }
        }
      `,
        }}
      />

      <div className="cloud-background"></div>

      {/* --- TOAST NOTIFICATION --- */}
      {toastMessage && (
        <div className="toast-notification">
          ✓ {toastMessage}
        </div>
      )}

      {/* NAVBAR */}
      {currentView === "home" ? (
        <div className="hero-banner">
          <div className="hero-gradient"></div>
          <div className="top-bar">
            <div>English ⌄ &nbsp;&nbsp; EGP ⌄ &nbsp;&nbsp; Call Us: 01124419012</div>
            <div>Free delivery on orders over <span className="text-gold" style={{ fontWeight: "bold" }}>EGP 1000</span></div>
          </div>
          <nav className="nav-main">
            <h1 onClick={() => navigateToView("home")} style={{ fontSize: "32px", fontWeight: 900, cursor: "pointer", color: "#fff", letterSpacing: "2px" }}>APOLLO<span className="text-gold">.</span></h1>
            <div className="nav-links" style={{ display: "flex", gap: "40px" }}>
              <span className={`nav-link ${activeClass("home")}`} onClick={() => navigateToView("home")}>Home</span>
              <span className={`nav-link ${activeClass("shop")}`} onClick={() => navigateToView("shop")}>Shop</span>
              <span className={`nav-link ${activeClass("contact")}`} onClick={() => navigateToView("contact")}>Contact Us</span>
            </div>
            <div style={{ display: "flex", gap: "25px", alignItems: "center", color: "#fff", cursor: "pointer" }}>
              <div onClick={() => navigateToView("checkout")} style={{ position: "relative", display: "flex", alignItems: "center", gap: "8px", fontWeight: "bold" }}>
                <span style={{ fontSize: "20px" }}>🛒</span> CART
                <span style={{ position: "absolute", top: "-10px", right: "-15px", background: "#d4af37", color: "#000", fontSize: "11px", width: "20px", height: "20px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "900" }}>{cart.length}</span>
              </div>
            </div>
          </nav>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", zIndex: 10, width: "100%" }}>
            <h2 style={{ fontSize: "clamp(30px, 5vw, 60px)", color: "#fff", fontWeight: 900, textTransform: "uppercase", letterSpacing: "4px", textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}>Divine <span className="text-gold">Aesthetics</span></h2>
          </div>
        </div>
      ) : (
        <>
          <div className="top-bar" style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(10px)" }}>
            <div>English ⌄ &nbsp;&nbsp; EGP ⌄ &nbsp;&nbsp; Call Us: 01124419012</div>
            <div>Free delivery on orders over <span className="text-gold" style={{ fontWeight: "bold" }}>EGP 1000</span></div>
          </div>
          <nav className="nav-main" style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(0,0,0,0.1)", position: "sticky", top: 0 }}>
            <h1 onClick={() => navigateToView("home")} style={{ fontSize: "32px", fontWeight: 900, cursor: "pointer", color: "#001a33", letterSpacing: "2px" }}>APOLLO<span className="text-gold">.</span></h1>
            <div className="nav-links" style={{ display: "flex", gap: "40px" }}>
              <span className={`nav-link ${activeClass("home")}`} style={{ color: "#333" }} onClick={() => navigateToView("home")}>Home</span>
              <span className={`nav-link ${activeClass("shop")}`} style={{ color: "#333" }} onClick={() => navigateToView("shop")}>Shop</span>
              <span className={`nav-link ${activeClass("contact")}`} style={{ color: "#333" }} onClick={() => navigateToView("contact")}>Contact Us</span>
            </div>
            <div style={{ display: "flex", gap: "25px", alignItems: "center", color: "#001a33", cursor: "pointer" }}>
              <div onClick={() => navigateToView("checkout")} style={{ position: "relative", display: "flex", alignItems: "center", gap: "8px", fontWeight: "bold" }}>
                <span style={{ fontSize: "20px" }}>🛒</span> CART
                <span style={{ position: "absolute", top: "-10px", right: "-15px", background: "#001a33", color: "#fff", fontSize: "11px", width: "20px", height: "20px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "900" }}>{cart.length}</span>
              </div>
            </div>
          </nav>
        </>
      )}

      {/* --- HOME VIEW --- */}
      {currentView === "home" && (
        <div className="fade-in">
          <div className="section-header"><h2>Top <span className="text-gold">Sellers</span></h2><p>Our most exclusive and demanding luxury pieces.</p></div>
          <div className="large-products-grid">
            {topSellingProducts.slice(0, 3).map((product) => (
              <div key={product.id} className="product-card" onClick={() => handleProductClick(product)}>
                <div className="product-img-box large-product-img-box">
                  <span className="badge">Hot</span><img src={product.image} alt={product.name} />
                  <div className="add-to-cart-overlay" onClick={(e) => { e.stopPropagation(); addToCart(product); }}>Add To Cart</div>
                </div>
                <h3 className="product-title">{product.name}</h3><p className="product-price">EGP {product.price}</p>
              </div>
            ))}
          </div>
          <div className="products-grid">
            {topSellingProducts.slice(3, 11).map((product) => (
              <div key={product.id} className="product-card" onClick={() => handleProductClick(product)}>
                <div className="product-img-box">
                  <img src={product.image} alt={product.name} />
                  <div className="add-to-cart-overlay" onClick={(e) => { e.stopPropagation(); addToCart(product); }}>Add To Cart</div>
                </div>
                <h3 className="product-title">{product.name}</h3><p className="product-price">EGP {product.price}</p>
              </div>
            ))}
          </div>
          <div className="marquee-container">
            <div className="marquee-content">
              <span className="marquee-text">APOLLO LUXURY • SHINE LIKE GOLD •</span>
              <span className="marquee-text">APOLLO LUXURY • SHINE LIKE GOLD •</span>
            </div>
          </div>
        </div>
      )}

      {/* --- SHOP VIEW --- */}
      {currentView === "shop" && (
        <div className="fade-in">
          <div className="section-header"><h2 style={{ color: "#fff", textShadow: "0 0 20px rgba(0,0,0,0.8)" }}>Our <span className="text-gold">Collection</span></h2><p style={{ color: "#f0f0f0", textShadow: "0 0 10px rgba(0,0,0,0.8)" }}>Browse through {products.length} exclusive items.</p></div>
          <div className="cat-filter">
            {ALL_CATEGORIES.map((cat) => (
              <button key={cat} className={`cat-btn ${selectedCategory === cat ? "active" : ""}`} onClick={() => setSelectedCategory(cat)}>{cat}</button>
            ))}
          </div>
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card" onClick={() => handleProductClick(product)}>
                <div className="product-img-box">
                  <img src={product.image} alt={product.name} />
                  <div className="add-to-cart-overlay" onClick={(e) => { e.stopPropagation(); addToCart(product); }}>Add To Cart</div>
                </div>
                <h3 className="product-title">{product.name}</h3><p className="product-price">EGP {product.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- PRODUCT DETAILS VIEW --- */}
      {currentView === "product" && selectedProduct && (
        <div className="fade-in" style={{ padding: "60px 40px", maxWidth: "1200px", margin: "0 auto", minHeight: "60vh", position: "relative", zIndex: 2 }}>
           <button onClick={() => navigateToView("shop")} style={{ background: "transparent", border: "none", color: "#fff", fontSize: "16px", fontWeight: "bold", cursor: "pointer", marginBottom: "20px", textShadow: "0 2px 5px rgba(0,0,0,0.5)" }}>
             ← BACK TO SHOP
           </button>
           
           <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", background: "rgba(255,255,255,0.95)", padding: "40px", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}>
              {/* Product Image */}
              <div style={{ flex: "1 1 400px", background: "#fff", borderRadius: "12px", border: "1px solid #eaeaea", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
                 <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: "100%", maxHeight: "500px", objectFit: "contain", mixBlendMode: "multiply" }} />
              </div>
              
              {/* Product Info */}
              <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                 <h2 style={{ fontSize: "36px", color: "#001a33", textTransform: "uppercase", marginBottom: "10px", fontWeight: 900 }}>{selectedProduct.name}</h2>
                 <p style={{ fontSize: "28px", fontWeight: "900", color: "#d4af37", marginBottom: "20px" }}>EGP {selectedProduct.price}</p>
                 
                 {/* Stock Status */}
                 <p style={{ marginBottom: "20px", fontSize: "14px", fontWeight: "bold", color: selectedProduct.inStock === false ? "#ff4444" : "#25D366" }}>
                   {selectedProduct.inStock === false ? "❌ OUT OF STOCK" : "✓ IN STOCK AND READY TO SHIP"}
                 </p>

                 <p style={{ color: "#555", lineHeight: "1.8", marginBottom: "30px", fontSize: "15px" }}>
                   {selectedProduct.description || "Experience the pinnacle of modern luxury. This exclusive piece from our collection is crafted with meticulous attention to detail, designed to elevate your aesthetic and make a bold statement."}
                 </p>

                 {/* Quantity Selector */}
                 <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "30px" }}>
                   <span style={{ fontWeight: "bold", color: "#001a33", textTransform: "uppercase" }}>Quantity:</span>
                   <div style={{ display: "flex", border: "2px solid #eaeaea", borderRadius: "8px", overflow: "hidden" }}>
                      <button onClick={() => setProductQuantity(Math.max(1, productQuantity - 1))} style={{ padding: "10px 15px", background: "#f8f9fa", border: "none", cursor: "pointer", fontSize: "16px", fontWeight: "bold" }}>-</button>
                      <div style={{ padding: "10px 20px", background: "#fff", borderLeft: "2px solid #eaeaea", borderRight: "2px solid #eaeaea", fontWeight: "bold", display: "flex", alignItems: "center" }}>{productQuantity}</div>
                      <button onClick={() => setProductQuantity(productQuantity + 1)} style={{ padding: "10px 15px", background: "#f8f9fa", border: "none", cursor: "pointer", fontSize: "16px", fontWeight: "bold" }}>+</button>
                   </div>
                 </div>

                 {/* Actions */}
                 <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                   <button 
                     disabled={selectedProduct.inStock === false}
                     onClick={() => addToCart(selectedProduct, productQuantity)}
                     style={{ flex: 1, minWidth: "200px", background: selectedProduct.inStock === false ? "#ccc" : "#001a33", color: "#fff", border: "none", padding: "18px", borderRadius: "99px", fontWeight: "bold", cursor: selectedProduct.inStock === false ? "not-allowed" : "pointer", textTransform: "uppercase", letterSpacing: "1px" }}>
                     ADD TO CART
                   </button>
                   <button 
                     disabled={selectedProduct.inStock === false}
                     onClick={() => { addToCart(selectedProduct, productQuantity); navigateToView("checkout"); }}
                     style={{ flex: 1, minWidth: "200px", background: selectedProduct.inStock === false ? "#ccc" : "#d4af37", color: "#fff", border: "none", padding: "18px", borderRadius: "99px", fontWeight: "bold", cursor: selectedProduct.inStock === false ? "not-allowed" : "pointer", textTransform: "uppercase", letterSpacing: "1px" }}>
                     BUY NOW
                   </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* --- CONTACT US VIEW --- */}
      {currentView === "contact" && (
        <div className="fade-in" style={{ padding: "80px 40px", textAlign: "center", minHeight: "50vh", position: "relative", zIndex: 2 }}>
          <h2 style={{ fontSize: "50px", fontWeight: 900, textTransform: "uppercase", marginBottom: "30px", color: "#fff", textShadow: "0 0 20px rgba(0,0,0,0.8)" }}>Contact <span className="text-gold">Us</span></h2>
          <div style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(10px)", padding: "40px", borderRadius: "12px", maxWidth: "600px", margin: "0 auto", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
            <p style={{ fontSize: "16px", color: "#333", lineHeight: "1.8", fontWeight: "bold", marginBottom: "20px" }}>We're here to help! Reach out to us for any inquiries about your luxury items.</p>
            <div style={{ background: "#f8f9fa", padding: "20px", borderRadius: "8px", border: "1px solid #eaeaea", textAlign: "left" }}>
              <p style={{ fontSize: "18px", color: "#001a33", fontWeight: "bold", marginBottom: "10px" }}>📞 Phone / WhatsApp:</p>
              <p style={{ fontSize: "16px", color: "#d4af37", fontWeight: "900", marginBottom: "20px" }}>01124419012</p>
              
              <p style={{ fontSize: "18px", color: "#001a33", fontWeight: "bold", marginBottom: "10px" }}>✉️ Email:</p>
              <p style={{ fontSize: "16px", color: "#d4af37", fontWeight: "900" }}>itsmahmoudmagdy@gmail.com</p>
            </div>
          </div>
        </div>
      )}

      {/* --- POLICY VIEWS (SHIPPING, RETURNS, TRACKING) --- */}
      {currentView === "shipping" && (
        <div className="fade-in" style={{ padding: "80px 40px", minHeight: "50vh", position: "relative", zIndex: 2 }}>
          <h2 style={{ fontSize: "50px", fontWeight: 900, textTransform: "uppercase", marginBottom: "30px", color: "#fff", textShadow: "0 0 20px rgba(0,0,0,0.8)", textAlign: "center" }}>Shipping <span className="text-gold">Policy</span></h2>
          <div style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(10px)", padding: "40px", borderRadius: "12px", maxWidth: "800px", margin: "0 auto", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", lineHeight: "1.8" }}>
            <h3 style={{ color: "#001a33", marginBottom: "10px" }}>Delivery Times & Rates</h3>
            <p style={{ color: "#444", marginBottom: "20px", fontWeight: "bold" }}>
              • Orders over EGP 1000: <span className="text-gold">FREE Standard Shipping</span><br />
              • Cairo & Giza: EGP 50 (2 to 3 Business Days)<br />
              • Other Governorates: EGP 60 (2 to 3 Business Days)<br />
              • Express Shipping: Add EGP 20 (1 to 2 Business Days)
            </p>
            <h3 style={{ color: "#001a33", marginBottom: "10px" }}>Order Processing</h3>
            <p style={{ color: "#444", fontWeight: "bold" }}>Orders are processed within 24 hours of placement. You will receive a tracking link via SMS/Email once your order is dispatched.</p>
          </div>
        </div>
      )}

      {currentView === "returns" && (
        <div className="fade-in" style={{ padding: "80px 40px", minHeight: "50vh", position: "relative", zIndex: 2 }}>
          <h2 style={{ fontSize: "50px", fontWeight: 900, textTransform: "uppercase", marginBottom: "30px", color: "#fff", textShadow: "0 0 20px rgba(0,0,0,0.8)", textAlign: "center" }}>Returns <span className="text-gold">& Refunds</span></h2>
          <div style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(10px)", padding: "40px", borderRadius: "12px", maxWidth: "800px", margin: "0 auto", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", lineHeight: "1.8" }}>
            <h3 style={{ color: "#001a33", marginBottom: "10px" }}>14-Day Return Policy</h3>
            <p style={{ color: "#444", marginBottom: "20px", fontWeight: "bold" }}>You have 14 days after receiving your item to request a return or exchange. The item must be in its original condition, unworn, with tags and original packaging.</p>
            <h3 style={{ color: "#001a33", marginBottom: "10px" }}>Refund Process</h3>
            <p style={{ color: "#444", fontWeight: "bold" }}>Once we receive and inspect your return, we will notify you. Approved refunds are automatically processed to your original payment method within 5-7 business days.</p>
          </div>
        </div>
      )}

      {currentView === "tracking" && (
        <div className="fade-in" style={{ padding: "80px 40px", textAlign: "center", minHeight: "50vh", position: "relative", zIndex: 2 }}>
          <h2 style={{ fontSize: "50px", fontWeight: 900, textTransform: "uppercase", marginBottom: "30px", color: "#fff", textShadow: "0 0 20px rgba(0,0,0,0.8)" }}>Order <span className="text-gold">Tracking</span></h2>
          <div style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(10px)", padding: "40px", borderRadius: "12px", maxWidth: "600px", margin: "0 auto", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
            <p style={{ marginBottom: "20px", fontWeight: "bold", color: "#001a33" }}>Enter your Order ID to track your shipment</p>
            <input type="text" placeholder="e.g. APOLLO-12345" className="form-input" />
            <button onClick={() => alert("Tracking System: Your order is out for delivery and will arrive soon!")} style={{ background: "#d4af37", color: "#fff", border: "none", padding: "15px 40px", borderRadius: "99px", fontWeight: "bold", cursor: "pointer", textTransform: "uppercase", letterSpacing: "1px", width: "100%" }}>TRACK ORDER</button>
          </div>
        </div>
      )}

      {/* --- CHECKOUT (MULTI-STEP) VIEW --- */}
      {currentView === "checkout" && (
        <div className="fade-in" style={{ padding: "60px 20px", maxWidth: "900px", margin: "0 auto", minHeight: "60vh", position: "relative", zIndex: 2 }}>
          
          {checkoutStep !== "success" && (
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px", background: "rgba(255,255,255,0.9)", padding: "15px 30px", borderRadius: "99px" }}>
              <span style={{ fontWeight: "bold", color: checkoutStep === "cart" ? "#d4af37" : "#333" }}>1. Cart</span>
              <span style={{ fontWeight: "bold", color: checkoutStep === "shipping" ? "#d4af37" : "#333" }}>2. Shipping</span>
              <span style={{ fontWeight: "bold", color: checkoutStep === "payment_demo" ? "#d4af37" : "#333" }}>3. Payment</span>
            </div>
          )}

          {/* STEP 1: CART */}
          {checkoutStep === "cart" && (
            <>
              {cart.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 0", background: "rgba(255,255,255,0.85)", borderRadius: "12px" }}>
                  <p style={{ fontSize: "20px", color: "#001a33", marginBottom: "20px", fontWeight: "bold" }}>Your cart is empty.</p>
                  <button onClick={() => navigateToView("shop")} style={{ background: "#d4af37", color: "#fff", border: "none", padding: "15px 40px", borderRadius: "99px", fontWeight: "bold", cursor: "pointer" }}>RETURN TO SHOP</button>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
                  <div style={{ background: "rgba(255,255,255,0.9)", borderRadius: "12px", padding: "30px" }}>
                    {cart.map((item, index) => (
                      <div key={index} style={{ display: "flex", alignItems: "center", borderBottom: "1px solid rgba(0,0,0,0.1)", paddingBottom: "20px", marginBottom: "20px" }}>
                        <div style={{ background: "#fff", width: "80px", height: "80px", display: "flex", justifyContent: "center", alignItems: "center", marginRight: "20px", borderRadius: "8px" }}><img src={item.image} style={{ width: "80%", height: "80%", objectFit: "contain", mixBlendMode: "multiply" }} alt={item.name} /></div>
                        <div style={{ flex: 1 }}><p style={{ fontWeight: "800", color: "#001a33" }}>{item.name}</p><p className="text-gold" style={{ fontWeight: "900" }}>EGP {item.price}</p></div>
                        <button onClick={() => removeFromCart(index)} style={{ background: "transparent", color: "#ff4444", border: "none", cursor: "pointer", fontWeight: "bold", textDecoration: "underline" }}>Remove</button>
                      </div>
                    ))}
                  </div>
                  <div style={{ textAlign: "right", background: "rgba(255,255,255,0.95)", padding: "40px", borderRadius: "12px" }}>
                    <p style={{ fontSize: "24px", fontWeight: "900", color: "#001a33", marginBottom: "20px" }}>Subtotal: <span className="text-gold">EGP {cartTotal}</span></p>
                    <button onClick={() => setCheckoutStep("shipping")} style={{ background: "#001a33", color: "#fff", border: "none", padding: "18px 50px", borderRadius: "99px", fontSize: "16px", fontWeight: "900", cursor: "pointer" }}>PROCEED TO SHIPPING</button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* STEP 2: SHIPPING */}
          {checkoutStep === "shipping" && (
            <div style={{ background: "rgba(255,255,255,0.95)", padding: "40px", borderRadius: "12px" }}>
              <h3 style={{ color: "#001a33", marginBottom: "20px" }}>Shipping Details</h3>
              <input type="text" placeholder="Full Name" className="form-input" />
              <input type="text" placeholder="Phone Number" className="form-input" />
              <input type="text" placeholder="Street Address & Details" className="form-input" />
              
              <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
                <select className="form-input" style={{ flex: 1, marginBottom: 0 }} onChange={(e) => setShippingZone(e.target.value)} value={shippingZone}>
                  <option value="cairo">Cairo & Giza</option>
                  <option value="governorate">Other Governorates</option>
                </select>
                <select className="form-input" style={{ flex: 1, marginBottom: 0 }} onChange={(e) => setShippingType(e.target.value)} value={shippingType}>
                  <option value="standard">Standard (2-3 Days)</option>
                  <option value="express">Express (+EGP 20, 1-2 Days)</option>
                </select>
              </div>

              <div style={{ borderTop: "2px solid #eaeaea", marginTop: "20px", paddingTop: "20px", textAlign: "right" }}>
                <p style={{ fontSize: "16px", color: "#333", marginBottom: "5px" }}>Subtotal: EGP {cartTotal}</p>
                <p style={{ fontSize: "16px", color: "#333", marginBottom: "5px" }}>
                  Shipping: {isFreeShipping && shippingType === "standard" ? <span style={{ color: "#25D366", fontWeight: "bold" }}>FREE</span> : `EGP ${shippingFee}`}
                </p>
                {isFreeShipping && <p style={{ fontSize: "12px", color: "#d4af37", fontWeight: "bold", marginBottom: "10px" }}>You qualified for Free Standard Shipping!</p>}
                
                <p style={{ fontSize: "28px", fontWeight: "900", color: "#001a33", marginBottom: "20px", marginTop: "10px" }}>Total: <span className="text-gold">EGP {cartTotal + shippingFee}</span></p>
                
                <button onClick={() => setCheckoutStep("cart")} style={{ background: "transparent", color: "#333", border: "none", marginRight: "20px", cursor: "pointer", textDecoration: "underline", fontWeight: "bold" }}>Back to Cart</button>
                <button onClick={() => setCheckoutStep("payment_demo")} style={{ background: "#001a33", color: "#fff", border: "none", padding: "18px 50px", borderRadius: "99px", fontSize: "16px", fontWeight: "900", cursor: "pointer" }}>PROCEED TO PAYMENT</button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT OPTIONS */}
          {checkoutStep === "payment_demo" && (
            <div style={{ background: "#fff", padding: "40px", borderRadius: "12px", border: "2px solid #001a33" }}>
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <h3 style={{ color: "#001a33", fontSize: "24px", marginBottom: "10px" }}>Select Payment Method</h3>
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "30px", flexWrap: "wrap" }}>
                  {["Visa", "InstaPay", "Cash"].map((method) => (
                    <button
                      key={method}
                      onClick={() => setSelectedPayment(method)}
                      style={{
                        background: selectedPayment === method ? "#001a33" : "transparent",
                        color: selectedPayment === method ? "#fff" : "#001a33",
                        border: "2px solid #001a33", padding: "10px 25px", borderRadius: "99px",
                        cursor: "pointer", fontWeight: "bold", textTransform: "uppercase", transition: "0.3s"
                      }}
                    >
                      {method}
                    </button>
                  ))}
              </div>

              {/* Dynamic Payment UI */}
              <div style={{ maxWidth: "450px", margin: "0 auto", background: "#f8f9fa", padding: "20px", borderRadius: "8px", border: "1px solid #ddd" }}>
                
                {selectedPayment === "Visa" && (
                  <div>
                     <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "bold" }}>Card Number</label>
                     <input type="text" placeholder="4000 0000 0000 0000" className="form-input" style={{ background: "#fff" }} />
                     <div style={{ display: "flex", gap: "10px" }}>
                       <div style={{ flex: 1 }}>
                         <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "bold" }}>Expiry</label>
                         <input type="text" placeholder="MM/YY" className="form-input" style={{ background: "#fff" }} />
                       </div>
                       <div style={{ flex: 1 }}>
                         <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "bold" }}>CVV</label>
                         <input type="text" placeholder="123" className="form-input" style={{ background: "#fff" }} />
                       </div>
                     </div>
                  </div>
                )}

                {selectedPayment === "InstaPay" && (
                  <div style={{ textAlign: "center" }}>
                     <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Instapay_logo.svg/1024px-Instapay_logo.svg.png" alt="InstaPay" style={{ height: "30px", marginBottom: "15px" }} />
                     <p style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "10px" }}>Transfer exactly <span className="text-gold">EGP {grandTotal}</span> to:</p>
                     <p style={{ background: "#eee", padding: "10px", borderRadius: "8px", fontWeight: "bold", fontSize: "18px", letterSpacing: "1px", marginBottom: "20px" }}>01124419012</p>
                     <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "bold", textAlign: "left" }}>Your InstaPay Address (IPA) or Phone</label>
                     <input type="text" placeholder="name@instapay" className="form-input" style={{ background: "#fff" }} />
                  </div>
                )}

                {selectedPayment === "Cash" && (
                  <div style={{ textAlign: "center" }}>
                     <div style={{ fontSize: "40px", marginBottom: "10px" }}>💵</div>
                     <p style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "10px" }}>Cash on Delivery (COD)</p>
                     <p style={{ fontSize: "14px", color: "#666", marginBottom: "10px" }}>An additional fee of <span style={{ fontWeight: "bold" }}>EGP 5</span> is applied for COD orders.</p>
                     
                     {requiresDeposit && (
                       <div style={{ background: "#fff3cd", color: "#856404", padding: "15px", borderRadius: "8px", border: "1px solid #ffeeba", marginTop: "15px", textAlign: "left" }}>
                         <p style={{ fontWeight: "bold", marginBottom: "5px" }}>⚠️ Deposit Required</p>
                         <p style={{ fontSize: "13px" }}>Orders over EGP 1000 require a 25% deposit to confirm the order.</p>
                         <p style={{ fontSize: "14px", marginTop: "10px", fontWeight: "bold" }}>Deposit Amount: EGP {depositAmount}</p>
                         <p style={{ fontSize: "12px", marginTop: "5px" }}>(Our team will contact you on WhatsApp to collect the deposit securely).</p>
                       </div>
                     )}
                  </div>
                )}

                <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "2px solid #eaeaea", textAlign: "center" }}>
                   <p style={{ fontSize: "20px", fontWeight: "900", color: "#001a33", marginBottom: "15px" }}>Total to Pay: <span className="text-gold">EGP {grandTotal}</span></p>
                   <button 
                    onClick={() => {
                      const randomId = "APOLLO-" + Math.floor(10000 + Math.random() * 90000);
                      setDemoOrderId(randomId);
                      setCart([]);
                      setCheckoutStep("success");
                    }} 
                    style={{ width: "100%", background: "#d4af37", color: "#fff", border: "none", padding: "15px", borderRadius: "99px", fontSize: "16px", fontWeight: "bold", cursor: "pointer", textTransform: "uppercase" }}
                   >
                    CONFIRM & PAY
                   </button>
                </div>
              </div>

              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button onClick={() => setCheckoutStep("shipping")} style={{ background: "transparent", color: "#666", border: "none", cursor: "pointer", textDecoration: "underline", fontWeight: "bold" }}>Back to Shipping</button>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS & NEXT STEPS */}
          {checkoutStep === "success" && (
            <div style={{ textAlign: "center", padding: "60px 20px", background: "rgba(255,255,255,0.95)", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
              <div style={{ fontSize: "60px", color: "#25D366", marginBottom: "10px" }}>✓</div>
              <h2 style={{ color: "#001a33", marginBottom: "15px" }}>Order Placed Successfully!</h2>
              <p style={{ color: "#666", fontSize: "18px", marginBottom: "10px" }}>Your Order ID is: <strong style={{ color: "#d4af37" }}>{demoOrderId}</strong></p>
              
              <div style={{ background: "#f8f9fa", padding: "20px", borderRadius: "8px", border: "1px solid #eee", maxWidth: "500px", margin: "20px auto 30px", textAlign: "left" }}>
                 <h4 style={{ color: "#001a33", marginBottom: "10px", textAlign: "center" }}>What happens next?</h4>
                 <p style={{ color: "#444", fontSize: "14px", marginBottom: "10px" }}>1. You will receive a confirmation message shortly.</p>
                 <p style={{ color: "#444", fontSize: "14px", marginBottom: "10px" }}>2. Your order will be shipped via {shippingType === "express" ? "Express" : "Standard"} Delivery.</p>
                 <p style={{ color: "#444", fontSize: "14px" }}>3. You can track your shipment using your Order ID.</p>
              </div>

              <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
                 <button onClick={() => navigateToView("tracking")} style={{ background: "#d4af37", color: "#fff", border: "none", padding: "15px 30px", borderRadius: "99px", fontWeight: "bold", cursor: "pointer" }}>TRACK ORDER</button>
                 <button onClick={() => navigateToView("home")} style={{ background: "#001a33", color: "#fff", border: "none", padding: "15px 30px", borderRadius: "99px", fontWeight: "bold", cursor: "pointer" }}>CONTINUE SHOPPING</button>
              </div>
            </div>
          )}

          {/* WhatsApp Order Button */}
          {checkoutStep === "cart" && cart.length > 0 && (
             <div style={{ textAlign: "right", marginTop: "20px" }}>
                <p style={{ fontSize: "12px", color: "#fff", textShadow: "0 0 5px #000", marginBottom: "10px" }}>Or order directly via WhatsApp:</p>
                <button
                  onClick={() => {
                    const message = cart.map((item) => `${item.name} - EGP ${item.price}`).join("%0A");
                    window.open(`https://wa.me/201124419012?text=New Order:%0A${message}%0ATotal: EGP ${cartTotal}`, "_blank");
                  }}
                  style={{ background: "#25D366", color: "#fff", border: "none", padding: "15px 40px", borderRadius: "99px", fontSize: "16px", fontWeight: "900", cursor: "pointer", textTransform: "uppercase", boxShadow: "0 5px 15px rgba(37, 211, 102, 0.4)" }}
                >
                  ORDER VIA WHATSAPP
                </button>
             </div>
          )}

        </div>
      )}

      {/* --- FOOTER --- */}
      <footer className="footer-banner">
        <div className="footer-gradient"></div>
        <div className="footer-content">
          <div className="footer-col">
            <h1 style={{ fontSize: "32px", fontWeight: 900, color: "#fff", marginBottom: "15px", letterSpacing: "2px" }}>
              APOLLO<span className="text-gold">.</span>
            </h1>
            <p style={{ color: "#aaa" }}>
              The ultimate destination for modern luxury aesthetics and premium accessories.
            </p>
          </div>
          <div className="footer-col">
            <h4>ABOUT US</h4>
            <a onClick={() => navigateToView("about")}>Our Story</a>
            <a onClick={() => navigateToView("contact")}>Contact Us</a>
          </div>
          <div className="footer-col">
            <h4>CUSTOMER CARE</h4>
            <a onClick={() => navigateToView("shipping")}>Shipping Policy</a>
            <a onClick={() => navigateToView("returns")}>Returns &amp; Refunds</a>
            <a onClick={() => navigateToView("tracking")}>Track Order</a>
          </div>
          <div className="footer-col">
            <h4>FOLLOW US</h4>
            <a>Instagram</a>
            <a>TikTok</a>
            <a>Facebook</a>
          </div>
        </div>
        <div
          style={{
            position: "relative", zIndex: 2, textAlign: "center", padding: "20px",
            borderTop: "1px solid rgba(255,255,255,0.1)", color: "#888", fontSize: "12px", marginTop: "20px",
          }}
        >
          © 2026 APOLLO. ALL RIGHTS RESERVED.
        </div>
      </footer>

      {/* --- FLOATING WHATSAPP BUTTON --- */}
      <a
        href="https://wa.me/201124419012"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed", bottom: "20px", right: "20px", background: "#25D366", color: "white",
          padding: "15px 20px", borderRadius: "999px", textDecoration: "none", fontWeight: "bold",
          zIndex: 9999, boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
        }}
      >
        WhatsApp
      </a>
    </main>
  );
}