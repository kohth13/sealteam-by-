import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, updateDoc, doc } from 'firebase/firestore';
import { getFirebaseDb, APP_ID } from '../../lib/firebase';

interface Enrollment {
  id: string;
  name: string;
  age: number;
  course: string;
  schedule?: string;
  location?: string;
  paymentStatus: string;
  progress: string;
  attendance?: number;
  totalClasses?: number;
  phone?: string;
  grade?: string;
  passed?: boolean;
  scores?: {
    technique: number;
    endurance: number;
    safety: number;
  };
  [key: string]: any;
}

interface DashboardPageProps {
  onShowInfo: (title: string, message: string) => void;
}

export default function DashboardPage({ onShowInfo }: DashboardPageProps) {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [stats, setStats] = useState({ 
    total: 0, 
    paid: 0, 
    pending: 0, 
    passed: 0,
    failed: 0,
    courseCounts: {} as Record<string, number> 
  });
  const [editingEnrollment, setEditingEnrollment] = useState<Enrollment | null>(null);
  const [editForm, setEditForm] = useState({
    paymentStatus: '',
    progress: '',
    schedule: '',
    location: '',
    attendance: 0,
    totalClasses: 8,
    grade: '',
    passed: false,
    scores: {
      technique: 0,
      endurance: 0,
      safety: 0
    }
  });
  const [editStatus, setEditStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'grading'>('overview');

  useEffect(() => {
    const db = getFirebaseDb();
    const enrollmentsRef = collection(db, `artifacts/${APP_ID}/public/data/enrollments`);
    const q = query(enrollmentsRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const enrollmentsList: Enrollment[] = [];
      const newStats = { 
        total: 0, 
        paid: 0, 
        pending: 0, 
        passed: 0,
        failed: 0,
        courseCounts: {} as Record<string, number> 
      };

      snapshot.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() } as Enrollment;
        enrollmentsList.push(data);

        newStats.total++;
        if (data.paymentStatus === 'ชำระเงินเรียบร้อย') {
          newStats.paid++;
        } else if (data.paymentStatus === 'รอชำระเงิน' || data.paymentStatus === 'รอยืนยันสลิป') {
          newStats.pending++;
        }

        if (data.passed === true) newStats.passed++;
        if (data.passed === false) newStats.failed++;

        newStats.courseCounts[data.course] = (newStats.courseCounts[data.course] || 0) + 1;
      });

      setEnrollments(enrollmentsList);
      setStats(newStats);
    }, (error) => {
      console.error("Error fetching enrollments:", error);
      const errorMessage = error.code === 'permission-denied' 
        ? 'ไม่มีสิทธิ์เข้าถึงข้อมูล กรุณาตรวจสอบ Firestore Security Rules ใน Firebase Console'
        : `ไม่สามารถดึงข้อมูลได้: ${error.message}`;
      onShowInfo('ข้อผิดพลาดการเชื่อมต่อ', errorMessage);
    });

    return () => unsubscribe();
  }, [onShowInfo]);

  const handleEdit = (enrollment: Enrollment) => {
    setEditingEnrollment(enrollment);
    setEditForm({
      paymentStatus: enrollment.paymentStatus,
      progress: enrollment.progress,
      schedule: enrollment.schedule || '',
      location: enrollment.location || '',
      attendance: enrollment.attendance || 0,
      totalClasses: enrollment.totalClasses || 8,
      grade: enrollment.grade || '',
      passed: enrollment.passed || false,
      scores: enrollment.scores || {
        technique: 0,
        endurance: 0,
        safety: 0
      }
    });
    setEditStatus('');
  };

  const handleSaveEdit = async () => {
    if (!editingEnrollment) return;
    
    setEditStatus('กำลังบันทึก...');
    try {
      const db = getFirebaseDb();
      const enrollmentRef = doc(db, `artifacts/${APP_ID}/public/data/enrollments`, editingEnrollment.id);
      await updateDoc(enrollmentRef, editForm);
      setEditStatus('✅ บันทึกสำเร็จ!');
      setTimeout(() => {
        setEditingEnrollment(null);
        setEditStatus('');
        // Close modal
        const modalElement = document.getElementById('editModal');
        if (modalElement) {
          const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
          if (modal) modal.hide();
        }
      }, 1500);
    } catch (error: any) {
      setEditStatus(`❌ เกิดข้อผิดพลาด: ${error.message}`);
    }
  };

  const calculateAverageScore = (scores: { technique: number; endurance: number; safety: number }) => {
    return Math.round((scores.technique + scores.endurance + scores.safety) / 3);
  };

  const getGradeFromScore = (avgScore: number) => {
    if (avgScore >= 90) return 'A';
    if (avgScore >= 80) return 'B';
    if (avgScore >= 70) return 'C';
    if (avgScore >= 60) return 'D';
    return 'F';
  };

  const filteredEnrollments = enrollments.filter(enrollment => {
    const matchesSearch = enrollment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          enrollment.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || enrollment.paymentStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getPaymentBadgeClass = (status: string) => {
    switch (status) {
      case 'ชำระเงินเรียบร้อย': return 'bg-success';
      case 'รอชำระเงิน': return 'bg-danger';
      case 'รอยืนยันสลิป': return 'bg-warning';
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
                    <i className="bi bi-speedometer2 me-3"></i>
                    แดชบอร์ดจัดการคอร์ส
                  </h1>
                  <p className="mb-0">ระบบจัดการนักเรียน ตารางเรียน และการให้คะแนน</p>
                </div>
                <div className="col-lg-4 text-center d-none d-lg-block">
                  <i className="bi bi-graph-up display-1 animate-float"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-6 col-lg-3 animate-scale-in stagger-1">
          <div className="stats-box">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <p className="text-muted mb-1">นักเรียนทั้งหมด</p>
                <div className="stats-number">{stats.total}</div>
              </div>
              <div className="icon-box">
                <i className="bi bi-people"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 animate-scale-in stagger-2">
          <div className="stats-box">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <p className="text-muted mb-1">ชำระเงินแล้ว</p>
                <div className="stats-number">{stats.paid}</div>
              </div>
              <div className="icon-box" style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }}>
                <i className="bi bi-check-circle"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 animate-scale-in stagger-3">
          <div className="stats-box">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <p className="text-muted mb-1">ผ่านหลักสูตร</p>
                <div className="stats-number">{stats.passed}</div>
              </div>
              <div className="icon-box" style={{ background: 'linear-gradient(135deg, #3b82f6, #60a5fa)' }}>
                <i className="bi bi-trophy"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 animate-scale-in stagger-4">
          <div className="stats-box">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <p className="text-muted mb-1">อัตราผ่าน</p>
                <div className="stats-number">
                  {stats.total > 0 ? Math.round((stats.passed / stats.total) * 100) : 0}%
                </div>
              </div>
              <div className="icon-box" style={{ background: 'linear-gradient(135deg, #f59e0b, #fbbf24)' }}>
                <i className="bi bi-graph-up-arrow"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="row mb-4">
        <div className="col-12">
          <ul className="nav nav-pills nav-fill gap-2 bg-white p-3 rounded-3 shadow-sm">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
                style={{ borderRadius: '10px' }}
              >
                <i className="bi bi-grid me-2"></i>
                ภาพรวม
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'schedule' ? 'active' : ''}`}
                onClick={() => setActiveTab('schedule')}
                style={{ borderRadius: '10px' }}
              >
                <i className="bi bi-calendar-week me-2"></i>
                ตารางเรียน
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'grading' ? 'active' : ''}`}
                onClick={() => setActiveTab('grading')}
                style={{ borderRadius: '10px' }}
              >
                <i className="bi bi-award me-2"></i>
                การให้คะแนน
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="row mb-4 animate-slide-in-right">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-3">
              <div className="row g-3 align-items-center">
                <div className="col-md-6">
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <i className="bi bi-search text-muted"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0 ps-0"
                      placeholder="ค้นหาชื่อนักเรียนหรือคอร์ส..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <select
                    className="form-select"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">ทุกสถานะการชำระเงิน</option>
                    <option value="ชำระเงินเรียบร้อย">ชำระเงินเรียบร้อย</option>
                    <option value="รอยืนยันสลิป">รอยืนยันสลิป</option>
                    <option value="รอชำระเงิน">รอชำระเงิน</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <div className="badge bg-light text-dark w-100 py-2">
                    <i className="bi bi-funnel me-2"></i>
                    {filteredEnrollments.length} รายการ
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <div className="row animate-fade-in">
          <div className="col-12">
            <div className="card border-0 shadow-lg">
              <div className="card-header bg-white border-0 p-4">
                <h4 className="mb-0 fw-bold">
                  <i className="bi bi-table me-2 text-primary"></i>
                  รายการลงทะเบียน
                </h4>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th style={{ width: '5%' }}>#</th>
                        <th style={{ width: '20%' }}>ชื่อ-นามสกุล</th>
                        <th style={{ width: '15%' }}>คอร์ส</th>
                        <th style={{ width: '10%' }}>อายุ</th>
                        <th style={{ width: '15%' }}>สถานะการชำระ</th>
                        <th style={{ width: '12%' }}>ความก้าวหน้า</th>
                        <th style={{ width: '10%' }}>เข้าเรียน</th>
                        <th style={{ width: '8%' }}>เกรด</th>
                        <th style={{ width: '5%' }}>จัดการ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEnrollments.length === 0 ? (
                        <tr>
                          <td colSpan={9} className="text-center py-5">
                            <i className="bi bi-inbox display-4 text-muted d-block mb-3"></i>
                            <p className="text-muted mb-0">ไม่พบข้อมูลนักเรียน</p>
                          </td>
                        </tr>
                      ) : (
                        filteredEnrollments.map((enrollment, index) => (
                          <tr key={enrollment.id}>
                            <td className="fw-bold text-muted">{index + 1}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2" 
                                     style={{ width: '35px', height: '35px', fontSize: '0.85rem' }}>
                                  {enrollment.name.charAt(0)}
                                </div>
                                <div>
                                  <div className="fw-bold">{enrollment.name}</div>
                                  {enrollment.phone && (
                                    <small className="text-muted">
                                      <i className="bi bi-telephone me-1"></i>
                                      {enrollment.phone}
                                    </small>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td>
                              <small className="text-muted">{enrollment.course}</small>
                            </td>
                            <td>
                              <span className="badge bg-light text-dark">{enrollment.age} ปี</span>
                            </td>
                            <td>
                              <span className={`badge ${getPaymentBadgeClass(enrollment.paymentStatus)}`}>
                                {enrollment.paymentStatus}
                              </span>
                            </td>
                            <td>
                              <span className="badge bg-info">
                                {enrollment.progress}
                              </span>
                            </td>
                            <td>
                              <span className="badge bg-primary">
                                {enrollment.attendance || 0}/{enrollment.totalClasses || 8}
                              </span>
                            </td>
                            <td>
                              {enrollment.grade ? (
                                <span className={`badge ${getGradeBadgeClass(enrollment.grade)}`}>
                                  {enrollment.grade}
                                </span>
                              ) : (
                                <span className="badge bg-secondary">-</span>
                              )}
                            </td>
                            <td>
                              <button
                                onClick={() => handleEdit(enrollment)}
                                className="btn btn-sm btn-outline-primary ripple"
                                data-bs-toggle="modal"
                                data-bs-target="#editModal"
                              >
                                <i className="bi bi-pencil"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'schedule' && (
        <div className="row animate-fade-in">
          <div className="col-12">
            <div className="card border-0 shadow-lg">
              <div className="card-header bg-white border-0 p-4">
                <h4 className="mb-0 fw-bold">
                  <i className="bi bi-calendar-week me-2 text-primary"></i>
                  ตารางเรียนทั้งหมด
                </h4>
              </div>
              <div className="card-body">
                <div className="row g-4">
                  {filteredEnrollments.map((enrollment) => (
                    <div key={enrollment.id} className="col-md-6 col-lg-4">
                      <div className="card h-100 border-0 shadow-sm hover-shadow">
                        <div className="card-body">
                          <div className="d-flex align-items-center mb-3">
                            <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3" 
                                 style={{ width: '50px', height: '50px' }}>
                              <i className="bi bi-person-fill"></i>
                            </div>
                            <div>
                              <h6 className="mb-0 fw-bold">{enrollment.name}</h6>
                              <small className="text-muted">{enrollment.course}</small>
                            </div>
                          </div>
                          <div className="border-top pt-3">
                            <div className="mb-2">
                              <i className="bi bi-clock text-primary me-2"></i>
                              <strong>เวลา:</strong> {enrollment.schedule || 'ยังไม่กำหนด'}
                            </div>
                            <div className="mb-2">
                              <i className="bi bi-geo-alt text-primary me-2"></i>
                              <strong>สถานที่:</strong> {enrollment.location || 'ยังไม่กำหนด'}
                            </div>
                            <div className="mb-2">
                              <i className="bi bi-calendar-check text-primary me-2"></i>
                              <strong>เข้าเรียน:</strong> {enrollment.attendance || 0}/{enrollment.totalClasses || 8} ครั้ง
                            </div>
                          </div>
                          <button
                            onClick={() => handleEdit(enrollment)}
                            className="btn btn-outline-primary btn-sm w-100 mt-3 ripple"
                            data-bs-toggle="modal"
                            data-bs-target="#editModal"
                          >
                            <i className="bi bi-pencil me-2"></i>
                            แก้ไขตารางเรียน
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'grading' && (
        <div className="row animate-fade-in">
          <div className="col-12">
            <div className="card border-0 shadow-lg">
              <div className="card-header bg-white border-0 p-4">
                <h4 className="mb-0 fw-bold">
                  <i className="bi bi-award me-2 text-primary"></i>
                  การให้คะแนนและประเมินผล
                </h4>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th style={{ width: '5%' }}>#</th>
                        <th style={{ width: '20%' }}>ชื่อนักเรียน</th>
                        <th style={{ width: '15%' }}>คอร์ส</th>
                        <th style={{ width: '12%' }}>เทคนิค</th>
                        <th style={{ width: '12%' }}>ความอดทน</th>
                        <th style={{ width: '12%' }}>ความปลอดภัย</th>
                        <th style={{ width: '10%' }}>เฉลี่ย</th>
                        <th style={{ width: '8%' }}>เกรด</th>
                        <th style={{ width: '6%' }}>ส���านะ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEnrollments.length === 0 ? (
                        <tr>
                          <td colSpan={9} className="text-center py-5">
                            <i className="bi bi-inbox display-4 text-muted d-block mb-3"></i>
                            <p className="text-muted mb-0">ไม่พบข้อมูลนักเรียน</p>
                          </td>
                        </tr>
                      ) : (
                        filteredEnrollments.map((enrollment, index) => {
                          const scores = enrollment.scores || { technique: 0, endurance: 0, safety: 0 };
                          const avgScore = calculateAverageScore(scores);
                          const calculatedGrade = getGradeFromScore(avgScore);
                          
                          return (
                            <tr key={enrollment.id}>
                              <td className="fw-bold text-muted">{index + 1}</td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2" 
                                       style={{ width: '35px', height: '35px', fontSize: '0.85rem' }}>
                                    {enrollment.name.charAt(0)}
                                  </div>
                                  <span className="fw-bold">{enrollment.name}</span>
                                </div>
                              </td>
                              <td>
                                <small className="text-muted">{enrollment.course}</small>
                              </td>
                              <td>
                                <span className="badge bg-info">{scores.technique}/100</span>
                              </td>
                              <td>
                                <span className="badge bg-info">{scores.endurance}/100</span>
                              </td>
                              <td>
                                <span className="badge bg-info">{scores.safety}/100</span>
                              </td>
                              <td>
                                <span className="badge bg-primary">{avgScore}</span>
                              </td>
                              <td>
                                <span className={`badge ${getGradeBadgeClass(enrollment.grade || calculatedGrade)}`}>
                                  {enrollment.grade || calculatedGrade}
                                </span>
                              </td>
                              <td>
                                {enrollment.passed === true ? (
                                  <span className="badge bg-success">
                                    <i className="bi bi-check-circle"></i>
                                  </span>
                                ) : enrollment.passed === false ? (
                                  <span className="badge bg-danger">
                                    <i className="bi bi-x-circle"></i>
                                  </span>
                                ) : (
                                  <span className="badge bg-secondary">-</span>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      <div className="modal fade" id="editModal" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow-xl">
            <div className="modal-header bg-gradient-primary text-white border-0">
              <h5 className="modal-title fw-bold">
                <i className="bi bi-pencil-square me-2"></i>
                แก้ไขข้อมูลนักเรียน
              </h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body p-4">
              {editingEnrollment && (
                <div>
                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-3 pb-3 border-bottom">
                      <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3" 
                           style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}>
                        {editingEnrollment.name.charAt(0)}
                      </div>
                      <div>
                        <h5 className="mb-0 fw-bold">{editingEnrollment.name}</h5>
                        <small className="text-muted">{editingEnrollment.course} • {editingEnrollment.age} ปี</small>
                      </div>
                    </div>
                  </div>

                  {/* Tabs for different sections */}
                  <ul className="nav nav-tabs mb-4" role="tablist">
                    <li className="nav-item">
                      <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#basic-info">
                        <i className="bi bi-info-circle me-2"></i>ข้อมูลพื้นฐาน
                      </button>
                    </li>
                    <li className="nav-item">
                      <button className="nav-link" data-bs-toggle="tab" data-bs-target="#schedule-info">
                        <i className="bi bi-calendar me-2"></i>ตารางเรียน
                      </button>
                    </li>
                    <li className="nav-item">
                      <button className="nav-link" data-bs-toggle="tab" data-bs-target="#grading-info">
                        <i className="bi bi-award me-2"></i>การให้คะแนน
                      </button>
                    </li>
                  </ul>

                  <div className="tab-content">
                    {/* Basic Info Tab */}
                    <div className="tab-pane fade show active" id="basic-info">
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label fw-bold">
                            <i className="bi bi-credit-card me-2"></i>
                            สถานะการชำระเงิน
                          </label>
                          <select
                            className="form-select"
                            value={editForm.paymentStatus}
                            onChange={(e) => setEditForm({ ...editForm, paymentStatus: e.target.value })}
                          >
                            <option value="รอชำระเงิน">รอชำระเงิน</option>
                            <option value="รอยืนยันสลิป">รอยืนยันสลิป</option>
                            <option value="ชำระเงินเรียบร้อย">ชำระเงินเรียบร้อย</option>
                          </select>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-bold">
                            <i className="bi bi-graph-up me-2"></i>
                            ความก้าวหน้า
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={editForm.progress}
                            onChange={(e) => setEditForm({ ...editForm, progress: e.target.value })}
                            placeholder="เช่น กำลังเรียน, เสร็จสิ้น"
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-bold">
                            <i className="bi bi-check2-circle me-2"></i>
                            จำนวนครั้งที่เข้าเรียน
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            value={editForm.attendance}
                            onChange={(e) => setEditForm({ ...editForm, attendance: parseInt(e.target.value) || 0 })}
                            min="0"
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-bold">
                            <i className="bi bi-calendar-range me-2"></i>
                            จำนวนคาบเรียนทั้งหมด
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            value={editForm.totalClasses}
                            onChange={(e) => setEditForm({ ...editForm, totalClasses: parseInt(e.target.value) || 8 })}
                            min="1"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Schedule Tab */}
                    <div className="tab-pane fade" id="schedule-info">
                      <div className="row g-3">
                        <div className="col-12">
                          <label className="form-label fw-bold">
                            <i className="bi bi-calendar-event me-2"></i>
                            ตารางเรียน
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={editForm.schedule}
                            onChange={(e) => setEditForm({ ...editForm, schedule: e.target.value })}
                            placeholder="เช่น จันทร์-ศุกร์ 14:00-16:00"
                          />
                          <small className="text-muted">ระบุวันและเวลาที่เรียน</small>
                        </div>

                        <div className="col-12">
                          <label className="form-label fw-bold">
                            <i className="bi bi-geo-alt me-2"></i>
                            สถานที่เรียน
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={editForm.location}
                            onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                            placeholder="เช่น สระว่ายน้ำมหาวิทยาลัยพิษณุโลก"
                          />
                          <small className="text-muted">ระบุสถานที่เรียนว่ายน้ำ</small>
                        </div>
                      </div>
                    </div>

                    {/* Grading Tab */}
                    <div className="tab-pane fade" id="grading-info">
                      <div className="row g-3">
                        <div className="col-md-4">
                          <label className="form-label fw-bold">
                            <i className="bi bi-star me-2"></i>
                            คะแนนเทคนิค
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            value={editForm.scores.technique}
                            onChange={(e) => setEditForm({ 
                              ...editForm, 
                              scores: { ...editForm.scores, technique: parseInt(e.target.value) || 0 }
                            })}
                            min="0"
                            max="100"
                          />
                          <small className="text-muted">0-100 คะแนน</small>
                        </div>

                        <div className="col-md-4">
                          <label className="form-label fw-bold">
                            <i className="bi bi-heart-pulse me-2"></i>
                            คะแนนความอดทน
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            value={editForm.scores.endurance}
                            onChange={(e) => setEditForm({ 
                              ...editForm, 
                              scores: { ...editForm.scores, endurance: parseInt(e.target.value) || 0 }
                            })}
                            min="0"
                            max="100"
                          />
                          <small className="text-muted">0-100 คะแนน</small>
                        </div>

                        <div className="col-md-4">
                          <label className="form-label fw-bold">
                            <i className="bi bi-shield-check me-2"></i>
                            คะแนนความปลอดภัย
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            value={editForm.scores.safety}
                            onChange={(e) => setEditForm({ 
                              ...editForm, 
                              scores: { ...editForm.scores, safety: parseInt(e.target.value) || 0 }
                            })}
                            min="0"
                            max="100"
                          />
                          <small className="text-muted">0-100 คะแนน</small>
                        </div>

                        <div className="col-12">
                          <div className="alert alert-info border-0 d-flex align-items-center">
                            <i className="bi bi-info-circle me-3 fs-4"></i>
                            <div>
                              <strong>คะแนนเฉลี่ย: {calculateAverageScore(editForm.scores)}</strong>
                              <br />
                              <small>เกรดที่คาดการณ์: {getGradeFromScore(calculateAverageScore(editForm.scores))}</small>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-bold">
                            <i className="bi bi-mortarboard me-2"></i>
                            เกรดขั้นสุดท้าย
                          </label>
                          <select
                            className="form-select"
                            value={editForm.grade}
                            onChange={(e) => setEditForm({ ...editForm, grade: e.target.value })}
                          >
                            <option value="">เลือกเกรด</option>
                            <option value="A">A (ดีเยี่ยม)</option>
                            <option value="B">B (ดี)</option>
                            <option value="C">C (พอใช้)</option>
                            <option value="D">D (ปรับปรุง)</option>
                            <option value="F">F (ไม่ผ่าน)</option>
                          </select>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-bold">
                            <i className="bi bi-trophy me-2"></i>
                            สถานะการผ่าน
                          </label>
                          <select
                            className="form-select"
                            value={editForm.passed ? 'true' : 'false'}
                            onChange={(e) => setEditForm({ ...editForm, passed: e.target.value === 'true' })}
                          >
                            <option value="">ยังไม่ประเมิน</option>
                            <option value="true">ผ่าน</option>
                            <option value="false">ไม่ผ่าน</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {editStatus && (
                    <div className={`alert mt-4 ${editStatus.includes('✅') ? 'alert-success' : editStatus.includes('❌') ? 'alert-danger' : 'alert-info'} border-0 mb-0`}>
                      {editStatus}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="modal-footer border-0 bg-light">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                <i className="bi bi-x-circle me-2"></i>
                ยกเลิก
              </button>
              <button type="button" className="btn btn-primary ripple" onClick={handleSaveEdit}>
                <i className="bi bi-check-circle me-2"></i>
                บันทึกการแก้ไข
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
