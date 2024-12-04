'use client';
import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const initialEmployees = [
  { id: 1, name: "John Doe", position: "Manager", contractPeriod: "2023-01-01 - 2024-01-01" },
  { id: 2, name: "Jane Smith", position: "Developer", contractPeriod: "2023-03-15 - 2024-03-15" },
  { id: 3, name: "Bob Johnson", position: "Designer", contractPeriod: "2023-06-01 - 2024-06-01" },
]

export default function EmployeeTable() {
  const [employees, setEmployees] = useState(initialEmployees)

  return (
    (<Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nama</TableHead>
          <TableHead>Jabatan</TableHead>
          <TableHead>Periode Kontrak</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell>{employee.name}</TableCell>
            <TableCell>{employee.position}</TableCell>
            <TableCell>{employee.contractPeriod}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>)
  );
}

