# ระบบจัดการคอร์สว่ายน้ำพิษณุโลก By ครูฟลุ๊ค

A comprehensive swimming course management system built with React, TypeScript, Tailwind CSS, and Firebase.

## ⚠️ IMPORTANT: First Time Setup Required

**Seeing "Missing or insufficient permissions" error?**

👉 **Quick Fix**: Read `QUICK_START.md` or `FIREBASE_SETUP.md` for setup instructions.

**TL;DR**: You need to configure Firestore Security Rules in Firebase Console (takes 5 minutes).

## Features

### Public Features
- **Home Page**: Main landing page with course overview
- **Courses Page**: Display all available swimming courses with detailed information
- **Registration**: Online registration form with payment information
- **FAQ**: Frequently asked questions
- **About**: Information about the swimming school
- **Contact**: Contact information

### Student/Parent Features
- **Student Dashboard**: Track enrollment status, payment status, and progress
- View course schedule and attendance records
- Monitor learning progress

### Admin/Instructor Features
- **Admin Dashboard**: Complete enrollment management system
- View statistics (total students, payment status, course enrollment)
- Edit enrollment details (payment status, progress, schedule, attendance)
- Real-time updates using Firebase Firestore

## Technology Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Firebase**:
  - Authentication for user management
  - Firestore for real-time database
- **Vite** for build tooling

## User Roles

1. **Guest**: Can view public pages and register for courses
2. **Student/Parent**: Can track their enrollment status and progress
3. **Instructor**: Can manage enrollments and view statistics
4. **Admin**: Full access to all management features

## Authentication

For testing purposes, you can create accounts with these emails:
- **Admin**: `admin@example.com` (gets admin role automatically)
- **Instructor**: `instructor@example.com` (gets instructor role automatically)
- **Student**: Any other email (gets student role by default)

Password must be at least 6 characters.

## Course Types

1. **Course A**: Beginner course focusing on water safety (4,500 THB)
2. **Course B**: Intermediate course with 4 swimming styles (5,500 THB)
3. **Course C**: Kids course for ages 4-8 (4,000 THB)
4. **Course D**: Private one-on-one lessons (6,500 THB)
5. **Baby Swimming Course**: Special course for babies and toddlers (6,500 THB)

## Firebase Configuration

The application uses Firebase for backend services. The configuration is already set up in `/lib/firebase.ts`.

### ⚠️ Important: Configure Firestore Security Rules

**If you see "Missing or insufficient permissions" error:**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **swimmingcourse-933fe**
3. Navigate to **Firestore Database** → **Rules**
4. Copy the rules from `/firestore.rules` file
5. Paste into the rules editor and click **Publish**

📖 See detailed instructions in `/FIREBASE_SETUP.md`

## Getting Started

1. The application will automatically initialize Firebase on load
2. Browse courses and register without logging in
3. **Configure Firestore rules** (see above) before trying to view dashboard
4. Log in to access role-specific features
5. Admin/Instructor users can access the management dashboard

## Payment Information

**Bank Account**: Thai Commercial Bank (SCB)
- Account Number: 4403815294
- Account Name: นายธีรวัฒน์ กล่ำเจริญ (ครูฟลุค)

## Contact

- **Phone**: 095 345 7980
- **Facebook**: เรียนว่ายน้ำพิษณุโลก By ครูฟลุ๊ค
- **Email**: Tswimming.25@gmail.com
