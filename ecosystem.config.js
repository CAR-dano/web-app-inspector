module.exports = {
  apps: [
    {
      name: "nextjs-app",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 4002",
      env: {
        NODE_ENV: "production",
        NEXT_PUBLIC_PIN: process.env.NEXT_PUBLIC_PIN,
      },
    },
  ],
};
