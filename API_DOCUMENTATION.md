# HealthScript-Pro API Documentation

## 📡 API Overview

The HealthScript-Pro API provides RESTful endpoints for managing prescriptions, patients, and medications. All endpoints require authentication unless otherwise specified.

---

## 🔐 Authentication

### Authentication Methods

HealthScript-Pro uses NextAuth.js for authentication with support for:
- Email/Password
- OAuth providers (Google, GitHub)
- JWT tokens for API access

### Getting Access Token

```http
POST /api/auth/signin
Content-Type: application/json

{
  "email": "doctor@example.com",
  "password": "your-password"
}
```

**Response:**
```json
{
  "user": {
    "id": "user-uuid",
    "email": "doctor@example.com",
    "role": "doctor"
  },
  "accessToken": "jwt-token-here"
}
```

### Using the Token

Include the token in the Authorization header for all authenticated requests:

```http
Authorization: Bearer your-jwt-token-here
```

---

## 👥 User Management

### Get Current User

```http
GET /api/user/me
Authorization: Bearer {token}
```

**Response:**
```json
{
  "id": "user-uuid",
  "email": "doctor@example.com",
  "name": "Dr. John Smith",
  "role": "doctor",
  "licenseNumber": "MED123456",
  "specialty": "General Practice",
  "createdAt": "2026-01-01T00:00:00Z"
}
```

### Update User Profile

```http
PATCH /api/user/me
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Dr. John Smith",
  "specialty": "Cardiology",
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user-uuid",
    "name": "Dr. John Smith",
    "specialty": "Cardiology",
    "phone": "+1234567890"
  }
}
```

---

## 🏥 Patient Management

### List Patients

```http
GET /api/patients?page=1&limit=20&search=john
Authorization: Bearer {token}
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `search` (optional): Search by name or patient ID

**Response:**
```json
{
  "patients": [
    {
      "id": "patient-uuid",
      "name": "John Doe",
      "dateOfBirth": "1990-01-01",
      "gender": "male",
      "phone": "+1234567890",
      "email": "john@example.com",
      "allergies": ["Penicillin"],
      "currentMedications": [
        {
          "name": "Metformin",
          "dosage": "500mg",
          "frequency": "twice daily"
        }
      ],
      "lastVisit": "2026-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 95,
    "itemsPerPage": 20
  }
}
```

### Get Patient Details

```http
GET /api/patients/{patientId}
Authorization: Bearer {token}
```

**Response:**
```json
{
  "id": "patient-uuid",
  "name": "John Doe",
  "dateOfBirth": "1990-01-01",
  "gender": "male",
  "contactInfo": {
    "phone": "+1234567890",
    "email": "john@example.com",
    "address": "123 Main St, City, State 12345"
  },
  "medicalHistory": [
    {
      "condition": "Type 2 Diabetes",
      "diagnosedDate": "2020-03-15",
      "status": "ongoing"
    }
  ],
  "allergies": ["Penicillin", "Sulfa drugs"],
  "currentMedications": [
    {
      "name": "Metformin",
      "dosage": "500mg",
      "frequency": "twice daily",
      "startDate": "2020-03-15"
    }
  ],
  "prescriptions": [
    {
      "id": "prescription-uuid",
      "issuedDate": "2026-01-15",
      "medications": [...],
      "status": "issued"
    }
  ],
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2026-01-15T10:00:00Z"
}
```

### Create Patient

```http
POST /api/patients
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Jane Smith",
  "dateOfBirth": "1985-05-20",
  "gender": "female",
  "phone": "+1987654321",
  "email": "jane@example.com",
  "address": "456 Oak Ave, City, State 54321",
  "allergies": ["Aspirin"],
  "bloodType": "O+"
}
```

**Response:**
```json
{
  "success": true,
  "patient": {
    "id": "new-patient-uuid",
    "name": "Jane Smith",
    "dateOfBirth": "1985-05-20",
    "createdAt": "2026-01-13T14:30:00Z"
  }
}
```

### Update Patient

```http
PATCH /api/patients/{patientId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "phone": "+1111111111",
  "allergies": ["Aspirin", "Ibuprofen"],
  "currentMedications": [
    {
      "name": "Lisinopril",
      "dosage": "10mg",
      "frequency": "once daily"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "patient": {
    "id": "patient-uuid",
    "phone": "+1111111111",
    "allergies": ["Aspirin", "Ibuprofen"],
    "updatedAt": "2026-01-13T15:00:00Z"
  }
}
```

### Delete Patient

```http
DELETE /api/patients/{patientId}
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "message": "Patient record deleted successfully"
}
```

---

## 💊 Prescription Management

### Create Prescription

```http
POST /api/prescriptions
Authorization: Bearer {token}
Content-Type: application/json

{
  "patientId": "patient-uuid",
  "diagnosis": "Acute Bronchitis",
  "medications": [
    {
      "medicationId": "med-uuid",
      "name": "Amoxicillin",
      "dosage": "500mg",
      "frequency": "three times daily",
      "duration": "7 days",
      "instructions": "Take with food"
    },
    {
      "medicationId": "med-uuid-2",
      "name": "Dextromethorphan",
      "dosage": "10mg",
      "frequency": "every 6 hours",
      "duration": "5 days",
      "instructions": "As needed for cough"
    }
  ],
  "notes": "Follow up in 1 week if symptoms persist",
  "followUpDate": "2026-01-20"
}
```

**Response:**
```json
{
  "success": true,
  "prescription": {
    "id": "prescription-uuid",
    "patientId": "patient-uuid",
    "doctorId": "doctor-uuid",
    "diagnosis": "Acute Bronchitis",
    "medications": [...],
    "status": "issued",
    "issuedDate": "2026-01-13T15:30:00Z",
    "expiryDate": "2026-04-13T15:30:00Z"
  },
  "warnings": []
}
```

### Get Prescription

```http
GET /api/prescriptions/{prescriptionId}
Authorization: Bearer {token}
```

**Response:**
```json
{
  "id": "prescription-uuid",
  "patient": {
    "id": "patient-uuid",
    "name": "John Doe"
  },
  "doctor": {
    "id": "doctor-uuid",
    "name": "Dr. Jane Smith",
    "licenseNumber": "MED123456"
  },
  "diagnosis": "Acute Bronchitis",
  "medications": [
    {
      "id": "med-prescription-uuid",
      "medication": {
        "id": "med-uuid",
        "name": "Amoxicillin",
        "genericName": "Amoxicillin"
      },
      "dosage": "500mg",
      "frequency": "three times daily",
      "duration": "7 days",
      "instructions": "Take with food",
      "quantity": 21
    }
  ],
  "notes": "Follow up in 1 week if symptoms persist",
  "status": "issued",
  "issuedDate": "2026-01-13T15:30:00Z",
  "expiryDate": "2026-04-13T15:30:00Z"
}
```

### List Prescriptions

```http
GET /api/prescriptions?patientId={uuid}&status=issued&page=1&limit=20
Authorization: Bearer {token}
```

**Query Parameters:**
- `patientId` (optional): Filter by patient
- `status` (optional): Filter by status (draft, issued, filled, expired)
- `startDate` (optional): Filter by issue date (from)
- `endDate` (optional): Filter by issue date (to)
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**
```json
{
  "prescriptions": [
    {
      "id": "prescription-uuid",
      "patient": {
        "id": "patient-uuid",
        "name": "John Doe"
      },
      "diagnosis": "Acute Bronchitis",
      "medicationCount": 2,
      "status": "issued",
      "issuedDate": "2026-01-13T15:30:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalItems": 45,
    "itemsPerPage": 20
  }
}
```

### Update Prescription Status

```http
PATCH /api/prescriptions/{prescriptionId}/status
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "filled",
  "filledDate": "2026-01-14T10:00:00Z",
  "pharmacyInfo": {
    "name": "City Pharmacy",
    "pharmacist": "Sarah Johnson"
  }
}
```

**Response:**
```json
{
  "success": true,
  "prescription": {
    "id": "prescription-uuid",
    "status": "filled",
    "filledDate": "2026-01-14T10:00:00Z",
    "updatedAt": "2026-01-14T10:00:00Z"
  }
}
```

### Export Prescription (PDF)

```http
GET /api/prescriptions/{prescriptionId}/export?format=pdf
Authorization: Bearer {token}
```

**Response:**
- Content-Type: application/pdf
- Binary PDF data

---

## 💊 Medication Database

### Search Medications

```http
GET /api/medications/search?q=amoxicillin&limit=10
Authorization: Bearer {token}
```

**Query Parameters:**
- `q`: Search query (name or generic name)
- `category` (optional): Filter by category
- `limit` (optional): Max results (default: 10)

**Response:**
```json
{
  "medications": [
    {
      "id": "med-uuid",
      "name": "Amoxicillin",
      "genericName": "Amoxicillin",
      "category": "Antibiotic",
      "defaultDosage": "500mg",
      "unit": "mg",
      "commonFrequencies": ["three times daily", "twice daily"],
      "availableForms": ["capsule", "suspension"]
    }
  ]
}
```

### Get Medication Details

```http
GET /api/medications/{medicationId}
Authorization: Bearer {token}
```

**Response:**
```json
{
  "id": "med-uuid",
  "name": "Amoxicillin",
  "genericName": "Amoxicillin",
  "category": "Antibiotic",
  "description": "Beta-lactam antibiotic used to treat bacterial infections",
  "dosage": {
    "adult": "250-500mg three times daily",
    "pediatric": "20-40mg/kg/day divided in three doses"
  },
  "unit": "mg",
  "availableForms": ["capsule", "tablet", "suspension"],
  "availableStrengths": ["250mg", "500mg"],
  "contraindications": [
    "Hypersensitivity to penicillins",
    "Mononucleosis"
  ],
  "sideEffects": [
    "Nausea",
    "Diarrhea",
    "Rash"
  ],
  "interactions": [
    {
      "medication": "Probenecid",
      "severity": "moderate",
      "description": "May increase amoxicillin blood levels"
    }
  ],
  "pregnancyCategory": "B",
  "warnings": [
    "May cause allergic reactions in penicillin-allergic patients"
  ]
}
```

### Check Drug Interactions

```http
POST /api/medications/check-interactions
Authorization: Bearer {token}
Content-Type: application/json

{
  "medicationIds": [
    "med-uuid-1",
    "med-uuid-2",
    "med-uuid-3"
  ],
  "patientAllergies": ["Penicillin"]
}
```

**Response:**
```json
{
  "interactions": [
    {
      "medications": ["Warfarin", "Aspirin"],
      "severity": "major",
      "description": "Increased risk of bleeding",
      "recommendation": "Monitor INR closely and adjust warfarin dose"
    }
  ],
  "allergyWarnings": [
    {
      "medication": "Amoxicillin",
      "allergy": "Penicillin",
      "severity": "critical",
      "description": "Patient is allergic to penicillin. Amoxicillin is contraindicated."
    }
  ],
  "duplicateTherapy": []
}
```

---

## 📋 Templates

### List Templates

```http
GET /api/templates?category=common&page=1
Authorization: Bearer {token}
```

**Query Parameters:**
- `category` (optional): Filter by category
- `isPublic` (optional): Filter public/private templates
- `page`, `limit`: Pagination

**Response:**
```json
{
  "templates": [
    {
      "id": "template-uuid",
      "name": "Common Cold",
      "category": "Respiratory",
      "medications": [
        {
          "name": "Acetaminophen",
          "dosage": "500mg",
          "frequency": "every 6 hours"
        }
      ],
      "isPublic": true,
      "useCount": 145,
      "createdBy": {
        "id": "doctor-uuid",
        "name": "Dr. John Smith"
      }
    }
  ]
}
```

### Create Template

```http
POST /api/templates
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Type 2 Diabetes Initial Treatment",
  "category": "Endocrine",
  "medications": [
    {
      "medicationId": "med-uuid",
      "dosage": "500mg",
      "frequency": "twice daily"
    }
  ],
  "instructions": "Lifestyle modification recommended",
  "isPublic": false
}
```

**Response:**
```json
{
  "success": true,
  "template": {
    "id": "new-template-uuid",
    "name": "Type 2 Diabetes Initial Treatment",
    "createdAt": "2026-01-13T16:00:00Z"
  }
}
```

---

## 📊 Analytics & Reports

### Prescription Statistics

```http
GET /api/analytics/prescriptions?startDate=2026-01-01&endDate=2026-01-31
Authorization: Bearer {token}
```

**Response:**
```json
{
  "period": {
    "start": "2026-01-01",
    "end": "2026-01-31"
  },
  "totalPrescriptions": 156,
  "byStatus": {
    "issued": 120,
    "filled": 100,
    "expired": 10,
    "draft": 26
  },
  "topMedications": [
    {
      "medication": "Metformin",
      "count": 45
    },
    {
      "medication": "Lisinopril",
      "count": 38
    }
  ],
  "averagePerDay": 5.03
}
```

### Patient Statistics

```http
GET /api/analytics/patients
Authorization: Bearer {token}
```

**Response:**
```json
{
  "totalPatients": 324,
  "newThisMonth": 12,
  "activePatients": 156,
  "byAgeGroup": {
    "0-18": 45,
    "19-35": 89,
    "36-50": 102,
    "51-65": 65,
    "65+": 23
  },
  "byGender": {
    "male": 156,
    "female": 168
  }
}
```

---

## ⚠️ Error Handling

### Error Response Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHORIZED` | 401 | Missing or invalid authentication |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 400 | Invalid input data |
| `CONFLICT` | 409 | Resource conflict (e.g., duplicate) |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

---

## 🚦 Rate Limiting

- **Authenticated requests**: 1000 requests per hour
- **Unauthenticated requests**: 100 requests per hour

Rate limit headers:
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1641024000
```

---

## 📝 Webhooks (Coming Soon)

Webhooks will be available for:
- Prescription issued
- Prescription filled
- Patient record updated
- Drug interaction detected

---

## 🔄 Versioning

Current API version: `v1`

API endpoint format: `/api/v1/{resource}`

Version is included in the response headers:
```http
X-API-Version: 1.0.0
```

---

## 📚 Additional Resources

- [OpenAPI/Swagger Documentation](https://api.healthscript-pro.com/docs)
- [API Changelog](https://api.healthscript-pro.com/changelog)
- [SDKs and Client Libraries](https://github.com/akhilthirunalveli/HealthScript-Pro/tree/main/sdks)

---

**API Base URL (Production):** `https://api.healthscript-pro.com/v1`  
**API Base URL (Development):** `http://localhost:3000/api/v1`
