# 🚀 Quick Start Guide

## ⚠️ Getting "Missing or insufficient permissions" Error?

### Fix in 3 Steps:

1. **Open Firebase Console**
   - Go to: https://console.firebase.google.com/
   - Select project: `swimmingcourse-933fe`

2. **Navigate to Rules**
   - Click: `Firestore Database` (left sidebar)
   - Click: `Rules` tab (top)

3. **Paste & Publish**
   - Copy everything from `/firestore.rules` file
   - Paste into the editor
   - Click the blue `Publish` button

✅ **Done!** Refresh your app and try again.

---

## 🧪 Quick Test (Optional)

Want to test immediately? Use these temporary open rules:

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

⚠️ **Warning**: This makes your database PUBLIC. Only for testing!

---

## 👥 Test Accounts

### Admin Access
- Email: `admin@example.com`
- Password: any (min 6 chars)
- Access: Full dashboard + management

### Instructor Access
- Email: `instructor@example.com`
- Password: any (min 6 chars)
- Access: Full dashboard + management

### Student Access
- Email: any other email
- Password: any (min 6 chars)
- Access: Personal enrollment tracking

---

## 🎯 What to Test

### 1. Public Registration (No Login Required)
- Go to "ลงทะเบียน" page
- Fill out the form
- Submit registration
- Should see success message

### 2. Admin Dashboard
- Login with `admin@example.com`
- Click "ระบบจัดการ"
- See all enrollments
- Edit enrollment details
- View statistics

### 3. Student Dashboard
- Login with student account
- Click "ติดตามผล"
- See your own enrollments
- View payment status
- Check progress

---

## 🔧 Still Having Issues?

1. **Clear browser cache** (Ctrl+Shift+Delete)
2. **Hard refresh** (Ctrl+Shift+R)
3. **Check browser console** (F12) for errors
4. **Verify Firebase project is active** in Firebase Console
5. **Read full guide** in `FIREBASE_SETUP.md`

---

## 📚 File Structure

```
Key Files:
├── firestore.rules        ← Security rules (copy this)
├── FIREBASE_SETUP.md      ← Detailed setup guide
├── QUICK_START.md         ← This file
├── App.tsx                ← Main application
└── lib/
    ├── firebase.ts        ← Firebase config
    └── hooks/
        └── useAuth.ts     ← Authentication logic
```

---

## 💡 Tips

- **Registration works without login** - Anyone can register for courses
- **Dashboard requires login** - Admin/Instructor accounts only
- **Student dashboard requires login** - Students see only their data
- **Real-time updates** - Changes appear immediately across all users
- **Mobile responsive** - Works on all devices

---

## 🆘 Get Help

If you're still stuck:
1. Read `FIREBASE_SETUP.md` for detailed troubleshooting
2. Check Firebase Console for error messages
3. Look at browser console (F12) for specific errors
4. Verify your Firebase project settings

---

**Need more help?** Open `FIREBASE_SETUP.md` for comprehensive guide! 📖
