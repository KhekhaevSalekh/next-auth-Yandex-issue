Reproduction project for issue: https://github.com/nextauthjs/next-auth/issues/11611.

In this project, you will observe an issue with the Yandex provider. The problem occurs when you are not in the database (not authorized) and attempt to sign in with Yandex. You receive an 'INVALID_GRANT (CODE HAS EXPIRED)' error, even though you are already in the database. To successfully sign in with Yandex, you need to press the sign-in button again. However, the process works as expected for Google and GitHub

Environmen:
```
  System:
    OS: Windows 10 10.0.19045
    CPU: (8) x64 AMD Ryzen 5 1400 Quad-Core Processor
    Memory: 11.94 GB / 23.93 GB
  Binaries:
    Node: 20.16.0 - C:\Program Files\nodejs\node.EXE
    Yarn: 1.22.21 - ~\AppData\Roaming\npm\yarn.CMD
    npm: 10.8.1 - C:\Program Files\nodejs\npm.CMD
  Browsers:
    Edge: Chromium (127.0.2651.74)
    Internet Explorer: 11.0.19041.4355
  npmPackages:
    next: ^14.1.0 => 14.1.0
    next-auth: ^4.24.7 => 4.24.7
    react: ^18 => 18.3.1
```
## Getting Started Adaptor
Set any database and the corresponding adaptor from next-auth.

## Getting Started Yandex Oauth API
Go to https://oauth.yandex.ru and create an app.

For the Redirect URI, enter: http://localhost:3000/api/auth/callback/yandex.

For the Host, enter: http://localhost:3000.

## Getting Started Project
Here is an example of my `.env.local` file:
```
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_HOME_URL=http://localhost:3000

NEXTAUTH_SECRET=

GITHUB_ID=
GITHUB_SECRET=

YANDEX_CLIENT_ID=
YANDEX_CLIENT_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=


HASURA_PROJECT_ENDPOINT=http://localhost:8080/v1/graphql
HASURA_ADMIN_SECRET=myadminsecretkey

```
You can use Google and GitHub IDs and Secrets to verify that they work correctly.

Go to the project folder. Create your `.env.local` file. Run the following commands:
```
npm install
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## What I tried to do to fix this issue: 
I attempted many solutions, but the most significant ones I remember are listed below. I will continue to add more as I recall them and as I try new ones.

- Tried multiple combinations of Next.js and NextAuth versions.
- Investigated whether using HTTP vs. HTTPS affects the problem (I deployed on Vercel).
- Experimented with various parameters for the authorization, token, and userInfo properties of the Yandex adapter.

## What did I notice:
- If you run the project and open it in Google Chrome, then select 'Slow 3G' in the network settings of the DevTools, the issue disappears.

## Different approachs

1) First one is by opening second tab. After this you can choose different ways how you will go:
- stay in second tab 
- close second tab after authorization and continue in the first tab

2) Second one without need of second tab. In Yandex Oauth console change `REDIRECT_URI` to `http://localhost:3000/api/customYandex`. Then in this api you can get url from request and take `code`, `cid`, and other stuff to do some logic and deliver controll to next-auth again. 
  
