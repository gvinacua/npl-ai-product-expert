# NPL AI Product Expert

Internal prototype for an AI expert speaker and trainer focused on AI product design, build and governance for financial services.

## What this is
A Next.js web app using the OpenAI Responses API. It has four initial modes:

1. Speaker Mode
2. Training Designer
3. Panel / Q&A Expert
4. AI Sparring Partner

It is designed to be deployed from GitHub to Vercel and later extended with:

- knowledge base upload
- voice mode
- event/rehearsal mode
- human control dashboard

## Quick start

```bash
npm install
cp .env.example .env.local
# add OPENAI_API_KEY and APP_PASSWORD
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Import repo into Vercel.
3. Add environment variables:
   - OPENAI_API_KEY
   - OPENAI_MODEL
   - APP_PASSWORD
   - OPENAI_VECTOR_STORE_ID, optional at first
4. Deploy.

## Knowledge base

Put `.md`, `.txt`, `.pdf`, `.docx` files in `/knowledge`.

Then run:

```bash
npm run kb:create-vector-store
# copy the returned OPENAI_VECTOR_STORE_ID into .env.local
npm run kb:upload
```

## First test prompts

### Speaker
Create a 25-minute guest speaker talk for a financial services audience on: From AI tools to AI products. Include storyline, key messages, examples, and speaker notes.

### Training
Design a half-day training for an insurer on how to identify, design, test and manage AI products.

### Panel
Prepare 10 panel answers of 90 seconds each on AI adoption, AI product management, agents, risk and governance in financial services.

### Sparring
Challenge our current thinking: what are we likely getting wrong if we want to build an AI Expert Speaker for financial services training?
