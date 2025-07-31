export interface Employee {
    id: number;
    name: string;
    email: string;
    jobTitle: string;
    department: string;
    phone: string;
    employeeCode?: string;
}

export interface NewEmployee {
    name: string;
    email: string;
    jobTitle: string;
    department: string;
    phone: string;
    employeeCode?: string;
}