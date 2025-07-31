'use client';

import { useState, useEffect } from "react";
import { NewSchedule } from "../lib/types/Schedule";
import { Employee } from "../lib/types/Employee";
import { getAllEmployees } from "../lib/api";

type Props = {
    onSubmit: (schedule: NewSchedule) => void;
    onCancel?: () => void;
}

export default function AddScheduleForm({ onSubmit, onCancel} : Props) {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [form, setForm] = useState<NewSchedule>({
        day: 'MONDAY',
        startTime: '',
        endTime: '',
        role: '',
        department: '',
        hasLunch: false,
        employee: { id: 0}
    });

    useEffect(() => {
        const fetchEmployees = async () => {
          const data = await getAllEmployees();
          setEmployees(data);
          if (data.length > 0) {
            setForm(prev => ({ ...prev, employee: { id: data[0].id } }));
          }
        };
        fetchEmployees();
      }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      ) => {
        const { name, value, type } = e.target;
      
        if (type === 'checkbox') {
          setForm({ ...form, [name]: (e.target as HTMLInputElement).checked });
        } else if (name === 'employeeId') {
          setForm({ ...form, employee: { id: Number(value) } });
        } else {
          setForm({ ...form, [name]: value });
        }
      };
      

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <select name="day" value={form.day} onChange={handleChange} className="border p-2 w-full">
          {[
            'MONDAY',
            'TUESDAY',
            'WEDNESDAY',
            'THURSDAY',
            'FRIDAY',
            'SATURDAY',
            'SUNDAY'
          ].map(day => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        <input type="time" name="startTime" value={form.startTime} onChange={handleChange}className="border p-2 w-full" required/>
        <input type="time" name="endTime" value={form.endTime} onChange={handleChange} className="border p-2 w-full" required/>
        <input type="text" name="role" placeholder="Role" value={form.role} onChange={handleChange} className="border p-2 w-full"/>
        <input type="text" name="department" placeholder="Department" value={form.department} onChange={handleChange} className="border p-2 w-full"/>
        <label className="flex items-center space-x-2">
          <input type="checkbox" name="hasLunch" checked={form.hasLunch} onChange={handleChange}/>
            <span>Has Lunch Break</span>
        </label>
        <select name="employeeId" value={form.employee.id} onChange={handleChange} className="border p-2 w-full" required>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>
              {emp.name} ({emp.id})
            </option>
          ))}
        </select>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-400 cursor-pointer"
          >
            Add Schedule
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