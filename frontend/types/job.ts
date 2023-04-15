import Company from "@/types/company";
import {Employer} from "@/types/employer";

export type Job = {
  idjobs: number;
  id: number;
  title: string;
  company: Company;
  employer: Employer;
  location: string;
  salary: string;
  description: string;
};
