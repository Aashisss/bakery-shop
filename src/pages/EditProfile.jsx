import React, { useState } from 'react';

const EditProfile = () => {
  // State variables for storing user profile data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');

  // Function to handle saving the profile
  const handleSaveProfile = () => {
    // Here you can implement the logic to save the profile data
    console.log('Profile saved:', { name, email, location, age, bio });
  };

  return (
    <div style={{ width: '500px', margin: '0 auto', padding: '30px', border: '5px solid #d2a679', borderRadius: '10px', backgroundColor: '#fff3e0' }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#b5651d', fontWeight: 'bold' }}>Edit Profile</h2>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold', marginRight: '10px', color: '#b5651d' }}>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ padding: '8px', borderRadius: '3px', border: '1px solid #d2a679', width: '100%' }} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold', marginRight: '10px', color: '#b5651d' }}>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '8px', borderRadius: '3px', border: '1px solid #d2a679', width: '100%' }} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold', marginRight: '10px', color: '#b5651d' }}>Location:</label>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} style={{ padding: '8px', borderRadius: '3px', border: '1px solid #d2a679', width: '100%' }} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold', marginRight: '10px', color: '#b5651d' }}>Age:</label>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} style={{ padding: '8px', borderRadius: '3px', border: '1px solid #d2a679', width: '100%' }} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold', marginRight: '10px', color: '#b5651d' }}>Bio:</label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} style={{ padding: '8px', borderRadius: '3px', border: '1px solid #d2a679', width: '100%' }} />
      </div>
      <button onClick={handleSaveProfile} style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#b5651d', color: '#fff', cursor: 'pointer', width: '100%' }}>Save Changes</button>
    </div>
  );
};

export default EditProfile;
