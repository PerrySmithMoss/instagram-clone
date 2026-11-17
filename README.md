# Instagram Clone

A Next.js and Firebase app with posts, comments, likes, profiles, following, and email or social authentication.

## Local setup

Use Node **v26.13.0** and Yarn Classic **1.22.22**.

```sh
nvm use
cp .env.example .env.local
yarn install --frozen-lockfile
yarn dev
```

Replace the example values in `.env.local` with your Firebase web app configuration from Firebase Console → Project settings. Enable the authentication providers you use and configure Firestore and Storage access rules for your own project. Never put service-account keys or OAuth client secrets into `NEXT_PUBLIC_` variables: those values are delivered to the browser.

The app uses hosted Firebase services directly. There is no local database or Docker Compose service to start. The example configuration supports builds and browser tests; it does not connect to a real Firebase project.

## Validation

```sh
yarn run check      # ESLint (no warnings), TypeScript, unit tests, production build
yarn audit          # All dependency severities, including development packages
yarn format:check
yarn playwright install chromium
yarn test:e2e       # Desktop and mobile browser checks against the production build
```

Browser tests stub Firebase Authentication requests, so they do not create accounts or send password-reset emails. Unit tests cover profile preservation, subscription cleanup, following updates, feed queries, and search debouncing. End-to-end authenticated Firebase writes require a configured Firebase test project and are not exercised by these checks.

GitHub Actions runs these checks and CodeQL's `security-and-quality` query suite on pushes and pull requests. Workflow actions are pinned to verified commit SHAs.

## Dependency compatibility

- Next.js 16, React 19, Firebase 13, and Tailwind CSS 4 are used throughout the app.
- TypeScript 7 runs `yarn typecheck`. The `typescript` alias provides Microsoft's TypeScript 6 compatibility API for Next.js and typescript-eslint, which still require that API. See [Microsoft's side-by-side installation guidance](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-6.0).
- Firebase's current Firestore package pins `@grpc/grpc-js` to the vulnerable 1.9 release line. A Yarn resolution selects patched **1.14.7** until Firebase updates that constraint. The full dependency tree is audited in CI.
- The discontinued `faker` package has been replaced with `@faker-js/faker`. Loading indicators use a local SVG component rather than an extra UI dependency.

## Deployment

The Vercel project is `instagram-clone-ohdn`, linked to the `main` branch. Select Node **26.x** in its build settings. Vercel manages minor and patch releases automatically; `.nvmrc` and `package.json` pin the local version to **26.13.0**.

Store the Firebase web configuration in the Vercel project's environment variables. Local `.env` files and browser test output are ignored by Git.
