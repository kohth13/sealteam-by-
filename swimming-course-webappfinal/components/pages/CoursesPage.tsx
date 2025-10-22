import { COURSE_DATA } from '../../lib/courseData';

interface CoursesPageProps {
  onOpenCourseDetail: (courseKey: string) => void;
}

export default function CoursesPage({ onOpenCourseDetail }: CoursesPageProps) {
  const courses = [
    { key: 'courseA', displayPrice: '3,000 บาท', badge: 'ยอดนิยม', badgeClass: 'bg-danger' },
    { key: 'courseB', displayPrice: '4,000 บาท/คน', badge: 'กลุ่มเล็ก', badgeClass: 'bg-primary' },
    { key: 'courseC', displayPrice: '2,500 บาท', badge: 'ราคาพิเศษ', badgeClass: 'bg-success' },
    { key: 'courseD', displayPrice: '3,500 บาท/คน', badge: 'แนะนำ', badgeClass: 'bg-warning' },
    { key: 'courseBaby', displayPrice: '4,500 บาท', badge: 'พิเศษ', badgeClass: 'bg-info' }
  ];

  return (
    <div className="animate-fade-in">
      {/* Header Section */}
      <div className="text-center mb-5 animate-slide-in-left">
        <h1 className="display-4 fw-bold text-gradient mb-3">
          <i className="bi bi-water me-3"></i>
          คอร์สเรียนว่ายน้ำ
        </h1>
        <p className="lead text-muted">
          เลือกคอร์สที่เหมาะกับคุณและเริ่มต้นการเรียนรู้ที่สนุกสนาน
        </p>
        <div className="d-inline-block">
          <div className="badge bg-gradient-primary px-4 py-2" style={{ fontSize: '1rem' }}>
            <i className="bi bi-fire me-2"></i>
            มีให้เลือก 5 คอร์ส
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="row g-4">
        {courses.map(({ key, displayPrice, badge, badgeClass }, index) => {
          const course = COURSE_DATA[key];
          const animationClass = index % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right';
          const staggerClass = `stagger-${index + 1}`;
          
          return (
            <div key={key} className={`col-lg-4 col-md-6 ${animationClass} ${staggerClass}`}>
              <div className="card h-100 border-0 shadow-hover position-relative overflow-hidden" style={{ borderRadius: '20px' }}>
                {/* Badge */}
                <div className="position-absolute top-0 end-0 m-3" style={{ zIndex: 2 }}>
                  <span className={`badge ${badgeClass} px-3 py-2`} style={{ fontSize: '0.85rem', borderRadius: '15px' }}>
                    <i className="bi bi-star-fill me-1"></i>
                    {badge}
                  </span>
                </div>

                {/* Image with Gradient Overlay */}
                <div className="position-relative overflow-hidden" style={{ height: '250px' }}>
                  <img
                    src={course.image}
                    alt={course.title}
                    className="card-img-top w-100 h-100"
                    style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <div className="position-absolute bottom-0 start-0 w-100 p-3" 
                       style={{ 
                         background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                         zIndex: 1
                       }}>
                    <h5 className="text-white fw-bold mb-0">{course.title}</h5>
                  </div>
                </div>

                {/* Card Body */}
                <div className="card-body p-4">
                  {/* Price */}
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div>
                      <small className="text-muted d-block">ราคาเริ่มต้น</small>
                      <h4 className="mb-0 fw-bold text-gradient">{displayPrice}</h4>
                    </div>
                    <div className="icon-box" style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}>
                      <i className="bi bi-currency-dollar"></i>
                    </div>
                  </div>

                  {/* Course Info */}
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2 text-muted">
                      <i className="bi bi-people-fill me-2 text-primary"></i>
                      <small>เหมาะสำหรับทุกวัย</small>
                    </div>
                    <div className="d-flex align-items-center mb-2 text-muted">
                      <i className="bi bi-clock-fill me-2 text-primary"></i>
                      <small>ระยะเวลาตามคอร์ส</small>
                    </div>
                    <div className="d-flex align-items-center text-muted">
                      <i className="bi bi-award-fill me-2 text-primary"></i>
                      <small>รับประกันผล</small>
                    </div>
                  </div>

                  {/* Progress bar decoration */}
                  <div className="progress mb-3" style={{ height: '4px' }}>
                    <div 
                      className="progress-bar bg-gradient-primary" 
                      role="progressbar" 
                      style={{ width: '100%' }}
                      aria-valuenow={100} 
                      aria-valuemin={0} 
                      aria-valuemax={100}
                    ></div>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => onOpenCourseDetail(key)}
                    className="btn btn-primary w-100 ripple py-2"
                  >
                    <i className="bi bi-info-circle me-2"></i>
                    ดูรายละเอียดเพิ่มเติม
                  </button>
                </div>

                {/* Hover Effect */}
                <div className="position-absolute top-0 start-0 w-100 h-100" 
                     style={{ 
                       background: 'linear-gradient(135deg, rgba(13, 148, 136, 0.1), rgba(6, 182, 212, 0.1))',
                       opacity: 0,
                       transition: 'opacity 0.3s ease',
                       pointerEvents: 'none'
                     }}
                     onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                     onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Banner */}
      <div className="row mt-5 animate-fade-in">
        <div className="col-12">
          <div className="alert alert-info border-0 rounded-custom d-flex align-items-center shadow-sm">
            <i className="bi bi-info-circle-fill me-3" style={{ fontSize: '2rem' }}></i>
            <div>
              <h5 className="alert-heading mb-2">💡 ข้อมูลเพิ่มเติม</h5>
              <p className="mb-0">
                คลิก "ดูรายละเอียดเพิ่มเติม" เพื่อดูข้อมูลครบถ้วนของแต่ละคอร์ส รวมถึงตารางเรียน เงื่อนไข และรายละเอียดอื่นๆ
                หากมีข้อสงสัยสามารถติดต่อสอบถามได้ที่ช่องทางติดต่อของเรา
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="row mt-5 animate-scale-in">
        <div className="col-12">
          <div className="card border-0 shadow-custom bg-gradient-primary text-white text-center overflow-hidden position-relative">
            <div className="card-body p-5 position-relative" style={{ zIndex: 1 }}>
              <i className="bi bi-rocket-takeoff display-3 mb-3 d-block animate-float"></i>
              <h3 className="fw-bold mb-3">พร้อมเริ่มต้นแล้วใช่ไหม?</h3>
              <p className="lead mb-4">เลือกคอร์สที่ใช่สำหรับคุณและเริ่มต้นการเรียนรู้วันนี้!</p>
              <a href="#" className="btn btn-light btn-lg px-5 py-3 ripple" style={{ borderRadius: '50px', fontWeight: '600' }}>
                <i className="bi bi-pencil-square me-2"></i>
                ลงทะเบียนเลย
              </a>
            </div>
            <div className="position-absolute" style={{ 
              top: '-100px',
              right: '-100px',
              width: '300px',
              height: '300px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%'
            }}></div>
            <div className="position-absolute" style={{ 
              bottom: '-150px',
              left: '-100px',
              width: '350px',
              height: '350px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%'
            }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
