import type { Metadata } from "next";
import AdminPanel from "@/components/admin/AdminPanel";

export const metadata: Metadata = {
  title: "👨‍🏫 Admin — Content Editor",
  description: "Teachers ke liye chapter content editor — slides, notes, quiz bharo.",
};

export default function AdminPage() {
  return (
    <div className="max-w-6xl mx-auto px-5">
      <div className="mt-5 mb-2">
        <h1 className="text-3xl font-black tracking-tight">👨‍🏫 Admin — Content Editor</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
          Koi bhi chapter chuno, slides / notes / formulas / quiz bharo, <b>Save</b> dabao.
          Firebase connect ho to sab devices par, varna isi device/browser par save hoga.
        </p>
      </div>
      <AdminPanel />
    </div>
  );
}
