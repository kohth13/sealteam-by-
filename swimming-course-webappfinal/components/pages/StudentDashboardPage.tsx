import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { getFirebaseDb, APP_ID } from '../../lib/firebase';

interface Enrollment {
  id: string;
  name: string;
  course: string;
  schedule?: string;
  location?: string;
  startDate?: string;
  phone?: string;
  paymentStatus: string;
  progress: string;
  attendance?: number;
  totalClasses?: number;
  grade?: string;
  passed?: boolean;
  scores?: {
    technique: number;
    endurance: number;
    safety: number;
  };
  [key: string]: any;
}

interface StudentDashboardPageProps {
  userId: string | null;
}

export default function StudentDashboardPage({ userId }: StudentDashboardPageProps) {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const db = getFirebaseDb();
    const enrollmentsRef = collection(db, `artifacts/${APP_ID}/public/data/enrollments`);
    const q = query(enrollmentsRef, where('registeredBy', '==', userId));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const enrollmentsList: Enrollment[] = [];
      snapshot.forEach((doc) => {
        enrollmentsList.push({ id: doc.id, ...doc.data() } as Enrollment);
      });
      setEnrollments(enrollmentsList);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching student enrollments:", error);
      if (error.code === 'permission-denied') {
        alert('ไม่มีสิทธิ์เข้าถึงข้อมูล กรุณาตรวจสอบ Firestore Security Rules');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  const getPaymentBadgeClass = (status: string) => {
    switch (status) {
      case 'ชำระเงินเรียบร้อย': return 'bg-success';
      case 'รอยืนยันสลิป': return 'bg-warning';
      case 'รอชำระเงิน': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  const getGradeBadgeClass = (grade: string) => {
    switch (grade) {
      case 'A': return 'bg-success';
      case 'B': return 'bg-info';
      case 'C': return 'bg-warning';
      case 'D': return 'bg-orange';
      case 'F': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  const calculateAverageScore = (scores: { technique: number; endurance: number; safety: number }) => {
    return Math.round((scores.technique + scores.endurance + scores.safety) / 3);
  };

  const calculateProgress = (attendance: number, total: number) => {
    return total > 0 ? Math.round((attendance / total) * 100) : 0;
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="row mb-4 animate-slide-in-left">
        <div className="col-12">
          <div className="card border-0 shadow-lg bg-gradient-primary text-white overflow-hidden">
            <div className="card-body p-4 position-relative" style={{ zIndex: 1 }}>
              <div className="row align-items-center">
                <div className="col-lg-8">
                  <h1 className="display-5 fw-bold mb-2">
                    <i className="bi bi-graph-up-arrow me-3"></i>
                    ติดตามผลการเรียน
                  </h1>
                  <p className="mb-0">ดูสถานะการเรียน ตารางเรียน และผลคะแนนของคุณ</p>
                </div>
                <div className="col-lg-4 text-center d-none d-lg-block">
                  <i className="bi bi-person-workspace display-1 animate-float"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        {loading ? (
          <div className="row">
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center py-5">
                  <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }}></div>
                  <p className="text-muted mb-0">กำลังดึงข้อมูลการสมัครเรียน...</p>
                </div>
              </div>
            </div>
          </div>
        ) : !userId ? (
          <div className="row">
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center py-5">
                  <i className="bi bi-exclamation-triangle display-1 text-warning mb-3"></i>
                  <h4 className="text-danger mb-3">กรุณาเข้าสู่ระบบ</h4>
                  <p className="text-muted">คุณต้องเข้าสู่ระบบในฐานะนักเรียน/ผู้ปกครองเพื่อดูข้อมูล</p>
                </div>
              </div>
            </div>
          </div>
        ) : enrollments.length === 0 ? (
          <div className="row">
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center py-5">
                  <i className="bi bi-inbox display-1 text-muted mb-3"></i>
                  <h4 className="text-muted mb-3">ยังไม่มีข้อมูลการลงทะเบียน</h4>
                  <p className="text-muted mb-4">คุณยังไม่มีการสมัครเรียนที่รอการยืนยัน</p>
                  <a href="#" className="btn btn-primary ripple">
                    <i className="bi bi-plus-circle me-2"></i>
                    ลงทะเบียนเรียน
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {enrollments.map((enrollment) => {
              const scores = enrollment.scores || { technique: 0, endurance: 0, safety: 0 };
              const avgScore = calculateAverageScore(scores);
              const progressPercent = calculateProgress(enrollment.attendance || 0, enrollment.totalClasses || 8);

              return (
                <div key={enrollment.id} className="col-12">
                  <div className="card border-0 shadow-lg animate-scale-in">
                    <div className="card-body p-4">
                      {/* Student Header */}
                      <div className="row align-items-center mb-4 pb-4 border-bottom">
                        <div className="col-auto">
                          <div 
                            className="rounded-circle d-flex align-items-center justify-content-center"
                            style={{
                              width: '80px',
                              height: '80px',
                              background: 'linear-gradient(135deg, var(--primary-color) 0%, #0891b2 100%)',
                              color: 'white',
                              fontSize: '2rem'
                            }}
                          >
                            <i className="bi bi-person-fill"></i>
                          </div>
                        </div>
                        <div className="col">
                          <h3 className="mb-1 fw-bold">{enrollment.name}</h3>
                          <p className="text-muted mb-2">{enrollment.course}</p>
                          <div className="d-flex gap-2 flex-wrap">
                            <span className={`badge ${getPaymentBadgeClass(enrollment.paymentStatus)}`}>
                              <i className="bi bi-credit-card me-1"></i>
                              {enrollment.paymentStatus}
                            </span>
                            <span className="badge bg-info">
                              <i className="bi bi-graph-up me-1"></i>
                              {enrollment.progress}
                            </span>
                            {enrollment.grade && (
                              <span className={`badge ${getGradeBadgeClass(enrollment.grade)}`}>
                                <i className="bi bi-award me-1"></i>
                                เกรด {enrollment.grade}
                              </span>
                            )}
                            {enrollment.passed !== undefined && (
                              <span className={`badge ${enrollment.passed ? 'bg-success' : 'bg-danger'}`}>
                                <i className={`bi ${enrollment.passed ? 'bi-check-circle' : 'bi-x-circle'} me-1`}></i>
                                {enrollment.passed ? 'ผ่าน' : 'ไม่ผ่าน'}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-auto text-end d-none d-md-block">
                          <small className="text-muted d-block">รหัสสมัคร</small>
                          <code className="text-primary">{enrollment.id.substring(0, 8)}</code>
                        </div>
                      </div>

                      <div className="row g-4">
                        {/* Schedule & Location */}
                        <div className="col-lg-6">
                          <div className="card bg-light border-0 h-100">
                            <div className="card-body">
                              <h5 className="mb-3 fw-bold text-primary">
                                <i className="bi bi-calendar-week me-2"></i>
                                ตารางเรียนและสถานที่
                              </h5>
                              
                              <div className="mb-3">
                                <div className="d-flex align-items-center mb-2">
                                  <i className="bi bi-clock text-primary me-2 fs-5"></i>
                                  <strong>เวลาเรียน:</strong>
                                </div>
                                <p className="ms-4 mb-0 text-muted">
                                  {enrollment.schedule || 'ยังไม่กำหนด'}
                                </p>
                              </div>

                              <div className="mb-3">
                                <div className="d-flex align-items-center mb-2">
                                  <i className="bi bi-geo-alt text-primary me-2 fs-5"></i>
                                  <strong>สถานที่เรียน:</strong>
                                </div>
                                <p className="ms-4 mb-0 text-muted">
                                  {enrollment.location || 'ยังไม่กำหนด'}
                                </p>
                              </div>

                              <div className="mb-3">
                                <div className="d-flex align-items-center mb-2">
                                  <i className="bi bi-calendar-check text-primary me-2 fs-5"></i>
                                  <strong>วันเริ่มต้น:</strong>
                                </div>
                                <p className="ms-4 mb-0 text-muted">
                                  {enrollment.startDate || 'ไม่ระบุ'}
                                </p>
                              </div>

                              <div>
                                <div className="d-flex align-items-center mb-2">
                                  <i className="bi bi-telephone text-primary me-2 fs-5"></i>
                                  <strong>เบอร์ติดต่อ:</strong>
                                </div>
                                <p className="ms-4 mb-0 text-muted">
                                  {enrollment.phone || 'ไม่ระบุ'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Attendance Progress */}
                        <div className="col-lg-6">
                          <div className="card bg-light border-0 h-100">
                            <div className="card-body">
                              <h5 className="mb-3 fw-bold text-primary">
                                <i className="bi bi-clipboard-check me-2"></i>
                                การเข้าเรียน
                              </h5>
                              
                              <div className="text-center mb-3">
                                <div className="position-relative d-inline-block">
                                  <svg width="120" height="120">
                                    <circle
                                      cx="60"
                                      cy="60"
                                      r="50"
                                      fill="none"
                                      stroke="#e2e8f0"
                                      strokeWidth="10"
                                    />
                                    <circle
                                      cx="60"
                                      cy="60"
                                      r="50"
                                      fill="none"
                                      stroke="var(--primary-color)"
                                      strokeWidth="10"
                                      strokeDasharray={`${(progressPercent / 100) * 314} 314`}
                                      strokeLinecap="round"
                                      transform="rotate(-90 60 60)"
                                    />
                                  </svg>
                                  <div className="position-absolute top-50 start-50 translate-middle">
                                    <div className="fw-bold" style={{ fontSize: '1.5rem', color: 'var(--primary-color)' }}>
                                      {progressPercent}%
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="text-center mb-3">
                                <h3 className="mb-0">
                                  <span className="text-primary">{enrollment.attendance || 0}</span>
                                  <span className="text-muted"> / {enrollment.totalClasses || 8}</span>
                                </h3>
                                <small className="text-muted">ครั้งที่เข้าเรียน</small>
                              </div>

                              <div className="progress" style={{ height: '10px' }}>
                                <div 
                                  className="progress-bar bg-gradient-primary" 
                                  role="progressbar" 
                                  style={{ width: `${progressPercent}%` }}
                                  aria-valuenow={progressPercent} 
                                  aria-valuemin={0} 
                                  aria-valuemax={100}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Scores & Grades */}
                        {(scores.technique > 0 || scores.endurance > 0 || scores.safety > 0) && (
                          <div className="col-12">
                            <div className="card bg-light border-0">
                              <div className="card-body">
                                <h5 className="mb-4 fw-bold text-primary">
                                  <i className="bi bi-bar-chart me-2"></i>
                                  ผลการประเมิน
                                </h5>

                                <div className="row g-4 mb-4">
                                  {/* Technique Score */}
                                  <div className="col-md-4">
                                    <div className="text-center">
                                      <i className="bi bi-stars text-primary display-4 mb-2"></i>
                                      <h6 className="mb-2">เทคนิค</h6>
                                      <div className="progress mb-2" style={{ height: '25px' }}>
                                        <div 
                                          className="progress-bar bg-info" 
                                          role="progressbar" 
                                          style={{ width: `${scores.technique}%` }}
                                        >
                                          {scores.technique}
                                        </div>
                                      </div>
                                      <small className="text-muted">คะแนนเทคนิคการว่ายน้ำ</small>
                                    </div>
                                  </div>

                                  {/* Endurance Score */}
                                  <div className="col-md-4">
                                    <div className="text-center">
                                      <i className="bi bi-heart-pulse text-danger display-4 mb-2"></i>
                                      <h6 className="mb-2">ความอดทน</h6>
                                      <div className="progress mb-2" style={{ height: '25px' }}>
                                        <div 
                                          className="progress-bar bg-warning" 
                                          role="progressbar" 
                                          style={{ width: `${scores.endurance}%` }}
                                        >
                                          {scores.endurance}
                                        </div>
                                      </div>
                                      <small className="text-muted">ความทนทานในการว่ายน้ำ</small>
                                    </div>
                                  </div>

                                  {/* Safety Score */}
                                  <div className="col-md-4">
                                    <div className="text-center">
                                      <i className="bi bi-shield-check text-success display-4 mb-2"></i>
                                      <h6 className="mb-2">ความปลอดภัย</h6>
                                      <div className="progress mb-2" style={{ height: '25px' }}>
                                        <div 
                                          className="progress-bar bg-success" 
                                          role="progressbar" 
                                          style={{ width: `${scores.safety}%` }}
                                        >
                                          {scores.safety}
                                        </div>
                                      </div>
                                      <small className="text-muted">ความปลอดภัยในน้ำ</small>
                                    </div>
                                  </div>
                                </div>

                                {/* Average Score & Grade */}
                                <div className="row">
                                  <div className="col-md-6 mx-auto">
                                    <div className="card border-primary">
                                      <div className="card-body text-center">
                                        <h6 className="text-muted mb-2">คะแนนเฉลี่ย</h6>
                                        <div className="display-4 fw-bold text-primary mb-2">{avgScore}</div>
                                        {enrollment.grade && (
                                          <>
                                            <h6 className="text-muted mb-2">เกรด</h6>
                                            <span className={`badge ${getGradeBadgeClass(enrollment.grade)} fs-3 px-4 py-2`}>
                                              {enrollment.grade}
                                            </span>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Additional Info */}
                      <div className="row mt-4">
                        <div className="col-12">
                          <div className="alert alert-info border-0 d-flex align-items-center mb-0">
                            <i className="bi bi-info-circle me-3 fs-4"></i>
                            <div>
                              <strong>หมายเหตุ:</strong> 
                              <span className="ms-2">
                                {enrollment.passed === true 
                                  ? 'ยินดีด้วย! คุณผ่านหลักสูตรเรียบร้อยแล้ว' 
                                  : enrollment.passed === false
                                  ? 'กรุณาติดต่อครูผู้สอนเพื่อปรับปรุงทักษะ'
                                  : 'กำลังเรียนอยู่ในระหว่างหลักสูตร'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
