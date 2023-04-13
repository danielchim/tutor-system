import React, { useState } from 'react';
import { Layout } from '@/components/layout';
import {useSession} from "next-auth/react";
import useSWR from 'swr'
import fetcher from "@/lib/fetcher";


interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
}

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const session= useSession().data;
  const {data, error} = useSWR(['http://localhost:8080/api/jobs/'], fetcher);
  console.log(data)

  if (error) {
    return (
      <Layout>
        <section className="container grid items-start gap-6 pt-6 pb-8 md:py-10">
          <p>An error occurred while fetching the data.</p>
        </section>
      </Layout>
    )
  }
  const jobs = data?.map((job: any) => {
    return {
      id:job.idJobs,
      title: job.name,
      company: job.company.name,
      description: job.description
    };
  });


  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
  };

  const handleCloseClick = () => {

  };
  return (
    <Layout>
      <section className="container grid items-start gap-6 pt-6 pb-8 md:py-10">
        <div className="flex items-center justify-between mb-6 w-full">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl">
            Job listings
          </h1>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="w-1/4">
              {jobs?.map((job) => (
                <>
                  <div
                    key={job.id}
                    className="bg-white rounded-lg shadow py-4 px-6 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleJobClick(job)}
                  >
                    <h3 className="text-lg font-medium mb-2">{job.title}</h3>
                    <p className="text-gray-700">{job.company}</p>
                  </div>
                </>

              ))}
            </div>
            <div className="w-3/4">
              {selectedJob? (
                <div className="bg-white rounded-lg shadow py-6 px-8">
                  <h3 className="text-2xl font-medium mb-2">{selectedJob.title}</h3>
                  <p className="text-gray-700 mb-2">{selectedJob.company}</p>
                  <p className="text-gray-700 mb-2">{selectedJob.description}</p>
                </div>
              ):(
                <div className="bg-white rounded-lg shadow py-6 px-8">
                  <h3 className="text-2xl font-medium mb-2">Select a job on the left to get started</h3>
                </div>
                )
              }
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
export default Browse;
