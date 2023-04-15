import React from 'react';
import Link from 'next/link';
interface User {
  id: number;
  username: string;
  email: string;
  role: 'employer' | 'company owner' | 'job applicant';
}

const UserManagementWidget = ({users}) => {
  return (
    <div className="shadow-md rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">User Management</h3>
        <Link href={'/admin/users'}>
          <button
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            Show more
          </button>
        </Link>

      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
          <tr className="text-left text-gray-500">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
          </tr>
          </thead>
          <tbody>
          {users?.map(user => (
              <tr key={user.id} className="border-t border-gray-200">
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementWidget;
