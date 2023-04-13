import React, {useEffect, useState} from 'react';
import {Layout} from '@/components/layout';
import {useSession} from "next-auth/react";
import useSWR from 'swr'
import fetcher from "@/lib/fetcher";
import Link from "next/link";
import {Input} from "@/components/ui/input";


interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  skillList: object;
}


const Browse = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchJob, setSearchJob] = useState<string>('')
  const [jobList, setJobList] = useState([])

  const search = (query) => {
    const url = `http://localhost:8080/api/jobs/searchByName?name=${query}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setJobList(data);
      })
      .catch(error => console.error(error));

    setJobList(data)
  }

  const searchSkill = (query) => {
    const url = `http://localhost:8080/api/skills/${query}/jobs`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setJobList(data);
      })
      .catch(error => console.error(error));

    setJobList(data)
  }

  const applyJob = async (userId, jobId) => {
    const url = 'http://localhost:8080/api/jobs/apply';
    const body = JSON.stringify({userId, jobId});
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data); // do something with the response data
    } catch (error) {
      console.error(error);
    }
  };


  const session = useSession().data;
  const {data, error} = useSWR(['http://localhost:8080/api/jobs/'], fetcher);

  useEffect(() => {
    data && setJobList(data)
  }, [data])


  if (error) {
    return (
      <Layout>
        <section className="container grid items-start gap-6 pt-6 pb-8 md:py-10">
          <p>An error occurred while fetching the data.</p>
        </section>
      </Layout>
    )
  }


  const jobs = jobList?.map((job: any) => {
    return {
      id: job.idJobs,
      title: job.name,
      company: job.company.name,
      description: job.description,
      skillList: job.skills,
    };
  });


  const SkillTag = ({title, idSkill}) => {
    return <p className='rounded px-2 bg-zinc-200/80 w-fit inline-block mr-2 cursor-pointer' onClick={() => {
      searchSkill(idSkill)
    }}>{title}
    </p>

  }

  const handleJobClick = (
      job: Job
    ) => {
      setSelectedJob(job);
    }
  ;

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
        <div className='flex flex-row gap-4'>
          <Input placeholder='Search jobs...' onChange={(e) => {
            setSearchJob(e.target.value)
          }}/>
          <button onClick={() => {
            search(searchJob)
          }} className='bg-black text-white rounded-md px-4 hover:shadow-md hover:shadow-zinc-300 duration-100'>Search
          </button>

        </div>
        <p>There are {jobList.length} jobs searched.</p>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="w-1/4">
              {jobs?.map((job) => (
                <>
                  <div
                    key={job.id}
                    className="bg-white rounded-lg shadow py-4 px-6 mb-4 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleJobClick(job)}
                  >
                    <h3 className="text-lg font-medium mb-2">{job.title}</h3>
                    <p className="text-gray-700">{job.company}</p>
                    {job.skillList != null ? job.skillList.map((skill) => {
                      return <SkillTag title={skill.name} idSkill={skill.idSkills}/>
                    }) : <></>}
                  </div>
                </>

              ))}
            </div>
            <div className="w-3/4">
              {selectedJob ? (
                <div className="bg-white rounded-lg shadow py-6 px-8">
                  <h3 className="text-2xl font-medium mb-2">{selectedJob.title}</h3>
                  <p className="text-gray-700 mb-2">{selectedJob.company}</p>
                  <p className="text-gray-700 mb-2">{selectedJob.description}</p>
                  {selectedJob.skillList != null ? selectedJob.skillList.map((skill) => {
                    return <SkillTag title={skill.name} idSkill={skill.idSkills}/>
                  }) : <></>}
                  <br/>
                  <button
                    onClick={() => {applyJob('userID', 'jobID')}}
                    className='bg-black text-white rounded-md px-4 py-2 mt-4 duration-200 hover:shadow-md '>Apply
                  </button>
                </div>
              ) : (
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
  )
    ;
}
export default Browse;
