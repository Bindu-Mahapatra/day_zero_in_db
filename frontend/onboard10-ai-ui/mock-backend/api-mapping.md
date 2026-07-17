# Mock Backend API Mapping

You can use this as the future FastAPI / Spring Boot contract.

## Suggested endpoints

| Screen | Endpoint | Purpose |
|---|---|---|
| Dashboard | `GET /api/overview/{profileId}` | Readiness, progress, blockers, next best action |
| Joiner Profile | `POST /api/profile/upload` | Upload and analyse joiner document |
| Joiner Profile | `GET /api/profile/{profileId}` | Extracted profile and confidence |
| Missing Info | `GET /api/profile/{profileId}/missing-info` | Missing fields and blockers |
| Journey | `GET /api/journey/{profileId}` | 10-step generated journey |
| Journey | `POST /api/journey/generate` | Generate onboarding journey |
| Step Details | `GET /api/journey/step/{stepId}` | Step requirements, AI analysis, evidence |
| Step Details | `POST /api/journey/step/{stepId}/update` | Update action/checklist state |
| Policy Assistant | `POST /api/policy/chat` | RAG chat answer with citations |
| Policy Assistant | `POST /api/policy/search` | Policy search |
| Trainings | `GET /api/training/recommend/{profileId}` | Training recommendations |
| Access Requests | `GET /api/access/{profileId}` | Access requests and risk |
| Access Requests | `POST /api/access/request` | Submit access request |
| Readiness | `GET /api/readiness/{profileId}` | Score breakdown and blockers |
| Tasks | `GET /api/tasks/{profileId}` | Assigned tasks |
| Tasks | `POST /api/tasks/{taskId}/complete` | Complete task |
| Manager View | `GET /api/manager/summary/{profileId}` | Manager summary and approvals |
| Settings | `GET /api/user/settings` | Notification settings |
| Settings | `PUT /api/user/settings` | Update settings |
| Help | `GET /api/help/faq` | FAQ content |
| Help | `POST /api/help/contact` | Support request |

## JSON-server quick mock

From project root:

```powershell
npx json-server --watch mock-backend/db.json --port 3001
```

Example URLs:

```text
http://localhost:3001/profiles
http://localhost:3001/accessRequests
http://localhost:3001/trainings
http://localhost:3001/missingInfo
```
