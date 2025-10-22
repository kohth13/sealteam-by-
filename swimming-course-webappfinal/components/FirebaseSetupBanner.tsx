import { useState } from 'react';
import { X } from 'lucide-react';

export default function FirebaseSetupBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm text-yellow-800">
            ⚠️ ต้องตั้งค่า Firebase Security Rules ก่อนใช้งาน
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p className="mb-2">
              หากคุณเห็นข้อความ "Missing or insufficient permissions" กรุณาทำตามขั้นตอน:
            </p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>เปิด <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-900">Firebase Console</a></li>
              <li>เลือกโปรเจค <strong>swimmingcourse-933fe</strong></li>
              <li>ไปที่ <strong>Firestore Database → Rules</strong></li>
              <li>คัดลอกกฎจากไฟล์ <code className="bg-yellow-100 px-1 py-0.5 rounded">/firestore.rules</code></li>
              <li>วางในตัวแก้ไขกฎและคลิก <strong>Publish</strong></li>
            </ol>
            <p className="mt-2">
              📖 ดูคำแนะนำโดยละเอียดในไฟล์ <code className="bg-yellow-100 px-1 py-0.5 rounded">FIREBASE_SETUP.md</code>
            </p>
          </div>
        </div>
        <div className="ml-3 flex-shrink-0">
          <button
            onClick={() => setIsVisible(false)}
            className="inline-flex text-yellow-400 hover:text-yellow-600 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
