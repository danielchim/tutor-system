import { NavItem } from "@/types/nav"

interface SiteConfig {
  name: string
  description: string
  mainNav: NavItem[]
  userNav: NavItem[]
  adminNav: NavItem[]
  companyNav: NavItem[]
  links: {
    twitter: string
    github: string
    docs: string
  }
}

export const siteConfig: SiteConfig = {
  name: "NextJobs",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  adminNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Jobs",
      href: "/browse",
    },
    {
      title: "Employer zone",
      href: "/user",
    },
    {
      title: "Company",
      href: "/company",
    },
    {
      title: "Admin",
      href: "/admin/dashboard",
    },
  ],
  userNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Jobs",
      href: "/browse",
    },
    {
      title: "Company",
      href: "/company",
    },
  ],
  links: {
    twitter: "https://twitter.com/neverwin",
    github: "https://github.com/danielchim/tutor-system",
    docs: "https://genderconfused.men",
  },
}
