"use client";
import { useState } from "react";
import EmployeeTable from "../../../components/EmployeeTable";
import AddEmployeeButton from "../../../components/AddEmployeeButton";
import ExpiringContractsNotification from "../../../components/ExpiringContractsNotification";
import ExcelImportSimulation from "../../../components/ExcelImportSimulation";

const initialEmployees = [
  {
    id: 1,
    name: "John Doe",
    position: "Manager",
    contractPeriod: "2023-01-01 - 2024-01-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Developer",
    contractPeriod: "2023-03-15 - 2024-03-15",
  },
  {
    id: 3,
    name: "Bob Johnson",
    position: "Designer",
    contractPeriod: "2023-06-01 - 2024-06-01",
  },
  {
    id: 4,
    name: "Sarah Williams",
    position: "Marketing",
    contractPeriod: "2023-08-15 - 2024-08-15",
  },
  {
    id: 5,
    name: "Michael Brown",
    position: "Sales",
    contractPeriod: "2023-09-01 - 2024-09-01",
  },
  {
    id: 6,
    name: "Emily Davis",
    position: "HR Manager",
    contractPeriod: "2023-07-01 - 2024-07-01",
  },
];

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  const handleAddEmployee = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
  };

  const handleEditEmployee = (updatedEmployee) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
    setEmployeeToEdit(null);
  };

  return (
    <div className='container mx-auto overflow-hidden'>
      <h1 className='text-2xl font-bold mb-4'>Pengelolaan Karyawan</h1>
      <ExpiringContractsNotification />
      <div className='mb-4 flex justify-between md:items-center md:flex-row flex-col gap-y-2'>
        <AddEmployeeButton
          onAddEmployee={handleAddEmployee}
          employeeToEdit={employeeToEdit}
          onEditEmployee={handleEditEmployee}
        />
        <ExcelImportSimulation />
      </div>
      <EmployeeTable
        employees={employees}
        setEmployees={setEmployees}
        onEditEmployee={handleEditEmployee}
        setEmployeeToEdit={setEmployeeToEdit}
      />
    </div>
  );
}
