import React, {useState} from 'react';
import Link from 'next/link';
import {Job} from '@/types/job';
import Chip from "@/components/ui/chip";

interface Props {
  jobs: Job[];
}

export const JobManagementWidget: React.FC<Props> = ({ jobs }) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Job Management</h3>
        <button
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          Show more
        </button>
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
          {jobs.map((job) => (
            <tr key={job.id} className="border-t border-gray-200">
              <td className="px-4 py-2">{job.title}</td>
              <td className="px-4 py-2">{job.title}</td>
              <td className="px-4 py-2">{job.company.name}</td>
              <td className="px-4 py-2">{job.employer.name}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
