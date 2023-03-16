import React from 'react';
import { Layout } from '@/components/layout';
// TODO: consistent all imports to named import
import  UserManagementWidget  from '@/components/admin/user-management'
import {JobManagementWidget} from '@/components/admin/job-management'
import CompanyManagementWidget from '@/components/admin/company-management';
import {Job} from "@/types/job";
import Company from "@/types/company";
import Link from "next/link";
import {siteConfig} from "@/config/site";
import {Button, buttonVariants} from "@/components/ui/button";

const jobs: Job[] = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Acme Corporation",
    employer: "John Doe",
    location: "San Francisco, CA",
    salary: "$100,000 - $150,000",
    description:
      "We are seeking a highly skilled software engineer to join our team and help develop cutting-edge software applications.",
    type: "full-time",
  },
  {
    id: 2,
    title: "Product Manager",
    company: "XYZ Corp",
    employer: "Jane Smith",
    location: "New York, NY",
    salary: "$120,000 - $180,000",
    description:
      "We are looking for a talented product manager to help us build amazing products that delight our customers.",
    type: "full-time",
  },
  {
    id: 3,
    title: "Marketing Specialist",
    company: "ABC Company",
    employer: "Joe Smith",
    location: "Los Angeles, CA",
    salary: "$70,000 - $90,000",
    description:
      "We are seeking a marketing specialist to help us develop and execute marketing campaigns that drive results.",
    type: "part-time",
  },
  // add more jobs as needed
];

const companies:Company[] = [
  {
    id: 1,
    name: 'Acme Inc.',
    owner: 'John Doe',
    registrationDate: '2022-02-01',
    status: 'approved'
  },
  {
    id: 2,
    name: 'XYZ Corp',
    owner: 'Jane Smith',
    registrationDate: '2021-12-15',
    status: 'rejected'
  },
  {
    id: 3,
    name: 'Smith & Co',
    owner: 'Mike Johnson',
    registrationDate: '2022-01-10',
    status: 'pending'
  }
]


const CompanyDashboard = () => {
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
      </div>
    </Layout>
  );
};

export default CompanyDashboard;
