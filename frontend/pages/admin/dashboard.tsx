import React from 'react';
import { Layout } from '@/components/layout';
// TODO: consistent all imports to named import
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import Link from "next/link";
import Chip from "@/components/ui/chip";

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

const JobManagementWidget: React.FC<Props> = ({ jobs }) => {

  return (
    <div className="rounded-lg p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium">Job Management</h3>
        <Link href={'/admin/jobs'}>
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
            <th className="px-4 py-2">Job Name</th>
            <th className="px-4 py-2">Company Name</th>
            <th className="px-4 py-2">Employer Name</th>
          </tr>
          </thead>
          <tbody>
          {jobs?.map((job) => (
            <tr key={job.idjobs} className="border-t border-gray-200">
              <td className="px-4 py-2">{job.idjobs}</td>
              <td className="px-4 py-2">{job.name}</td>
              <td className="px-4 py-2">{job.company.name}</td>
              <td className="px-4 py-2">{job.employer.user.name}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

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

const AdminDashboard = () => {
  const {data:jobData, error:jobError} = useSWR(['http://localhost:8080/api/jobs/'], fetcher);
  const {data:userData, error:userError} = useSWR(['http://localhost:8080/api/users/'], fetcher);
  const {data:companyData, error:companyError} = useSWR(['http://localhost:8080/api/companies/'], fetcher);
  return (
    <Layout>
      <div className="container items-center">
        <div className="flex items-center justify-between mb-6 w-full p-4">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl">
            Welcome back, demo
          </h1>
        </div>

        <div className="w-full p-4">
          <UserManagementWidget users={userData}/>
        </div>
        <div className="w-full p-4">
          <JobManagementWidget jobs={jobData}/>
        </div>
        <div className="w-full p-4">
          <CompanyManagementWidget  companies={companyData}/>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
