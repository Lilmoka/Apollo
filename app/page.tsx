"use client";

import { useMemo, useState, useEffect } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const products: Product[] = [
  { id: 1, name: "RM Watch", price: 800, image: "/watch.jpg" },
  { id: 2, name: "Premium Wallet", price: 500, image: "/wallet.jpg" },
  { id: 3, name: "Fashion Belt", price: 400, image: "/belt.jpg" },
  { id: 4, name: "Sunglasses", price: 300, image: "/sunglasses.jpg" },
  { id: 5, name: "Gold Ring", price: 200, image: "/ring.jpg" },
  { id: 6, name: "Bracelet", price: 500, image: "/braclet.jpg" },
  { id: 7, name: "Chain", price: 300, image: "/chain.jpg" },
  { id: 8, name: "Gold Chain", price: 300, image: "/gold_chain.jpg" },
  { id: 9, name: "Iced Bracelet", price: 200, image: "/iced_bracelet.jpg" }
];

export default function Home() {
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedPayment, setSelectedPayment] = useState("Visa");
  const [dropIndex, setDropIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDropIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

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

  return (
    <main
      className="bg-texture"
      style={{
        backgroundColor: "#121212",
        color: "#e0e0e0",
        minHeight: "100vh",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        /* سطر الأمان لمنع أي تداخل في المساحات */
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; width: 100%; scroll-behavior: smooth; }
        
        .bg-texture {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
        }
        
        /* Animations */
        .hover-card { transition: all 0.4s ease; }
        .hover-card:hover { border-color: #666 !important; transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .hover-img { transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        .hover-card:hover .hover-img { transform: scale(1.05); }
        .btn-luxury { transition: all 0.3s ease; }
        .btn-luxury:hover { background-color: #333 !important; color: #fff !important; }
        .btn-primary:hover { background-color: #d4af37 !important; color: #000 !important; }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-content { display: inline-flex; white-space: nowrap; animation: marquee 20s linear infinite; }
        
        @keyframes imageFade { from { opacity: 0.6; filter: blur(2px); } to { opacity: 1; filter: blur(0); } }
        .animate-img { animation: imageFade 0.6s ease-out forwards; }
        
        .nav-link { position: relative; color: #ccc; text-decoration: none; transition: color 0.3s; }
        .nav-link:hover { color: #fff; }

        /* --- DESKTOP LAYOUT --- */
        .navbar-container { display: flex; justify-content: space-between; align-items: center; padding: 15px 40px; }
        .nav-desktop-links { display: flex; gap: 35px; align-items: center; font-weight: 600; font-size: 13px; letter-spacing: 1.5px; }
        .hero-section { display: grid; grid-template-columns: 1fr 1.2fr 0.8fr; gap: 18px; padding: 24px; }
        .hero-box { min-height: 720px; padding: 40px; }
        .hero-image-box { min-height: 720px; }
        .hero-right-col { display: grid; grid-template-rows: 1fr 1fr; gap: 18px; }
        .main-title { font-size: 90px; line-height: 0.9; }
        .shop-padding { padding: 60px 40px; }
        .products-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; }
        .product-img-wrap { height: 400px; }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding: 40px; }

        /* --- MOBILE APP LAYOUT (الأهم هنا) --- */
        @media (max-width: 768px) {
          .navbar-container { padding: 12px 16px; }
          .nav-desktop-links a { display: none; } /* إخفاء الروابط النصية ليكون مثل التطبيقات */
          .nav-desktop-links { gap: 10px; }
          .logo-text { font-size: 24px !important; }
          .logo-img { height: 30px !important; }
          
          .hero-section { display: flex; flex-direction: column; gap: 12px; padding: 12px; }
          .hero-box { min-height: auto; padding: 25px 20px; }
          .main-title { font-size: 50px !important; line-height: 1; margin-bottom: 15px !important; }
          .hero-image-box { height: 400px; min-height: auto; }
          .hero-right-col { display: flex; flex-direction: column; gap: 12px; }
          .slider-box { height: 350px; }
          
          .shop-padding { padding: 40px 16px; }
          .shop-header { flex-direction: column; align-items: flex-start !important; gap: 10px; }
          .shop-header h2 { font-size: 45px !important; }
          .shop-header p { text-align: left !important; font-size: 14px !important; }
          
          /* عرض منتجين جمب بعض زي تطبيقات التسوق */
          .products-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
          .product-card { padding: 12px !important; }
          .product-img-wrap { height: 200px; }
          .product-title { font-size: 15px !important; margin-bottom: 5px !important; }
          .product-price { font-size: 14px !important; margin-bottom: 15px !important; }
          .btn-add-cart { padding: 10px !important; font-size: 12px !important; }

          .about-grid { display: flex; flex-direction: column; padding: 16px; gap: 12px; }
          .about-title { font-size: 50px !important; }
          
          .checkout-container { padding: 20px 16px !important; }
          .checkout-item { flex-direction: column; align-items: flex-start !important; gap: 15px; }
          .checkout-item button { width: 100%; }
          .payment-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}} />

      {/* NAVBAR */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: "rgba(18, 18, 18, 0.95)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid #2a2a2a",
        }}
      >
        <div className="navbar-container">
          {/* LOGO */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img src="/logo.jpg" alt="Apollo" className="logo-img" style={{ height: "40px", borderRadius: "4px" }} />
            <h1 className="logo-text" style={{ fontSize: "32px", fontWeight: 900, letterSpacing: "2px", color: "#fff" }}>
              APOLLO
            </h1>
          </div>

          <div className="nav-desktop-links">
            <a href="#shop" className="nav-link">SHOP</a>
            <a href="#collection" className="nav-link">COLLECTION</a>
            <a href="#checkout" className="nav-link">CHECKOUT</a>

            <button
              className="btn-primary"
              style={{
                background: "#fff",
                color: "#000",
                border: "none",
                padding: "10px 18px",
                cursor: "pointer",
                fontWeight: 900,
                borderRadius: "999px",
                fontSize: "13px",
              }}
            >
              CART ({cart.length})
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="collection" style={{ borderBottom: "1px solid #2a2a2a" }}>
        <div className="hero-section">
          {/* LEFT */}
          <div
            className="hero-box"
            style={{
              border: "1px solid #2a2a2a",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              background: "#161616",
            }}
          >
            <div>
              <p style={{ fontSize: "11px", marginBottom: "15px", letterSpacing: "3px", fontWeight: 700, color: "#888" }}>
                PREMIUM MEN ACCESSORIES
              </p>
              <h2 className="main-title" style={{ fontWeight: 900, color: "#fff", textTransform: "uppercase", marginBottom: "30px" }}>
                Built<br />To<br />Stand<br />Out
              </h2>
              <p style={{ fontSize: "15px", lineHeight: "1.6", color: "#999", maxWidth: "400px" }}>
                Minimal luxury pieces inspired by modern streetwear culture, brutalist design and timeless aesthetics.
              </p>
            </div>
            <button
              className="btn-luxury"
              style={{
                marginTop: "30px", padding: "18px", background: "#fff", color: "#000", border: "none",
                fontWeight: 900, cursor: "pointer", fontSize: "13px", letterSpacing: "2px", width: "100%"
              }}
            >
              EXPLORE
            </button>
          </div>

          {/* CENTER IMAGE */}
          <div className="hover-card hero-image-box" style={{ border: "1px solid #2a2a2a", overflow: "hidden", position: "relative" }}>
            <img src="/watch.jpg" className="hover-img" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{
              position: "absolute", bottom: "15px", left: "15px", background: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(5px)", padding: "8px 15px", color: "#fff", fontSize: "11px", letterSpacing: "1px"
            }}>
              SIGNATURE RM
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="hero-right-col">
            {/* NEW DROP */}
            <div className="hover-card slider-box" style={{ border: "1px solid #2a2a2a", background: "#161616", display: "flex", flexDirection: "column" }}>
              <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
                <img key={dropIndex} src={products[dropIndex].image} className="hover-img animate-img" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "20px", background: "#161616" }}>
                <p style={{ fontSize: "11px", letterSpacing: "2px", color: "#888", marginBottom: "10px" }}>
                  NEW DROP <br/><span style={{ color: "#fff", fontSize: "14px", fontWeight: "bold", display: "block", marginTop: "4px" }}>{products[dropIndex].name}</span>
                </p>
              </div>
            </div>

            <div style={{ border: "1px solid #2a2a2a", padding: "30px", background: "#161616", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: "11px", letterSpacing: "3px", marginBottom: "10px", color: "#888" }}>APOLLO® 2026</p>
                <h3 style={{ fontSize: "32px", lineHeight: "1.2", fontWeight: 900, color: "#fff" }}>ELEVATED<br />DETAILS</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section style={{ overflow: "hidden", borderBottom: "1px solid #2a2a2a", background: "#0a0a0a", padding: "15px 0" }}>
        <div className="marquee-content">
          <h1 style={{ fontSize: "80px", fontWeight: 900, letterSpacing: "-1px", color: "transparent", WebkitTextStroke: "1px #333", margin: "0 20px" }}>
            APOLLO ACCESSORIES • LUXURY REDEFINED • APOLLO ACCESSORIES • LUXURY REDEFINED • 
          </h1>
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="shop-padding">
        <div className="shop-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "30px" }}>
          <h2 style={{ fontSize: "80px", fontWeight: 900, color: "#fff", lineHeight: "1" }}>SHOP</h2>
          <p style={{ maxWidth: "350px", lineHeight: "1.6", color: "#999", textAlign: "right", fontSize: "15px" }}>
            Curated accessories inspired by luxury fashion and modern aesthetics.
          </p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="hover-card" style={{ border: "1px solid #2a2a2a", background: "#161616", overflow: "hidden" }}>
              <div className="product-img-wrap" style={{ overflow: "hidden" }}>
                <img src={product.image} className="hover-img" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div className="product-card" style={{ padding: "20px" }}>
                <h3 className="product-title" style={{ fontSize: "22px", marginBottom: "8px", fontWeight: 800, color: "#fff" }}>
                  {product.name}
                </h3>
                <p className="product-price" style={{ marginBottom: "20px", fontSize: "16px", color: "#aaa", fontWeight: 600 }}>
                  EGP {product.price}
                </p>
                <button
                  onClick={() => addToCart(product)}
                  className="btn-luxury btn-add-cart"
                  style={{ width: "100%", padding: "14px", background: "#fff", color: "#000", border: "none", cursor: "pointer", fontWeight: 900, letterSpacing: "1px" }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ borderTop: "1px solid #2a2a2a", borderBottom: "1px solid #2a2a2a", background: "#0d0d0d" }}>
        <div className="about-grid">
          <div style={{ border: "1px solid #2a2a2a", padding: "40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ marginBottom: "15px", letterSpacing: "3px", fontSize: "11px", color: "#888" }}>ABOUT APOLLO</p>
            <h2 className="about-title" style={{ fontSize: "70px", lineHeight: "1", marginBottom: "20px", fontWeight: 900, color: "#fff" }}>
              MODERN<br />LUXURY
            </h2>
            <p style={{ fontSize: "16px", lineHeight: "1.8", color: "#aaa" }}>
              Premium accessories with bold aesthetics, architectural minimalism and luxury inspiration for modern men.
            </p>
          </div>
          <div className="hover-card" style={{ border: "1px solid #2a2a2a", overflow: "hidden", minHeight: "400px" }}>
            <img src="/wallet.jpg" className="hover-img" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </section>

      {/* CHECKOUT */}
      <section id="checkout" className="shop-padding">
        <div className="checkout-container" style={{ border: "1px solid #2a2a2a", background: "#161616", padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "40px", fontWeight: 900, marginBottom: "30px", color: "#fff" }}>CHECKOUT</h2>

          {cart.length === 0 ? (
            <p style={{ color: "#777", fontSize: "16px", padding: "20px 0", borderTop: "1px solid #333" }}>Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item, index) => (
                <div key={index} className="checkout-item" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #333", background: "#1a1a1a", padding: "15px", marginBottom: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                     <img src={item.image} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }} />
                    <div>
                      <h3 style={{ marginBottom: "5px", fontWeight: 800, fontSize: "16px", color: "#fff" }}>{item.name}</h3>
                      <p style={{ color: "#aaa", fontWeight: 600, fontSize: "14px" }}>EGP {item.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(index)}
                    style={{ padding: "10px 15px", background: "transparent", color: "#ff4444", border: "1px solid #ff4444", cursor: "pointer", fontWeight: 700, fontSize: "12px" }}
                  >
                    REMOVE
                  </button>
                </div>
              ))}

              <div style={{ marginTop: "30px", borderTop: "1px solid #333", paddingTop: "30px" }}>
                <h3 style={{ fontSize: "30px", marginBottom: "25px", fontWeight: 900, color: "#fff" }}>TOTAL: EGP {total}</h3>
                
                <p style={{ marginBottom: "15px", fontSize: "12px", color: "#888", letterSpacing: "2px" }}>PAYMENT METHOD</p>
                <div className="payment-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "10px", marginBottom: "30px" }}>
                  {["Visa", "Mastercard", "InstaPay", "Cash"].map((method) => (
                    <button
                      key={method} onClick={() => setSelectedPayment(method)}
                      style={{
                        padding: "15px", border: selectedPayment === method ? "2px solid #fff" : "1px solid #333",
                        background: selectedPayment === method ? "#fff" : "#1a1a1a", color: selectedPayment === method ? "#000" : "#aaa",
                        cursor: "pointer", fontWeight: 800, fontSize: "14px"
                      }}
                    >
                      {method}
                    </button>
                  ))}
                </div>

                <button className="btn-luxury" style={{ width: "100%", padding: "18px", background: "#fff", color: "#000", border: "none", fontSize: "16px", fontWeight: 900, cursor: "pointer", letterSpacing: "1px" }}>
                  PAY NOW
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#050505", borderTop: "1px solid #1a1a1a", color: "#fff", padding: "40px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "28px", fontWeight: 900, marginBottom: "15px" }}>APOLLO</h2>
        <p style={{ color: "#777", fontSize: "13px", marginBottom: "30px", maxWidth: "300px", margin: "0 auto 30px" }}>Luxury accessories crafted for modern masculine aesthetics.</p>
        
        <div style={{ display: "flex", justifyContent: "center", gap: "30px", fontSize: "13px", color: "#aaa", marginBottom: "30px" }}>
          <span className="nav-link">Instagram</span>
          <span className="nav-link">TikTok</span>
          <span className="nav-link">Support</span>
        </div>
        
        <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: "20px", color: "#555", fontSize: "11px" }}>
            © 2026 APOLLO ACCESSORIES. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </main>
  );
}