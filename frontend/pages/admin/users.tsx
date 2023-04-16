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

type EditUser = {
  name: string,
  email: string,
  password: string;
  role: string;
  id:number;
}


const EditDialog = ({name,email,role,id, password}:EditUser) => {
  const roles = { 1: 'Admin', 2: 'Applicant', 3: 'Employer' };
  const [value, setValue] = React.useState(role);
  const [isUpdating, setIsUpdating] = useState(false);
  const [bodyContent, setBodyContent] = useState(
    {
      id: id,
      name: name,
      email: email,
      password: password,
      role: {
        id: role,
      }
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
        console.log("Account update successfully.");
      } else {
        console.log("Failed to update account.");
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
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Role
          </Label>
          <Select onValueChange={(value) => setBodyContent({...bodyContent, role:{id:value}})}>
            <SelectTrigger className="col-span-3">
              <SelectValue aria-label={value}>
                {roles[value]}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Admin</SelectItem>
              <SelectItem value="2">Applicant</SelectItem>
              <SelectItem value="3">Employer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" onClick={onClickAction}>Save changes</Button>
      </DialogFooter>
    </DialogContent>

  )
}

const UserManagement = () => {
  const [selectedRole, setSelectedRole] = React.useState(null);
  const { data: userData, error: userDataError } = useSWR(
    selectedRole
      ? `http://localhost:8080/api/roles/${selectedRole}/users`
      : 'http://localhost:8080/api/users/',
    fetcher
  );
  const { data: roleData, error: roleDataError } = useSWR(
    ['http://localhost:8080/api/roles/'],
    fetcher
  );
  const [value, setValue] = React.useState(0);
  return (
    <Layout>
      <div className="container items-center">
        <div className="flex items-center justify-between my-6 w-full">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl">
            User management
          </h1>
        </div>
        <div className='flex flex-row gap-4 my-6'>
          <Input placeholder='Search jobs...' onChange={(e) => {
            // setSearchJob(e.target.value)
          }}/>
          <button onClick={() => {
            // search(searchJob)
          }} className='bg-black text-white rounded-md px-4 hover:shadow-md hover:shadow-zinc-300 duration-100'>Search
          </button>
          <Select onValueChange={(value) => setSelectedRole(value)}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder={'Select Value'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key={0} value={null}>None</SelectItem>
              {roleData?.map(role => (
                <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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
            {userData?.map((user) => (
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
                    <EditDialog name={user.name} email={user.email} role={user.role.id} id={user.id} password={user.password}/>
                  </Dialog>
                  <AlertDialog>
                    <AlertDialogTrigger >
                      <Button variant="destructive">
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    {/*{TODO: fix api url}*/}
                    <DeleteWarn onClickUrl={`http://localhost:8080/api/users/${user.id}/delete`}/>
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
