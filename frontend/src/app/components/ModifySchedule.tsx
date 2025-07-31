'use client';

import { useEffect, useState } from "react";
import { Schedule } from "../lib/types/Schedule";

type Props = {
  onSubmit: (schedule: Schedule) => void;
  onCancel?: () => void;
  schedule?: Schedule;
};

export default function ModifyScheduleForm({ onSubmit, onCancel, schedule }: Props) {
  const [form, setForm] = useState<Schedule>({
    id: 0,
    day: 'MONDAY',
    startTime: '',
    endTime: '',
    role: '',
    department: '',
    hasLunch: false,
    employee: {
      id: 0,
      name: '',
    }
  });

  useEffect(() => {
    if (schedule) {
      setForm(schedule);
    }
  }, [schedule]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
  
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm(prev => ({ ...prev, [name]: checked }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow w-full max-w-xl">
      <select
        name="day"
        className="border p-2 w-full"
        value={form.day}
        onChange={handleChange}
        required
      >
        {['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'].map(day => (
          <option key={day} value={day}>{day}</option>
        ))}
      </select>
      <input
        type="time"
        name="startTime"
        className="border p-2 w-full"
        value={form.startTime}
        onChange={handleChange}
        required
      />
      <input
        type="time"
        name="endTime"
        className="border p-2 w-full"
        value={form.endTime}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="role"
        placeholder="Role"
        className="border p-2 w-full"
        value={form.role}
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
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="hasLunch"
          checked={form.hasLunch}
          onChange={handleChange}
        />
        <span>Has Lunch</span>
      </label>
      <div className="flex justify-between">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {schedule ? 'Update' : 'Add'} Schedule
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="text-gray-500 hover:underline">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
