# የንስሐ አባት - Spiritual Father Feedback System

This Vite + React application uses the existing Google Form as its only intended storage.

## Google Form verification

Verified from the public form on 2026-11-02:

- Submission endpoint: `https://docs.google.com/forms/d/e/1FAIpQLScHNH8aT6xm1Dh84L6800a8u6bk-gkj9rWBefhvSdXaOlk2Jw/formResponse`
- Academic year entry: `entry.116927091`
- Available academic-year options: First Year through Fifth Year
- Feedback textbox entry: `entry.948915635` (verified from the rendered public form control on 2026-11-02)

The published feedback question is currently labeled with the long Amharic introduction text, and its rendered control is mapped to `entry.948915635`. The browser uses a hidden iframe POST; because Google Forms is cross-origin, the UI reports only that submission was attempted and does not claim confirmation.

## Verification

- Native Google Forms submission: verified with `First Year` and the clearly labeled response `INTEGRATION TEST - Spiritual Father Feedback - 2026-11-02T14:13`; Google displayed its response confirmation page.
- React submission: verified with `First Year` and `INTEGRATION TEST FROM REACT - 2026-11-02T14:13`; the app displayed its intentional `submission attempted` state.
- The React app does not claim that a cross-origin iframe response is confirmed.

To verify the React test in the Responses tab, sign in as the form owner, open the form, select **Responses**, and locate the feedback text beginning `INTEGRATION TEST FROM REACT`. No password or credential is required by this application.

To obtain the missing ID, open the form editor, add or confirm a required paragraph question for feedback, then use the public form page source or browser developer tools to find the corresponding `name="entry.<number>"`. Update `src/services/googleFormsService.js` only after confirming the label and ID match.

## Run

```bash
npm install
npm run dev
npm run build
```
