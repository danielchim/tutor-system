import React, {useCallback, useEffect, useRef, useState} from "react";
import {Layout} from "@/components/layout";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import Autosuggest from 'react-autosuggest';
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
import { debounce } from "lodash";
import {Textarea} from "@/components/ui/textarea";



type EditJob = {
  name: string
  company: {
    id: number,
    name: string
  }
  employer: string
}

const EditDialog = ({id, userId}) => {
  const [suggestedSkills, setSuggestedSkills] = useState([]);
  const [skillInputValue, setSkillInputValue] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [jobName, setJobName] = useState("demo");
  const [jobDescription, setJobDescription] = useState("demo");

  const { data: skillSearchResults } = useSWR(
    skillInputValue
      ? `http://localhost:8080/api/skills/search?name=${skillInputValue}`
      : null,
    fetcher
  );

  const {
    data: jobData,
    isLoading: jobDataIsLoading,
    error: jobError,
  } = useSWR([`http://localhost:8080/api/jobs/${id}`], fetcher);
  useEffect(() => {
    if (jobData) {
      setJobName(jobData?.name);
      setJobDescription(jobData?.description);
      setSelectedSkills(jobData?.skills || []);
    }
  }, [jobDataIsLoading]);

  useEffect(() =>{
    if(jobData){
      setJobName(jobData?.name);
      setJobDescription(jobData?.description);
      setSelectedSkills(jobData?.skills)
    }
  },[jobDataIsLoading])

  const removeSelectedSkill = (skillToRemove) => {
    setSelectedSkills(
      selectedSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  const renderSelectedSkills = () => {
    return selectedSkills?.map((skill) => (
      <span
        key={skill.idSkills}
        className="tag inline-flex items-center bg-blue-100 text-blue-800 py-1 px-2 rounded"
      >
        {skill.name}
        <button
          onClick={() => removeSelectedSkill(skill)}
          className="text-blue-800 ml-2 focus:outline-none"
        >
          &times;
        </button>
      </span>
    ));
  };

  const onSkillSuggestionSelected = (event, { suggestion }) => {
    if (selectedSkills?.some((skill) => skill.idSkills === suggestion.idSkills)) {
      return;
    }
    setSelectedSkills([...selectedSkills, suggestion]);
    setSkillInputValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && skillInputValue) {
      e.preventDefault();
      if (
        !selectedSkills.some(
          (skill) => skill.name.toLowerCase() === skillInputValue.toLowerCase()
        )
      ) {
        setSelectedSkills([
          ...selectedSkills,
          { idSkills: null, name: skillInputValue },
        ]);
      }
      setSkillInputValue("");
    }
  };

  useEffect(() => {
    if (skillSearchResults) {
      setSuggestedSkills([skillSearchResults]);
    }
  }, [skillSearchResults]);

  const onSkillInputChange = (event, { newValue }) => {
    setSkillInputValue(newValue);
  };

  const skillInputProps = {
    placeholder: "Search skills...",
    value: skillInputValue,
    onChange: onSkillInputChange,
  };

  const renderSuggestion = (suggestion) => (
    <div className="p-2 cursor-pointer hover:bg-gray-200">{suggestion.name}</div>
  );

  const addNewSkill = () => {
    if (
      !selectedSkills?.some(
        (skill) => skill.name.toLowerCase() === skillInputValue.toLowerCase()
      )
    ) {
      setSelectedSkills([
        ...selectedSkills,
        { idSkills: null, name: skillInputValue },
      ]);
    }
    setSkillInputValue("");
  };


  const handleSubmit = async () => {
    const bodyContent ={
      name: jobName,
      user:{
        id:userId
      },
      skills: selectedSkills,
      description:jobDescription
    };

    setIsUpdating(true);
    try {
      const response = await fetch(`http://localhost:8080/api/jobs/${id}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyContent),
      });

      if (response.ok) {
        alert("Job created successfully.");
      } else {
        alert("Failed to create job.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create job</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when youre done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Job title
          </Label>
          <Input id="name" defaultValue={jobName} className="col-span-3" onChange={(e) => setJobName(e.target.value)}/>
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="skills" className="text-right">
          Skills
        </Label>
        <div className="col-span-3">
          <Autosuggest
            suggestions={suggestedSkills}
            onSuggestionsFetchRequested={({ value }) => setSkillInputValue(value)}
            onSuggestionsClearRequested={() => setSuggestedSkills([])}
            getSuggestionValue={(suggestion) => suggestion.name}
            onSuggestionSelected={onSkillSuggestionSelected}
            renderSuggestion={renderSuggestion}
            renderSuggestionsContainer={({ containerProps, children }) => (
              <div {...containerProps} className="mt-1 border-gray-300 rounded shadow-sm bg-white">
                {children || (
                  <div
                    className="p-2 cursor-pointer hover:bg-gray-200 text-gray-500"
                    onClick={addNewSkill}
                  >
                    Click to add
                  </div>
                )}
              </div>
            )}
            inputProps={{
              ...skillInputProps,
              onKeyPress: handleKeyPress,
            }}
          />
          {renderSelectedSkills()}
        </div>
      </div>
      <div className="grid gap-4 py-4">
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Description
            </Label>
            <Textarea placeholder="Type your message here." defaultValue={jobDescription} className="col-span-3" onChange={(e) => setJobDescription(e.target.value)}/>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button onClick={handleSubmit}>Save changes</Button>
      </DialogFooter>
    </DialogContent>
  )
}

const CreateDialog = ({id}) => {
  const [suggestedSkills, setSuggestedSkills] = useState([]);
  const [skillInputValue, setSkillInputValue] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [jobName, setJobName] = useState("demo");
  const [jobDescription, setJobDescription] = useState("demo");


  const { data: skillSearchResults } = useSWR(
    skillInputValue
      ? `http://localhost:8080/api/skills/search?name=${skillInputValue}`
      : null,
    fetcher
  );

  const removeSelectedSkill = (skillToRemove) => {
    setSelectedSkills(
      selectedSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  const renderSelectedSkills = () => {
    return selectedSkills.map((skill) => (
      <span
        key={skill.idSkills}
        className="tag inline-flex items-center bg-blue-100 text-blue-800 py-1 px-2 rounded"
      >
        {skill.name}
        <button
          onClick={() => removeSelectedSkill(skill)}
          className="text-blue-800 ml-2 focus:outline-none"
        >
          &times;
        </button>
      </span>
    ));
  };

  const onSkillSuggestionSelected = (event, { suggestion }) => {
    if (selectedSkills.some((skill) => skill.idSkills === suggestion.idSkills)) {
      return;
    }
    setSelectedSkills([...selectedSkills, suggestion]);
    setSkillInputValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && skillInputValue) {
      e.preventDefault();
      if (
        !selectedSkills.some(
          (skill) => skill.name.toLowerCase() === skillInputValue.toLowerCase()
        )
      ) {
        setSelectedSkills([
          ...selectedSkills,
          { idSkills: null, name: skillInputValue },
        ]);
      }
      setSkillInputValue("");
    }
  };

  useEffect(() => {
    if (skillSearchResults) {
      setSuggestedSkills([skillSearchResults]);
    }
  }, [skillSearchResults]);

  const onSkillInputChange = (event, { newValue }) => {
    setSkillInputValue(newValue);
  };

  const skillInputProps = {
    placeholder: "Search skills...",
    value: skillInputValue,
    onChange: onSkillInputChange,
  };

  const renderSuggestion = (suggestion) => (
    <div className="p-2 cursor-pointer hover:bg-gray-200">{suggestion.name}</div>
  );

  const addNewSkill = () => {
    if (
      !selectedSkills.some(
        (skill) => skill.name.toLowerCase() === skillInputValue.toLowerCase()
      )
    ) {
      setSelectedSkills([
        ...selectedSkills,
        { idSkills: null, name: skillInputValue },
      ]);
    }
    setSkillInputValue("");
  };


  const handleSubmit = async () => {
    const bodyContent ={
      name: jobName,
      user: {
        id: id
      },
      skills: selectedSkills,
      description:jobDescription
    };

    setIsUpdating(true);
    try {
      const response = await fetch(`http://localhost:8080/api/jobs/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyContent),
      });

      if (response.ok) {
        alert("Job created successfully.");
      } else {
        alert("Failed to create job.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create job</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when youre done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Job title
          </Label>
          <Input id="name" placeholder={'Enter the name of the job name'} className="col-span-3" onChange={(e) => setJobName(e.target.value)}/>
        </div>
      </div>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="skills" className="text-right">
            Skills
          </Label>
          <div className="col-span-3">
            <Autosuggest
              suggestions={suggestedSkills}
              onSuggestionsFetchRequested={({ value }) => setSkillInputValue(value)}
              onSuggestionsClearRequested={() => setSuggestedSkills([])}
              getSuggestionValue={(suggestion) => suggestion.name}
              onSuggestionSelected={onSkillSuggestionSelected}
              renderSuggestion={renderSuggestion}
              renderSuggestionsContainer={({ containerProps, children }) => (
                <div {...containerProps} className="mt-1 border-gray-300 rounded shadow-sm bg-white">
                  {children || (
                    <div
                      className="p-2 cursor-pointer hover:bg-gray-200 text-gray-500"
                      onClick={addNewSkill}
                    >
                      Click to add
                    </div>
                  )}
                </div>
              )}
              inputProps={{
                ...skillInputProps,
                onKeyPress: handleKeyPress,
              }}
            />
            {renderSelectedSkills()}
          </div>
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Description
            </Label>
            <Textarea placeholder="Type your message here." className="col-span-3" onChange={(e) => setJobDescription(e.target.value)}/>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button onClick={handleSubmit}>Save changes</Button>
      </DialogFooter>
    </DialogContent>
  )
}



const JobsManagement = () => {
  const session = useSession();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if (session.status === 'authenticated') {
      const roleId = session.data.user;
      setUserData(roleId)
    }
  }, [session])
  const {
    data: jobData,
    isLoading: jobDataIsLoading,
    error: jobError
  } = useSWR([userData ? `http://localhost:8080/api/employers/${userData?.id}/jobs` : null], fetcher);

  if (jobError) {
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
            <Input type="text" placeholder="Search for companies"/>
            <Button type="submit">Search</Button>
            <Dialog>
              <DialogTrigger>
                Create
              </DialogTrigger>
              <CreateDialog id={userData?.id}/>
            </Dialog>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
            <tr className="text-left text-gray-500">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Job Name</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
            </thead>
            <tbody>
            {jobData?.map((job) => (
              <tr key={job.idjobs} className="border-t border-gray-200">
                <td className="px-4 py-2">{job.idjobs}</td>
                <td className="px-4 py-2">{job.name}</td>
                <td className="px-4 py-2">{job.created_at}</td>
                <td className="px-4 py-2">
                  <Dialog>
                    <DialogTrigger>
                      <Button>
                        Edit
                      </Button>
                    </DialogTrigger>
                    <EditDialog id={job.idjobs} userId={userData?.id}/>
                  </Dialog>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button variant="destructive">
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <DeleteWarn onClickUrl={`http://localhost:8080/api/jobs/${job.idjobs}/delete`}/>
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
