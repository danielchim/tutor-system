import React, {useState} from 'react';
import Link from 'next/link';
import {Job} from '@/types/job';
import Chip from "@/components/ui/chip";

interface Props {
  jobs: Job[];
}

const JobManagementWidget: React.FC<Props> = ({ jobs }) => {

  return (
    <div className="rounded-lg p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium">Job Management</h3>
        <Link href={'/admin/jobs'}>
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
            <th className="px-4 py-2">Company Name</th>
            <th className="px-4 py-2">Employer Name</th>
          </tr>
          </thead>
          <tbody>
          {jobs?.map((job) => (
            <tr key={job.idjobs} className="border-t border-gray-200">
              <td className="px-4 py-2">{job.idjobs}</td>
              <td className="px-4 py-2">{job.name}</td>
              <td className="px-4 py-2">{job.company.name}</td>
              <td className="px-4 py-2">{job.employer.user.name}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobManagementWidget;
