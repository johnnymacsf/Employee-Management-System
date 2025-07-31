'use client';

import { useState, useEffect } from "react";
import { Employee } from "../lib/types/Employee";

type Props = {
    onSubmit: (employee: Employee) => void;
    onCancel?: () => void;
    employee?: Employee;
}

export default function ModifyEmployeeForm({ onSubmit, onCancel, employee} : Props) {
    const [form, setForm] = useState<Employee>({
        id: 0,
        name: '',
        email: '',
        jobTitle: '',
        department: '',
        phone: '',
        employeeCode: ''
    });

    useEffect(() => {
        if(employee){
            setForm(employee);
        }
    }, [employee]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
    }

    return(
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <input
            type="text"
            name="name"
            placeholder="Name"
            className="border p-2 w-full"
            value={form.name}
            onChange={handleChange}
            required
        />
        <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-2 w-full"
            value={form.email}
            onChange={handleChange}
            required
        />
        <input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            className="border p-2 w-full"
            value={form.jobTitle}
            onChange={handleChange}
        />
        <input
            type="text"
            name="department"
            placeholder="Department"
            className="border p-2 w-full"
            value={form.department}
            onChange={handleChange}
        />
        <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="border p-2 w-full"
            value={form.phone}
            onChange={handleChange}
        />
        <div className="flex justify-between">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {employee ? 'Update' : 'Add'} Employee
            </button>
            {onCancel && (
            <button type="button" onClick={onCancel} className="text-gray-500 hover:underline">
                Cancel
            </button>
            )}
        </div>
    </form>
    )
}