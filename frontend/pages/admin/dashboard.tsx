import React from 'react';
import { Layout } from '@/components/layout';
// TODO: consistent all imports to named import
import  UserManagementWidget  from '@/components/admin/user-management'
import {JobManagementWidget} from '@/components/admin/job-management'
import CompanyManagementWidget from '@/components/admin/company-management';
import {Job} from "@/types/job";
import Company from "@/types/company";
import {Employer} from "@/types/employer";



const AdminDashboard = () => {
  return (
    <Layout>
      <div className="container items-center">
        <div className="flex items-center justify-between mb-6 w-full p-4">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl">
            Welcome back, demo
          </h1>
        </div>

        <div className="w-full p-4">
          <UserManagementWidget />
        </div>
        <div className="w-full p-4">
          <JobManagementWidget  jobs={null}/>
        </div>
        <div className="w-full p-4">
          <CompanyManagementWidget  companies={null}/>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
