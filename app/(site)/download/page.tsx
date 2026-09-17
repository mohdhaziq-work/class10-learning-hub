import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Download Apps — Class 10 Learning Hub",
  description: "Get Class 10 Learning Hub on Android (APK) and Windows (desktop app). Free forever, works offline-first.",
  robots: { index: true, follow: true },
};

export default function DownloadPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <div className="mt-6 mb-8 flex items-center gap-4">
        <span className="w-14 h-14 rounded-2xl grid place-items-center text-white bg-slate-900 flex-none">
          <Icon name="download" size={26} />
        </span>
        <div>
          <h1 className="text-2xl sm:text-[32px] font-extrabold tracking-tight">Download the apps</h1>
          <p className="text-ink-soft mt-1 text-[15px]">Same Smart Board, same progress — installed on your device.</p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 pb-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col">
          <span className="w-12 h-12 rounded-2xl grid place-items-center bg-[#e8f0fe] text-[#1a73e8]"><Icon name="smartphone" size={24} /></span>
          <h2 className="text-[20px] font-extrabold tracking-tight mt-4">Android app (APK)</h2>
          <p className="text-ink-soft text-[14px] mt-2 leading-relaxed">
            Phones, tablets and smart boards. Fullscreen WebView shell — smoother writing,
            screen stays on, no browser chrome. Install once, updates flow from the site itself.
          </p>
          <ul className="mt-4 space-y-1.5 text-[13px] text-ink-soft">
            <li className="flex items-center gap-2"><Icon name="check" size={14} className="text-emerald-600" /> Works on Android 7+</li>
            <li className="flex items-center gap-2"><Icon name="check" size={14} className="text-emerald-600" /> Smart Board optimized</li>
            <li className="flex items-center gap-2"><Icon name="check" size={14} className="text-emerald-600" /> ~5 MB, no Play Store needed</li>
          </ul>
          <a href="/downloads/class10-learning-hub.apk" download className="btn-g btn-g-dark mt-6 justify-center text-[15px]">
            <Icon name="download" size={17} /> Download APK
          </a>
          <p className="text-[11.5px] text-ink-mute mt-3">After download, open the file and allow &quot;install unknown apps&quot;.</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col">
          <span className="w-12 h-12 rounded-2xl grid place-items-center bg-[#e8f0fe] text-[#1a73e8]"><Icon name="monitorSmartphone" size={24} /></span>
          <h2 className="text-[20px] font-extrabold tracking-tight mt-4">Windows desktop app</h2>
          <p className="text-ink-soft text-[14px] mt-2 leading-relaxed">
            For laptops and classroom PCs. One portable .exe — no installer steps, double-click
            and the hub opens in its own window. External links open in your browser.
          </p>
          <ul className="mt-4 space-y-1.5 text-[13px] text-ink-soft">
            <li className="flex items-center gap-2"><Icon name="check" size={14} className="text-emerald-600" /> Windows 10 / 11</li>
            <li className="flex items-center gap-2"><Icon name="check" size={14} className="text-emerald-600" /> Portable — runs from anywhere</li>
            <li className="flex items-center gap-2"><Icon name="check" size={14} className="text-emerald-600" /> Keyboard-friendly board</li>
          </ul>
          <a href="https://github.com/mohdhaziq-work/class10-learning-hub/releases" target="_blank" rel="noreferrer" className="btn-g btn-g-dark mt-6 justify-center text-[15px]">
            <Icon name="externalLink" size={16} /> Download for Windows
          </a>
          <p className="text-[11.5px] text-ink-mute mt-3">Pick the latest release — file: Class10-Learning-Hub-Windows.exe</p>
        </div>
      </div>
    </div>
  );
}
