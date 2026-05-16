"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [cart, setCart] = useState<any[]>([]);
  const [page, setPage] = useState("store");

  const products = [
    {
      id: 1,
      name: "Leather Wallet",
      price: 250,
      image: "https://images.unsplash.com/photo-1606503825008-909a67e63f4e"
    },
    {
      id: 2,
      name: "Luxury Watch",
      price: 500,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },
    {
      id: 3,
      name: "Sunglasses",
      price: 300,
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f2b0c"
    },
    {
      id: 4,
      name: "Men Belt",
      price: 200,
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633"
    }
  ];

  // Load cart from storage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(saved);
  }, []);

  // Save cart to storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0b1220",
      color: "white",
      fontFamily: "Arial"
    }}>

      {/* HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px 40px",
        borderBottom: "1px solid #1f2937"
      }}>
        <h1>🛒 Men Accessories Store</h1>

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setPage("store")} style={btnStyle}>Store</button>
          <button onClick={() => setPage("checkout")} style={btnStyle}>
            Checkout ({cart.length})
          </button>
        </div>
      </div>

      {/* STORE */}
      {page === "store" && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          padding: "40px"
        }}>

          {products.map((p) => (
            <div key={p.id} style={cardStyle}>

              <img src={p.image} style={{
                width: "100%",
                height: "160px",
                objectFit: "cover"
              }} />

              <div style={{ padding: "15px" }}>
                <h3>{p.name}</h3>
                <p style={{ color: "#9ca3af" }}>{p.price} EGP</p>

                <button
                  onClick={() => addToCart(p)}
                  style={greenBtn}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}

        </div>
      )}

      {/* CHECKOUT */}
      {page === "checkout" && (
        <div style={{ padding: "40px" }}>

          <h2>🧾 Checkout</h2>

          {cart.length === 0 ? (
            <p style={{ color: "#9ca3af" }}>Cart is empty</p>
          ) : (
            <>
              {cart.map((item, i) => (
                <div key={i} style={cartItem}>
                  <span>{item.name} - {item.price} EGP</span>

                  <button onClick={() => removeFromCart(i)} style={redBtn}>
                    Remove
                  </button>
                </div>
              ))}

              <hr style={{ margin: "20px 0", borderColor: "#334155" }} />

              <h2>Total: {total} EGP</h2>

              <button style={blueBtn}>
                Pay Now (Demo)
              </button>
            </>
          )}

        </div>
      )}

    </div>
  );
}

/* ===== Styles ===== */

const btnStyle = {
  padding: "8px 12px",
  background: "#1f2937",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const cardStyle = {
  background: "#111827",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 10px 20px rgba(0,0,0,0.3)"
};

const greenBtn = {
  marginTop: "10px",
  width: "100%",
  padding: "10px",
  background: "#22c55e",
  border: "none",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer"
};

const redBtn = {
  background: "red",
  border: "none",
  color: "white",
  padding: "5px 10px",
  borderRadius: "5px",
  cursor: "pointer"
};

const blueBtn = {
  marginTop: "20px",
  padding: "12px",
  width: "100%",
  background: "#3b82f6",
  border: "none",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer"
};

const cartItem = {
  display: "flex",
  justifyContent: "space-between",
  background: "#111827",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "8px"
};