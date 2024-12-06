"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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

export default function AddEmployeeButton({
  onAddEmployee,
  employeeToEdit,
  onEditEmployee,
}) {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    contractPeriod: "",
  });

  useEffect(() => {
    if (employeeToEdit) {
      setFormData({
        name: employeeToEdit.name,
        position: employeeToEdit.position,
        contractPeriod: employeeToEdit.contractPeriod,
      });

      // Parse contract period dates
      const [start, end] = employeeToEdit.contractPeriod
        .split(" - ")
        .map((date) => new Date(date));
      setStartDate(start);
      setEndDate(end);
    }
  }, [employeeToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const contractPeriod = `${format(startDate, "yyyy-MM-dd")} - ${format(
      endDate,
      "yyyy-MM-dd"
    )}`;

    if (employeeToEdit) {
      onEditEmployee({
        ...employeeToEdit,
        ...formData,
        contractPeriod,
      });
    } else {
      onAddEmployee({
        id: Date.now(),
        ...formData,
        contractPeriod,
      });
    }
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: "", position: "", contractPeriod: "" });
    setStartDate(null);
    setEndDate(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen);
        if (!newOpen) resetForm();
      }}>
      <DialogTrigger asChild>
        <Button>
          {employeeToEdit ? "Edit Karyawan" : "Input Karyawan Baru"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {employeeToEdit ? "Edit Karyawan" : "Tambah Karyawan Baru"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
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
  );
}
