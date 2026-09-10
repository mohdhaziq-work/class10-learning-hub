import type { Metadata } from "next";
import AdminPanel from "@/components/admin/AdminPanel";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Admin — Content Editor",
  description: "Teachers ke liye chapter content editor — slides, notes, quiz bharo.",
};

export default function AdminPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="mt-5 mb-4 flex items-center gap-4">
        <span className="w-14 h-14 rounded-2xl grid place-items-center text-white shadow-lift bg-gradient-to-br from-brand-600 to-violet-600">
          <Icon name="shieldCheck" size={28} />
        </span>
        <div>
          <h1 className="font-display text-2xl sm:text-[32px] font-extrabold tracking-tight">Admin — Content Editor</h1>
          <p className="text-ink-soft dark:text-slate-300 mt-1 max-w-2xl text-[15px]">
            Koi bhi chapter chuno, slides / notes / formulas / quiz bharo, Save dabao.
            Firebase connect ho to sab devices par, varna isi device par save hoga.
          </p>
        </div>
      </div>
      <AdminPanel />
    </div>
  );
}
