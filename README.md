# AI Product Detail Page Platform

This monorepo contains a Strapi CMS, Next.js frontend, n8n orchestrator and infrastructure for an AI powered product detail page SaaS.

## Setup

```bash
npm install # or yarn install in each package
```

```bash
docker-compose -f infra/docker-compose.yml up --build
```

### Adding a new template in GrapesJS
1. Log in to the Strapi admin panel at `/cms/admin`.
2. Open the GrapesJS editor field and save your template JSON under the `htmlBuilder` field.

### Triggering AI Generation
- Create a new Product entry in Strapi. The n8n workflow will automatically generate copy and images using OpenAI and update the entry.
- You can also click the **AI Generate** button on a product page which calls `/api/generate` to trigger generation manually.
