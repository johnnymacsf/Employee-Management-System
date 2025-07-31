'use client'

import { useState, useEffect, use } from "react";
import ScheduleCard from "../components/ScheduleCard";
import { DayOfWeek, NewSchedule, Schedule } from "../lib/types/Schedule";
import { addSchedule, getSchedulesByDay, updateSchedule, deleteSchedule } from "../lib/api";
import ModifyScheduleForm from "../components/ModifySchedule";
import AddScheduleForm from "../components/AddSchedule";
import { Employee } from "../lib/types/Employee";
import { getAllEmployees } from "../lib/api";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


export default function Scheduler() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [showAddScheduleForm, setShowAddScheduleForm] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const dayKey = daysOfWeek[selectedDay].toUpperCase() as DayOfWeek;

  const prevDay = () => {
    setSelectedDay((curr) => (curr === 0 ? daysOfWeek.length - 1 : curr - 1));
  }

  const nextDay = () => {
    setSelectedDay((curr) => (curr == daysOfWeek.length - 1 ? 0 : curr + 1));
  }

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getAllEmployees();
        setEmployees(data);
      } catch (err) {
        console.error("Failed to fetch employees", err);
      }
    };
    fetchEmployees();
  }, []);

  const fetchSchedules = async () => {
    try {
      const data = await getSchedulesByDay(dayKey);
      setSchedules(data);
    } catch (err) {
      console.error("Failed to fetch schedules", err);
    }
  };

  const handleAddSchedule = async(schedule: NewSchedule) => {
    await addSchedule(schedule);
    setShowAddScheduleForm(false);
    fetchSchedules();
  }

  const handleModifySchedule = async(schedule: Schedule) => {
    await updateSchedule(schedule);
    setEditingSchedule(null);
    fetchSchedules();
  }

  useEffect(() => {
    fetchSchedules();
  }, [dayKey]);

    return (
      <main className="p-6 flex flex-col items-center gap-6">
        <div className="relative w-full max-w-6xl flex justify-center items-center">
          <h1 className="text-4xl font-bold">Schedule Manager</h1>
          <button className="absolute right-0 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-400 cursor-pointer transition" onClick={() => {
            setShowAddScheduleForm(true);
            setEditingSchedule(null);
          }}>
            +
          </button>
        </div>
        <div className="flex items-center gap-4 text-xl">
          <button onClick={prevDay} className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-300 cursor-pointer transition text-white" aria-label="Previous Day">
            &lt;
          </button>
          <div>
            {daysOfWeek[selectedDay]}
          </div>
          <button onClick={nextDay} className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-300 cursor-pointer transition text-white" aria-label="Next Day">
            &gt;
          </button>
        </div>
        {showAddScheduleForm && (
          <div>
            <AddScheduleForm 
              onSubmit={handleAddSchedule}
              onCancel={()=> setShowAddScheduleForm(false)}
            />
          </div>
        )}
        {editingSchedule && (
          <div>
            <ModifyScheduleForm 
              schedule={editingSchedule}
              onSubmit={handleModifySchedule}
              onCancel={() => setEditingSchedule(null)}
            />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6 w-full max-w-6xl">
          {schedules.map(schedule => (
            <ScheduleCard key={schedule.id} schedule={schedule} onDelete={fetchSchedules} onEdit={() => {
              setEditingSchedule(schedule)
              setShowAddScheduleForm(false);
            }}/>
          ))}
      </div>
      </main>
    );
  }