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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
  });

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setFormData({
      name: employee.name,
      position: employee.position,
    });
    const [start, end] = employee.contractPeriod
      .split(" - ")
      .map((date) => new Date(date));
    setStartDate(start);
    setEndDate(end);
    setEditDialogOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const contractPeriod = `${format(startDate, "yyyy-MM-dd")} - ${format(
      endDate,
      "yyyy-MM-dd"
    )}`;

    const updatedEmployee = {
      ...selectedEmployee,
      ...formData,
      contractPeriod,
    };

    onEditEmployee(updatedEmployee);
    setEditDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: "", position: "" });
    setStartDate(null);
    setEndDate(null);
    setSelectedEmployee(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
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
                    onClick={() => handleEditClick(employee)}>
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

      {/* Dialog Edit */}
      <Dialog
        open={editDialogOpen}
        onOpenChange={(open) => {
          setEditDialogOpen(open);
          if (!open) resetForm();
        }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Karyawan</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className='space-y-4'>
            <div>
              <Label htmlFor='name'>Nama</Label>
              <Input
                id='name'
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor='position'>Jabatan</Label>
              <Input
                id='position'
                value={formData.position}
                onChange={handleChange}
                required
              />
            </div>
            <div className='space-y-2'>
              <Label>Periode Kontrak</Label>
              <div className='flex gap-2'>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}>
                      <CalendarIcon className='mr-2 h-4 w-4' />
                      {startDate
                        ? format(startDate, "dd/MM/yyyy")
                        : "Tanggal Mulai"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <Calendar
                      mode='single'
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}>
                      <CalendarIcon className='mr-2 h-4 w-4' />
                      {endDate
                        ? format(endDate, "dd/MM/yyyy")
                        : "Tanggal Selesai"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <Calendar
                      mode='single'
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <Button
              type='submit'
              disabled={
                !startDate || !endDate || !formData.name || !formData.position
              }>
              Simpan
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
