"use client";
import React, { useEffect, useState } from 'react'

function Profile() {
  const [users, setUsers] = useState([]);

  const getData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    setUsers(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>

      <div className=''>
        {users.map((user: any) => (
          <div key={user.id}>
            <h1>{user.name}</h1>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profile