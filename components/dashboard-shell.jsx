export function DashboardShell({ children }) {
  return (
    <div className='flex-1 space-y-4 md:p-8 md:pt-6 p-4 overflow-auto'>
      <div className='grid gap-4'>{children}</div>
    </div>
  );
}
