import React, {useEffect, useState} from 'react';
import { Layout } from '@/components/layout';
import {Button} from "@/components/ui/button"

import {useSession} from "next-auth/react";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";


interface EditUser{
  id:number,
  name:string,
  email:string,
  password:string
}

interface JobApplication {
  id: number;
  job: Job;
  company: Company;
  applyDate: Date;
}

interface Company {
  id:number,
  name: string
}

interface Job {
  idjobs: number,
  name: string,
  company: Company
  employer: Employer
}

interface Employer{
  id: number
  user:User
}

interface User{
  id:number
  name:string
}

const EditDialog = ({id,name,email,password}:EditUser) => {
  const roles = { 1: 'Admin', 2: 'Applicant', 3: 'Employer' };
  const [isUpdating, setIsUpdating] = useState(false);
  const [bodyContent, setBodyContent] = useState(
    {
      id: id,
      name: name,
      email: email,
      password: password,
    }
  )
  const onClickAction = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(`http://localhost:8080/api/users/${id}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyContent)
      });      if (response.ok) {
        alert("Account update successfully.");
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
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when finished.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Username
          </Label>
          <Input id="name" defaultValue={name} className="col-span-3"  onChange={(e) => setBodyContent({...bodyContent, name: e.target.value})}/>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input id="email" defaultValue={email} className="col-span-3" onChange={(e) => setBodyContent({...bodyContent, email: e.target.value})}/>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="password" className="text-right">
            Password
          </Label>
          <Input id="password" defaultValue={password} className="col-span-3" type={'password'} onChange={(e) => setBodyContent({...bodyContent, password: e.target.value})}/>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" onClick={onClickAction}>Save changes</Button>
      </DialogFooter>
    </DialogContent>

  )
}

const Dashboard = () => {
  const session = useSession();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if(session.status === 'authenticated'){
      const roleId = session.data.user;
      setUserData(roleId)
    }
  },[session])
  const [selectedJobApplication, setSelectedJobApplication] = useState<JobApplication | null>(null);
  const {data, isLoading} = useSWR([userData?`http://localhost:8080/api/users/${userData?.id}/history`:null],fetcher)
  return (
    <Layout>
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-extrabold tracking-tighter text-slate-900">
            Welcome back, {userData?.name}
          </h1>
          {
            isLoading?(
              <p>Loading...</p>
            ):(
              <Dialog>
                <DialogTrigger>
                  Edit
                </DialogTrigger>
                <EditDialog name={userData?.name} email={userData?.email}  id={userData?.id} password={userData?.password}/>
              </Dialog>
            )
          }
        </div>
        <div className=" mx-auto bg-white rounded-xl shadow py-6 px-8 overflow-hidden ">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img className="h-48 w-full object-cover md:w-48" src="https://via.placeholder.com/48" alt="User avatar" />
            </div>
            {
              isLoading?(
                <p>Loading...</p>
              ):(
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{userData?.name}</div>
                  <div className="mt-2 text-gray-600 text-sm">{userData?.email}</div>
                  <div className="mt-2 text-gray-600 text-sm">{userData?.createdAt}</div>
                </div>
              )
            }
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4 py-5">Job Applications</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-lg shadow py-6 px-8">
            <h2 className="text-2xl font-bold mb-4">Job hisotry</h2>
            {
              isLoading?(
                <p>Loading...</p>
              ):data?.map((jobApplication) => (
                <div key={jobApplication.id} className="mb-4" onClick={() => setSelectedJobApplication(jobApplication)}>
                  <h3 className="text-lg font-medium">{jobApplication.job.name}</h3>
                  <p className="text-gray-600">{jobApplication.job.company.name} - {jobApplication.job.employer.user.name}</p>
                  <p className="text-sm text-gray-600">Applied at {jobApplication.applyDate}</p>
                </div>
              ))
            }
          </div>
          <div className="rounded-lg shadow py-6 px-8 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Job Application Details</h2>
            {selectedJobApplication ? (
              <>
                <h3 className="text-lg font-medium">{selectedJobApplication.job.name}</h3>
                <p className="text-gray-600">{selectedJobApplication.job.company.name} - {selectedJobApplication.job.employer.user.name}</p>
                <p className="text-sm text-gray-600">{`Applied at ${selectedJobApplication.applyDate}`}</p>
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
