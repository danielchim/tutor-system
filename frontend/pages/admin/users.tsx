import React, { useState } from "react";
import {Layout} from "@/components/layout";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {AlertDialog, AlertDialogTrigger} from "@/components/ui/alert-dialog";
import DeleteWarn from "@/components/delete-warn";
import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {Label} from "@/components/ui/label";
import {Select, SelectValue} from "@radix-ui/react-select";
import {SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select";
import {useSession} from "next-auth/react";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";


type User = {
  id: number;
  username: string;
  email: string;
  role: string;
};

type EditUser = {
  name: string,
  email: string,
  role: string;
}


const EditDialog = ({name,email,role}:EditUser) => {
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
            Email
          </Label>
          <Input id="username" value={email} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Role
          </Label>
          <Select>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder={role} />
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

const UserManagement = () => {
  const session= useSession().data;
  const {data, error} = useSWR(['http://localhost:8080/api/users/'],fetcher);
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
  return (
    <Layout>
      <div className="container items-center">
        <div className="flex items-center justify-between mb-6 w-full p-4">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl">
            User management
          </h1>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder="Search for users" />
            <Button type="submit">Search</Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
            <tr className="text-left text-gray-500">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
            </thead>
            <tbody>
            {data?.map((user) => (
              <tr key={user.id} className="border-t border-gray-200">
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role.name}</td>
                <td className="px-4 py-2">
                  <Dialog>
                    <DialogTrigger>
                      <Button>
                        Edit
                      </Button>
                    </DialogTrigger>

                    <EditDialog name={user.username} email={user.email} role={user.role.name}/>
                  </Dialog>
                  <AlertDialog>
                    <AlertDialogTrigger >
                      <Button variant="destructive">
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <DeleteWarn onClickUrl={`http://localhost:1337/api/users/${user.id}`}/>
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

export default UserManagement;
