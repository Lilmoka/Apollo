"use client";

import { useMemo, useState, useEffect } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

// تم نقل المنتجات خارج الـ Component للحصول على أداء أفضل
const products: Product[] = [
  {
    id: 1,
    name: "RM Watch",
    price: 800,
    image: "/watch.jpg",
  },
  {
    id: 2,
    name: "Premium Wallet",
    price: 500,
    image: "/wallet.jpg",
  },
  {
    id: 3,
    name: "Fashion Belt",
    price: 400,
    image: "/belt.jpg",
  },
  {
    id: 4,
    name: "Fashion Sunglasses",
    price: 300,
    image: "/sunglasses.jpg",
  },
  {
    id: 5,
    name: "Gold Ring",
    price: 200,
    image: "/ring.jpg",
  },
  {
    id: 6,
    name: "braclet",
    price: 500,
    image: "/braclet.jpg",
  },
  {
    id: 7,
    name: "chain",
    price: 300,
    image: "/chain.jpg",
  },
  {
    id: 8,
    name: "Gold Chain",
    price: 300,
    image: "/Gold Chain.jpg",
  },
  {
    id: 9,
    name: "iced bracelet",
    price: 200,
    image: "/iced_bracelet.jpg",
  }
]; // <--- تم إضافة قوس الإغلاق هنا

export default function Home() {
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedPayment, setSelectedPayment] = useState("Visa");
  
  // State للتحكم في صورة الـ New Drop
  const [dropIndex, setDropIndex] = useState(0);

  // Effect لتغيير الصورة كل 3 ثواني
  useEffect(() => {
    const timer = setInterval(() => {
      setDropIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 3000); // 3000 ملي ثانية = 3 ثواني
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
      {/* CSS STYLES FOR ANIMATIONS AND TEXTURE */}
      <style dangerouslySetInnerHTML={{__html: `
        html { scroll-behavior: smooth; }
        .bg-texture {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
        }
        .hover-card { transition: all 0.4s ease; }
        .hover-card:hover { border-color: #666 !important; transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .hover-img { transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        .hover-card:hover .hover-img { transform: scale(1.05); }
        .btn-luxury { transition: all 0.3s ease; }
        .btn-luxury:hover { background-color: #333 !important; color: #fff !important; transform: scale(1.02); }
        .btn-primary { transition: all 0.3s ease; }
        .btn-primary:hover { background-color: #d4af37 !important; color: #000 !important; }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-content {
          display: inline-flex;
          white-space: nowrap;
          animation: marquee 20s linear infinite;
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeInUp 1s ease-out forwards; }
        
        @keyframes imageFade {
          from { opacity: 0.6; filter: blur(2px); }
          to { opacity: 1; filter: blur(0); }
        }
        .animate-img { animation: imageFade 0.6s ease-out forwards; }
        
        .nav-link { position: relative; color: #ccc; text-decoration: none; transition: color 0.3s; }
        .nav-link:hover { color: #fff; }
        .nav-link::after { content: ''; position: absolute; width: 0; height: 1px; bottom: -4px; left: 0; background-color: #fff; transition: width 0.3s ease; }
        .nav-link:hover::after { width: 100%; }
      `}} />

      {/* NAVBAR */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: "rgba(18, 18, 18, 0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid #2a2a2a",
          padding: "20px 40px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {/* LOGO */}
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <img 
              src="/logo.jpg" 
              alt="Apollo Logo" 
              style={{ 
                height: "45px", 
                width: "auto", 
                objectFit: "contain",
                borderRadius: "4px"
              }} 
            />
            <h1
              style={{
                fontSize: "32px",
                fontWeight: 900,
                letterSpacing: "4px",
                color: "#fff",
                margin: 0
              }}
            >
              APOLLO
            </h1>
          </div>

          <div
            style={{
              display: "flex",
              gap: "35px",
              alignItems: "center",
              fontWeight: 600,
              fontSize: "13px",
              letterSpacing: "1.5px",
            }}
          >
            <a href="#shop" className="nav-link">SHOP</a>
            <a href="#collection" className="nav-link">COLLECTION</a>
            <a href="#about" className="nav-link">ABOUT</a>
            <a href="#checkout" className="nav-link">CHECKOUT</a>

            <button
              className="btn-primary"
              style={{
                background: "#fff",
                color: "#000",
                border: "none",
                padding: "12px 24px",
                cursor: "pointer",
                fontWeight: 900,
                borderRadius: "999px",
                letterSpacing: "1px",
              }}
            >
              CART ({cart.length})
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        id="collection"
        className="fade-in"
        style={{
          borderBottom: "1px solid #2a2a2a",
          padding: "24px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr 0.8fr",
            gap: "18px",
          }}
        >
          {/* LEFT */}
          <div
            style={{
              border: "1px solid #2a2a2a",
              padding: "40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "720px",
              background: "#161616",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "12px",
                  marginBottom: "25px",
                  letterSpacing: "3px",
                  fontWeight: 700,
                  color: "#888"
                }}
              >
                PREMIUM MEN ACCESSORIES
              </p>

              <h2
                style={{
                  fontSize: "95px",
                  lineHeight: "90px",
                  fontWeight: 900,
                  marginBottom: "30px",
                  color: "#fff",
                  textTransform: "uppercase"
                }}
              >
                Built<br />To<br />Stand<br />Out
              </h2>

              <p
                style={{
                  fontSize: "16px",
                  lineHeight: "1.8",
                  maxWidth: "400px",
                  color: "#999",
                }}
              >
                Minimal luxury pieces inspired by modern streetwear culture,
                brutalist design and timeless masculine aesthetics.
              </p>
            </div>

            <button
              className="btn-luxury"
              style={{
                marginTop: "30px",
                padding: "20px",
                background: "#fff",
                color: "#000",
                border: "none",
                fontWeight: 900,
                cursor: "pointer",
                fontSize: "14px",
                letterSpacing: "2px",
              }}
            >
              EXPLORE COLLECTION
            </button>
          </div>

          {/* CENTER IMAGE */}
          <div
            className="hover-card"
            style={{
              border: "1px solid #2a2a2a",
              overflow: "hidden",
              minHeight: "720px",
              position: "relative"
            }}
          >
            <img
              src="/watch.jpg"
              className="hover-img"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div style={{
              position: "absolute",
              bottom: "20px",
              left: "20px",
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(5px)",
              padding: "10px 20px",
              color: "#fff",
              fontSize: "12px",
              letterSpacing: "2px"
            }}>
              SIGNATURE RM WATCH
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div
            style={{
              display: "grid",
              gridTemplateRows: "1fr 1fr",
              gap: "18px",
            }}
          >
            {/* NEW DROP - DYNAMIC IMAGES */}
            <div
              className="hover-card"
              style={{
                border: "1px solid #2a2a2a",
                overflow: "hidden",
                background: "#161616",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div style={{ overflow: "hidden", height: "70%", position: "relative" }}>
                {/* استخدام الـ key يضمن تفعيل الـ Animation في كل مرة تتغير فيها الصورة */}
                <img
                  key={dropIndex}
                  src={products[dropIndex].image}
                  className="hover-img animate-img"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  alt={products[dropIndex].name}
                />
              </div>

              <div style={{ padding: "25px", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <p
                  style={{
                    fontSize: "12px",
                    letterSpacing: "3px",
                    color: "#888"
                  }}
                >
                  NEW DROP: <span style={{ color: "#fff" }}>{products[dropIndex].name}</span>
                </p>

                <button
                  className="btn-luxury"
                  style={{
                    width: "100%",
                    padding: "14px",
                    border: "1px solid #333",
                    background: "#222",
                    color: "#fff",
                    fontWeight: 900,
                    cursor: "pointer",
                    letterSpacing: "1px"
                  }}
                >
                  VIEW PRODUCT
                </button>
              </div>
            </div>

            <div
              style={{
                border: "1px solid #2a2a2a",
                padding: "35px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background: "#161616",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "12px",
                    letterSpacing: "3px",
                    marginBottom: "20px",
                    color: "#888"
                  }}
                >
                  APOLLO® 2026
                </p>

                <h3
                  style={{
                    fontSize: "48px",
                    lineHeight: "1.1",
                    fontWeight: 900,
                    color: "#fff"
                  }}
                >
                  ELEVATED<br />DETAILS
                </h3>
              </div>

              <p
                style={{
                  lineHeight: "1.8",
                  color: "#999",
                }}
              >
                Crafted to redefine luxury accessories with bold silhouettes and
                timeless identity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HUGE TITLE - ANIMATED MARQUEE */}
      <section
        style={{
          overflow: "hidden",
          borderBottom: "1px solid #2a2a2a",
          background: "#0a0a0a",
          padding: "20px 0"
        }}
      >
        <div className="marquee-content">
          <h1
            style={{
              fontSize: "180px",
              fontWeight: 900,
              letterSpacing: "-5px",
              color: "transparent",
              WebkitTextStroke: "2px #333",
              margin: "0 40px"
            }}
          >
            APOLLO ACCESSORIES • LUXURY REDEFINED • 
          </h1>
          <h1
            style={{
              fontSize: "180px",
              fontWeight: 900,
              letterSpacing: "-5px",
              color: "transparent",
              WebkitTextStroke: "2px #333",
              margin: "0 40px"
            }}
          >
            APOLLO ACCESSORIES • LUXURY REDEFINED • 
          </h1>
        </div>
      </section>

      {/* PRODUCTS */}
      <section
        id="shop"
        style={{
          padding: "60px 30px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "50px",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <h2
            style={{
              fontSize: "80px",
              fontWeight: 900,
              color: "#fff",
              lineHeight: "1"
            }}
          >
            SHOP
          </h2>

          <p
            style={{
              maxWidth: "400px",
              lineHeight: "1.8",
              color: "#999",
              textAlign: "right"
            }}
          >
            Discover curated accessories inspired by luxury fashion editorials
            and brutalist modern aesthetics.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "25px",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="hover-card"
              style={{
                border: "1px solid #2a2a2a",
                background: "#161616",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  overflow: "hidden",
                  height: "420px",
                }}
              >
                <img
                  src={product.image}
                  className="hover-img"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div style={{ padding: "30px" }}>
                <h3
                  style={{
                    fontSize: "26px",
                    marginBottom: "12px",
                    fontWeight: 800,
                    color: "#fff"
                  }}
                >
                  {product.name}
                </h3>

                <p
                  style={{
                    marginBottom: "30px",
                    fontSize: "18px",
                    color: "#aaa",
                    fontWeight: 600
                  }}
                >
                  EGP {product.price}
                </p>

                <button
                  onClick={() => addToCart(product)}
                  className="btn-luxury"
                  style={{
                    width: "100%",
                    padding: "18px",
                    background: "#fff",
                    color: "#000",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 900,
                    letterSpacing: "1.5px",
                  }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        style={{
          borderTop: "1px solid #2a2a2a",
          borderBottom: "1px solid #2a2a2a",
          padding: "30px",
          background: "#0d0d0d"
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <div
            style={{
              border: "1px solid #2a2a2a",
              padding: "60px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <p
              style={{
                marginBottom: "20px",
                letterSpacing: "3px",
                fontSize: "12px",
                color: "#888"
              }}
            >
              ABOUT APOLLO
            </p>

            <h2
              style={{
                fontSize: "90px",
                lineHeight: "0.9",
                marginBottom: "35px",
                fontWeight: 900,
                color: "#fff"
              }}
            >
              MODERN<br />LUXURY
            </h2>

            <p
              style={{
                fontSize: "18px",
                lineHeight: "1.9",
                color: "#aaa",
                maxWidth: "80%"
              }}
            >
              APOLLO creates premium accessories with bold aesthetics,
              architectural minimalism and luxury fashion inspiration designed
              for modern men.
            </p>
          </div>

          <div
            className="hover-card"
            style={{
              border: "1px solid #2a2a2a",
              overflow: "hidden",
              minHeight: "650px",
            }}
          >
            <img
              src="/wallet.jpg"
              className="hover-img"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </section>

      {/* CHECKOUT */}
      <section
        id="checkout"
        style={{
          padding: "60px 30px",
        }}
      >
        <div
          style={{
            border: "1px solid #2a2a2a",
            background: "#161616",
            padding: "50px",
            maxWidth: "1000px",
            margin: "0 auto"
          }}
        >
          <h2
            style={{
              fontSize: "60px",
              fontWeight: 900,
              marginBottom: "40px",
              color: "#fff"
            }}
          >
            CHECKOUT
          </h2>

          {cart.length === 0 ? (
            <div style={{ padding: "40px 0", borderTop: "1px solid #333" }}>
              <p style={{ color: "#777", fontSize: "20px" }}>
                Your cart is currently empty. Start exploring our collection.
              </p>
            </div>
          ) : (
            <>
              {cart.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid #333",
                    background: "#1a1a1a",
                    padding: "20px 25px",
                    marginBottom: "15px",
                    flexWrap: "wrap",
                    gap: "15px",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = "#666"}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = "#333"}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                     <img src={item.image} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "4px" }} />
                    <div>
                      <h3
                        style={{
                          marginBottom: "8px",
                          fontWeight: 800,
                          fontSize: "20px",
                          color: "#fff"
                        }}
                      >
                        {item.name}
                      </h3>
                      <p style={{ color: "#aaa", fontWeight: 600 }}>EGP {item.price}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(index)}
                    style={{
                      padding: "12px 20px",
                      background: "transparent",
                      color: "#ff4444",
                      border: "1px solid #ff4444",
                      cursor: "pointer",
                      fontWeight: 700,
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#ff4444"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#ff4444"; }}
                  >
                    REMOVE
                  </button>
                </div>
              ))}

              <div
                style={{
                  marginTop: "40px",
                  borderTop: "1px solid #333",
                  paddingTop: "40px",
                }}
              >
                <h3
                  style={{
                    fontSize: "42px",
                    marginBottom: "35px",
                    fontWeight: 900,
                    color: "#fff"
                  }}
                >
                  TOTAL: EGP {total}
                </h3>

                {/* PAYMENT */}
                <p style={{ marginBottom: "15px", fontSize: "14px", color: "#888", letterSpacing: "2px" }}>SELECT PAYMENT METHOD</p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit,minmax(180px,1fr))",
                    gap: "15px",
                    marginBottom: "40px",
                  }}
                >
                  {["Visa", "Mastercard", "InstaPay", "Cash"].map((method) => (
                    <button
                      key={method}
                      onClick={() => setSelectedPayment(method)}
                      style={{
                        padding: "20px",
                        border:
                          selectedPayment === method
                            ? "2px solid #fff"
                            : "1px solid #333",
                        background:
                          selectedPayment === method ? "#fff" : "#1a1a1a",
                        color:
                          selectedPayment === method ? "#000" : "#aaa",
                        cursor: "pointer",
                        fontWeight: 800,
                        transition: "0.3s",
                        fontSize: "16px"
                      }}
                    >
                      {method}
                    </button>
                  ))}
                </div>

                <button
                  className="btn-luxury"
                  style={{
                    width: "100%",
                    padding: "24px",
                    background: "#fff",
                    color: "#000",
                    border: "none",
                    fontSize: "18px",
                    fontWeight: 900,
                    cursor: "pointer",
                    letterSpacing: "2px",
                  }}
                >
                  PAY WITH {selectedPayment.toUpperCase()}
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "#050505",
          borderTop: "1px solid #1a1a1a",
          color: "#fff",
          padding: "80px 40px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "40px",
          }}
        >
          <div style={{ maxWidth: "300px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
                <img src="/logo.jpg" alt="Apollo Logo" style={{ height: "40px", width: "auto", borderRadius: "4px" }} />
                <h2
                  style={{
                    fontSize: "40px",
                    fontWeight: 900,
                    margin: 0
                  }}
                >
                  APOLLO
                </h2>
            </div>

            <p style={{ color: "#777", lineHeight: "1.8" }}>
              Luxury accessories crafted for modern masculine aesthetics. Stand out from the crowd.
            </p>
          </div>

          <div style={{ display: "flex", gap: "60px" }}>
            <div>
                <h4 style={{ marginBottom: "20px", color: "#555", letterSpacing: "2px", fontSize: "12px" }}>SOCIAL</h4>
                <p style={{ marginBottom: "12px", cursor: "pointer", color: "#aaa" }} className="nav-link">Instagram</p>
                <p style={{ marginBottom: "12px", cursor: "pointer", color: "#aaa" }} className="nav-link">TikTok</p>
            </div>
            <div>
                <h4 style={{ marginBottom: "20px", color: "#555", letterSpacing: "2px", fontSize: "12px" }}>COMPANY</h4>
                <p style={{ marginBottom: "12px", cursor: "pointer", color: "#aaa" }} className="nav-link">Contact</p>
                <p style={{ marginBottom: "12px", cursor: "pointer", color: "#aaa" }} className="nav-link">Support</p>
            </div>
          </div>
        </div>
        
        <div style={{ marginTop: "80px", paddingTop: "30px", borderTop: "1px solid #1a1a1a", textAlign: "center", color: "#555", fontSize: "14px" }}>
            © 2026 APOLLO ACCESSORIES. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </main>
  );
}