import { useState, FormEvent } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getFirebaseDb, APP_ID } from '../../lib/firebase';

interface RegistrationPageProps {
  userId: string | null;
  selectedCourse?: string;
  onShowInfo: (title: string, message: string) => void;
}

export default function RegistrationPage({ userId, selectedCourse, onShowInfo }: RegistrationPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    weightHeight: '',
    underlyingIllness: '',
    hasADHD: 'no',
    school: '',
    course: selectedCourse || '',
    startDate: '',
    phone: '',
    transferSlip: ''
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('กำลังส่งข้อมูล...');
    setIsSubmitting(true);

    try {
      const db = getFirebaseDb();
      const enrollmentData = {
        ...formData,
        age: parseInt(formData.age),
        registeredBy: userId || 'guest_user',
        registeredTime: serverTimestamp(),
        paymentStatus: 'รอยืนยันสลิป',
        progress: 'รอเริ่มคอร์ส',
        schedule: 'รอกำหนด',
        attendance: 0
      };

      const docRef = await addDoc(
        collection(db, `artifacts/${APP_ID}/public/data/enrollments`),
        enrollmentData
      );

      setStatus(`✅ ลงทะเบียนสำเร็จ! รหัสการสมัครของคุณคือ ${docRef.id}`);
      onShowInfo(
        'ลงทะเบียนสำเร็จ!',
        `รหัส: ${docRef.id}<br/>ระบบจะติดต่อกลับเพื่อยืนยันการชำระเงินและกำหนดตารางเรียน`
      );
      
      // Reset form
      setFormData({
        name: '',
        gender: '',
        age: '',
        weightHeight: '',
        underlyingIllness: '',
        hasADHD: 'no',
        school: '',
        course: selectedCourse || '',
        startDate: '',
        phone: '',
        transferSlip: ''
      });
    } catch (error: any) {
      setStatus(`❌ ข้อผิดพลาดในการลงทะเบียน: ${error.message}`);
      onShowInfo('ข้อผิดพลาด', `ไม่สามารถบันทึกข้อมูลได้: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="row mb-5 animate-slide-in-left">
        <div className="col-12">
          <div className="card border-0 shadow-lg bg-gradient-primary text-white overflow-hidden">
            <div className="card-body p-5 position-relative" style={{ zIndex: 1 }}>
              <div className="row align-items-center">
                <div className="col-lg-8">
                  <h1 className="display-5 fw-bold mb-3">
                    <i className="bi bi-pencil-square me-3"></i>
                    แบบฟอร์มลงทะเบียนเรียน
                  </h1>
                  <p className="lead mb-0">
                    กรอกข้อมูลให้ครบถ้วน เพื่อให้เราสามารถดูแลและพัฒนาทักษะของคุณได้อย่างเต็มที่
                  </p>
                </div>
                <div className="col-lg-4 text-center d-none d-lg-block">
                  <i className="bi bi-clipboard-check display-1 animate-float"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Form Section */}
        <div className="col-lg-8 animate-slide-in-left">
          <div className="card border-0 shadow-lg rounded-custom">
            <div className="card-header bg-white border-0 p-4">
              <h4 className="mb-0 fw-bold">
                <i className="bi bi-person-fill-add text-primary me-2"></i>
                ข้อมูลผู้เรียน
              </h4>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* Name */}
                  <div className="col-md-12">
                    <label htmlFor="name" className="form-label">
                      <i className="bi bi-person me-2"></i>
                      ชื่อ-นามสกุล ผู้เรียน <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-control form-control-lg"
                      placeholder="ระบุชื่อ-นามสกุล"
                    />
                  </div>

                  {/* Gender & Age */}
                  <div className="col-md-6">
                    <label htmlFor="gender" className="form-label">
                      <i className="bi bi-gender-ambiguous me-2"></i>
                      เพศ <span className="text-danger">*</span>
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className="form-select form-select-lg"
                    >
                      <option value="">เลือกเพศ</option>
                      <option value="ชาย">ชาย</option>
                      <option value="หญิง">หญิง</option>
                      <option value="อื่นๆ">อื่นๆ</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="age" className="form-label">
                      <i className="bi bi-calendar me-2"></i>
                      อายุ (ปี) <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      min="1"
                      max="100"
                      className="form-control form-control-lg"
                      placeholder="อายุ"
                    />
                  </div>

                  {/* Weight/Height */}
                  <div className="col-md-12">
                    <label htmlFor="weightHeight" className="form-label">
                      <i className="bi bi-rulers me-2"></i>
                      น้ำหนัก / ส่วนสูง <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="weightHeight"
                      name="weightHeight"
                      value={formData.weightHeight}
                      onChange={handleChange}
                      required
                      className="form-control form-control-lg"
                      placeholder="เช่น 50kg/165cm"
                    />
                  </div>

                  {/* School */}
                  <div className="col-md-12">
                    <label htmlFor="school" className="form-label">
                      <i className="bi bi-building me-2"></i>
                      โรงเรียน / สถานศึกษา
                    </label>
                    <input
                      type="text"
                      id="school"
                      name="school"
                      value={formData.school}
                      onChange={handleChange}
                      className="form-control form-control-lg"
                      placeholder="ระบุโรงเรียน (ถ้ามี)"
                    />
                  </div>

                  {/* Underlying Illness */}
                  <div className="col-md-12">
                    <label htmlFor="underlyingIllness" className="form-label">
                      <i className="bi bi-heart-pulse me-2"></i>
                      โรคประจำตัว / ข้อจำกัดทางร่างกาย
                    </label>
                    <textarea
                      id="underlyingIllness"
                      name="underlyingIllness"
                      value={formData.underlyingIllness}
                      onChange={handleChange}
                      className="form-control"
                      rows={2}
                      placeholder="ระบุโรคประจำตัว หรือปล่อยว่างถ้าไม่มี"
                    ></textarea>
                  </div>

                  {/* ADHD */}
                  <div className="col-md-12">
                    <label className="form-label">
                      <i className="bi bi-clipboard2-pulse me-2"></i>
                      มีภาวะ ADHD หรือไม่?
                    </label>
                    <div className="d-flex gap-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="hasADHD"
                          id="adhdNo"
                          value="no"
                          checked={formData.hasADHD === 'no'}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="adhdNo">
                          ไม่มี
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="hasADHD"
                          id="adhdYes"
                          value="yes"
                          checked={formData.hasADHD === 'yes'}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="adhdYes">
                          มี
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Course */}
                  <div className="col-md-12">
                    <label htmlFor="course" className="form-label">
                      <i className="bi bi-water me-2"></i>
                      เลือกคอร์สเรียน <span className="text-danger">*</span>
                    </label>
                    <select
                      id="course"
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      required
                      className="form-select form-select-lg"
                    >
                      <option value="">เลือกคอร์ส</option>
                      <option value="คอร์ส A: เด็ก 3-8 ปี (พื้นฐาน)">คอร์ส A: เด็ก 3-8 ปี (พื้นฐาน)</option>
                      <option value="คอร์ส B: เด็ก 9-14 ปี (กลุ่มเล็ก)">คอร์ส B: เด็ก 9-14 ปี (กลุ่มเล็ก)</option>
                      <option value="คอร์ส C: ผู้ใหญ่ทั่วไป">คอร์ส C: ผู้ใหญ่ทั่วไป</option>
                      <option value="คอร์ส D: ครอบครัว (กลุ่มเล็ก)">คอร์ส D: ครอบครัว (กลุ่มเล็ก)</option>
                      <option value="คอร์ส Baby & Mom">คอร์ส Baby & Mom</option>
                    </select>
                  </div>

                  {/* Start Date */}
                  <div className="col-md-6">
                    <label htmlFor="startDate" className="form-label">
                      <i className="bi bi-calendar-event me-2"></i>
                      วันที่ต้องการเริ่มเรียน <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                      className="form-control form-control-lg"
                    />
                  </div>

                  {/* Phone */}
                  <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">
                      <i className="bi bi-telephone me-2"></i>
                      เบอร์โทรศัพท์ <span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="form-control form-control-lg"
                      placeholder="08X-XXX-XXXX"
                    />
                  </div>

                  {/* Transfer Slip */}
                  <div className="col-md-12">
                    <label htmlFor="transferSlip" className="form-label">
                      <i className="bi bi-receipt me-2"></i>
                      หลักฐานการโอนเงิน (ลิงก์รูปภาพ)
                    </label>
                    <input
                      type="url"
                      id="transferSlip"
                      name="transferSlip"
                      value={formData.transferSlip}
                      onChange={handleChange}
                      className="form-control form-control-lg"
                      placeholder="https://example.com/slip.jpg (ถ้ามี)"
                    />
                    <small className="text-muted">
                      <i className="bi bi-info-circle me-1"></i>
                      สามารถแนบภายหลังได้ หรือส่งผ่าน Line
                    </small>
                  </div>

                  {/* Status Message */}
                  {status && (
                    <div className="col-12">
                      <div className={`alert ${status.includes('✅') ? 'alert-success' : status.includes('❌') ? 'alert-danger' : 'alert-info'} border-0 shadow-sm`}>
                        <i className={`bi ${status.includes('✅') ? 'bi-check-circle-fill' : status.includes('❌') ? 'bi-x-circle-fill' : 'bi-hourglass-split'} me-2`}></i>
                        {status}
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="col-12">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary btn-lg w-100 ripple py-3"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          กำลังส่งข้อมูล...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-check-circle me-2"></i>
                          ยืนยันการลงทะเบียน
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="col-lg-4 animate-slide-in-right">
          {/* Payment Info */}
          <div className="card border-0 shadow-lg rounded-custom mb-4">
            <div className="card-header bg-gradient-primary text-white border-0 p-4">
              <h5 className="mb-0 fw-bold">
                <i className="bi bi-cash-coin me-2"></i>
                ข้อมูลการชำระเงิน
              </h5>
            </div>
            <div className="card-body p-4">
              <div className="mb-3">
                <h6 className="fw-bold">บัญชีธนาคาร</h6>
                <p className="mb-2">
                  <i className="bi bi-bank2 me-2 text-primary"></i>
                  ธนาคารกสิกรไทย
                </p>
                <p className="mb-2">
                  <i className="bi bi-credit-card me-2 text-primary"></i>
                  เลขที่: <strong>XXX-X-XXXXX-X</strong>
                </p>
                <p className="mb-0">
                  <i className="bi bi-person-circle me-2 text-primary"></i>
                  ชื่อบัญชี: <strong>ครูฟลุ๊ค</strong>
                </p>
              </div>
              <hr />
              <div className="alert alert-warning border-0 mb-0">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                <small>โอนเงินแล้วส่งสลิปมาที่ Line เพื่อยืนยัน</small>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="card border-0 shadow-lg rounded-custom mb-4">
            <div className="card-header bg-success text-white border-0 p-4">
              <h5 className="mb-0 fw-bold">
                <i className="bi bi-headset me-2"></i>
                ติดต่อสอบถาม
              </h5>
            </div>
            <div className="card-body p-4">
              <p className="mb-3">
                <i className="bi bi-telephone-fill me-2 text-success"></i>
                <strong>โทร:</strong> 012-345-6789
              </p>
              <p className="mb-3">
                <i className="bi bi-line me-2 text-success"></i>
                <strong>Line ID:</strong> @teacherfluke
              </p>
              <p className="mb-0">
                <i className="bi bi-clock-fill me-2 text-success"></i>
                <strong>เวลาทำการ:</strong> 9:00-18:00 น.
              </p>
            </div>
          </div>

          {/* Tips */}
          <div className="card border-0 shadow-lg rounded-custom bg-info bg-opacity-10">
            <div className="card-body p-4">
              <h6 className="fw-bold text-info mb-3">
                <i className="bi bi-lightbulb-fill me-2"></i>
                เคล็ดลับ
              </h6>
              <ul className="list-unstyled mb-0 small">
                <li className="mb-2">
                  <i className="bi bi-check2 text-success me-2"></i>
                  กรอกข้อมูลให้ครบถ้วน
                </li>
                <li className="mb-2">
                  <i className="bi bi-check2 text-success me-2"></i>
                  ระบุโรคประจำตัว (ถ้ามี)
                </li>
                <li className="mb-2">
                  <i className="bi bi-check2 text-success me-2"></i>
                  โอนเงินก่อนวันเริ่มเรียน 3 วัน
                </li>
                <li className="mb-0">
                  <i className="bi bi-check2 text-success me-2"></i>
                  ส่งสลิปเพื่อยืนยันการชำระ
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
