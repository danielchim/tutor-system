import { useState } from "react";
import { Layout } from "@/components/layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Company from "@/types/company";

const CreateCompany = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newCompany: Company = {
      id: Date.now(),
      name,
      description,
      location,
    };

    // TODO: Submit the new company to a database or API

    alert(`Successfully created company ${newCompany.name}!`);
  };

  return (
    <Layout>
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-4">Create a new company</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block font-medium mb-2">
                Name
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter company name"
                required
              />
            </div>
            <div>
              <label htmlFor="location" className="block font-medium mb-2">
                Location
              </label>
              <Input
                id="location"
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Enter company location"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="description" className="block font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
              className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="Enter company description"
              required
            />
          </div>
          <div className="mt-6">
            <Button type="submit">Create company</Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateCompany;
