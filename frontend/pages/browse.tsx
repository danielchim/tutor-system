import React, { useState } from 'react';
import { Layout } from '@/components/layout';

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
  const [jobs, setJobs] = useState<Job[]>([]);

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
  };

  const handleCloseClick = () => {
    setSelectedJob(null);
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
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-lg shadow py-4 px-6 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleJobClick(job)}
                >
                  <h3 className="text-lg font-medium mb-2">{job.title}</h3>
                  <p className="text-gray-700">{job.company}</p>
                  <p className="text-gray-700">{job.location}</p>
                  <p className="text-gray-700">{job.salary}</p>
                </div>
              ))}
              <div
                key={1}
                className="rounded-lg shadow py-4 px-6 cursor-pointer hover:bg-gray-100"
              >
                <h3 className="text-lg font-medium mb-2">Demo</h3>
                <p className="text-gray-700">demodemodmeo</p>
                <p className="text-gray-700">HK</p>
                <p className="text-gray-700">69420</p>
              </div>
            </div>
            <div className="w-3/4">
              {selectedJob && (
                <div className="bg-white rounded-lg shadow py-6 px-8">
                  <h3 className="text-2xl font-medium mb-2">{selectedJob.title}</h3>
                  <button className="text-gray-500 hover:text-gray-700" onClick={handleCloseClick}>
                    &#x2715;
                  </button>
                  <p className="text-gray-700 mb-2">{selectedJob.company}</p>
                  <p className="text-gray-700 mb-2">{selectedJob.location}</p>
                  <p className="text-gray-700 mb-2">{selectedJob.salary}</p>
                  <p className="text-gray-700 mb-2">{selectedJob.description}</p>
                </div>
              )}
              <div className="rounded-lg shadow py-6 px-8">
                <h3 className="text-2xl font-medium mb-2">Software Engineer</h3>
                <button className="text-gray-500 hover:text-gray-700" onClick={handleCloseClick}>
                  &#x2715;
                </button>
                <p className="text-gray-700 mb-2">Microsoft</p>
                <p className="text-gray-700 mb-2">Windows</p>
                <p className="text-gray-700 mb-2">69,420</p>
                <p className="text-gray-700 mb-2">descdmeodmeomfoeinfiubfishbdlifhsdliufhdsliuhfudishfidsf</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Browse;

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.HOST}:${process.env.PORT}/api/jobs`,{
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  })
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

