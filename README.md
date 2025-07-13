This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Firebase Setup

This project uses Firebase for authentication and Firestore database. For deployment, you need to set up environment variables.

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Firebase Admin SDK (Required for server-side operations)
FIREBASE_PROJECT_ID=lexpert-397f7
FIREBASE_PRIVATE_KEY_ID=your_private_key_id_here
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@lexpert-397f7.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your_client_id_here
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40lexpert-397f7.iam.gserviceaccount.com

# Firebase Client SDK (Public variables)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAvVs9PeQR2mxPAiusi7MAhcGu55rnvm6M
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=lexpert-397f7.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=lexpert-397f7
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=246220375638
NEXT_PUBLIC_FIREBASE_APP_ID=1:246220375638:web:aa483701f005369a225df7
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-64V6H6YEYS
```

### Getting Firebase Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings > Service Accounts
4. Click "Generate new private key"
5. Download the JSON file
6. Copy the values from the JSON file to your environment variables

**Note:** The `FIREBASE_PRIVATE_KEY` should include the entire private key including the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` parts, with `\n` for line breaks.

### Deployment

When deploying to platforms like Vercel, make sure to add these environment variables in your deployment settings.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
