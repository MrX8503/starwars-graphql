# Turborepo non-monorepo starter

This is an official starter Turborepo.

## What's inside?

This Turborepo uses a single, non-monorepo project (in this case, a single Next.js application). Since [Turborepo 1.6](https://turbo.build/blog/turbo-1-6-0#any-codebase-can-use-turborepo), you can use Turborepo for non-monorepo projects as well as monorepos.

## Using this example

Run the following command:

```sh
npx degit vercel/turbo/examples/non-monorepo non-monorepo
cd non-monorepo
pnpm install
git init . && git add . && git commit -m "Init"
```

### Build

To build all apps and packages, run the following command:

```
pnpm turbo build
```

### Develop

To develop all apps and packages, run the following command:

```
pnpm turbo dev
```

## Useful Links

GraphQL Codegen

- [Client Preset](https://the-guild.dev/graphql/codegen/plugins/presets/preset-client)

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
