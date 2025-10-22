interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section position-relative mb-5">
        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="row align-items-center py-5">
            <div className="col-lg-6 mb-4 mb-lg-0 animate-slide-in-left">
              <h1 className="display-3 fw-bold text-white mb-4">
                เรียนว่ายน้ำกับ
                <span className="d-block">ครูฟลุ๊ค 🏊‍♂️</span>
              </h1>
              <p className="lead text-white mb-4" style={{ fontSize: '1.3rem' }}>
                สอนอย่างเข้าใจ ปลอดภัย สนุก และเห็นผลจริง<br />
                พร้อมพัฒนาทักษะชีวิตที่สำคัญ
              </p>
              <div className="d-flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('registration')}
                  className="btn btn-light btn-lg px-5 py-3 ripple shadow-lg"
                  style={{ 
                    borderRadius: '50px',
                    fontWeight: '600',
                    fontSize: '1.1rem'
                  }}
                >
                  <i className="bi bi-pencil-square me-2"></i>
                  ลงทะเบียนเลย!
                </button>
                <button
                  onClick={() => onNavigate('courses')}
                  className="btn btn-outline-light btn-lg px-5 py-3 ripple"
                  style={{ 
                    borderRadius: '50px',
                    fontWeight: '600',
                    fontSize: '1.1rem',
                    borderWidth: '2px'
                  }}
                >
                  <i className="bi bi-search me-2"></i>
                  ดูคอร์สเรียน
                </button>
              </div>

              {/* Stats */}
              <div className="row mt-5 g-3">
                <div className="col-4">
                  <div className="text-white text-center">
                    <div className="display-5 fw-bold animate-pulse">500+</div>
                    <small>นักเรียน</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="text-white text-center">
                    <div className="display-5 fw-bold animate-pulse">10+</div>
                    <small>ปีประสบการณ์</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="text-white text-center">
                    <div className="display-5 fw-bold animate-pulse">95%</div>
                    <small>ความพึงพอใจ</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 animate-slide-in-right">
              <div className="position-relative">
                <img
                  src="https://media.discordapp.net/attachments/1421034729867710506/1421039313952571474/banner.png?ex=68f9dc7e&is=68f88afe&hm=23379dcec27232c954fb5d1f03adeef4dd2909ffcadcfaaab1c033af4a39d3f3&=&format=webp&quality=lossless"
                  alt="ภาพแบนเนอร์คอร์สว่ายน้ำมืออาชีพ"
                  className="img-fluid rounded-custom shadow-custom animate-float"
                  style={{ 
                    borderRadius: '30px',
                    border: '5px solid rgba(255,255,255,0.3)'
                  }}
                />
                <div className="position-absolute top-0 start-0 w-100 h-100" style={{ 
                  background: 'linear-gradient(45deg, rgba(13, 148, 136, 0.2), transparent)',
                  borderRadius: '30px'
                }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 mb-5">
        <div className="container">
          <div className="section-header">
            <h2 className="animate-fade-in">ทำไมต้องเรียนกับเรา?</h2>
            <p className="animate-fade-in">คุณภาพการสอนระดับมืออาชีพ พร้อมสิ่งอำนวยความสะดวกครบครัน</p>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-3 animate-scale-in stagger-1">
              <div className="card h-100 border-0 shadow-hover text-center">
                <div className="card-body p-4">
                  <div className="icon-box mx-auto">
                    <i className="bi bi-award"></i>
                  </div>
                  <h5 className="fw-bold mb-3">ครูมืออาชีพ</h5>
                  <p className="text-muted mb-0">
                    ผ่านการอบรมและมีประกาศนียบัตรการสอนว่ายน้ำ
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 animate-scale-in stagger-2">
              <div className="card h-100 border-0 shadow-hover text-center">
                <div className="card-body p-4">
                  <div className="icon-box mx-auto">
                    <i className="bi bi-shield-check"></i>
                  </div>
                  <h5 className="fw-bold mb-3">ปลอดภัย 100%</h5>
                  <p className="text-muted mb-0">
                    มีเจ้าหน้าที่ดูแลความปลอดภัยตลอดเวลา
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 animate-scale-in stagger-3">
              <div className="card h-100 border-0 shadow-hover text-center">
                <div className="card-body p-4">
                  <div className="icon-box mx-auto">
                    <i className="bi bi-people"></i>
                  </div>
                  <h5 className="fw-bold mb-3">กลุ่มเล็ก</h5>
                  <p className="text-muted mb-0">
                    สอนกลุ่มเล็ก ดูแลอย่างใกล้ชิด ทุกคนได้เรียนรู้
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 animate-scale-in stagger-4">
              <div className="card h-100 border-0 shadow-hover text-center">
                <div className="card-body p-4">
                  <div className="icon-box mx-auto">
                    <i className="bi bi-graph-up-arrow"></i>
                  </div>
                  <h5 className="fw-bold mb-3">ติดตามผล</h5>
                  <p className="text-muted mb-0">
                    ระบบติดตามความก้าวหน้าแบบ Real-time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Highlights */}
      <section className="py-5 mb-5" style={{ background: '#f8f9fa' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="animate-fade-in">คอร์สเรียนยอดนิยม</h2>
            <p className="animate-fade-in">เลือกคอร์สที่เหมาะกับคุณและเริ่มต้นเรียนรู้วันนี้</p>
          </div>

          <div className="row g-4">
            <div className="col-md-4 animate-slide-in-left stagger-1">
              <div className="pricing-card shadow-lg p-4">
                <div className="text-center mb-4">
                  <div className="badge bg-primary mb-3" style={{ fontSize: '1rem', padding: '0.5rem 1.5rem' }}>
                    ยอดนิยม
                  </div>
                  <h3 className="fw-bold text-gradient">คอร์สเด็ก (3-8 ปี)</h3>
                  <div className="stats-number mb-2">฿1,500</div>
                  <p className="text-muted">/ 8 ครั้ง</p>
                </div>
                <ul className="list-unstyled mb-4">
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    สอนพื้นฐานว่ายน้ำ
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    เน้นความปลอดภัย
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    บรรยากาศสนุกสนาน
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    ครูดูแลใกล้ชิด
                  </li>
                </ul>
                <button 
                  onClick={() => onNavigate('registration')}
                  className="btn btn-primary w-100 ripple"
                >
                  สมัครเลย
                </button>
              </div>
            </div>

            <div className="col-md-4 animate-scale-in stagger-2">
              <div className="pricing-card shadow-lg p-4" style={{ 
                transform: 'scale(1.05)',
                border: '3px solid var(--primary-color)'
              }}>
                <div className="text-center mb-4">
                  <div className="badge badge-warning mb-3" style={{ fontSize: '1rem', padding: '0.5rem 1.5rem' }}>
                    🔥 แนะนำ
                  </div>
                  <h3 className="fw-bold text-gradient">คอร์สผู้ใหญ่</h3>
                  <div className="stats-number mb-2">฿2,000</div>
                  <p className="text-muted">/ 8 ครั้ง</p>
                </div>
                <ul className="list-unstyled mb-4">
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    ทุกระดับความสามารถ
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    พัฒนาเทคนิค
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    ออกกำลังกาย
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    ตารางยืดหยุ่น
                  </li>
                </ul>
                <button 
                  onClick={() => onNavigate('registration')}
                  className="btn btn-primary w-100 ripple"
                >
                  สมัครเลย
                </button>
              </div>
            </div>

            <div className="col-md-4 animate-slide-in-right stagger-3">
              <div className="pricing-card shadow-lg p-4">
                <div className="text-center mb-4">
                  <div className="badge bg-info mb-3" style={{ fontSize: '1rem', padding: '0.5rem 1.5rem' }}>
                    พิเศษ
                  </div>
                  <h3 className="fw-bold text-gradient">คอร์สส่วนตัว</h3>
                  <div className="stats-number mb-2">฿3,000</div>
                  <p className="text-muted">/ 8 ครั้ง</p>
                </div>
                <ul className="list-unstyled mb-4">
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    สอนแบบ 1:1
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    กำหนดเวลาเอง
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    เน้นจุดบกพร่อง
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    ผลลัพธ์รวดเร็ว
                  </li>
                </ul>
                <button 
                  onClick={() => onNavigate('registration')}
                  className="btn btn-primary w-100 ripple"
                >
                  สมัครเลย
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 mb-5">
        <div className="container">
          <div className="card border-0 shadow-custom bg-gradient-primary text-white overflow-hidden position-relative">
            <div className="card-body p-5 text-center position-relative" style={{ zIndex: 1 }}>
              <h2 className="display-5 fw-bold mb-4 animate-fade-in">
                พร้อมเริ่มต้นแล้วหรือยัง?
              </h2>
              <p className="lead mb-4 animate-fade-in">
                ลงทะเบียนวันนี้รับส่วนลด 10% สำหรับนักเรียนใหม่!
              </p>
              <button
                onClick={() => onNavigate('registration')}
                className="btn btn-light btn-lg px-5 py-3 ripple shadow-lg animate-pulse"
                style={{ 
                  borderRadius: '50px',
                  fontWeight: '600',
                  fontSize: '1.2rem'
                }}
              >
                <i className="bi bi-rocket-takeoff me-2"></i>
                ลงทะเบียนตอนนี้เลย!
              </button>
            </div>
            <div className="position-absolute" style={{ 
              top: '-50px',
              right: '-50px',
              width: '200px',
              height: '200px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              zIndex: 0
            }}></div>
            <div className="position-absolute" style={{ 
              bottom: '-80px',
              left: '-80px',
              width: '250px',
              height: '250px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              zIndex: 0
            }}></div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5 mb-5" style={{ background: '#f8f9fa' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="animate-fade-in">ความคิดเห็นจากผู้ปกครอง</h2>
            <p className="animate-fade-in">เสียงจากผู้ที่ไว้วางใจให้เราดูแลบุตรหลาน</p>
          </div>

          <div className="row g-4">
            <div className="col-md-4 animate-slide-in-left stagger-1">
              <div className="card border-0 shadow-hover h-100">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                  </div>
                  <p className="mb-3 fst-italic">
                    "ลูกชายผมกลัวน้ำมาก แต่หลังจากเรียนกับครูฟลุ๊คได้ 3 ครั้ง เริ่มกล้าลงน้ำเอง ตอนนี้ว่ายได้คล่องมากครับ"
                  </p>
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                      <i className="bi bi-person"></i>
                    </div>
                    <div>
                      <div className="fw-bold">คุณสมชาย</div>
                      <small className="text-muted">ผู้ปกครอง</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 animate-scale-in stagger-2">
              <div className="card border-0 shadow-hover h-100">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                  </div>
                  <p className="mb-3 fst-italic">
                    "ครูสอนดีมาก อดทนและใส่ใจนักเรียนทุกคน ลูกสาวชอบมากค่ะ รอคอร์สต่อไปเลย"
                  </p>
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                      <i className="bi bi-person"></i>
                    </div>
                    <div>
                      <div className="fw-bold">คุณวรรณา</div>
                      <small className="text-muted">ผู้ปกครอง</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 animate-slide-in-right stagger-3">
              <div className="card border-0 shadow-hover h-100">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                  </div>
                  <p className="mb-3 fst-italic">
                    "ราคาไม่แพง คุ้มค่ามาก สระสะอาด ครูมืออาชีพ ระบบจัดการดีเยี่ยม แนะนำเลยครับ"
                  </p>
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-info text-white d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                      <i className="bi bi-person"></i>
                    </div>
                    <div>
                      <div className="fw-bold">คุณประยุทธ์</div>
                      <small className="text-muted">ผู้ปกครอง</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
