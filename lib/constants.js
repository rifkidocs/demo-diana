import { Briefcase, Users, Brain, Building2 } from "lucide-react";

export const sidebarItems = [
  {
    name: "Manajemen Karir",
    icon: Briefcase,
    href: "/dashboard/karir",
  },
  { name: "Manajemen Kandidat", icon: Users, href: "/dashboard/kandidat" },
  {
    name: "Manajemen Psikotes",
    icon: Brain,
    href: "/dashboard/psikotest",
  },
  { name: "Manajemen Karyawan", icon: Building2, href: "/dashboard/karyawan" },
];