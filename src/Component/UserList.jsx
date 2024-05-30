import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import axios from 'axios';
const UserList = () => {
  const [userData, setUserData] = useState([])
  const [message, setMessage] = useState('')
  
  useEffect(() => {
    getUseData()
  },[])

  const getUseData = async () => {
    const reqData = await fetch("http://localhost/ReactWithPHP/api/user.php")
    const resData = await reqData.json();
    console.log(resData)
    setUserData(resData)
  }

    const handleDelete = async(id) => {
      const res = await axios.delete("http://localhost/ReactWithPHP/api/user.php/"+id)
      setMessage(res.data.success)
      getUseData()
    }

  return (
    <div>
      <div className="bg-gray-100 p-6 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-gray-800 font-semibold text-2xl mb-4">User List</h1>
        <div className="overflow-x-auto">
        <p className='text-red-500'><b>{message}</b></p><br></br>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-200 text-gray-600 text-left text-sm uppercase font-semibold">ID</th>
                <th className="py-2 px-4 bg-gray-200 text-gray-600 text-left text-sm uppercase font-semibold">Username</th>
                <th className="py-2 px-4 bg-gray-200 text-gray-600 text-left text-sm uppercase font-semibold">Email</th>
                <th className="py-2 px-4 bg-gray-200 text-gray-600 text-left text-sm uppercase font-semibold">Status</th>
                <th className="py-2 px-4 bg-gray-200 text-gray-600 text-left text-sm uppercase font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
                {
                  userData.map((uData, index) => (
                
                  <tr key={index}>
                    <td className="py-2 px-4 border-b border-gray-200">{index+1}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{uData.uname}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{uData.uemail}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{uData.status == 1 ? "Active" : "Inactive"}</td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <Link to={"/EditUser/"+uData.id } className="bg-green-400 text-white p-2 m-1 rounded-lg">Edit</Link>
                      <button className="bg-red-400 text-white p-2 m- rounded-lg" onClick={ () => handleDelete(uData.id)}>Delete</button>
                    </td>
                  </tr>
                  ))
                }
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  )
}

export default UserList