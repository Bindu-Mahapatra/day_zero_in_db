# Onboard10 AI UI

Angular mock UI for the Deutsche Bank Hackathon idea: **Onboard10 AI — Ten intelligent gates to day-one readiness**.

This project is intentionally frontend-first. It uses Angular standalone components and a central mock state service. No real backend is required for the first demo.

## What is included

- Angular UI with routing
- Mock onboarding case data
- Central state service that simulates backend behaviour
- Joiner dashboard
- Profile analysis
- Missing information
- 10-step journey
- Step details with AI analysis and policy evidence
- Policy Assistant mock chat
- Trainings
- Access requests
- Readiness score
- Manager control tower
- Reports / audit trail
- Mock backend JSON and API mapping

## Run locally on Windows

Install Node.js LTS first.

```powershell
npm install -g @angular/cli
```

From this folder:

```powershell
npm install
npm start
```

Open:

```text
http://localhost:4200
```

## Main demo path

1. Login
2. Dashboard
3. Profile Analysis
4. 10-Step Journey
5. Open Step 3: GitHub Access
6. Assign reviewer
7. Manager View
8. Approve GitHub access
9. Readiness increases from 73% to 86%

## Important files

```text
src/app/core/mock-data/onboarding-case.mock.ts
src/app/core/services/onboarding-state.service.ts
src/app/core/models/onboarding.models.ts
mock-backend/db.json
mock-backend/api-mapping.md
```

## Future backend integration

Replace `OnboardingStateService` methods with HTTP calls to FastAPI or Spring Boot.

Suggested endpoint mapping is available in:

```text
mock-backend/api-mapping.md
```
