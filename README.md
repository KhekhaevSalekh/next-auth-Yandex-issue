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
## Getting Started Hasura

1. Setup Hasura using Docker Compose:
- Ensure you have Docker installed on your system.
- Navigate to the `Hasura` folder where your `docker-compose.yaml` file is located.

2. Modify docker-compose.yaml:
- Open the docker-compose.yaml file.
- Locate the environment variable `PG_DATABASE_URL` (I'm using neon.tech. It is free and easy to setup).
- Input the correct `PG_DATABASE_URL` for your Postgres database.
  
3. Run Hasura:

- Open a terminal and navigate to the Hasura folder.
- Run the following command to start Hasura:
```bash
docker-compose up
```

4. Access Hasura Console:
- After Hasura is running, open your web browser and go to the Hasura console.
- Click on the SQL button in the console.
- Input SQL Code:

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;

SET check_function_bodies = false;

CREATE TABLE public.accounts (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at bigint,
    token_type text,
    scope text,
    id_token text,
    session_state text,
    oauth_token_secret text,
    oauth_token text,
    "userId" uuid NOT NULL,
    refresh_token_expires_in bigint
);

CREATE TABLE public.sessions (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    "sessionToken" text NOT NULL,
    "userId" uuid NOT NULL,
    expires timestamptz
);

CREATE TABLE public.users (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text,
    email text,
    "emailVerified" timestamptz,
    image text
);

CREATE TABLE public.verification_tokens (
    token text NOT NULL,
    identifier text NOT NULL,
    expires timestamptz
);

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.verification_tokens
    ADD CONSTRAINT verification_tokens_pkey PRIMARY KEY (token);

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE CASCADE;

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE CASCADE;
```
and click RUN. 

After this, you need to add all suggested relationships for the four tables. To do this, select a table and click on the Relationships button. You will see the suggested relationships, which you can then add.

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

## Solutions:
- I found a solution where clicking the SIGN IN button opens the website in a new tab. However, this behavior isn't ideal. The website should open in the same tab instead.
