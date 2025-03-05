# Link shortener

[DEMO](https://link-shortener-omega-ten.vercel.app/)

![Application Logo](https://github.com/c3sare/link-shortener/assets/80517943/826cc31e-8128-480a-bfc3-c5b3b4f2edee)

![Desktop Performance](https://github.com/user-attachments/assets/fd8f6537-6036-44d3-83d0-b4a46a1b4ba4)

![Mobile performance](https://github.com/user-attachments/assets/a656ab7a-2b2f-408d-909f-0fc7d1dcf0b2)


## Created using these technologies.

- TypeScript
- Next.js 15
- Next-auth v5
- Drizzle ORM
- TailwindCSS
- Shadcn/ui
- React-hook-form
- Next-safe-actions
- Valibot
- Next-intl

## Features

- Supported i18n (Polish, English)
- Light/dark mode of website
- Creating shorter links
- Signing in with google, github
- Adding created links to used account and deleting them
- Created links list with statistics (with ip, redirect count, city, country, continent, time)
- Adding link with pass code and managing it
- Adding title and description for links

## Planned features

- Adding labels for links
- Sorting links by create time (desc and asc)
- Filtering links by label, title, description
- Links pagination on "/profile" page

## How to reproduce project

### 1. Clone repository using git

`git clone https://github.com/c3sare/link-shortener`

### 2. Install dependencies

`bun install`

### 3. Add env variables

```
DATABASE_URL=
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
```

`DATABASE_URL` is a url to your postgres neon database

`AUTH_SECRET` is a key to encode and decode your JWT AUTH TOKEN, generate it with `openssl rand -base64 33`

`AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET`, its important to sign in with Google account, you can generate keys using google cloud console, [tutorial how to do this](https://youtu.be/OKMgyF5ezFs?si=2j5cEAy0B7D0wojU)

`AUTH_GITHUB_ID` and `AUTH_GITHUB_SECRET`, its important to sign in with GitHub account, you can generate keys using your github account, [tutorial how to do this](https://youtu.be/v2u8EDGFVpo?si=n__lvjOkKr_Gag52)

### 4. Start your project

`bun run dev`
