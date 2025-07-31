'use client'
import { Employee, NewEmployee } from "../lib/types/Employee";
import EmployeeCard from "../components/EmployeeCard";
import { useEffect, useState } from "react";
import { addEmployee, getAllEmployees, updateEmployee } from "../lib/api";
import AddEmployeeForm from "../components/AddEmployeeForm";
import ModifyEmployeeForm from "../components/ModifyEmployeeForm";

export default function EmployeeManager() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const data = await getAllEmployees();
    setEmployees(data);
  }

  const handleAddEmployee = async(employee: NewEmployee) => {
    await addEmployee(employee);
    setShowAddForm(false);
    fetchEmployees();
  }

  const handleModifyEmployee = async(employee: Employee) => {
    await updateEmployee(employee);
    setEditingEmployee(null);
    fetchEmployees();
  }

    return (
        <main className="p-6">
          <div className="relative mb-6 h-12 flex items-center">
            <h1 className="absolute left-1/2 transform -translate-x-1/2 text-4xl font-bold text-center">
              Employee Manager
            </h1>
          
            <button className="ml-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-400 cursor-pointer transition" onClick={() => setShowAddForm(true)}>
              +
            </button>
          </div>
          {showAddForm && (
            <div>
              <AddEmployeeForm 
                onSubmit={handleAddEmployee}
                onCancel={() => setShowAddForm(false)}
              />
            </div>
          )}
          {editingEmployee && (
            <div>
              <ModifyEmployeeForm
                employee={editingEmployee}
                onSubmit={handleModifyEmployee}
                onCancel={() => setEditingEmployee(null)}
              />
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {employees.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} onDelete={fetchEmployees} onEdit={() => {
                setEditingEmployee(employee);
                setShowAddForm(false);
              }}/>
            ))}
          </div>
        </main>
      );
}