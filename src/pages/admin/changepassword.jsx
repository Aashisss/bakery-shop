import React, { useState } from 'react';
import { changePasswordApi } from '../../apis/Api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const userId = user?._id;
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const changeOldPassword = (e) => {
    setOldPassword(e.target.value);
  };

  const changeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(oldPassword, newPassword);

    const data = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      userId: userId
    };

    changePasswordApi(data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate('/profile');
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('Server Error!');
      });
  };

  return (
    <div style={{ backgroundColor: 'orange', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="card p-4 rounded shadow-lg" style={{ maxWidth: '400px', border: '5px solid darkorange' }}>
        <center>
          <img
            src="/images/reset-password.png" 
            alt="Change Password"
            style={{ width: '80%', height: '40%' }}
          />
        </center>
        <h1 className="mb-4 text-center text-black">Change Password</h1>
        <form className="w-100">
          <div className="mb-3">
            <label htmlFor="oldPassword" className="form-label text-white">
              Old Password
            </label>
            <input
              onChange={changeOldPassword}
              value={oldPassword}
              className="form-control"
              type="password"
              id="oldPassword"
              placeholder="Enter your old password"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label text-white">
              New Password
            </label>
            <input
              onChange={changeNewPassword}
              value={newPassword}
              className="form-control"
              type="password"
              id="newPassword"
              placeholder="Enter your new password"
            />
          </div>

          <button onClick={handleSubmit} className="btn btn-light w-100" type="submit">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
