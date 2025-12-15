# Testing Guide - Recruitment-Onboarding-Offboarding Backend

## Overview
This guide explains how to test and verify that all 36 newly implemented API endpoints work correctly.

---

## Prerequisites

### 1. Start MongoDB
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start if not running
sudo systemctl start mongod
```

### 2. Install Dependencies
```bash
cd "/Users/seif/Desktop/Ms2&/hr-recruitment-onboarding-offboarding-subsystem/backend"
npm install
```

### 3. Configure Environment
Create/check `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/hr-system
PORT=3000
```

### 4. Start the Server
```bash
npm run start:dev
```

**Expected Output:**
```
[Nest] INFO [NestFactory] Starting Nest application...
[Nest] INFO [InstanceLoader] AppModule dependencies initialized
[Nest] INFO [NestApplication] Nest application successfully started
```

---

## Testing Methods

### Option 1: Using Postman (Recommended)

1. Download Postman: https://www.postman.com/downloads/
2. Create a new collection: "HR Recruitment API"
3. Set base URL: `http://localhost:3000/recruitment`
4. Use the requests below

### Option 2: Using cURL (Command Line)

All examples below use cURL for easy copy-paste testing.

### Option 3: Using VS Code REST Client

Install "REST Client" extension and create `test.http` file with the requests below.

---

## 1. CONTRACTS Module (6 Endpoints)

### 1.1 Create Contract
```bash
curl -X POST http://localhost:3000/recruitment/contracts \
  -H "Content-Type: application/json" \
  -d '{
    "applicationId": "6751234567890abcdef12345",
    "contractType": "Full-Time",
    "startDate": "2025-01-01",
    "endDate": "2026-01-01",
    "fileUrl": "https://example.com/contract.pdf",
    "createdBy": "hr-manager-id"
  }'
```

**Expected Response:**
```json
{
  "_id": "contract-id-here",
  "applicationId": "...",
  "contractType": "Full-Time",
  ...
}
```

### 1.2 Get Contract by ID
```bash
curl http://localhost:3000/recruitment/contracts/{contractId}
```

### 1.3 Update Contract
```bash
curl -X PATCH http://localhost:3000/recruitment/contracts/{contractId} \
  -H "Content-Type: application/json" \
  -d '{
    "grossSalary": 75000,
    "signingBonus": 5000,
    "role": "Senior Developer",
    "benefits": ["Health Insurance", "401k"]
  }'
```

### 1.4 Sign Contract
```bash
curl -X POST http://localhost:3000/recruitment/contracts/{contractId}/sign \
  -H "Content-Type: application/json" \
  -d '{
    "signatureUrl": "https://example.com/emp-signature.png",
    "signerRole": "employee"
  }'
```

Then sign as employer:
```bash
curl -X POST http://localhost:3000/recruitment/contracts/{contractId}/sign \
  -H "Content-Type: application/json" \
  -d '{
    "signatureUrl": "https://example.com/hr-signature.png",
    "signerRole": "employer"
  }'
```

### 1.5 Get Contract by Offer
```bash
curl http://localhost:3000/recruitment/offers/{offerId}/contract
```

### 1.6 Filter Contracts
```bash
curl "http://localhost:3000/recruitment/contracts?offerId={offerId}"
```

---

## 2. DOCUMENTS Module (6 Endpoints)

### 2.1 Upload Document
```bash
curl -X POST http://localhost:3000/recruitment/documents \
  -H "Content-Type: application/json" \
  -d '{
    "ownerId": "6751234567890abcdef12345",
    "type": "RESUME",
    "filePath": "/uploads/documents/resume-john-doe.pdf"
  }'
```

### 2.2 Get Document
```bash
curl http://localhost:3000/recruitment/documents/{documentId}
```

### 2.3 Update Document
```bash
curl -X PATCH http://localhost:3000/recruitment/documents/{documentId} \
  -H "Content-Type: application/json" \
  -d '{
    "type": "COVER_LETTER",
    "filePath": "/uploads/documents/updated-file.pdf"
  }'
```

### 2.4 Delete Document
```bash
curl -X DELETE http://localhost:3000/recruitment/documents/{documentId}
```

### 2.5 Get All Documents for User
```bash
curl http://localhost:3000/recruitment/users/{userId}/documents
```

### 2.6 Filter Documents
```bash
curl "http://localhost:3000/recruitment/documents?ownerId={userId}&type=RESUME"
```

---

## 3. ONBOARDING Module (10 Endpoints) ⭐ CRITICAL

### 3.1 Create Onboarding
```bash
curl -X POST http://localhost:3000/recruitment/onboarding \
  -H "Content-Type: application/json" \
  -d '{
    "employeeId": "6751234567890abcdef12345"
  }'
```

**Expected Response:** Should include 5 default tasks:
```json
{
  "_id": "onboarding-id",
  "employeeId": "...",
  "tasks": [
    {
      "_id": "task-id-1",
      "name": "Upload ID Documents",
      "department": "HR",
      "status": "PENDING",
      "deadline": "..."
    },
    ...5 tasks total
  ],
  "completed": false
}
```

### 3.2 Get Onboarding by ID
```bash
curl http://localhost:3000/recruitment/onboarding/{onboardingId}
```

### 3.3 Update Onboarding
```bash
curl -X PATCH http://localhost:3000/recruitment/onboarding/{onboardingId} \
  -H "Content-Type: application/json" \
  -d '{
    "completed": false
  }'
```

### 3.4 Get Onboarding for Employee
```bash
curl http://localhost:3000/recruitment/onboarding/employee/{employeeId}
```

### 3.5 Filter Onboardings
```bash
curl "http://localhost:3000/recruitment/onboarding?completed=false"
```

### 3.6 Add Onboarding Task
```bash
curl -X POST http://localhost:3000/recruitment/onboarding/{onboardingId}/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Complete Security Training",
    "department": "IT",
    "deadline": "2025-01-15T00:00:00.000Z",
    "notes": "Required for all new hires"
  }'
```

### 3.7 Update Onboarding Task
```bash
curl -X PATCH "http://localhost:3000/recruitment/onboarding/{onboardingId}/tasks/{taskId}" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "IN_PROGRESS",
    "notes": "Training module started"
  }'
```

### 3.8 Complete Onboarding Task
```bash
curl -X POST "http://localhost:3000/recruitment/onboarding/{onboardingId}/tasks/{taskId}/complete" \
  -H "Content-Type: application/json" \
  -d '{
    "notes": "Task completed successfully",
    "documentId": "optional-document-id"
  }'
```

### 3.9 Complete Entire Onboarding
```bash
curl -X POST http://localhost:3000/recruitment/onboarding/{onboardingId}/complete
```

**Note:** All tasks must be COMPLETED status first, or you'll get error:
```json
{
  "statusCode": 400,
  "message": "Not all tasks are completed"
}
```

### 3.10 Get Onboarding Progress
```bash
curl http://localhost:3000/recruitment/onboarding/{onboardingId}/progress
```

**Expected Response:**
```json
{
  "totalTasks": 5,
  "completedTasks": 3,
  "progress": 60,
  "onboarding": { ... }
}
```

---

## 4. TERMINATION/OFFBOARDING Module (14 Endpoints) ⭐ CRITICAL

### 4.1 Create Termination Request
```bash
curl -X POST http://localhost:3000/recruitment/termination \
  -H "Content-Type: application/json" \
  -d '{
    "employeeId": "6751234567890abcdef12345",
    "contractId": "6751234567890abcdef12346",
    "initiator": "EMPLOYEE",
    "reason": "Resignation - Better opportunity elsewhere"
  }'
```

**Valid initiator values:** `EMPLOYEE`, `EMPLOYER`, `MUTUAL`

### 4.2 Get Termination Request
```bash
curl http://localhost:3000/recruitment/termination/{terminationId}
```

### 4.3 Update Termination Request
```bash
curl -X PATCH http://localhost:3000/recruitment/termination/{terminationId} \
  -H "Content-Type: application/json" \
  -d '{
    "employeeComments": "Providing two weeks notice",
    "terminationDate": "2025-02-01T00:00:00.000Z"
  }'
```

### 4.4 Get Termination for Employee
```bash
curl http://localhost:3000/recruitment/termination/employee/{employeeId}
```

### 4.5 Filter Termination Requests
```bash
curl "http://localhost:3000/recruitment/termination?status=PENDING&initiator=EMPLOYEE"
```

### 4.6 Approve Termination ⭐
```bash
curl -X POST http://localhost:3000/recruitment/termination/{terminationId}/approve \
  -H "Content-Type: application/json" \
  -d '{
    "hrComments": "Approved - Employee in good standing",
    "terminationDate": "2025-02-01T00:00:00.000Z"
  }'
```

**Expected:** Automatically creates clearance checklist with 5 departments!

### 4.7 Reject Termination
```bash
curl -X POST http://localhost:3000/recruitment/termination/{terminationId}/reject \
  -H "Content-Type: application/json" \
  -d '{
    "hrComments": "Please reconsider - we value your contribution"
  }'
```

### 4.8 Create Clearance Checklist (Manual - usually auto-created)
```bash
curl -X POST "http://localhost:3000/recruitment/termination/{terminationId}/clearance" \
  -H "Content-Type: application/json" \
  -d '{
    "terminationId": "termination-id",
    "departments": ["IT", "Finance", "Facilities", "HR", "Admin"],
    "equipmentList": [
      { "name": "Laptop", "equipmentId": "LAP-12345" },
      { "name": "Monitor", "equipmentId": "MON-67890" },
      { "name": "Keyboard" }
    ]
  }'
```

### 4.9 Get Clearance Checklist
```bash
curl http://localhost:3000/recruitment/termination/{terminationId}/clearance
```

**Expected Response:**
```json
{
  "_id": "clearance-id",
  "terminationId": "...",
  "items": [
    {
      "_id": "item-id-1",
      "department": "IT",
      "status": "PENDING"
    },
    ...5 items
  ],
  "equipmentList": [
    {
      "name": "Laptop",
      "returned": false
    }
  ],
  "cardReturned": false
}
```

### 4.10 Update Clearance Checklist
```bash
curl -X PATCH http://localhost:3000/recruitment/clearance/{checklistId} \
  -H "Content-Type: application/json" \
  -d '{
    "cardReturned": true
  }'
```

### 4.11 Update Clearance Item
```bash
curl -X PATCH "http://localhost:3000/recruitment/clearance/{checklistId}/items/{itemId}" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "APPROVED",
    "comments": "All IT equipment accounted for and returned",
    "updatedBy": "6751234567890abcdef12347"
  }'
```

### 4.12 Approve Clearance Item
```bash
curl -X POST "http://localhost:3000/recruitment/clearance/{checklistId}/items/{itemId}/approve" \
  -H "Content-Type: application/json" \
  -d '{
    "comments": "Finance clearance approved",
    "updatedBy": "6751234567890abcdef12348"
  }'
```

### 4.13 Get Clearance Progress
```bash
curl http://localhost:3000/recruitment/clearance/{checklistId}/progress
```

**Expected Response:**
```json
{
  "totalItems": 5,
  "approvedItems": 3,
  "totalEquipment": 2,
  "returnedEquipment": 1,
  "cardReturned": true,
  "isComplete": false,
  "progress": {
    "items": 60,
    "equipment": 50
  },
  "clearance": { ... }
}
```

---

## 5. End-to-End Testing Scenarios

### Scenario A: Complete Onboarding Workflow

**Step 1:** Accept an offer (triggers auto-onboarding)
```bash
# First create and accept an offer using existing endpoints
curl -X PATCH http://localhost:3000/recruitment/offers/{offerId}/accept \
  -H "Content-Type: application/json" \
  -d '{"changedBy": "candidate-id"}'
```

**Step 2:** Verify onboarding was auto-created
```bash
curl http://localhost:3000/recruitment/onboarding/employee/{employeeId}
```
✅ Should return onboarding with 5 tasks

**Step 3:** Get task IDs from the response
Look for `tasks[0]._id`, `tasks[1]._id`, etc.

**Step 4:** Complete each task
```bash
curl -X POST "http://localhost:3000/recruitment/onboarding/{onboardingId}/tasks/{taskId}/complete" \
  -H "Content-Type: application/json" \
  -d '{"notes": "Completed"}'
```

**Step 5:** Check progress after each completion
```bash
curl http://localhost:3000/recruitment/onboarding/{onboardingId}/progress
```
✅ Progress should increase: 20%, 40%, 60%, 80%, 100%

**Step 6:** Complete entire onboarding
```bash
curl -X POST http://localhost:3000/recruitment/onboarding/{onboardingId}/complete
```

---

### Scenario B: Complete Offboarding Workflow

**Step 1:** Create termination request
```bash
curl -X POST http://localhost:3000/recruitment/termination \
  -H "Content-Type: application/json" \
  -d '{
    "employeeId": "employee-id",
    "contractId": "contract-id",
    "initiator": "EMPLOYEE",
    "reason": "Resignation"
  }'
```

**Step 2:** HR approves (auto-creates clearance)
```bash
curl -X POST http://localhost:3000/recruitment/termination/{terminationId}/approve \
  -H "Content-Type: application/json" \
  -d '{
    "hrComments": "Approved",
    "terminationDate": "2025-02-01T00:00:00.000Z"
  }'
```

**Step 3:** Get clearance checklist
```bash
curl http://localhost:3000/recruitment/termination/{terminationId}/clearance
```
✅ Should have 5 department items

**Step 4:** Get item IDs from response
Look for `items[0]._id`, `items[1]._id`, etc.

**Step 5:** Approve each department clearance
```bash
curl -X POST "http://localhost:3000/recruitment/clearance/{checklistId}/items/{itemId}/approve" \
  -H "Content-Type: application/json" \
  -d '{
    "comments": "Approved",
    "updatedBy": "manager-id"
  }'
```

**Step 6:** Mark card returned
```bash
curl -X PATCH http://localhost:3000/recruitment/clearance/{checklistId} \
  -H "Content-Type: application/json" \
  -d '{"cardReturned": true}'
```

**Step 7:** Check final progress
```bash
curl http://localhost:3000/recruitment/clearance/{checklistId}/progress
```
✅ `isComplete` should be `true`

---

## 6. Database Verification

### Using MongoDB Compass (GUI)
1. Connect to `mongodb://localhost:27017`
2. Select your database
3. Check these collections:
   - `contracts`
   - `documents`
   - `onboardings`
   - `terminationrequests`
   - `clearancechecklists`

### Using Mongo Shell
```bash
mongo

use hr-system  # or your database name

# View onboardings
db.onboardings.find().pretty()

# Count documents
db.onboardings.countDocuments()
db.terminationrequests.countDocuments()

# Find specific onboarding
db.onboardings.findOne({employeeId: ObjectId("...")})

# Check clearance checklists
db.clearancechecklists.find().pretty()
```

---

## 7. Troubleshooting

### Error: "Cannot find module"
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Error: "MongooseError: Operation failed"
- Check MongoDB is running: `sudo systemctl status mongod`
- Check connection string in `.env`
- Try: `mongodb://127.0.0.1:27017/hr-system` instead of `localhost`

### Error: "NotFoundException: Task not found"
- Tasks are subdocuments, get the `_id` from the tasks array first
- Use the full onboarding GET endpoint to see task IDs

### Error: "ValidationError"
- Check enum values: `EMPLOYEE` not `employee`
- Ensure ObjectIds are 24 hex characters
- Check required fields in DTOs

### Error: "Property 'id' does not exist on type 'any[]'"
- This is fixed with `(array as any).id()` casts
- If you see this, the TypeScript errors weren't fully resolved

---

## 8. Success Checklist

Mark each as you test:

**Contracts:**
- [ ] ✅ Create contract
- [ ] ✅ Get contract
- [ ] ✅ Update contract
- [ ] ✅ Sign contract (employee)
- [ ] ✅ Sign contract (employer)
- [ ] ✅ Filter contracts

**Documents:**
- [ ] ✅ Upload document
- [ ] ✅ Get document
- [ ] ✅ Update document
- [ ] ✅ Delete document
- [ ] ✅ Get user documents
- [ ] ✅ Filter documents

**Onboarding:**
- [ ] ✅ Create onboarding (5 default tasks)
- [ ] ✅ Get onboarding
- [ ] ✅ Update onboarding
- [ ] ✅ Get employee onboarding
- [ ] ✅ Filter onboardings
- [ ] ✅ Add task
- [ ] ✅ Update task
- [ ] ✅ Complete task
- [ ] ✅ Complete onboarding
- [ ] ✅ Get progress

**Offboarding:**
- [ ] ✅ Create termination
- [ ] ✅ Get termination
- [ ] ✅ Update termination
- [ ] ✅ Get employee termination
- [ ] ✅ Filter terminations
- [ ] ✅ Approve termination (auto-creates clearance)
- [ ] ✅ Reject termination
- [ ] ✅ Get clearance checklist
- [ ] ✅ Update clearance
- [ ] ✅ Update clearance item
- [ ] ✅ Approve clearance item
- [ ] ✅ Get clearance progress

**Workflows:**
- [ ] ✅ Offer acceptance → Auto-creates onboarding
- [ ] ✅ Termination approval → Auto-creates clearance
- [ ] ✅ Progress calculations are accurate

**Total:** 36 endpoints + 3 workflows = **39 checks**

---

## 9. Production Readiness

Before deploying to production:

1. **Add Authentication:**
   - Re-enable JWT guards
   - Add role-based access control
   - Test with actual tokens

2. **Add Validation:**
   - Use `class-validator` decorators in DTOs
   - Add `ValidationPipe` globally

3. **Add Error Handling:**
   - Global exception filters
   - Proper error messages

4. **Add Logging:**
   - Log all API calls
   - Track user actions

5. **Add Tests:**
   - Unit tests for services
   - E2E tests for endpoints

6. **Performance:**
   - Add database indexes
   - Implement caching
   - Add rate limiting

---

## Congratulations! 🎉

If all 36 endpoints work correctly, your backend implementation is **100% complete** and ready for frontend integration!

Next steps:
1. Commit your changes
2. Push to GitHub (Ms3-Seif branch)
3. Start building the frontend UI
