"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import JobCard from "@/components/job-card";
import JobForm from "@/components/job-form";
import DeleteConfirmation from "@/components/delete-confirmation";

export default function KarirPage() {
  const [jobs, setJobs] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [deletingJobId, setDeletingJobId] = useState(null);

  useEffect(() => {
    const initialJobs = [
      {
        id: 1,
        title: "Software Engineer",
        description:
          "We are looking for a talented software engineer to join our team.",
        coverImage: "/placeholder.svg",
        openPeriod: { start: "2023-07-01", end: "2023-07-31" },
        applicants: 15,
      },
      {
        id: 2,
        title: "Product Manager",
        description:
          "Seeking an experienced product manager to lead our product development efforts.",
        coverImage: "/placeholder.svg",
        openPeriod: { start: "2023-07-15", end: "2023-08-15" },
        applicants: 8,
      },
    ];
    setJobs(initialJobs);
  }, []);

  const handleAddJob = (newJob) => {
    setJobs([
      ...jobs,
      {
        ...newJob,
        id: jobs.length + 1,
        applicants: 0,
        coverImage: "/placeholder.svg",
      },
    ]);
    setIsFormOpen(false);
  };

  const handleEditJob = (updatedJob) => {
    setJobs(jobs.map((job) => (job.id === updatedJob.id ? updatedJob : job)));
    setEditingJob(null);
  };

  const handleDeleteJob = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
    setDeletingJobId(null);
  };

  return (
    <div className='container mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Manajemen Karir</h1>
      <Button onClick={() => setIsFormOpen(true)} className='mb-4'>
        <PlusIcon className='mr-2 h-4 w-4' /> Tambah Lowongan
      </Button>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onEdit={() => setEditingJob(job)}
            onDelete={() => setDeletingJobId(job.id)}
          />
        ))}
      </div>
      {isFormOpen && (
        <JobForm
          key='add-job'
          onSubmit={handleAddJob}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
      {editingJob && (
        <JobForm
          key={`edit-job-${editingJob.id}`}
          job={editingJob}
          onSubmit={handleEditJob}
          onCancel={() => setEditingJob(null)}
        />
      )}
      {deletingJobId && (
        <DeleteConfirmation
          key={`delete-job-${deletingJobId}`}
          onConfirm={() => handleDeleteJob(deletingJobId)}
          onCancel={() => setDeletingJobId(null)}
        />
      )}
    </div>
  );
}
