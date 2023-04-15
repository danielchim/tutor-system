import React, {useState} from 'react';
import { Layout } from '@/components/layout';
import {Button} from "@/components/ui/button"
import useStore from "@/hooks/useStore";
import {siteConfig} from "@/config/site";
import {useSession} from "next-auth/react";
import {session} from "next-auth/core/routes";


interface JobApplication {
  id: number;
  jobTitle: string;
  company: string;
  location: string;
  dateApplied: string;
  status: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  jobApplications: JobApplication[];
}

const jobApplications: JobApplication[] = [
  {
    id: 1,
    jobTitle: 'Frontend Developer',
    company: 'ABC Company',
    location: 'New York, NY',
    dateApplied: '2022-03-01',
    status: 'Applied'
  },
  {
    id: 2,
    jobTitle: 'Backend Developer',
    company: 'XYZ Company',
    location: 'San Francisco, CA',
    dateApplied: '2022-02-28',
    status: 'Interview'
  },
  {
    id: 3,
    jobTitle: 'Full Stack Developer',
    company: '123 Company',
    location: 'Los Angeles, CA',
    dateApplied: '2022-02-26',
    status: 'Rejected'
  }
];

const user: User = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  jobApplications: jobApplications
};

interface CardProps {
  username: string;
  email: string;
  createdDate: Date;
}

const Dashboard = () => {
  const session = useSession();
  let roleId;
  if(session.status === 'authenticated'){
    console.log(session.data.user.role.name)
    roleId = session.data.user.role.id;
  }
  const [selectedJobApplication, setSelectedJobApplication] = useState<JobApplication | null>(null);
  return (
    <Layout>
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-extrabold tracking-tighter text-slate-900">
            Welcome back, {user.firstName} {user.lastName}
          </h1>
        </div>

        <h2 className="text-2xl font-bold mb-4 py-5">Jobs</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-lg shadow py-6 px-8">
            <h2 className="text-2xl font-bold mb-4">Job hisotry</h2>
            {user.jobApplications.map((jobApplication) => (
              <div key={jobApplication.id} className="mb-4" onClick={() => setSelectedJobApplication(jobApplication)}>
                <h3 className="text-lg font-medium">{jobApplication.jobTitle}</h3>
                <p className="text-gray-600">{jobApplication.company} - {jobApplication.location}</p>
                <p className="text-sm text-gray-600">{jobApplication.dateApplied} - {jobApplication.status}</p>
              </div>
            ))}
          </div>
          <div className="rounded-lg shadow py-6 px-8 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Job Application Details</h2>
            {selectedJobApplication ? (
              <>
                <h3 className="text-lg font-medium">{selectedJobApplication.jobTitle}</h3>
                <p className="text-gray-600">{selectedJobApplication.company} - {selectedJobApplication.location}</p>
                <p className="text-sm text-gray-600">{selectedJobApplication.dateApplied} - {selectedJobApplication.status}</p>
              </>
            ) : (
              <p className="text-gray-600">Please select a job application from the list to view details.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
