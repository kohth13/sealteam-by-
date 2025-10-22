import { useState, useEffect } from 'react';
import { initializeFirebase } from './lib/firebase';
import { useAuth } from './lib/hooks/useAuth';
import { COURSE_DATA, CourseInfo } from './lib/courseData';
import Header from './components/Header';
import FirebaseSetupBanner from './components/FirebaseSetupBanner';
import AuthModal from './components/modals/AuthModal';
import InfoModal from './components/modals/InfoModal';
import CourseDetailModal from './components/modals/CourseDetailModal';
import HomePage from './components/pages/HomePage';
import CoursesPage from './components/pages/CoursesPage';
import RegistrationPage from './components/pages/RegistrationPage';
import DashboardPage from './components/pages/DashboardPage';
import StudentDashboardPage from './components/pages/StudentDashboardPage';
import { FAQPage, AboutPage, ContactPage } from './components/pages/OtherPages';
import Footer from './components/Footer';

// Add Bootstrap JS
if (typeof document !== 'undefined') {
  const bootstrapScript = document.createElement('script');
  bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js';
  bootstrapScript.async = true;
  document.body.appendChild(bootstrapScript);
}

type Page = 'home' | 'courses' | 'registration' | 'dashboard' | 'student-dashboard' | 'faq' | 'about' | 'contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [dbStatus, setDbStatus] = useState('กำลังเชื่อมต่อฐานข้อมูล...');
  const [selectedCourseKey, setSelectedCourseKey] = useState<string>('');
  
  // Auth Modal
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');


  
  // Info Modal
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [infoModalTitle, setInfoModalTitle] = useState('');
  const [infoModalMessage, setInfoModalMessage] = useState('');
  
  // Course Detail Modal
  const [courseDetailModalOpen, setCourseDetailModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseInfo | null>(null);

  const { user, userRole, loading, signup, login, logout } = useAuth();

  // Initialize Firebase
  useEffect(() => {
    try {
      initializeFirebase();
      setDbStatus('✅ ฐานข้อมูลพร้อมใช้งาน');
    } catch (error: any) {
      setDbStatus(`❌ ข้อผิดพลาด: ${error.message}`);
      showInfo('ข้อผิดพลาดการเชื่อมต่อ', `การเริ่มต้น Firebase ล้มเหลว: ${error.message}`);
    }
  }, []);

  // Update page based on user role
  useEffect(() => {
    if (!loading) {
      if (userRole === 'admin' || userRole === 'instructor') {
        if (currentPage === 'home') {
          setCurrentPage('dashboard');
        }
      } else if (userRole === 'student') {
        if (currentPage === 'home') {
          setCurrentPage('student-dashboard');
        }
      }
    }
  }, [userRole, loading]);



  const navigate = (page: Page) => {
    // Access control
    if (page === 'dashboard' && userRole !== 'admin' && userRole !== 'instructor') {
      showInfo(
        'จำกัดสิทธิ์การเข้าถึง',
        'คุณไม่มีสิทธิ์เข้าถึงหน้านี้ โปรดลงชื่อเข้าใช้ด้วยบัญชีผู้บริหารหรือผู้สอน'
      );
      return;
    }
    
    if (page === 'student-dashboard' && userRole !== 'student') {
      showInfo(
        'จำกัดสิทธิ์การเข้าถึง',
        'คุณไม่มีสิทธิ์เข้าถึงหน้านี้ โปรดลงชื่อเข้าใช้ด้วยบัญชีนักเรียน/ผู้ปกครอง'
      );
      return;
    }

    setCurrentPage(page);
  };

  const showInfo = (title: string, message: string) => {
    setInfoModalTitle(title);
    setInfoModalMessage(message);
    setInfoModalOpen(true);
  };

  const handleOpenAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSubmit = async (email: string, password: string, mode: 'login' | 'signup') => {
    if (mode === 'signup') {
      await signup(email, password);
    } else {
      await login(email, password);
    }
  };

  const handleLogout = async () => {
    await logout();
    showInfo('ออกจากระบบ', 'คุณได้ออกจากระบบเรียบร้อยแล้ว');
    navigate('home');
  };

  const handleOpenCourseDetail = (courseKey: string) => {
    setSelectedCourse(COURSE_DATA[courseKey]);
    setSelectedCourseKey(courseKey);
    setCourseDetailModalOpen(true);
  };

  const handleCourseRegister = () => {
    setCourseDetailModalOpen(false);
    navigate('registration');
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: 'var(--bg-light)' }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }}></div>
          <p className="text-muted">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100" style={{ background: 'var(--bg-light)' }}>
      <Header
        userRole={userRole}
        userId={user?.uid || null}
        dbStatus={dbStatus}
        onNavigate={navigate}
        onOpenAuthModal={handleOpenAuthModal}
        onLogout={handleLogout}
      />

      <main className="container-fluid px-4 py-5" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <FirebaseSetupBanner />
        
        {currentPage === 'home' && <HomePage onNavigate={navigate} />}
        {currentPage === 'courses' && <CoursesPage onOpenCourseDetail={handleOpenCourseDetail} />}
        {currentPage === 'registration' && (
          <RegistrationPage
            userId={user?.uid || null}
            selectedCourse={selectedCourseKey}
            onShowInfo={showInfo}
          />
        )}
        {currentPage === 'dashboard' && <DashboardPage onShowInfo={showInfo} />}
        {currentPage === 'student-dashboard' && <StudentDashboardPage userId={user?.uid || null} />}
        {currentPage === 'faq' && <FAQPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      <Footer 
        onNavigate={navigate}
        onOpenCourseDetail={handleOpenCourseDetail}
      />

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        mode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSubmit={handleAuthSubmit}
        onSwitchMode={(newMode) => setAuthMode(newMode)}
      />

      <InfoModal
        isOpen={infoModalOpen}
        title={infoModalTitle}
        message={infoModalMessage}
        onClose={() => setInfoModalOpen(false)}
      />

      <CourseDetailModal
        isOpen={courseDetailModalOpen}
        course={selectedCourse}
        onClose={() => setCourseDetailModalOpen(false)}
        onRegister={handleCourseRegister}
      />
    </div>
  );
}