import React, {useEffect, useState} from 'react';
import { Layout } from '@/components/layout';
import {Button} from "@/components/ui/button"
import useStore from "@/hooks/useStore";
import {siteConfig} from "@/config/site";
import {useSession} from "next-auth/react";
import {session} from "next-auth/core/routes";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";


interface JobApplication {
  id: number;
  job: Object;
  company: Object;
  applyDate: Date;
}

const Dashboard = () => {
  const session = useSession();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if(session.status === 'authenticated'){
      console.log(session.data.user)
      const roleId = session.data.user;
      setUserData(roleId)
    }
  },[session])
  const [selectedJobApplication, setSelectedJobApplication] = useState<JobApplication | null>(null);
  const {data, isLoading} = useSWR([`http://localhost:8080/api/users/${userData?.id}/history`],fetcher)
  console.log(data)
  return (
    <Layout>
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-extrabold tracking-tighter text-slate-900">
            Welcome back, {userData?.name}
          </h1>
          <Button>
            Edit Profile
          </Button>
        </div>
        <div className=" mx-auto bg-white rounded-xl shadow py-6 px-8 overflow-hidden ">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img className="h-48 w-full object-cover md:w-48" src="https://via.placeholder.com/48" alt="User avatar" />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{userData.name}</div>
              <div className="mt-2 text-gray-600 text-sm">{userData.email}</div>
              <div className="mt-2 text-gray-600 text-sm">{userData.createdAt}</div>
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4 py-5">Job Applications</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-lg shadow py-6 px-8">
            <h2 className="text-2xl font-bold mb-4">Job hisotry</h2>
            {data?.map((jobApplication) => (
              <div key={jobApplication.id} className="mb-4" onClick={() => setSelectedJobApplication(jobApplication)}>
                <h3 className="text-lg font-medium">{jobApplication.job.name}</h3>
                <p className="text-gray-600">{jobApplication.job.company.name} - {jobApplication.job.employer.user.name}</p>
                <p className="text-sm text-gray-600">Applied at {jobApplication.applyDate}</p>
              </div>
            ))}
          </div>
          <div className="rounded-lg shadow py-6 px-8 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Job Application Details</h2>
            {selectedJobApplication ? (
              <>
                <h3 className="text-lg font-medium">{selectedJobApplication.job.name}</h3>
                <p className="text-gray-600">{selectedJobApplication.job.company.name} - {selectedJobApplication.job.employer.user.name}</p>
                <p className="text-sm text-gray-600">Applied at {selectedJobApplication.applyDate}</p>
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
