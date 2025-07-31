'use client';

import { useState } from "react";
import { NewEmployee } from "../lib/types/Employee";

type Props = {
    onSubmit: (employee: NewEmployee) => void;
    onCancel ?: () => void;
}

export default function AddEmployeeForm({ onSubmit, onCancel}: Props) {
    const [form, setForm] = useState<NewEmployee>({
        name: '',
        email: '',
        jobTitle: '',
        department: '',
        phone: '',
        employeeCode: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <input type="text" name="name" placeholder="Name" className="border p-2 w-full" value={form.name} onChange={handleChange} required/>
        <input type="email" name="email" placeholder="Email" className="border p-2 w-full" value={form.email} onChange={handleChange} required/>
        <input type="text" name="jobTitle" placeholder="Job Title" className="border p-2 w-full" value={form.jobTitle} onChange={handleChange}/>
        <input type="text" name="department" placeholder="Department" className="border p-2 w-full" value={form.department} onChange={handleChange}/>
        <input type="text"name="employeeCode" placeholder="Employee Code"className="border p-2 w-full" value={form.employeeCode} onChange={handleChange}/>
        <input type="text"name="phone" placeholder="Phone" className="border p-2 w-full" value={form.phone} onChange={handleChange}/>
        <div className="flex justify-between">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-400">
            Add Employee
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} className="text-gray-500 hover:underline hover:text-red-500 cursor-pointer">
              Cancel
            </button>
          )}
        </div>
      </form>
    );
}