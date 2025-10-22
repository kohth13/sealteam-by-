import { useEffect } from 'react';
import { CourseInfo } from '../../lib/courseData';

interface CourseDetailModalProps {
  isOpen: boolean;
  course: CourseInfo | null;
  onClose: () => void;
  onRegister: () => void;
}

export default function CourseDetailModal({ 
  isOpen, 
  course, 
  onClose, 
  onRegister 
}: CourseDetailModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      const paddingRight = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${paddingRight}px`;
    } else {
      document.body.classList.remove('modal-open');
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !course) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="modal-backdrop fade show" 
        onClick={onClose}
        style={{ 
          zIndex: 1050,
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
      ></div>

      {/* Modal */}
      <div 
        className="modal fade show d-block" 
        tabIndex={-1}
        style={{ 
          zIndex: 1055,
          display: 'flex !important',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={onClose}
      >
        <div 
          className="modal-dialog modal-dialog-centered modal-lg" 
          onClick={(e) => e.stopPropagation()}
          style={{
            animation: 'modalSlideIn 0.3s ease-out'
          }}
        >
          <div className="modal-content border-0 shadow-xl" style={{ borderRadius: '20px', overflow: 'hidden' }}>
            {/* Image Header */}
            <div className="position-relative" style={{ height: '300px', overflow: 'hidden' }}>
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
              <div className="position-absolute top-0 start-0 w-100 h-100" 
                   style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))' }}>
              </div>
              <div className="position-absolute bottom-0 start-0 p-4 text-white">
                <h3 className="display-6 fw-bold mb-0">{course.title}</h3>
              </div>
              <button 
                type="button" 
                className="btn-close btn-close-white position-absolute top-0 end-0 m-3" 
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>

            {/* Body */}
            <div className="modal-body p-4">
              {/* Description */}
              <div className="mb-4">
                <h6 className="fw-bold text-primary mb-2">
                  <i className="bi bi-file-text me-2"></i>
                  รายละเอียด
                </h6>
                <p className="text-muted ps-4 border-start border-3 border-primary">
                  {course.description}
                </p>
              </div>

              {/* Info Grid */}
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <div className="card border-0 bg-light h-100">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="icon-box me-3" style={{ width: '50px', height: '50px', fontSize: '1.2rem' }}>
                          <i className="bi bi-currency-dollar"></i>
                        </div>
                        <div>
                          <small className="text-muted d-block">ราคา</small>
                          <h5 className="mb-0 text-primary fw-bold">{course.price}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card border-0 bg-light h-100">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="icon-box me-3" style={{ width: '50px', height: '50px', fontSize: '1.2rem', background: 'linear-gradient(135deg, #10b981, #34d399)' }}>
                          <i className="bi bi-clock"></i>
                        </div>
                        <div>
                          <small className="text-muted d-block">ระยะเวลา</small>
                          <h5 className="mb-0 fw-bold">{course.duration}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card border-0 bg-light h-100">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="icon-box me-3" style={{ width: '50px', height: '50px', fontSize: '1.2rem', background: 'linear-gradient(135deg, #f59e0b, #fbbf24)' }}>
                          <i className="bi bi-people"></i>
                        </div>
                        <div>
                          <small className="text-muted d-block">จำนวนที่รับ</small>
                          <h5 className="mb-0 fw-bold">{course.capacity}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card border-0 bg-light h-100">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="icon-box me-3" style={{ width: '50px', height: '50px', fontSize: '1.2rem', background: 'linear-gradient(135deg, #3b82f6, #60a5fa)' }}>
                          <i className="bi bi-calendar-event"></i>
                        </div>
                        <div>
                          <small className="text-muted d-block">ตารางเรียน</small>
                          <h5 className="mb-0 fw-bold">{course.schedule}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="mb-4">
                <h6 className="fw-bold text-primary mb-3">
                  <i className="bi bi-stars me-2"></i>
                  จุดเด่นของคอร์ส
                </h6>
                <ul className="list-unstyled ps-3">
                  {course.highlights.map((highlight, index) => (
                    <li key={index} className="mb-2">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      <span className="text-muted">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="alert alert-info border-0">
                <h6 className="alert-heading fw-bold">
                  <i className="bi bi-exclamation-circle me-2"></i>
                  ข้อกำหนด
                </h6>
                <ul className="list-unstyled mb-0 ps-3">
                  {course.requirements.map((req, index) => (
                    <li key={index} className="mb-1">
                      <i className="bi bi-arrow-right-circle me-2"></i>
                      <small>{req}</small>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer border-0 bg-light">
              <button
                onClick={onClose}
                className="btn btn-secondary ripple"
              >
                <i className="bi bi-x-circle me-2"></i>
                ปิด
              </button>
              <button
                onClick={() => { onClose(); onRegister(); }}
                className="btn btn-primary ripple px-4"
              >
                <i className="bi bi-pencil-square me-2"></i>
                ลงทะเบียนเลย!
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
