import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

export default function JobCard({ job, onEdit, onDelete }) {
  const formatPeriod = (period) => {
    if (!period) return "";
    return `${period.start} - ${period.end}`;
  };

  return (
    <Card className='overflow-hidden'>
      <Image
        src={job.coverImage}
        alt={job.title}
        width={400}
        height={200}
        className='w-full h-48 object-cover'
      />
      <CardContent className='p-4'>
        <h2 className='text-xl font-semibold mb-2'>{job.title}</h2>
        <p className='text-sm text-gray-600 mb-2'>{job.description}</p>
        <p className='text-sm text-gray-600 mb-2'>
          Periode: {formatPeriod(job.openPeriod)}
        </p>
        <p className='text-sm text-gray-600'>Pendaftar: {job.applicants}</p>
      </CardContent>
      <CardFooter className='flex justify-end space-x-2 p-4'>
        <Button variant='outline' size='sm' onClick={onEdit}>
          <Edit className='h-4 w-4 mr-2' /> Edit
        </Button>
        <Button variant='destructive' size='sm' onClick={onDelete}>
          <Trash className='h-4 w-4 mr-2' /> Hapus
        </Button>
      </CardFooter>
    </Card>
  );
}
