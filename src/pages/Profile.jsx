import React from 'react';

const Profile = () => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '90vh',
      backgroundColor: 'orange' // Add background color here
    }}>
      <div style={{ 
        fontFamily: 'Arial, sans-serif', 
        padding: '30px', 
        border: '5px solid darkorange', 
        borderRadius: '10px', 
        maxWidth: '600px',
        backgroundColor: '#fff', // Adjust if needed
      }}>
        <h1 style={{ textAlign: 'center', color: 'black', fontWeight: 'bold' }}>User Profile</h1>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <img
            src="https://t4.ftcdn.net/jpg/06/44/38/07/240_F_644380708_t8KJpv0xf7B93tdD5iNpsktVQwp3MW80.jpg" // Placeholder image URL
            alt="Profile"
            style={{ height: '200px', width: '200px', borderRadius: '50%' }}
          />
          <a
            href="/editprofile"
            style={{
              marginTop: '20px',
              background: 'green',
              color: 'black',
              border: 'none',
              borderRadius: '5px',
              padding: '10px',
              cursor: 'pointer',
              display: 'inline-block',
              textDecoration: 'none', // Remove underline from link
            }}
          >
            Edit
          </a>
        </div>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h2>Aashish Chandra Sah</h2>
          <p>Email: aashissah121@gmail.com</p>
          <p>Location: Lalitpur</p>
          <p>Age: 24</p>
          <p>Bio: Hey, I am Aashish and I am from Mahottari District.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
