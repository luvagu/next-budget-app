<p align="center">
  <a href="https://next-budget-app-three.vercel.app/">
    <h1 align="center">Next Budgets & Expenses</h1>
  </a>
</p>

> FaunaDB / Next.js / Auth0 / Tailwind CSS

Full Stack `Budgets & Expenses` app.

## Client-side Features

- Uses SWR for data fetching and chaching
- Data is displayed in cards
- Uses Tailwind CSS framework for styling
- Responsive design
- Only logged in users may add budgets
- Auth0 for user authentication

## Clonning this repo

Pre-requisites: Get a FaunaDB server key and Auth0 credentials and put them in a `.env.local` file in the root directory. See `.env.local.example`

```bash
git clone https://github.com/luvagu/next-budget-app.git

cd next-budget-app

npm install

npm run dev
```
