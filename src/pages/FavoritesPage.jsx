import React from "react";

const FavoritesPage = ({ favorites }) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '30px', backgroundColor: '#f8f9fa' }}>
      <h1 style={{ textAlign: 'center', color: 'orange', fontWeight: 'bold' }}>Your Favorites</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', marginTop: '20px' }}>
        {favorites.map((product) => (
          <div key={product._id} style={{ margin: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '10px', textAlign: 'center' }}>
            <img src={product.productImageUrl} alt={product.productName} style={{ width: '250px', height: '250px', objectFit: 'cover', borderRadius: '5px' }} />
            <h3 style={{ marginTop: '10px', color: '#333' }}>{product.productName}</h3>
            <h3 style={{ marginTop: '10px', color: '#333' }}>{product.productPrice}</h3>
            <button style={{ padding: '10px', background: 'chocolate', color: '#fff', borderRadius: '5px', cursor: 'pointer' }}>
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
