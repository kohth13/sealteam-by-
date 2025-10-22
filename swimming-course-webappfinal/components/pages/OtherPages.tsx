export function FAQPage() {
  const faqs = [
    {
      question: 'ครูฟลุคสอนที่ไหน?',
      answer: 'ปัจจุบันครูฟลุคเปิดสอนคอร์สว่ายน้ำที่สระว่ายน้ำมหาวิทยาลัยพิษณุโลก และสระว่ายน้ำชุมชนในจังหวัดพิษณุโลก โดยรายละเอียดสถานที่สามารถสอบถามได้เพิ่มเติมหลังจากการลงทะเบียนค่ะ'
    },
    {
      question: 'คอร์สเริ่มต้นเหมาะกับใคร?',
      answer: 'คอร์สเริ่มต้นเหมาะสำหรับผู้ที่ไม่เคยว่ายน้ำมาก่อน หรือเด็กเล็กที่ต้องการสร้างความคุ้นเคยกับน้ำ เน้นการเอาชีวิตรอดเป็นหลัก สอนการลอยตัว หายใจในน้ำ และความมั่นใจในการอยู่ในน้ำ'
    },
    {
      question: 'ต้องเตรียมอ���ไรไปเรียนบ้าง?',
      answer: 'ชุดว่ายน้ำ, แว่นตาว่ายน้ำ, หมวกว่ายน้ำ (ถ้ามี), ผ้าเช็ดตัว, ครีมกันแดด และขวดน้ำดื่ม สำหรับเด็กควรเตรียมของว่างเล็กน้อยด้วยค่ะ'
    },
    {
      question: 'สามารถเปลี่ยนวันเรียนได้หรือไม่?',
      answer: 'สามารถเปลี่ยนวันเรียนได้ค่ะ แต่ต้องแจ้งล่วงหน้าอย่างน้อย 24 ชั่วโมง เพื่อให้ครูสามารถจัดตารางเรียนใหม่ได้ สามารถติดต่อผ่านทาง Line หรือโทรศัพท์โดยตรง'
    },
    {
      question: 'มีระบบประเมินผลอย่างไร?',
      answer: 'เราจะประเมินนักเรียนในด้านต่างๆ ได้แก่ เทคนิคการว่ายน้ำ ความอดทน และความปลอดภัยในน้ำ นักเรียนจะได้รับเกรด (A-F) และใบประกาศนียบัตรเมื่อผ่านหลักสูตร'
    },
    {
      question: 'สามารถขอคืนเงินได้หรือไม่?',
      answer: 'สามารถขอคืนเงินได้ภายใน 7 วันหลังจากชำระเงิน (ก่อนเริ่มเรียนครั้งแรก) โดยหักค่าธรรมเนียม 10% หากเริ่มเรียนแล้ว จะไม่สามารถขอคืนเงินได้ แต่สามารถเลื่อนรอบเรียนได้'
    },
    {
      question: 'มีคอร์สส่วนตัว (Private) หรือไม่?',
      answer: 'มีค่ะ! เราเปิดสอนแบบส่วนตัว (1:1) หรือกลุ่มเล็ก (2-4 คน) ซึ่งสามารถปรับเวลาและเนื้อหาตามความต้องการได้ ราคาและรายละเอียดสามารถสอบถามได้โดยตรงค่ะ'
    },
    {
      question: 'เด็กอายุเท่าไหร่ถึงจะเรียนได้?',
      answer: 'เด็กอายุตั้งแต่ 3 ปีขึ้นไปสามารถเริ่มเรียนได้ค่ะ สำหรับเด็กเล็กเรามีคอร์ส Baby & Mom ที่ผู้ปกครองสามารถลงน้ำร่วมด้วยได้'
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-lg bg-gradient-primary text-white overflow-hidden">
            <div className="card-body p-4">
              <div className="row align-items-center">
                <div className="col-lg-8">
                  <h1 className="display-5 fw-bold mb-2">
                    <i className="bi bi-question-circle me-3"></i>
                    คำถามที่พบบ่อย
                  </h1>
                  <p className="mb-0">คำตอบสำหรับคำถามทั่วไปเกี่ยวกับคอร์สว่ายน้ำของเรา</p>
                </div>
                <div className="col-lg-4 text-center d-none d-lg-block">
                  <i className="bi bi-patch-question display-1 animate-float"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="row">
        <div className="col-lg-10 mx-auto">
          <div className="accordion accordion-flush" id="faqAccordion">
            {faqs.map((faq, index) => (
              <div key={index} className="accordion-item mb-3 border-0 shadow-sm rounded-3 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed rounded-3 fw-bold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#faq${index}`}
                    aria-expanded="false"
                    style={{
                      background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
                      border: 'none'
                    }}
                  >
                    <i className="bi bi-chevron-right me-3 text-primary"></i>
                    {faq.question}
                  </button>
                </h2>
                <div
                  id={`faq${index}`}
                  className="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body bg-light rounded-bottom-3">
                    <div className="d-flex">
                      <i className="bi bi-check-circle text-success me-3 fs-5 flex-shrink-0"></i>
                      <p className="mb-0 text-muted">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="card border-0 shadow-lg mt-5 bg-gradient-primary text-white">
            <div className="card-body p-4 text-center">
              <h4 className="mb-3">ยังมีคำถามอื่นๆ?</h4>
              <p className="mb-4">ติดต่อเราได้ตลอดเวลา เรายินดีให้คำปรึกษา</p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <a href="tel:0953457980" className="btn btn-light btn-lg ripple">
                  <i className="bi bi-telephone me-2"></i>
                  095-345-7980
                </a>
                <a href="https://www.facebook.com/profile.php?id=100068664380516" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-lg ripple">
                  <i className="bi bi-facebook me-2"></i>
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AboutPage() {
  const features = [
    {
      icon: 'bi-award',
      title: 'ครูผู้ฝึกสอนมืออาชีพ',
      description: 'มีประสบการณ์การสอนมากกว่า 10 ปี พร้อมใบรับรองมาตรฐาน'
    },
    {
      icon: 'bi-people',
      title: 'สอนทุกระดับ',
      description: 'ตั้งแต่พื้นฐานจนถึงระดับนักกีฬา ทุกช่วงวัย'
    },
    {
      icon: 'bi-shield-check',
      title: 'เน้นความปลอดภัย',
      description: 'ดูแลอย่างใกล้ชิด มีอุปกรณ์ความปลอดภัยครบครัน'
    },
    {
      icon: 'bi-emoji-smile',
      title: 'บรรยากาศเป็นกันเอง',
      description: 'เรียนรู้อย่างสนุกสนาน พัฒนาอย่างต่อเนื่อง'
    }
  ];

  const milestones = [
    { year: '2015', event: 'เริ่มก่อตั้งโรงเรียนสอนว่ายน้ำ' },
    { year: '2017', event: 'นักเรียนทะลุ 500 คน' },
    { year: '2020', event: 'เปิดสาขาที่ 2 และคอร์สออนไลน์' },
    { year: '2024', event: 'นักเรียนกว่า 2,000 คน พร้อมระบบจัดการออนไลน์' }
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-lg bg-gradient-primary text-white overflow-hidden">
            <div className="card-body p-4">
              <div className="row align-items-center">
                <div className="col-lg-8">
                  <h1 className="display-5 fw-bold mb-2">
                    <i className="bi bi-info-circle me-3"></i>
                    เกี่ยวกับเรา
                  </h1>
                  <p className="mb-0">เรียนรู้เพิ่มเติมเกี่ยวกับเรียนว่ายน้ำพิษณุโลก By ครูฟลุ๊ค</p>
                </div>
                <div className="col-lg-4 text-center d-none d-lg-block">
                  <i className="bi bi-water display-1 animate-float"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Content */}
      <div className="row g-4 mb-5">
        <div className="col-lg-8">
          <div className="card border-0 shadow-lg h-100">
            <div className="card-body p-4">
              <h3 className="mb-4 fw-bold text-primary">
                <i className="bi bi-heart me-2"></i>
                ปณิธานของเรา
              </h3>
              <p className="text-muted mb-3" style={{ lineHeight: '1.8' }}>
                <strong className="text-dark">เรียนว่ายน้ำพิษณุโลก By ครูฟลุ๊ค</strong> 
                เป็นศูนย์สอนว่ายน้ำที่มุ่งเน้นการเรียนการสอนอย่างเป็นระบบ 
                โดยมีครูผู้ฝึกสอนที่มีประสบการณ์และใบรับรองมาตรฐาน 
                ครูฟลุ๊คดูแลใกล้ชิดทุกขั้นตอน ตั้งแต่พื้นฐานไปจนถึงเทคนิคการว่ายน้ำขั้นสูง
              </p>
              <p className="text-muted mb-4" style={{ lineHeight: '1.8' }}>
                เราใส่ใจทั้ง<span className="fw-bold text-primary">ความปลอดภัย</span>และ
                <span className="fw-bold text-success">ความสนุกสนาน</span> 
                เพื่อให้นักเรียนทุกคน—ทั้งเด็กและผู้ใหญ่—มีทักษะการว่ายน้ำที่มั่นใจและปลอดภัยในทุกสถานการณ์
              </p>

              <div className="alert alert-info border-0 d-flex align-items-center">
                <i className="bi bi-lightbulb me-3 fs-4"></i>
                <div>
                  <strong>วิสัยทัศน์:</strong> มุ่งหวังให้ทุกคนในชุมชนมีทักษะการว่ายน้ำ 
                  เพื่อความปลอดภัยและสุขภาพที่ดี
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-lg text-center h-100">
            <div className="card-body p-4 d-flex flex-column justify-content-center">
              <div 
                className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{
                  width: '120px',
                  height: '120px',
                  background: 'linear-gradient(135deg, var(--primary-color) 0%, #0891b2 100%)',
                  color: 'white'
                }}
              >
                <i className="bi bi-person-badge display-3"></i>
              </div>
              <h4 className="fw-bold mb-2">ครูฟลุ๊ค</h4>
              <p className="text-muted mb-3">ผู้ก่อตั้งและผู้สอนหลัก</p>
              <div className="d-flex flex-column gap-2 text-start">
                <div>
                  <i className="bi bi-check-circle text-success me-2"></i>
                  <small>ประสบการณ์ 10+ ปี</small>
                </div>
                <div>
                  <i className="bi bi-check-circle text-success me-2"></i>
                  <small>ใบรับรองมาตรฐานสากล</small>
                </div>
                <div>
                  <i className="bi bi-check-circle text-success me-2"></i>
                  <small>สอนนักเรียนกว่า 2,000 คน</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="row mb-5">
        <div className="col-12">
          <h3 className="text-center mb-4 fw-bold">
            <i className="bi bi-star me-2 text-warning"></i>
            จุดเด่นของเรา
          </h3>
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-md-6 col-lg-3 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="card border-0 shadow-sm h-100 text-center hover-shadow">
                  <div className="card-body p-4">
                    <div className="icon-box mx-auto mb-3">
                      <i className={`bi ${feature.icon}`}></i>
                    </div>
                    <h5 className="fw-bold mb-2">{feature.title}</h5>
                    <p className="text-muted mb-0 small">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="row">
        <div className="col-lg-10 mx-auto">
          <div className="card border-0 shadow-lg">
            <div className="card-body p-4">
              <h3 className="text-center mb-4 fw-bold">
                <i className="bi bi-clock-history me-2 text-primary"></i>
                ความก้าวหน้าของเรา
              </h3>
              <div className="row">
                {milestones.map((milestone, index) => (
                  <div key={index} className="col-md-6 col-lg-3 mb-4 animate-fade-in" style={{ animationDelay: `${index * 0.15}s` }}>
                    <div className="text-center">
                      <div 
                        className="badge bg-gradient-primary fs-5 px-4 py-2 mb-3"
                        style={{ borderRadius: '20px' }}
                      >
                        {milestone.year}
                      </div>
                      <p className="text-muted small">{milestone.event}</p>
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="d-none d-lg-block position-absolute top-50 start-100 translate-middle-y">
                        <i className="bi bi-arrow-right text-primary"></i>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContactPage() {
  const contactMethods = [
    {
      icon: 'bi-telephone',
      title: 'โทรศัพท์',
      value: '095-345-7980',
      link: 'tel:0953457980',
      color: 'success'
    },
    {
      icon: 'bi-facebook',
      title: 'Facebook Page',
      value: 'เรียนว่ายน้ำพิษณุโลก By ครูฟลุ๊ค',
      link: 'https://www.facebook.com/profile.php?id=100068664380516',
      color: 'primary'
    },
    {
      icon: 'bi-envelope',
      title: 'อีเมล',
      value: 'Tswimming.25@gmail.com',
      link: 'mailto:Tswimming.25@gmail.com',
      color: 'danger'
    },
    {
      icon: 'bi-geo-alt',
      title: 'ที่ตั้ง',
      value: 'พิษณุโลก ประเทศไทย',
      link: '#',
      color: 'warning'
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-lg bg-gradient-primary text-white overflow-hidden">
            <div className="card-body p-4">
              <div className="row align-items-center">
                <div className="col-lg-8">
                  <h1 className="display-5 fw-bold mb-2">
                    <i className="bi bi-telephone me-3"></i>
                    ติดต่อเรา
                  </h1>
                  <p className="mb-0">พร้อมให้คำปรึกษาและตอบคำถามของคุณตลอด 24 ชั่วโมง</p>
                </div>
                <div className="col-lg-4 text-center d-none d-lg-block">
                  <i className="bi bi-chat-dots display-1 animate-float"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="row g-4 mb-5">
        {contactMethods.map((method, index) => (
          <div key={index} className="col-md-6 col-lg-3 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <a 
              href={method.link}
              target={method.link.startsWith('http') ? '_blank' : undefined}
              rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-decoration-none"
            >
              <div className={`card border-0 shadow-sm h-100 hover-shadow text-center border-top border-${method.color} border-3`}>
                <div className="card-body p-4">
                  <div 
                    className={`icon-box mx-auto mb-3`}
                    style={{ background: `linear-gradient(135deg, var(--bs-${method.color}) 0%, var(--bs-${method.color}) 100%)` }}
                  >
                    <i className={`bi ${method.icon}`}></i>
                  </div>
                  <h6 className="text-muted mb-2">{method.title}</h6>
                  <p className="fw-bold mb-0 text-dark small">{method.value}</p>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* Contact Form & Info */}
      <div className="row g-4">
        <div className="col-lg-7">
          <div className="card border-0 shadow-lg">
            <div className="card-body p-4">
              <h4 className="mb-4 fw-bold">
                <i className="bi bi-send me-2 text-primary"></i>
                ส่งข้อความถึงเรา
              </h4>
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">ชื่อ-นามสกุล</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="กรอกชื่อของคุณ"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">เบอร์โทรศัพท์</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      placeholder="0XX-XXX-XXXX"
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold">อีเมล</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="example@email.com"
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold">ข้อความ</label>
                    <textarea 
                      className="form-control" 
                      rows={5}
                      placeholder="เขียนข้อความของคุณที่นี่..."
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary btn-lg w-100 ripple">
                      <i className="bi bi-send me-2"></i>
                      ส่งข้อความ
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card border-0 shadow-lg h-100">
            <div className="card-body p-4">
              <h4 className="mb-4 fw-bold">
                <i className="bi bi-clock me-2 text-primary"></i>
                เวลาทำการ
              </h4>
              
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                  <span className="fw-bold">จันทร์ - ศุกร์</span>
                  <span className="text-primary">09:00 - 18:00</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                  <span className="fw-bold">เสาร์ - อาทิตย์</span>
                  <span className="text-primary">08:00 - 17:00</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold">วันหยุดนักขัตฤกษ์</span>
                  <span className="text-muted">ปิดทำการ</span>
                </div>
              </div>

              <div className="alert alert-success border-0">
                <div className="d-flex">
                  <i className="bi bi-check-circle me-3 fs-4 flex-shrink-0"></i>
                  <div>
                    <strong className="d-block mb-2">รับสมัครตลอดทั้งปี!</strong>
                    <small>เปิดรับนักเรียนใหม่ทุกเดือน สามารถเริ่มเรียนได้ทันทีหลังชำระเงิน</small>
                  </div>
                </div>
              </div>

              <div className="card bg-light border-0 mt-4">
                <div className="card-body">
                  <h6 className="fw-bold mb-3">
                    <i className="bi bi-pin-map me-2 text-danger"></i>
                    ช่องทางติดต่อด่วน
                  </h6>
                  <div className="d-grid gap-2">
                    <a href="tel:0953457980" className="btn btn-outline-success ripple">
                      <i className="bi bi-telephone me-2"></i>
                      โทรหาเรา
                    </a>
                    <a 
                      href="https://www.facebook.com/profile.php?id=100068664380516" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary ripple"
                    >
                      <i className="bi bi-facebook me-2"></i>
                      Facebook
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
