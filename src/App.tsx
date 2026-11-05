import { useMemo, useState } from "react";
import "./App.css";

type Category =
  | "Dresses"
  | "Tops"
  | "Bottoms"
  | "Bags"
  | "Accessories";

type Product = {
  id: number;
  name: string;
  category: Category;
  price: number;
  image: string;
  description: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Satin Evening Dress",
    category: "Dresses",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85",
    description: "Elegant satin finish with a timeless silhouette.",
  },
  {
    id: 2,
    name: "Classic White Top",
    category: "Tops",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=900&q=85",
    description: "An everyday essential with a clean, modern fit.",
  },
  {
    id: 3,
    name: "Relaxed Wide Pants",
    category: "Bottoms",
    price: 65,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85",
    description: "Relaxed tailoring for effortless everyday style.",
  },
  {
    id: 4,
    name: "Mini Shoulder Bag",
    category: "Bags",
    price: 72,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
    description: "A versatile statement piece for day or night.",
  },
  {
    id: 5,
    name: "Minimal Gold Earrings",
    category: "Accessories",
    price: 28,
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85",
    description: "Subtle shine to complete your look.",
  },
  {
    id: 6,
    name: "Floral Summer Dress",
    category: "Dresses",
    price: 78,
    image:
      "https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=900&q=85",
    description: "A light, easy dress made for sunny days.",
  },
  {
    id: 7,
    name: "Ribbed Everyday Top",
    category: "Tops",
    price: 39,
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85",
    description: "Soft texture and a flattering everyday shape.",
  },
  {
    id: 8,
    name: "Tailored Trousers",
    category: "Bottoms",
    price: 68,
    image:
      "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?auto=format&fit=crop&w=900&q=85",
    description: "Polished trousers with a relaxed feel.",
  },
];

const categories: {
  name: Category;
  subtitle: string;
  image: string;
}[] = [
  {
    name: "Dresses",
    subtitle: "Find your statement piece",
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Tops",
    subtitle: "Everyday essentials",
    image:
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Bottoms",
    subtitle: "Relaxed wide pants",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Bags",
    subtitle: "Carry your style",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Accessories",
    subtitle: "The finishing touches",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85",
  },
];

type FilterCategory = "All" | "Clothing" | Category;

function App() {
  const [selectedCategory, setSelectedCategory] =
    useState<FilterCategory>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("featured");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory === "Clothing") {
      result = result.filter((product) =>
        ["Dresses", "Tops", "Bottoms"].includes(product.category),
      );
    } else if (selectedCategory !== "All") {
      result = result.filter(
        (product) => product.category === selectedCategory,
      );
    }

    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();

      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      );
    }

    if (sortOption === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [selectedCategory, searchTerm, sortOption]);

  const cartCount = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0,
  );

  const cartTotal = products.reduce(
    (total, product) => total + product.price * (cart[product.id] || 0),
    0,
  );

  const addToCart = (productId: number) => {
    setCart((currentCart) => ({
      ...currentCart,
      [productId]: (currentCart[productId] || 0) + 1,
    }));
  };

  const decreaseQuantity = (productId: number) => {
    setCart((currentCart) => {
      const nextCart = { ...currentCart };
      const currentQuantity = nextCart[productId] || 0;

      if (currentQuantity <= 1) {
        delete nextCart[productId];
      } else {
        nextCart[productId] = currentQuantity - 1;
      }

      return nextCart;
    });
  };

  const scrollToShop = () => {
    document.getElementById("shop")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="app">
      <div className="announcement">
        YOUR STYLE, YOUR STORY — FREE SHIPPING ON ORDERS OVER $100
      </div>

      <header className="site-header">
        <a href="#home" className="logo">
          SASSY<span>.</span>
        </a>

        <nav className="main-nav">
          <a href="#home">Home</a>
          <a href="#shop">Shop</a>
          <a href="#story">Our Story</a>
          <a href="#newsletter">Contact</a>
        </nav>

        <button
          className="cart-button"
          onClick={() => setCartOpen(true)}
          aria-label="Open shopping bag"
        >
          Bag <span className="cart-count">{cartCount}</span>
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">THE NEW SEASON EDIT</p>

            <h1>
              Your style.
              <br />
              Your story.
            </h1>

            <p className="hero-description">
              Discover thoughtfully selected pieces made to express your
              individuality.
            </p>

            <button className="primary-button" onClick={scrollToShop}>
              Explore Collection <span>↗</span>
            </button>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=90"
              alt="Fashion models wearing contemporary outfits"
            />
            <div className="hero-image-caption">
              <span>01 / 04</span>
              <span>Made for your moments</span>
            </div>
          </div>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">SHOP BY CATEGORY</p>
              <h2>Find your kind of style.</h2>
            </div>

            <button className="text-link" onClick={scrollToShop}>
              View all products ↗
            </button>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <button
                className="category-card"
                key={category.name}
                onClick={() => {
                  setSelectedCategory(category.name);
                  scrollToShop();
                }}
              >
                <div className="category-image">
                  <img src={category.image} alt={category.name} />
                  <span className="category-arrow">↗</span>
                </div>

                <div className="category-card-info">
                  <h3>{category.name}</h3>
                  <p>{category.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE SASSY COLLECTION</p>
              <h2>Pieces to love.</h2>
            </div>

            <p className="product-count">
              {filteredProducts.length} products
            </p>
          </div>

          <div className="shop-toolbar">
            <div className="category-filters">
              {(
                [
                  "All",
                  "Clothing",
                  "Dresses",
                  "Tops",
                  "Bottoms",
                  "Bags",
                  "Accessories",
                ] as FilterCategory[]
              ).map((category) => (
                <button
                  key={category}
                  className={`filter ${
                    selectedCategory === category ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="shop-controls">
              <input
                type="search"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                aria-label="Search products"
              />

              <select
                value={sortOption}
                onChange={(event) => setSortOption(event.target.value)}
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />

                    <button
                      className="quick-add"
                      onClick={() => addToCart(product.id)}
                    >
                      Add to Bag +
                    </button>
                  </div>

                  <div className="product-info">
                    <div>
                      <p className="product-category">{product.category}</p>
                      <h3>{product.name}</h3>
                      <p className="product-description">
                        {product.description}
                      </p>
                    </div>

                    <span className="product-price">${product.price}</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="no-products">
              <h3>No products found</h3>
              <p>Try another search or category.</p>

              <button
                className="primary-button"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>

        <section className="brand-statement" id="story">
          <p className="eyebrow">A LITTLE ABOUT SASSY</p>
          <h2>
            Fashion is more than what you wear.
            <br />
            It’s how you show up.
          </h2>
          <p>
            We believe personal style should feel effortless, expressive, and
            entirely your own. SASSY brings together pieces that make everyday
            dressing feel special.
          </p>
          <a href="#shop" className="text-link">
            Discover our collection ↗
          </a>
        </section>

        <section className="newsletter-section" id="newsletter">
          <div>
            <p className="eyebrow">STAY IN THE LOOP</p>
            <h2>A little SASSY in your inbox.</h2>
            <p>
              Get first access to new collections, style inspiration, and
              special updates.
            </p>
          </div>

          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              aria-label="Your email address"
            />

            <button type="submit">Sign me up ↗</button>

            {subscribed && (
              <p className="newsletter-success">
                Thanks for subscribing!
              </p>
            )}
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <a href="#home" className="logo">
          SASSY<span>.</span>
        </a>

        <p>Style that speaks for you.</p>

        <div className="footer-links">
          <a href="#shop">Shop</a>
          <a href="#story">Our Story</a>
          <a href="#newsletter">Contact</a>
        </div>

        <p className="copyright">
          © {new Date().getFullYear()} SASSY. All rights reserved.
        </p>
      </footer>

      {cartOpen && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)}>
          <aside
            className="cart-drawer"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cart-header">
              <div>
                <p className="eyebrow">YOUR SELECTION</p>
                <h2>Your Bag ({cartCount})</h2>
              </div>

              <button
                className="cart-close"
                onClick={() => setCartOpen(false)}
                aria-label="Close shopping bag"
              >
                ×
              </button>
            </div>

            {cartCount === 0 ? (
              <div className="empty-cart">
                <p>Your bag is currently empty.</p>
                <button
                  className="primary-button"
                  onClick={() => {
                    setCartOpen(false);
                    scrollToShop();
                  }}
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {products
                    .filter((product) => cart[product.id])
                    .map((product) => (
                      <div className="cart-item" key={product.id}>
                        <img src={product.image} alt={product.name} />

                        <div className="cart-item-details">
                          <h3>{product.name}</h3>
                          <p>${product.price}</p>

                          <div className="quantity-control">
                            <button
                              onClick={() => decreaseQuantity(product.id)}
                              aria-label={`Decrease ${product.name} quantity`}
                            >
                              −
                            </button>

                            <span>{cart[product.id]}</span>

                            <button
                              onClick={() => addToCart(product.id)}
                              aria-label={`Increase ${product.name} quantity`}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="cart-footer">
                  <div className="cart-subtotal">
                    <span>Subtotal</span>
                    <strong>${cartTotal.toFixed(2)}</strong>
                  </div>

                  <p className="cart-note">
                    Shipping and taxes are calculated at checkout.
                  </p>

                  <button
                    className="checkout-button"
                    onClick={() =>
                      alert(
                        "This is a storefront demo. Checkout and payment are not connected yet.",
                      )
                    }
                  >
                    Continue to Checkout
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;