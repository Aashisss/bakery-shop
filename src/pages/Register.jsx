import React, { useState } from 'react';
import { registerApi } from '../apis/Api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const changeFirstName = (e) => setFirstName(e.target.value);
  const changeLastName = (e) => setLastName(e.target.value);
  const changeEmail = (e) => setEmail(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      firstName,
      lastName,
      email,
      password
    };

    registerApi(data)
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          navigate('/login'); // Redirect to login after successful registration
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('Internal Server Error!');
      });
  };

  return (
    <div className="box">
      <body
        style={{
          fontFamily: 'Arial, sans-serif',
          margin: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundImage: "url('https://img.freepik.com/free-photo/ai-generated-cake-picture_23-2150649462.jpg?t=st=1721059061~exp=1721062661~hmac=51ac7fc832c38a1db6d18b0486aa0dcf75fd3dcad9228003a5b193746c0f2a11&w=900')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="register-container" style={{ border: '10px solid #d39e6a', borderRadius: '20px', padding: '20px', borderBlockColor:'#8B4513'}}>
          <h1 style={{textAlign: 'left', color: '#8B4513', marginTop: '0', marginBottom: '20px', fontSize: '3em'}}>Create Your Account!</h1>
          <form className="w-100" onSubmit={handleSubmit}>
            <div className="form-group m-2 fw-bold">
              <label style={{ color: 'orange', textAlign:'center', }}>Firstname</label>
              <input 
                onChange={changeFirstName} 
                className="form-control" 
                type="text" 
                placeholder="Enter your Firstname" 
                required 
                style={{ padding: '10px', borderRadius: '5px', border: '2px solid #ddd', borderColor:'#8B4513' }}
              />
            </div>
            <div className="form-group m-2 fw-bold">
              <label style={{ color: 'orange', textAlign:'center' }}>Lastname</label>
              <input 
                onChange={changeLastName} 
                className="form-control" 
                type="text" 
                placeholder="Enter your Lastname" 
                required 
                style={{ padding: '10px', borderRadius: '5px', border: '2px solid #ddd', borderColor:'#8B4513' }}
              />
            </div>
            <div className="form-group m-2 fw-bold">
              <label style={{ color: 'orange', textAlign:'center' }}>Email</label>
              <input 
                onChange={changeEmail} 
                className="form-control" 
                type="email" 
                placeholder="Enter your email" 
                required 
                style={{ padding: '10px', borderRadius: '5px', border: '2px solid #ddd', borderColor:'#8B4513' }}
              />
            </div>
            <div className="form-group m-2 fw-bold">
              <label style={{ color: 'orange', textAlign:'center' }}>Password</label>
              <input 
                onChange={changePassword} 
                className="form-control" 
                type="password" 
                placeholder="Enter your password" 
                required 
                style={{ padding: '10px', borderRadius: '5px', border: '2px solid #ddd', borderColor:'#8B4513' }}
              />
            </div>
            <button className="btn btn-warning m-2 w-25" type="submit" style={{ width: '20%', borderRadius: '10px', textAlign: 'center'}}>
              Submit
            </button>
            <p className="mt-3" style={{ textAlign: 'center', color: '#333' }}>
              Already have an account? <a href="/login" className="text-dark text-decoration-dark fw-bold">Login here</a>
            </p>
          </form>
        </div>
      </body>
    </div>
  );
};

export default Register;
