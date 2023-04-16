import React, {useEffect, useState} from 'react';
import {Layout} from '@/components/layout';
import {useSession} from "next-auth/react";
import useSWR from 'swr'
import fetcher from "@/lib/fetcher";
import Link from "next/link";
import {Input} from "@/components/ui/input";
import {ScrollArea} from '@/components/ui/scroll-area';
import {Label} from "@/components/ui/label";


interface Job {
  id: number;
  name: string;
  company: {
    id: number,
    name: string
  };
  description: string;
  skills: Skills[];
  created_at: string;
}

interface Skills {
  idSkills: number,
  name:string
}

const useJobs = (options) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    let url = 'http://localhost:8080/api/jobs/';
    if (options.searchByName) {
      url = `http://localhost:8080/api/jobs/searchByName?name=${options.searchByName}`;
    } else if (options.searchBySkill) {
      url = `http://localhost:8080/api/skills/${options.searchBySkill}/jobs`;
    } else if (options.searchByDateRange) {
      url = `http://localhost:8080/api/jobs/searchByDateRange?startDate=${options.searchByDateRange.startDate}&endDate=${options.searchByDateRange.endDate}`;
    }
    setUrl(url);
  }, [options]);

  return useSWR(url, fetcher);
};


const Browse = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchJob, setSearchJob] = useState<string>('')
  const [jobList, setJobList] = useState([])
  const [dateRange, setDateRange] = useState(null)
  const [queryString, setQueryString] = useState(null)
  const [searchSkillId, setSearchSkillId] = useState(null);
  const {data, error} = useJobs({
    searchByName: queryString,
    searchBySkill: searchSkillId,
    searchByDateRange: dateRange
  });

  useEffect(() => {
    data && setJobList(data);
  }, [data]);

  const handleSearch = (query) => {
    setQueryString(query)
  }

  const handleJobApply = (query) => {
    setQueryString(query)
  }

  const handleJobClick = (
    job: Job
  ) => {
    setSelectedJob(job);
  };

  const searchSkill = (idSkill) => {
    setSearchSkillId(idSkill);
  };


  return (
    <Layout>
      <section className="container grid items-start gap-6 pt-6 pb-8 md:py-10">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl">
            Job listings
          </h1>
        </div>
        <div className='flex flex-row gap-4'>
          <Input
            placeholder="Search jobs..."
            onChange={(e) => {
              setSearchJob(e.target.value);
            }}
          />
          <button onClick={() => {
            handleSearch(searchJob)
          }} className='rounded-md bg-black px-4 text-white duration-100 hover:shadow-md hover:shadow-zinc-300'>Search
          </button>
        </div>
        <div className='flex flex-row gap-4'>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="email">Start date</Label>
            <Input type="date" value="2017-06-01"/>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">End date</Label>
            <Input type="date" value="2017-06-01"/>
          </div>
        </div>
        <p>There are {jobList.length} jobs searched.</p>
        <div className="flex flex-col gap-4">
          <div className="flex h-screen gap-4">
            <ScrollArea className="h-full w-1/4 min-w-0 flex-1 overflow-y-auto">
              {data?.map((job) => (
                <div
                  key={job.id}
                  className="mx-4 mb-4 cursor-pointer rounded-lg bg-white py-4 px-6 shadow hover:bg-gray-100"
                  onClick={() => handleJobClick(job)}
                >
                  <h3 className="mb-2 text-lg font-medium">{job.name}</h3>
                  <p className="text-gray-700">{job.company.name}</p>
                  {job.skills?.map((skill) => (
                    <p className='mr-2 inline-block w-fit cursor-pointer rounded bg-zinc-200/80 px-2' onClick={() => searchSkill(skill.idSkills)}>
                      {skill.name}
                    </p>
                  ))}
                </div>
              ))}
            </ScrollArea>
            <div className="w-3/4 min-w-0 flex-1">
              {selectedJob ? (
                <div className="rounded-lg bg-white py-6 px-8 shadow">
                  <h3 className="mb-2 text-2xl font-medium">{selectedJob.name}</h3>
                  <p className="mb-2 text-gray-700">{selectedJob.company.name}</p>
                  <p className="mb-2 text-gray-700">{selectedJob.description}</p>
                  <p className="mb-2 text-gray-700">{selectedJob.created_at}</p>
                  {selectedJob?.skills?.map((skill:Skills) => (
                    <p className='mr-2 inline-block w-fit cursor-pointer rounded bg-zinc-200/80 px-2' onClick={() => searchSkill(skill.idSkills)}>
                      {skill.name}
                    </p>
                  ))}
                  <br/>
                  <button
                    onClick={() => {
                      applyJob('userID', 'jobID');
                    }}
                    className="mt-4 rounded-md bg-black px-4 py-2 text-white duration-200 hover:shadow-md"
                  >
                    Apply
                  </button>
                </div>
              ) : (
                <div className="rounded-lg bg-white py-6 px-8 shadow">
                  <h3 className="mb-2 text-2xl font-medium">Select a job on the left to get started</h3>
                </div>
              )}
            </div>
          </div>
        </div>

      </section>
    </Layout>
  )
    ;
}
export default Browse;
