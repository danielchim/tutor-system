import React, {useEffect, useState} from 'react';
import {Layout} from '@/components/layout';
// TODO: consistent all imports to named import
import {Job} from "@/types/job";
import Company from "@/types/company";
import Link from "next/link";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import {useSession} from "next-auth/react";

const JobManagementWidget = ({jobs}) => {

  return (
    <div className="rounded-lg p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium">Jobs dashboard</h3>
        <Link href={'/employer/jobs'}>
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
            <th className="px-4 py-2">Create Date</th>
          </tr>
          </thead>
          <tbody>
          {jobs?.map((job) => (
            <tr key={job.idjobs} className="border-t border-gray-200">
              <td className="px-4 py-2">{job.idjobs}</td>
              <td className="px-4 py-2">{job.name}</td>
              <td className="px-4 py-2">{job.created_at}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const InterviewManagementWidget = ({interviews}) => {
  console.log(interviews)
  return (
    <div className="rounded-lg p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium">Upcoming interview</h3>
        <Link href={'/employer/jobs'}>
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
            <th className="px-4 py-2">Applicant Name</th>
            <th className="px-4 py-2">Interview date</th>
          </tr>
          </thead>
          <tbody>
          {interviews?.map((interview) => {
            const date = new Date(interview.date);
            const localDateString = date.toLocaleString();
              return (
                <tr key={interview.id} className="border-t border-gray-200">
                  <td className="px-4 py-2">{interview.id}</td>
                  <td className="px-4 py-2">{interview.job.name}</td>
                  <td className="px-4 py-2">{interview.user.name}</td>
                  <td className="px-4 py-2">{localDateString}</td>
                </tr>
              )
            }
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const EmployerDashboard = () => {
  const session = useSession();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if (session.status === 'authenticated') {
      const roleId = session.data.user;
      setUserData(roleId)
    }
  }, [session])
  const {
    data: jobData,
    isLoading: jobDataIsLoading,
    error: jobError
  } = useSWR([userData ? `http://localhost:8080/api/employers/${userData?.id}/jobs` : null], fetcher);
  const {
    data: interviewData,
    isLoading: interviewDataIsLoading,
    error: interviewDataError
  } = useSWR([userData ? `http://localhost:8080/api/interviews/${userData?.id}/interviews?employerUserId=${userData?.id}` : null], fetcher);
  return (
    <Layout>
      <div className="container items-center">
        <div className="flex items-center justify-between mb-6 w-full p-4">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl">
            Welcome back, demo
          </h1>
        </div>
        <div className="w-full p-4">
          <InterviewManagementWidget interviews={interviewData}/>
        </div>
        <div className="w-full p-4">
          <JobManagementWidget jobs={jobData}/>
        </div>
      </div>
    </Layout>
  );
};

export default EmployerDashboard;
