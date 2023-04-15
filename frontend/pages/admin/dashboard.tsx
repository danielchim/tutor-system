import React from 'react';
import { Layout } from '@/components/layout';
// TODO: consistent all imports to named import
import  UserManagementWidget  from '@/components/admin/user-management'
import JobManagementWidget from '@/components/admin/job-management'
import CompanyManagementWidget from '@/components/admin/company-management';
import useSWR from "swr";
import fetcher from "@/lib/fetcher";



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
