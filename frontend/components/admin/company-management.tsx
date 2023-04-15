import React, { useState } from 'react';
import Chip from '@/components/ui/chip';
import Link from "next/link";

interface Company {
  id: number;
  name: string;
  owner: string;
  registrationDate: string;
  status: string;
}

const CompanyManagementWidget = ({ companies }) => {
  console.log(companies)
  return (
    <div className="rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Company Management</h3>
        <Link href={"/admin/companies"}>
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
            <th className="px-4 py-2">Company Name</th>
            <th className="px-4 py-2">Owner</th>
            <th className="px-4 py-2">Registration Date</th>
            <th className="px-4 py-2">Status</th>
          </tr>
          </thead>
          <tbody>
          {companies?.map((company) => (
            <tr key={company.id} className="border-t border-gray-200">
              <td className="px-4 py-2">{company.id}</td>
              <td className="px-4 py-2">{company.name}</td>
              <td className="px-4 py-2">{company.owner.name}</td>
              <td className="px-4 py-2">{company.createdAt}</td>
              <td className="px-4 py-2">
                <Chip label={company.status? 'Approved' : 'Rejected'} color={company.status? 'green' : 'red'} />
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyManagementWidget;
