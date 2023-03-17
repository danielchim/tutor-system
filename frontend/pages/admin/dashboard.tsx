import React from 'react';
import { Layout } from '@/components/layout';
// TODO: consistent all imports to named import
import  UserManagementWidget  from '@/components/admin/user-management'
import {JobManagementWidget} from '@/components/admin/job-management'
import CompanyManagementWidget from '@/components/admin/company-management';
import {Job} from "@/types/job";
import Company from "@/types/company";
import {Employer} from "@/types/employer";


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

const employer1: Employer = {
  id: 1,
  name: "John Doe",
  company: company1,
};

const employer2: Employer = {
  id: 2,
  name: "Jane Smith",
  company: company2,
};

const job1: Job = {
  id: 1,
  title: "Software Engineer",
  company: company1,
  employer: employer1,
  location: "New York City, NY",
  salary: "$120,000 - $150,000",
  description: "We're looking for a skilled software engineer to join our team.",
  type: "full-time",
};

const job2: Job = {
  id: 2,
  title: "Marketing Manager",
  company: company2,
  employer: employer2,
  location: "San Francisco, CA",
  salary: "$100,000 - $120,000",
  description: "We're seeking an experienced marketing manager to lead our team.",
  type: "full-time",
};

const companies: Company[] = [company1, company2];
const employers: Employer[] = [employer1, employer2];
const jobs: Job[] = [job1, job2];

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
          <JobManagementWidget  jobs={jobs}/>
        </div>
        <div className="w-full p-4">
          <CompanyManagementWidget  companies={companies}/>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
