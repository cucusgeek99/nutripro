# NutriPro — AI Nutrition Plans Tailored to Your Job

NutriPro generates a personalized **3-day nutrition plan based on your profession** and work conditions, applying **chrononutrition** (meal timing aligned to your work schedule). A night nurse, a sedentary developer, and a construction worker each get a different plan.

Built with **Next.js 15**, **React 19**, and **Google Gemini**.

## Why "based on the job"

Most nutrition apps only ask for age, weight, and goals. NutriPro's premise is that **your job shapes your nutritional needs** — shift hours, where and how fast you eat, equipment access, and physical load. It prompts an "elite nutritionist specialized in workplace nutrition and applied chronobiology" with that full work context.

The form captures:

- **Target profession** (e.g. night nurse, sedentary web developer, BTP laborer)
- Typical work hours / shift pattern → drives chrononutrition timing
- Where meals are eaten (office without kitchen, worksite with microwave, vehicle, canteen)
- Effective break time and equipment access (fridge / microwave / kettle)
- Physical activity level at work
- Country of residence (for locally available ingredients) and cuisine preferences
- Age, health goals, dietary constraints

## How it works

```
form data → build job-specific prompt (chrononutrition + local ingredients)
          → Gemini (streaming)
          → extract structured JSON
          → render plan: risk analysis, priority nutrients,
            3-day meals, alternatives, practical tips, meal-prep
```

The model returns a strict JSON schema: per-job risk analysis (physical + mental), priority nutrients with sources, a full 3-day meal plan with prep time and local ingredients, alternatives, chrononutrition tips, and meal-prep suggestions.

## Features

- **Profession-driven personalization** — the plan adapts to the specific job, not just body metrics.
- **Chrononutrition** — meal timing aligned to work/shift schedule.
- **Localized ingredients** — adapts to the user's country (15+ supported) and cuisine preferences.
- **Streaming generation** — responses stream from Gemini for responsiveness.
- **Dev mock mode** — runs with a realistic simulated plan when no API key is set (`NODE_ENV=development`), so the UI is demoable offline.

## Getting started

```bash
npm install

# add your Gemini API key
echo "GEMINI_API_KEY=your_key_here" > .env

npm run dev   # http://localhost:3000
```

Get a key from [Google AI Studio](https://aistudio.google.com/apikey). Without a key in development, the API returns a simulated plan.

## Tech stack

- **Framework:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4
- **AI:** Google Gemini (`@google/genai`), model `gemini-2.5-flash-preview`
- **Rendering:** `react-markdown` for formatted plan output

## API

`POST /api/nutrition-plan` — body is the form data (`job`, `age`, `healthGoals`, `workHours`, `mealLocations`, `equipmentAccess`, `activityLevel`, `country`, `cuisinePreferences`, `constraints`). Returns `{ nutritionPlan }` as structured JSON.
