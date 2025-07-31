import axios from 'axios';
import { Employee, NewEmployee } from './types/Employee';
import { Schedule, DayOfWeek, NewSchedule } from './types/Schedule';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const SCHEDULE_API_BASE_URL = process.env.NEXT_PUBLIC_SCHEDULE_API_BASE_URL;

export const getAllEmployees = async() => {
    const res = await axios.get(`${API_BASE_URL}/all`);
    return res.data;
}

export const deleteEmployee = async (id: number) => {
    const res = await axios.delete(`${API_BASE_URL}/delete/${id}`);
    return res.data;
}

export const addEmployee = async (employee: NewEmployee) => {
    const res = await axios.post(`${API_BASE_URL}/add`, employee);
    return res.data;
}

export const updateEmployee = async (employee: Employee) => {
    const res = await axios.put(`${API_BASE_URL}/update/${employee.id}`, employee);
    return res.data;
}

export const getSchedulesByDay = async (day: DayOfWeek): Promise<Schedule[]> => {
    const res = await axios.get(`${SCHEDULE_API_BASE_URL}/find/${day}`);
    return res.data;
  };

export const updateSchedule = async (schedule: Schedule) => {
    const res = await axios.put(`${SCHEDULE_API_BASE_URL}/update`, schedule);
    return res.data;
}

export const addSchedule = async (schedule: NewSchedule) => {
    const res = await axios.post(`${SCHEDULE_API_BASE_URL}/add`, schedule);
    return res.data;
}

export const deleteSchedule = async (id: number) => {
    const res = await axios.delete(`${SCHEDULE_API_BASE_URL}/delete/${id}`);
    return res.data;
}