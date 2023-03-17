import React from "react";
import {Layout} from "@/components/layout";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import Company from "@/types/company";

const company1: Company = {
  id: 1,
  name: "ABC Corporation",
  owner: "John Doe",
  registrationDate: "2022-01-01",
  status: "approved",
};

const company2: Company = {
  id: 2,
  name: "XYZ Inc.",
  owner: "Jane Smith",
  registrationDate: "2022-02-15",
  status: "rejected",
};

const companies:Company[] = [company1,company2]

const UserManagement = () => {
  return (
    <Layout>
      <div className="container items-center">
        <div className="mb-6 flex w-full items-center justify-between p-4">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl">
            Company management
          </h1>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder="Search for companies" />
            <Button type="submit">Search</Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
            <tr className="text-left text-gray-500">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Company Name</th>
              <th className="px-4 py-2">Owner</th>
              <th className="px-4 py-2">Registration Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
            </thead>

            <tbody>
            {companies.map((company) => (
              <tr key={company.id} className="border-t border-gray-200">
                <td className="px-4 py-2">{company.id}</td>
                <td className="px-4 py-2">{company.name}</td>
                <td className="px-4 py-2">{company.owner}</td>
                <td className="px-4 py-2">{company.registrationDate}</td>
                <td className="px-4 py-2">{company.status}</td>
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
