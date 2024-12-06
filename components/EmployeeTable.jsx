"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
];

export default function EmployeeTable({
  employees,
  setEmployees,
  onEditEmployee,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  // Tambahkan fungsi handleEdit
  const handleEdit = (employee) => {
    onEditEmployee(employee);
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  // Filter karyawan berdasarkan pencarian
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className='mb-4'>
        <Input
          placeholder='Cari karyawan...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='max-w-sm'
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Jabatan</TableHead>
            <TableHead>Periode Kontrak</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEmployees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>{employee.contractPeriod}</TableCell>
              <TableCell>
                <div className='flex gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handleEdit(employee)}>
                    Edit
                  </Button>
                  <Button
                    variant='destructive'
                    size='sm'
                    onClick={() => handleDelete(employee.id)}>
                    Hapus
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
