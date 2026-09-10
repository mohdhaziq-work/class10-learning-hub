import type { Metadata } from "next";
import AdminPanel from "@/components/admin/AdminPanel";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
 title: "Admin — Content Editor",
 description: "Chapter content editor for teachers — fill slides, notes, and quizzes.",
};

export default function AdminPage() {
 return (
 <div className="max-w-7xl mx-auto px-4 sm:px-6">
 <div className="mt-5 mb-4 flex items-center gap-4">
 <span className="w-14 h-14 rounded-2xl grid place-items-center text-white bg-slate-900 flex-none">
 <Icon name="shieldCheck" size={28} />
 </span>
 <div>
 <h1 className="text-2xl sm:text-[32px] font-extrabold tracking-tight">Admin — Content Editor</h1>
 <p className="text-ink-soft mt-1 max-w-2xl text-[15px]">
 Pick any chapter, fill in slides / notes / formulas / quiz, and press Save.
 With Firebase connected it syncs to all devices, otherwise it saves on this device.
 </p>
 </div>
 </div>
 <AdminPanel />
 </div>
 );
}
