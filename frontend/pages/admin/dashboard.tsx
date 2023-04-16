import React, {useState} from 'react';
import { Layout } from '@/components/layout';
// TODO: consistent all imports to named import
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import Link from "next/link";
import Chip from "@/components/ui/chip";
import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Select, SelectValue} from "@radix-ui/react-select";
import {SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select";

const CompanyManagementWidget = ({ companies }) => {
  return (
    <div className="rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Company Management</h3>
        <Link href={"/admin/companies"}>
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
            <th className="px-4 py-2">Company Name</th>
            <th className="px-4 py-2">Owner</th>
            <th className="px-4 py-2">Registration Date</th>
            <th className="px-4 py-2">Status</th>
          </tr>
          </thead>
          <tbody>
          {companies?.map((company) => (
            <tr key={company.id} className="border-t border-gray-200">
              <td className="px-4 py-2">{company.id}</td>
              <td className="px-4 py-2">{company.name}</td>
              <td className="px-4 py-2">{company.owner.name}</td>
              <td className="px-4 py-2">{company.createdAt}</td>
              <td className="px-4 py-2">
                <Chip label={company.status? 'Approved' : 'Rejected'} color={company.status? 'green' : 'red'} />
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const JobManagementWidget = ({ jobs }) => {
  return (
    <div className="rounded-lg p-6 shadow">
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

const UserManagementWidget = ({users}) => {
  return (
    <div className="shadow rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">User Management</h3>
        <Link href={'/admin/users'}>
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
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
          </tr>
          </thead>
          <tbody>
          {users?.map(user => (
            <tr key={user.id} className="border-t border-gray-200">
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.role.name}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const DateEditDialog = ({startDate, endDate}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [bodyContent, setBodyContent] = useState(
    {
      startDate: startDate,
      endDate: endDate
    }
  )
  const onClickAction = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(`http://localhost:8080/api/date/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyContent)
      });
      if (response.ok) {
        alert("Date update successfully.");
      } else {
        alert("Failed to update account.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };
  return(
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit date</DialogTitle>
        <DialogDescription>
          Type here to edit the system date.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Start Date
          </Label>
          <Input type="date" id="name" defaultValue={startDate} className="col-span-3"  onChange={(e) => setBodyContent({...bodyContent, startDate: e.target.value})}/>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            End Date
          </Label>
          <Input type="date" id="email" defaultValue={endDate} className="col-span-3" onChange={(e) => setBodyContent({...bodyContent, endDate: e.target.value})}/>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" onClick={onClickAction}>Save changes</Button>
      </DialogFooter>
    </DialogContent>

  )
}

const DateManagementWidget = ({date}) => {
  return (
    <div className="shadow rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Date Management</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
          <tr className="text-left text-gray-500">
            <th className="px-4 py-2">Start Date</th>
            <th className="px-4 py-2">End Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
          </thead>
          <tbody>
          {date?.map(sysDate => (
            <tr key={sysDate.id} className="border-t border-gray-200">
              <td className="px-4 py-2">{sysDate.startDate}</td>
              <td className="px-4 py-2">{sysDate.endDate}</td>
              <td className="px-4 py-2">
                <Dialog>
                  <DialogTrigger>
                    <Button>
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DateEditDialog startDate={sysDate.startDate} endDate={sysDate.endDate}/>
                </Dialog>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const {data:jobData, error:jobError} = useSWR(['http://localhost:8080/api/jobs/'], fetcher);
  const {data:userData, error:userError} = useSWR(['http://localhost:8080/api/users/'], fetcher);
  const {data:companyData, error:companyError} = useSWR(['http://localhost:8080/api/companies/'], fetcher);
  const {data:dateData, error:dateError} = useSWR(['http://localhost:8080/api/date/'], fetcher);
  return (
    <Layout>
      <div className="container items-center">
        <div className="flex items-center justify-between mb-6 w-full p-4">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl">
            Welcome back, demo
          </h1>
        </div>
        <div className="w-full p-4">
          <DateManagementWidget date={dateData}/>
        </div>
        <div className="w-full p-4">
          <UserManagementWidget users={userData}/>
        </div>
        <div className="w-full p-4">
          <JobManagementWidget jobs={jobData}/>
        </div>
        <div className="w-full p-4">
          <CompanyManagementWidget  companies={companyData}/>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
