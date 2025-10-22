import * as React from 'react';

interface FooterProps {
  onNavigate?: (page: string) => void;
  onOpenCourseDetail?: (courseKey: string) => void;
}

export default function Footer({ onNavigate, onOpenCourseDetail }: FooterProps) {
  const handleNavigate = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCourseClick = (courseKey: string) => {
    if (onOpenCourseDetail) {
      onOpenCourseDetail(courseKey);
    } else if (onNavigate) {
      onNavigate('courses');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-dark text-white mt-5">
      <div className="container py-5">
        <div className="row g-4">
          {/* About */}
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold mb-3 text-gradient" style={{ color: '#5eead4' }}>
              <i className="bi bi-water me-2"></i>
              เรียนว่ายน้ำพิษณุโลก
            </h5>
            <p className="text-light opacity-75">
              ศูนย์สอนว่ายน้ำมืออาชีพ โดยครูฟลุ๊ค พร้อมทีมงานที่มีประสบการณ์ 
              เน้นความปลอดภัยและพัฒนาทักษะอย่างมีประสิทธิภาพ
            </p>
            <div className="d-flex gap-2 mt-3">
              <a 
                href="https://www.facebook.com/profile.php?id=100068664380516&locale=th_TH" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light btn-sm rounded-circle d-flex align-items-center justify-content-center" 
                style={{ width: '40px', height: '40px' }}
                title="ติดตามเราบน Facebook"
              >
                <i className="bi bi-facebook"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold mb-3" style={{ color: '#5eead4' }}>ลิงก์ด่วน</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); handleNavigate('home'); }}
                  className="text-light text-decoration-none opacity-75 hover-opacity-100"
                  style={{ cursor: 'pointer', transition: 'opacity 0.3s ease' }}
                >
                  <i className="bi bi-chevron-right me-1"></i> หน้าแรก
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); handleNavigate('courses'); }}
                  className="text-light text-decoration-none opacity-75 hover-opacity-100"
                  style={{ cursor: 'pointer', transition: 'opacity 0.3s ease' }}
                >
                  <i className="bi bi-chevron-right me-1"></i> คอร์สเรียน
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); handleNavigate('registration'); }}
                  className="text-light text-decoration-none opacity-75 hover-opacity-100"
                  style={{ cursor: 'pointer', transition: 'opacity 0.3s ease' }}
                >
                  <i className="bi bi-chevron-right me-1"></i> ลงทะเบียน
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); handleNavigate('about'); }}
                  className="text-light text-decoration-none opacity-75 hover-opacity-100"
                  style={{ cursor: 'pointer', transition: 'opacity 0.3s ease' }}
                >
                  <i className="bi bi-chevron-right me-1"></i> เกี่ยวกับเรา
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); handleNavigate('contact'); }}
                  className="text-light text-decoration-none opacity-75 hover-opacity-100"
                  style={{ cursor: 'pointer', transition: 'opacity 0.3s ease' }}
                >
                  <i className="bi bi-chevron-right me-1"></i> ติดต่อเรา
                </a>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3" style={{ color: '#5eead4' }}>คอร์สยอดนิยม</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); handleCourseClick('courseA'); }}
                  className="text-light text-decoration-none opacity-75 hover-opacity-100"
                  style={{ cursor: 'pointer', transition: 'opacity 0.3s ease' }}
                >
                  <i className="bi bi-star-fill me-1 text-warning"></i> Course A - ผู้เริ่มต้น
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); handleCourseClick('courseB'); }}
                  className="text-light text-decoration-none opacity-75 hover-opacity-100"
                  style={{ cursor: 'pointer', transition: 'opacity 0.3s ease' }}
                >
                  <i className="bi bi-star-fill me-1 text-warning"></i> Course B - ขั้นกลาง
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); handleCourseClick('courseC'); }}
                  className="text-light text-decoration-none opacity-75 hover-opacity-100"
                  style={{ cursor: 'pointer', transition: 'opacity 0.3s ease' }}
                >
                  <i className="bi bi-star-fill me-1 text-warning"></i> Course C - ขั้นสูง
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); handleCourseClick('courseD'); }}
                  className="text-light text-decoration-none opacity-75 hover-opacity-100"
                  style={{ cursor: 'pointer', transition: 'opacity 0.3s ease' }}
                >
                  <i className="bi bi-star-fill me-1 text-warning"></i> Course D - เด็ก
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3" style={{ color: '#5eead4' }}>ติดต่อเรา</h6>
            <ul className="list-unstyled">
              <li className="mb-2 text-light opacity-75">
                <i className="bi bi-geo-alt-fill me-2 text-primary"></i>
                พิษณุโลก ประเทศไทย
              </li>
              <li className="mb-2 text-light opacity-75">
                <i className="bi bi-telephone-fill me-2 text-primary"></i>
                095-345-7980
              </li>
              <li className="mb-2 text-light opacity-75">
                <i className="bi bi-envelope-fill me-2 text-primary"></i>
                Tswimming.25@gmail.com
              </li>
              <li className="mb-2 text-light opacity-75">
                <i className="bi bi-clock-fill me-2 text-primary"></i>
                จันทร์-อาทิตย์ 9:00-18:00
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-4 opacity-25" />

        {/* Bottom Bar */}
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0 text-light opacity-75 small">
              © 2025 เรียนว่ายน้ำพิษณุโลก By ครูฟลุ๊ค. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <p className="mb-0 text-light opacity-75 small">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); handleNavigate('about'); }}
                className="text-light text-decoration-none me-3"
                style={{ cursor: 'pointer', transition: 'opacity 0.3s ease' }}
              >
                นโยบายความเป็นส่วนตัว
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); handleNavigate('about'); }}
                className="text-light text-decoration-none me-3"
                style={{ cursor: 'pointer', transition: 'opacity 0.3s ease' }}
              >
                เงื่อนไขการใช้งาน
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); handleNavigate('faq'); }}
                className="text-light text-decoration-none"
                style={{ cursor: 'pointer', transition: 'opacity 0.3s ease' }}
              >
                คำถามที่พบบ่อย
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTopButton />

      {/* Hover effect styles */}
      <style>{`
        .hover-opacity-100:hover {
          opacity: 1 !important;
        }
      `}</style>
    </footer>
  );
}

function ScrollToTopButton() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!show) return null;

  return (
    <button 
      className="btn btn-primary position-fixed bottom-0 end-0 m-4 rounded-circle shadow-lg animate-scale-in"
      style={{ width: '50px', height: '50px', zIndex: 1000 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <i className="bi bi-arrow-up"></i>
    </button>
  );
}