"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, parse } from "date-fns";
import { CalendarIcon, Upload } from "lucide-react";

export default function JobForm({ job, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    coverImage: "",
    openPeriod: {
      start: format(new Date(), "yyyy-MM-dd"),
      end: format(new Date(), "yyyy-MM-dd"),
    },
  });

  useEffect(() => {
    if (job) {
      setFormData({
        ...job,
        openPeriod: {
          start: job.openPeriod.start,
          end: job.openPeriod.end,
        },
      });
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({ ...prevData, coverImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDateChange = (type) => (date) => {
    if (date) {
      setFormData((prevData) => ({
        ...prevData,
        openPeriod: {
          ...prevData.openPeriod,
          [type]: format(date, "yyyy-MM-dd"),
        },
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{job ? "Edit Lowongan" : "Tambah Lowongan"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <Input
            name='title'
            placeholder='Judul Lowongan'
            value={formData.title}
            onChange={handleChange}
            required
          />
          <Textarea
            name='description'
            placeholder='Deskripsi'
            value={formData.description}
            onChange={handleChange}
            required
          />
          <div>
            <label
              htmlFor='coverImage'
              className='block text-sm font-medium text-gray-700 mb-1'>
              Foto Sampul
            </label>
            <div className='flex items-center space-x-2'>
              <Input
                id='coverImage'
                type='file'
                accept='image/*'
                onChange={handleImageUpload}
                className='hidden'
              />
              <Button
                type='button'
                onClick={() => document.getElementById("coverImage")?.click()}>
                <Upload className='mr-2 h-4 w-4' /> Unggah Foto
              </Button>
              {formData.coverImage && (
                <span className='text-sm text-gray-500'>
                  Foto telah diunggah
                </span>
              )}
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Tanggal Mulai
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant='outline'>
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {formData.openPeriod.start
                      ? format(
                          parse(
                            formData.openPeriod.start,
                            "yyyy-MM-dd",
                            new Date()
                          ),
                          "PP"
                        )
                      : "Pilih tanggal"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar
                    mode='single'
                    selected={parse(
                      formData.openPeriod.start,
                      "yyyy-MM-dd",
                      new Date()
                    )}
                    onSelect={handleDateChange("start")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Tanggal Selesai
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant='outline'>
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {formData.openPeriod.end
                      ? format(
                          parse(
                            formData.openPeriod.end,
                            "yyyy-MM-dd",
                            new Date()
                          ),
                          "PP"
                        )
                      : "Pilih tanggal"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar
                    mode='single'
                    selected={parse(
                      formData.openPeriod.end,
                      "yyyy-MM-dd",
                      new Date()
                    )}
                    onSelect={handleDateChange("end")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className='flex justify-end space-x-2'>
            <Button type='button' variant='outline' onClick={onCancel}>
              Batal
            </Button>
            <Button type='submit'>{job ? "Simpan" : "Tambah"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
