import React from "react";
import {Layout} from "@/components/layout";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import Company from "@/types/company";
import {Employer} from "@/types/employer";
import {Job} from "@/types/job";
import {useSession} from "next-auth/react";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Select, SelectValue} from "@radix-ui/react-select";
import {SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select";
import {AlertDialog, AlertDialogTrigger} from "@/components/ui/alert-dialog";
import DeleteWarn from "@/components/delete-warn";


type EditJob = {
  name: string
  company: string
  employer: string
}

const EditDialog = ({name,company,employer}:EditJob) => {
  console.log(name.name)
  return(
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Username
          </Label>
          <Input id="name" value={name} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Job title
          </Label>
          <Input id="username" value={company} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Company
          </Label>
          <Select>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder={employer} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">Applicant</SelectItem>
              <SelectItem value="system">Employer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  )
}

const JobsManagement = () => {
  const session= useSession().data;
  const {data, error} = useSWR(['http://localhost:1337/api/jobs?populate=company,employer', session?.user.jwt], fetcher);
  if (error) {
    return (
      <Layout>
        <section className="container grid items-start gap-6 pt-6 pb-8 md:py-10">
          <p>An error occurred while fetching the data.</p>
        </section>
      </Layout>
    )
  }
  return (
    <Layout>
      <div className="container items-center">
        <div className="mb-6 flex w-full items-center justify-between p-4">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl">
            Jobs management
          </h1>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder="Search for companies" />
            <Button type="submit">Search</Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
            <tr className="text-left text-gray-500">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Job Name</th>
              <th className="px-4 py-2">Company Name</th>
              <th className="px-4 py-2">Employer Name</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
            </thead>
            <tbody>
            {data?.data?.map((job) => (
              <tr key={job.id} className="border-t border-gray-200">
                <td className="px-4 py-2">{job.id}</td>
                <td className="px-4 py-2">{job.attributes.name}</td>
                <td className="px-4 py-2">{job.attributes.company.data.attributes.name}</td>
                <td className="px-4 py-2">{job.attributes.employer.data.attributes.name}</td>
                <td className="px-4 py-2">
                  <Dialog>
                    <DialogTrigger>
                      <Button>
                        Edit
                      </Button>
                    </DialogTrigger>
                    <EditDialog name={job.attributes.name} company={job.attributes.company.data.attributes.name} employer={job.attributes.employer.data.attributes.name}/>
                  </Dialog>
                  <AlertDialog>
                    <AlertDialogTrigger >
                      <Button variant="destructive">
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <DeleteWarn />
                  </AlertDialog>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>

      </div>

    </Layout>

  );
};

export default JobsManagement;
