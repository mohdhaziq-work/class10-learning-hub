import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";
import DeviceDashboard from "@/components/admin/DeviceDashboard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Live Devices — Admin",
  description: "Live device tracking and remote teacher-board authorization.",
  robots: { index: false, follow: false },
};

export default function AdminDevicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="mt-5 mb-6 flex items-center gap-4 flex-wrap">
        <span className="w-14 h-14 rounded-2xl grid place-items-center text-white bg-slate-900 flex-none">
          <Icon name="radio" size={26} />
        </span>
        <div>
          <h1 className="text-2xl sm:text-[32px] font-extrabold tracking-tight">Live Devices &amp; Remote Authorization</h1>
          <p className="text-ink-soft mt-1 max-w-2xl text-[15px]">
            Every active session on any device, streaming live. Authorize a device as a
            Teacher Board and its whiteboard starts syncing to the public classwork archive.
          </p>
        </div>
        <Link href="/classwork" className="btn-g btn-g-white text-sm sm:ml-auto">
          <Icon name="galleryHorizontal" size={16} /> Classwork archive
        </Link>
      </div>
      <DeviceDashboard />
    </div>
  );
}
