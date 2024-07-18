import React, { useEffect, useState } from "react";
import { FiArrowRight, FiHeart } from "react-icons/fi";
import { toast } from "react-toastify";
import { create_order, getAllProductsApi, getFavoritesApi } from "../apis/Api";

const HomePage = ({ favorites, setFavorites }) => {
  const [products, setProducts] = useState([]);
  const [searchQueryUsers, setSearchQueryUsers] = useState("");
  const [cart, setCart] = useState([]);
  const [cartValue, setCartValue] = useState(1);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getAllProductsApi()
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((error) => {
        toast.error("Failed to fetch products");
        console.error("There was an error fetching the products!", error);
      });

    fetchFavoriteProducts();
  }, []);

  const fetchFavoriteProducts = () => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    setUserData(storedUserData);

    if (storedUserData) {
      getFavoritesApi(storedUserData._id)
        .then((res) => {
          setFavorites(res.data.favorites);
        })
        .catch((error) => {

          
    toast.error("");
          console.error("There was an error fetching the favorites!", error);
        });
    }
  };

  // Search button function
  const handleSearchUsers = (e) => {
    e.preventDefault();
    const filteredProducts = products.filter((product) => {
      const lowerCaseQuery = searchQueryUsers.toLowerCase();
      return product.productName.toLowerCase().includes(lowerCaseQuery);
    });
    setProducts(filteredProducts);
  };

  // Add to the cart function
  const addToCart = (index) => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    setUserData(storedUserData);
    const productToAdd = products[index];
    if (!cart.find((item) => item.id === productToAdd._id)) {
      const orderData = {
        userId: storedUserData._id,
        productId: productToAdd._id,
        orderId: index.toString(),
        quantity: cartValue,
      };
      create_order(orderData)
        .then((res) => {
          if (res.data.success === false) {
            toast.error(res.data.message);
          } else {
            setCart([
              ...cart,
              {
                id: productToAdd._id,
                name: productToAdd.productName,
                price: productToAdd.productPrice,
                quantity: cartValue,
                orderId: res.data.order.orderId,
              },
            ]);
            toast.success("Item added to cart!");
          }
        })
        .catch((err) => {
          toast.error("Server Error");
          console.log(err.message);
        });
    } else {
      toast.info("Item is already in the cart!");
    }
  };

  // Add to favorites function
  const addToFavorites = (index) => {
    const productToAdd = products[index];
    if (!favorites.find((item) => item._id === productToAdd._id)) {
      setFavorites((prevFavorites) => [...prevFavorites, productToAdd]);
      toast.success("Added to Favorites!");
    } else {
      toast.info("Item is already in favorites!");
    }
  };

  // Remove from favorites function
  const removeFromFavorites = (index) => {
    const updatedFavorites = favorites.filter((product) => product._id !== products[index]._id);
    setFavorites(updatedFavorites);
    toast.success("Removed from Favorites!");
  };

  const isFavorite = (productId) => {
    return favorites.some((product) => product._id === productId);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '30px', backgroundColor: '#f8f9fa' }}>
      <h1 style={{ textAlign: 'center', color: 'orange', fontWeight: 'bold' }}>Find your bakery product</h1>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', position: 'relative' }}>
        <img
          src="https://cdn.pixabay.com/photo/2017/05/23/22/33/birthday-2338813_1280.jpg"
          alt="Introduction"
          style={{ height: '500px', width: '100%', borderRadius: '10px' }}
        />
        <button
          className="secondary-button"
          style={{
            position: 'absolute',
            top: '70%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            background: 'darkorange',
            color: '#fff',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Get Started <FiArrowRight />
        </button>
      </div>

      <form className="d-flex me-2" onSubmit={handleSearchUsers}>
        <input
          className="form-control me-2"
          type="text"
          placeholder="Search Product..."
          aria-label="Search"
          value={searchQueryUsers}
          onChange={(e) => setSearchQueryUsers(e.target.value)}
          style={{
            width: '300px',
            padding: '10px',
            marginRight: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginTop: '10px',
          }}
        />
        <button className="btn btn-outline-success" type="submit" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '10px' }}>Search</button>
      </form>

      <h2 style={{ textAlign: 'center', color: 'darkorange', fontWeight: 'bold', marginTop: '20px' }}>New Arrivals</h2>

      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', marginTop: '20px' }}>
        {products.map((product, index) => (
          <div key={product._id} style={{ margin: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '10px', textAlign: 'center', backgroundColor: isFavorite(product._id) ? '#fff8e1' : '#fff' }}>
            <img src={product.productImageUrl} alt={product.productName} style={{ width: '250px', height: '250px', objectFit: 'cover', borderRadius: '5px' }} />
            <h3 style={{ marginTop: '10px', color: '#333' }}>{product.productName}</h3>
            <h3 style={{ marginTop: '10px', color: '#333' }}>{product.productPrice}</h3>
            <button style={{ padding: '10px', background: 'chocolate', color: '#fff', borderRadius: '5px', cursor: 'pointer' }}>
              Buy Now
            </button>
            <button onClick={() => addToCart(index)} style={{ padding: '10px', background: 'chocolate', color: '#fff', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }}>
              Add to Cart
            </button>
            {isFavorite(product._id) ? (
              <button onClick={() => removeFromFavorites(index)} style={{ padding: '10px', background: 'red', color: '#fff', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }}>
                Remove from Favorites
              </button>
            ) : (
              <button onClick={() => addToFavorites(index)} style={{ padding: '10px', background: 'green', color: '#fff', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }}>
                Add to Favorites
              </button>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', marginTop: '40px', backgroundColor: 'orange', padding: '20px', borderRadius: '10px' }}>
        <div style={{ textAlign: 'left', padding: '20px' }}>
          <h3 style={{ fontWeight: 'bold', color: 'black' }}>Our Services</h3>
          <ul>
            <li>Buy Bakery product</li>
            <li>Bakery</li>
            <li>Bakeryshop</li>
          </ul>
        </div>
        <div style={{ textAlign: 'left', padding: '20px' }}>
          <h3 style={{ fontWeight: 'bold', color: 'black' }}>Location</h3>
          <ul>
            <li>Visit Office</li>
            <span>shankmul Marg, New Baneshwor</span>
            <span>  Marga, kathmandu</span>        
          </ul>
        </div>
        <div style={{ textAlign: 'left', padding: '20px' }}>
          <h3 style={{ fontWeight: 'bold', color: 'black' }}>Contacts</h3>
          <ul>
            <li>Call any time</li>
            <span>9814846609</span>
            <li>Send Email</li>
            <span>aashish@gmail.com</span>          
          </ul>
        </div>
        <div style={{ textAlign: 'left', padding: '20px' }}>
          <h3 style={{ fontWeight: 'bold', color: 'black' }}>About Us</h3>
          <ul>
            <li>Who We Are</li>
            <li>Our Story</li>
            <li>Working at Bakery.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
