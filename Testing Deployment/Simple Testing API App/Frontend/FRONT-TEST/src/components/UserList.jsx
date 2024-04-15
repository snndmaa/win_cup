import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {users.map((user) => (
            <li key={user.id} className="py-4">
              <span className="font-semibold">{user.username}</span>
              <span className="text-red-600">{user.email}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
