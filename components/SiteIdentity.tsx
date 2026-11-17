import Link from "next/link";

export const Brand = () => (
  <span className="inline-flex items-center gap-2 whitespace-nowrap text-xl font-bold tracking-tight text-slate-800">
    <span
      aria-hidden="true"
      className="grid h-8 w-8 place-items-center rounded-lg bg-teal-700 text-sm font-bold text-white"
    >
      PJ
    </span>
    Photo Journal
  </span>
);

export const SiteNotice = () => (
  <aside
    aria-label="Independent demo notice"
    className="border-b border-teal-200 bg-teal-50 px-4 py-3 text-center text-sm leading-6 text-teal-950"
  >
    <strong>Photo Journal is an independent photo-sharing demo.</strong> It is
    not affiliated with Instagram, Meta, or Facebook.{" "}
    <Link href="/about" className="font-semibold underline underline-offset-2">
      About this demo
    </Link>
  </aside>
);

export const DemoAccountNotice = () => (
  <p className="mx-8 mb-5 rounded-lg bg-teal-50 p-3 text-sm leading-5 text-teal-950">
    Use an account created for Photo Journal. Do not enter your Instagram
    password. When creating an account, choose a separate password for this
    demo.
  </p>
);

export const SiteFooter = () => (
  <footer className="border-t bg-gray-50 px-5 py-6 text-center text-sm leading-6 text-slate-600">
    <p>Photo Journal · An independent project by Perry Smith-Moss</p>
    <nav
      aria-label="Project information"
      className="mt-2 flex justify-center gap-5"
    >
      <Link href="/about" className="underline underline-offset-2">
        About &amp; account information
      </Link>
      <a
        href="https://github.com/PerrySmithMoss/instagram-clone"
        className="underline underline-offset-2"
      >
        Source code
      </a>
    </nav>
  </footer>
);
