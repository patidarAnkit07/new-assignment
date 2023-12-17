// UserDetails.js
import React from 'react';

const UserDetails = ({ user }) => {
  return (
    <div>
      <div className='profile'>
        <div>
          <p>{user.name}</p>
          <p>{user.username} | {user.company?.catchPhrase}</p>
        </div>
        <div>
          <p>{user.address?.city}, {user.address?.street}</p>
          <p>{user.email} | {user.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
