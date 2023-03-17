import React, { useState } from "react";
import {Layout} from "@/components/layout";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

type User = {
  id: number;
  username: string;
  email: string;
  role: string;
};

const initialUsers: User[] = [
  { id: 1, username: "user1", email: "user1@example.com", role: "user" },
  { id: 2, username: "user2", email: "user2@example.com", role: "admin" },
  { id: 3, username: "user3", email: "user3@example.com", role: "user" },
];

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);

  return (
    <Layout>
      <div className="container items-center">
        <div className="flex items-center justify-between mb-6 w-full p-4">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl">
            User management
          </h1>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder="Search for users" />
            <Button type="submit">Search</Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
            <tr className="text-left text-gray-500">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-gray-200">
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">
                  <Button>
                    Edit
                  </Button>
                  <Button variant="destructive">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>

      </div>

    </Layout>

  );
};

export default UserManagement;
