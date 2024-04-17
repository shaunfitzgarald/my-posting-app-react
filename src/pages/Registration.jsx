import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });
  const [registrationErrors, setRegistrationErrors] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.password === user.passwordConfirmation) {
      axios.post(`${process.env.REACT_APP_API_URL}/signup`, {
        user: {
          name: user.name,
          email: user.email,
          password: user.password,
          password_confirmation: user.passwordConfirmation
        }
      },
      { withCredentials: true }
      ).then(response => {
      }).catch(error => {
        console.log("registration error", error);
      });
    } else {
      setRegistrationErrors('Password and password confirmation must match');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-lg">
        <div className="text-2xl font-bold text-center">
          Create an account
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-bold text-gray-600 block">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={user.name}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-600 block">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-600 block">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-600 block">
              Confirm Password
            </label>
            <input
              type="password"
              name="passwordConfirmation"
              placeholder="Password Confirmation"
              value={user.passwordConfirmation}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md focus:bg-blue-700 focus:outline-none"
            >
              Register
            </button>
          </div>
        </form>
        {registrationErrors && <div className="text-center text-red-500 mt-2">{registrationErrors}</div>}
      </div>
    </div>
  );
};

export default Registration;
