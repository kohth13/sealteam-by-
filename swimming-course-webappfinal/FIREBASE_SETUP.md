# Firebase Setup Guide

## Problem: "Missing or insufficient permissions"

This error occurs because Firebase Firestore requires security rules to be configured before your app can read or write data.

## Solution Steps

### Step 1: Access Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Log in with your Google account
3. Select your project: **swimmingcourse-933fe**

### Step 2: Configure Firestore Security Rules

1. In the left sidebar, click **Firestore Database**
2. Click the **Rules** tab at the top
3. You'll see a text editor with your current rules

### Step 3: Copy and Paste the Security Rules

Copy the content from `/firestore.rules` in this project and paste it into the Firebase Console rules editor.

**The rules provide:**
- ✅ Anyone can create enrollment (for public registration)
- ✅ Students can read their own enrollments
- ✅ Admin/Instructors can read and update all enrollments
- ✅ Secure access based on authentication

### Step 4: Publish the Rules

1. Click the **Publish** button (blue button at top right)
2. Wait for confirmation that rules are published
3. Rules take effect immediately

### Step 5: Verify the Setup

1. Refresh your application
2. Try creating a new enrollment (registration)
3. Log in as admin (`admin@example.com`) to view all enrollments
4. Log in as student to view your own enrollments

---

## Quick Test Rules (Development Only)

If you want to test quickly without authentication, use these **temporary** rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **IMPORTANT**: These rules make your database completely open. Anyone can read/write all data. Only use for development/testing and remember to replace with secure rules before production!

---

## Understanding the Security Rules

### Path Structure
```
/artifacts/{appId}/public/data/enrollments/{enrollmentId}
```

Where:
- `appId` = `825d204e` (from your Firebase config)
- `enrollmentId` = unique document ID for each enrollment

### Permission Levels

**Create (Registration)**
```javascript
allow create: if true;
```
Anyone can create enrollments (needed for public registration form)

**Read (View Data)**
```javascript
// Admin/Instructor can read all
allow read: if isAdminOrInstructor();

// Students can read their own
allow read: if isAuthenticated() && 
             resource.data.registeredBy == request.auth.uid;
```

**Update (Edit Data)**
```javascript
allow update: if isAdminOrInstructor();
```
Only admin and instructors can edit enrollments

**Delete**
```javascript
allow delete: if isAdminOrInstructor();
```
Only admin and instructors can delete enrollments

---

## Troubleshooting

### Still Getting Permission Errors?

1. **Check if rules are published**: Look for "Last updated" timestamp in Firebase Console
2. **Wait 1-2 minutes**: Sometimes rules take a moment to propagate
3. **Hard refresh your app**: Press Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
4. **Check authentication**: Make sure you're logged in when accessing protected data
5. **Check browser console**: Look for detailed error messages

### Common Issues

**"PERMISSION_DENIED: Missing or insufficient permissions"**
- Rules not published yet
- User not authenticated when accessing protected data
- Email doesn't match admin/instructor check

**"Not found" or "Collection doesn't exist"**
- This is normal if no data exists yet
- Create your first enrollment through registration form

**Rules syntax error**
- Copy the entire rules file exactly as provided
- Make sure quotes and brackets are correct
- Check for any copy-paste issues

---

## Admin/Instructor Access

To get admin or instructor access:

1. Create account with email: `admin@example.com` or `instructor@example.com`
2. Use any password (minimum 6 characters)
3. The app automatically recognizes these emails as privileged users

For production, you should:
- Store user roles in a Firestore collection
- Implement proper role management
- Use Firebase Custom Claims for role-based access

---

## Next Steps

After setting up Firestore rules:

1. ✅ Create test enrollments through registration form
2. ✅ Test admin dashboard functionality
3. ✅ Test student dashboard for enrolled users
4. ✅ Verify real-time updates work correctly

## Need Help?

If you continue to have issues:
1. Check Firebase Console → Firestore → Data tab to see if data is being created
2. Check Firebase Console → Authentication → Users to see registered users
3. Look at browser console (F12) for detailed error messages
4. Verify your internet connection and Firebase project status
