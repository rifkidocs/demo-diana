import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Briefcase, Users, Brain, Building2 } from "lucide-react";
import { sidebarItems } from "@/lib/constants";

export function DashboardSidebar() {
  return (
    <div className='hidden border-r bg-muted/40 lg:block lg:w-64'>
      <ScrollArea className='h-full py-6'>
        <div className='space-y-4 py-4'>
          <div className='px-3 py-2'>
            <Link href='/dashboard'>
              <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight cursor-pointer hover:underline'>
                Dashboard
              </h2>
            </Link>
            <div className='space-y-1'>
              {sidebarItems.map((item) => (
                <Button
                  key={item.name}
                  variant='ghost'
                  className='w-full justify-start'
                  asChild>
                  <Link href={item.href}>
                    <item.icon className='mr-2 h-4 w-4' />
                    {item.name}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
