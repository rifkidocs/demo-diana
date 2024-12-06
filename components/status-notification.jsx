import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Bell } from 'lucide-react'

export function StatusNotification({
  title,
  description
}) {
  return (
    (<Alert>
      <Bell className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>)
  );
}

