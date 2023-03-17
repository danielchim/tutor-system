import React from "react";
import {Layout} from "@/components/layout";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import Company from "@/types/company";
import {Employer} from "@/types/employer";
import {Job} from "@/types/job";

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

const jobs: Job[] = [job1, job2];

const UserManagement = () => {
  return (
    <Layout>
      <div className="container items-center">
        <div className="mb-6 flex w-full items-center justify-between p-4">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl">
            Jobs management
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
              <th className="px-4 py-2">Job Name</th>
              <th className="px-4 py-2">Company Name</th>
              <th className="px-4 py-2">Employer Name</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
            </thead>
            <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-t border-gray-200">
                <td className="px-4 py-2">{job.title}</td>
                <td className="px-4 py-2">{job.title}</td>
                <td className="px-4 py-2">{job.company.name}</td>
                <td className="px-4 py-2">{job.employer.name}</td>
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
