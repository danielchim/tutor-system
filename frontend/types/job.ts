import Company from "@/types/company";
import {Employer} from "@/types/employer";

export type Job = {
  id: number;
  title: string;
  company: Company;
  employer: Employer;
  location: string;
  salary: string;
  description: string;
  type: "full-time" | "part-time" | "contract" | "temporary" | "internship";
};
