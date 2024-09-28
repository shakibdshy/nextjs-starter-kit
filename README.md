# Next.js Starter Kit

Welcome to the Next.js Starter Kit, an open-source template designed to help you build high-performance, maintainable, and enjoyable applications. This template comes pre-configured with a variety of tools and features to accelerate your development process.

## Features

- **Next.js**: The React framework for production.
- **TypeScript**: Strongly typed programming language that builds on JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **ESLint**: A tool for identifying and fixing problems in JavaScript code.
- **Prettier**: An opinionated code formatter.
- **NextAuth.js v5**: Authentication for Next.js applications.
- **NextUI**: A React UI library for building modern web applications.
- **Drizzle ORM**: A lightweight TypeScript ORM for SQL databases.
- **Neon DB**: Neon is a serverless open-source database that allows you to build and deploy databases with a few clicks.

## Table of Contents

- [Next.js Starter Kit](#nextjs-starter-kit)
  - [Features](#features)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Development Server](#running-the-development-server)
    - [Building for Production](#building-for-production)
    - [Starting the Production Server](#starting-the-production-server)
  - [Deployment](#deployment)
  - [Scripts Overview](#scripts-overview)
  - [State Management](#state-management)
    - [Zustand](#zustand)
    - [Jotai](#jotai)
    - [Recoil](#recoil)
  - [Environment Variables Handling](#environment-variables-handling)
  - [Contribution](#contribution)
  - [Support](#support)
  - [License](#license)

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (>= 14.x)
- [npm](https://www.npmjs.com/) (>= 6.x) or [yarn](https://yarnpkg.com/) (>= 1.x)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/nextjs-starter-template.git
   ```

2. Navigate to the project directory:

   ```bash
   cd nextjs-starter-template
   ```

3. Install the dependencies:

   ```bash
   npm install
   # or
   bun install
   ```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To create an optimized production build, run:

```bash
npm run build
# or
bun build
```

This will create a `build` directory with the production build of your application.

### Starting the Production Server

After building the application, you can start the production server with:

```bash
npm run start
# or
bun start
```

## Deployment

Instructions for deploying the application will go here.

## Scripts Overview

- `bun dev`: Starts the development server.
- `bun build`: Builds the application for production.
- `bun start`: Starts the production server.
- `bun lint`: Runs ESLint to identify and fix problems in the code.
- `bun db:generate`: Generates the database schema.
- `bun db:migrate`: Migrates the database schema.
- `bun db:studio`: Opens the Neon DB Studio.
- `bun db:push`: Pushes the database schema to the Neon DB.
-

## State Management

### Zustand

Details about using Zustand for state management will go here.

### Jotai

Details about using Jotai for state management will go here.

### Recoil

Details about using Recoil for state management will go here.

## Environment Variables Handling

[T3 Env](https://env.t3.gg/) is a library that provides environmental variables checking at build time, type validation and transforming. It ensures that your application is using the correct environment variables and their values are of the expected type. You’ll never again struggle with runtime errors caused by incorrect environment variable usage.

Config file is located at env.mjs. Simply set your client and server variables and import env from any file in your project.

```env
export const env = createEnv({
    server: {
        NODE_ENV: z.enum(["development", "production"]),
        DB_HOST: z.string(),
        DB_USER: z.string(),
        DB_PASSWORD: z.string(),
        DB_NAME: z.string(),
        DB_PORT: z.coerce.number(),
        DATABASE_URL: z.string().url(),
    },
    emptyStringAsUndefined: true,
    experimental__runtimeEnv: process.env,
})
```

If the required environment variables are not set, you'll get an error message:

```bash
  ❌ Invalid environment variables: { SECRET_KEY: [ 'Required' ] }
```

## Contribution

Contributions are always welcome! To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch with a descriptive name.
3. Push your changes to the forked repository.
4. Create a pull request, and we'll review your changes.

## Support

For support, please open an issue on the GitHub repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
