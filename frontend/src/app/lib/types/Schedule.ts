export type DayOfWeek = "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";

export interface Schedule {
  id: number;
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  role: string;
  department: string;
  hasLunch: boolean;
  employee: {
    id: number;
    name: string;
  };
}

export interface NewSchedule {
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  role: string;
  department: string;
  hasLunch: boolean;
  employee: {
    id: number;
  };
}