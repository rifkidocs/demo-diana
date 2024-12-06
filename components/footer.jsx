import { ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className='w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex flex-col-reverse md:flex-row h-auto md:h-14 items-center justify-between py-4 md:py-2 space-y-2 md:space-y-0'>
        {/* Left Section */}
        <div className='flex flex-col items-center md:flex-row md:items-center'>
          <p className='mx-6 text-center md:text-left text-sm text-muted-foreground'>
            © 2024 Company Name. All rights reserved. v0.1.0
          </p>
        </div>

        {/* Right Section */}
        <nav className='flex flex-col items-center md:flex-row md:space-x-4'>
          <a href='#' className='text-sm text-muted-foreground hover:underline'>
            Dokumentasi
          </a>
          <a
            href='#'
            className='text-sm text-muted-foreground hover:underline flex items-center'>
            Bantuan Teknis
            <ExternalLink className='ml-1 h-3 w-3' />
          </a>
        </nav>
      </div>
    </footer>
  );
}
