# Vercel review notes

## Confirmed facts

- Project: `instagram-clone-ohdn`, team `perrysmithmoss-projects`.
- Production URL: <https://instagram-clone-xi-eight.vercel.app/>.
- The original email, “Regarding your use of Vercel,” was sent by `notifications@vercel.com` on 3 August 2026 at 20:13 UK time. It says the project was suspended for a Terms of Service violation and lists common causes (resource use, prohibited content, and acceptable use). It does **not** identify the specific cause for this project.
- On 17 November 2026 the dashboard still showed “This project has been flagged for abuse”; production returned HTTP 451 / `DEPLOYMENT_DISABLED`, and deployment creation returned HTTP 400 before building.
- Vercel Safety Support acknowledged an appeal on 17 November 2026 at 12:48 UK time: an existing support case. No review decision was found during this investigation.
- Project Node is set to `26.x`; the old production deployment used Node 16. The suspension predates the current Node and dependency updates.

## Source review and likely concern

The old deployed commit (`c10472f08636a4d0448df5f0eba0e26ad9518296`) and the updated source use Firebase's email/password and OAuth SDK flows. The reviewed authentication code sends email/password sign-in and registration to Firebase Authentication, does not write passwords into Firestore profiles, and contains no custom credential-forwarding endpoint. This source review does not establish the contents of historical traffic, uploaded user content, or deployed Firebase access rules.

The old public interface copied Instagram's wordmark, app screenshots, store download badges, page titles, and policy links around working email/password forms without clearly identifying the independent operator. This can look like impersonation or phishing to a visitor or reviewer. It is the strongest concern identified in the source, **not a confirmed explanation from Vercel**. Vercel's [Acceptable Use Policy](https://vercel.com/legal/acceptable-use-policy) prohibits impersonation, phishing, and infringement of others' rights. Its [paused deployment guidance](https://vercel.com/kb/guide/why-is-my-account-deployment-blocked) says policy restrictions need to be addressed with Vercel.

## Prepared changes

- Distinct Photo Journal identity, favicon, page titles, and shared project footer.
- Removed the copied Instagram wordmark assets, promotional screenshots, store badges, and misleading Meta/Instagram policy links.
- A visible independent-demo notice on every page, including the initial server response.
- A warning beside authentication forms to use separate demo accounts and never enter an Instagram password.
- A public `/about` page describing the operator, relationship to the original repository, Firebase authentication, and stored profile/social data; available without JavaScript or authentication.
- Form submit handlers for keyboard and mouse input, with tests checking that dummy passwords go only to Firebase Authentication. Existing Firebase account functionality remains.

These changes must be reviewed in the source branch until Vercel permits a new deployment. The currently blocked production deployment does not contain them. Only Vercel can decide whether they satisfy its requirements or whether it needs other changes.

## Validation and screenshots

Validated locally on Node v26.13.0: ESLint with no warnings, TypeScript, all 13 unit tests, production build, formatting, and all 16 desktop/mobile browser tests. The browser suite stubs Firebase authentication; no real accounts were created and no reset emails were sent. Live Google/Facebook consent and deployed Firebase rules were not tested.

The screenshots below show the prepared source running locally, not the blocked production deployment:

- [Login](review-images/login.png)
- [Signup](review-images/sign-up.png)
- [Password reset](review-images/reset.png)

## External configuration to check before public use

Review the Firebase Authentication email template display name and Google/Facebook OAuth app names, consent screens, and authorized domains so they identify the independent Photo Journal app accurately. Those external provider settings were not changed as part of this source update. Review live Firebase access rules and uploaded content if Vercel identifies data exposure or user content as the reason. Do not create another project or domain to route around the restriction.

## Proposed follow-up for the existing case (not sent)

> Regarding the existing appeal for project instagram-clone-ohdn: I found the original 3 August suspension email, but it lists only generic policy reasons. Could you identify the specific violation and the evidence or changes needed for reinstatement? We have prepared source changes giving the app a distinct Photo Journal identity, removing copied Instagram promotional assets and policy links, and adding visible non-affiliation and separate-account warnings plus a public account/data explanation. Authentication uses Firebase's standard SDK flows; the reviewed app code does not write passwords to profile documents or forward them to a custom endpoint. The project remains blocked from deployment, so these changes are not yet live. Please advise how you would like to review the updated source and whether additional remediation is required.

Attach the source branch or pull request and screenshots of the updated login, signup, and reset pages when sending an authorized follow-up. Do not include credentials, environment files, user records, or browser cookies.
