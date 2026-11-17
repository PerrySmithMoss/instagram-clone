import Head from "next/head";
import Link from "next/link";
import { Brand } from "../components/SiteIdentity";

export default function About() {
  return (
    <>
      <Head>
        <title>About this demo | Photo Journal</title>
      </Head>
      <main className="mx-auto max-w-2xl px-6 py-10 text-slate-700">
        <Link href="/" aria-label="Photo Journal home">
          <Brand />
        </Link>
        <h1 className="mt-8 text-3xl font-bold text-slate-900">
          About this demo
        </h1>
        <p className="mt-4 leading-7">
          Photo Journal is an independent photo-sharing project by Perry
          Smith-Moss, with posts, comments, likes, profiles, and following. Its
          source repository is named instagram-clone. It is not Instagram and is
          not affiliated with or endorsed by Instagram, Meta, or Facebook.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-slate-900">
          Accounts belong to this app
        </h2>
        <p className="mt-3 leading-7">
          Instagram accounts cannot be used in this app&apos;s email and
          password form. Create a separate Photo Journal account and use a
          unique password. Never enter your Instagram password here. Password
          reset only applies to a Photo Journal account.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-slate-900">
          How sign-in and data work
        </h2>
        <p className="mt-3 leading-7">
          Email and password sign-in and password reset requests go directly to
          Firebase Authentication. Google and Facebook sign-in open the
          provider&apos;s sign-in and consent flow through Firebase; this app
          does not ask you to type those providers&apos; passwords into its own
          forms.
        </p>
        <p className="mt-3 leading-7">
          The app stores your email address, display name, username, and profile
          photo in its Firebase user profile. Posts, comments, likes, and
          following activity are stored in Firestore, and uploaded post images
          are stored in Firebase Storage. Profile information and social content
          are shown to other signed-in users. Avoid uploading sensitive
          information to this demo. Account passwords are handled by Firebase
          Authentication and are not written to profile documents by the app.
        </p>
        <p className="mt-6 leading-7">
          The implementation is available in the{" "}
          <a
            className="font-semibold text-teal-800 underline underline-offset-2"
            href="https://github.com/PerrySmithMoss/instagram-clone"
          >
            source repository
          </a>
          .
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white"
        >
          Back to Photo Journal
        </Link>
      </main>
    </>
  );
}
