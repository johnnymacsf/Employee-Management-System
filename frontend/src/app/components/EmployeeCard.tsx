'use client';
import { Employee } from "../lib/types/Employee";
import { deleteEmployee } from "../lib/api";

interface Props {
    employee: Employee;
    onDelete: () => void;
    onEdit: (employee: Employee) => void;
}

export default function EmployeeCard({employee, onDelete, onEdit}: Props) {
    const handleDelete = async () => {
        await deleteEmployee(employee.id);
        onDelete();
    }
    return (
        <div className="relative bg-white p-6 rounded-2xl shadow-md border border-black text-black">
            <div className="absolute top-2 left-2 text-red-500 font-bold text-lg cursor-pointer" title="Delete" onClick={handleDelete}>
                X
            </div>
            <div className="absolute top-2 right-2 text-blue-500 font-bold text-lg cursor-pointer" title="Modify" onClick={() => onEdit(employee)}>
                ⚙
            </div>
            <div className="text-center mt-6 mb-4">
                <h2 className="text-xl font-bold underline">{employee.name}</h2>
            </div>
            <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-md">
                <div>
                    <p>
                        <span className="font-semibold">Job Title: </span>
                        <span>{employee.jobTitle}</span>
                    </p>
                </div>
                <div>
                    <p>
                        <span className="font-semibold">Department: </span>
                        <span>{employee.department}</span>
                    </p>
                </div>
                <div>
                    <p>
                        <span className="font-semibold">Email: </span>
                        <span>{employee.email}</span>
                    </p>
                </div>
                <div>
                    <p>
                        <span className="font-semibold">Phone: </span>
                        <span>{employee.phone}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}