import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const AddUser = () => {

  const navigate = useNavigate()
  const [formValue, setFormValue] = useState({ username: '', email: '', status: '' });
  const [message, setMessage] = useState('')
  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { username: formValue.username, email: formValue.email, status: formValue.status };

    try {
      const res = await axios.post("http://localhost/ReactWithPHP/api/user.php", formData);
      console.log(res.data); // Ensure you're logging the correct part of the response
      if (res.data.result === "User added successfully") { // Check if the response indicates success
        setMessage(res.data.result)
        setTimeout(() => {
          navigate('/UserList')  
        },2000)
      }
    } catch (error) {
      console.error("There was an error!", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  return (
    <div className="bg-gray-100 p-6 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 mb-11">
        <h1 className="text-gray-800 font-semibold text-2xl mb-4">Add User</h1>
        <p className='text-green-700'><b>{message}</b></p><br></br>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              name="username"
              value={formValue.username}
              onChange={handleChange}
              placeholder="Enter username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={formValue.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
              Status
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                id="status"
                name="status"
                value={formValue.status}
                onChange={handleChange}
              >
                <option value="">--Select Status--</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M7 10l5 5 5-5H7z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
