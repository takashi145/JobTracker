'use client';

import React, { useState } from 'react'

function UserCard({user} : any) {
  return (
    <div 
      key={user.id} 
      onClick={() => (
        alert('the user name is' + user.name)
      )}
      className='shadow p-3 rounded bg-gray-200'
    >
      <h1>{user.name}</h1>
      <span>
        {user.address.city}, {user.address.street}
      </span>
    </div>
  )
}

export default UserCard