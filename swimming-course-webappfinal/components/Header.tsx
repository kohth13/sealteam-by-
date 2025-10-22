import { useState, useEffect } from 'react';
import { UserRole } from '../lib/hooks/useAuth';

interface HeaderProps {
  userRole: UserRole;
  userId: string | null;
  dbStatus: string;
  onNavigate: (page: string) => void;
  onOpenAuthModal: (mode: 'login' | 'signup') => void;
  onLogout: () => void;
}

export default function Header({ 
  userRole, 
  userId, 
  dbStatus, 
  onNavigate, 
  onOpenAuthModal, 
  onLogout 
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const isLoggedIn = userRole !== 'guest';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.user-dropdown')) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const getRoleText = () => {
    switch (userRole) {
      case 'admin':
        return 'ผู้บริหาร/ครู';
      case 'instructor':
        return 'ผู้สอน';
      case 'student':
        return 'นักเรียน/ผู้ปกครอง';
      default:
        return 'ผู้เยี่ยมชม';
    }
  };

  const getRoleBadgeClass = () => {
    switch (userRole) {
      case 'admin':
        return 'badge bg-gradient-primary';
      case 'instructor':
        return 'badge bg-info';
      case 'student':
        return 'badge bg-success';
      default:
        return 'badge bg-secondary';
    }
  };

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  // Get navigation items based on user role
  const getNavItems = () => {
    const commonItems = [
      { page: 'home', label: 'หน้าแรก', icon: 'bi-house-door' },
      { page: 'courses', label: 'คอร์สเรียน', icon: 'bi-water' },
      { page: 'registration', label: 'ลงทะเบียน', icon: 'bi-pencil-square' },
    ];

    const adminItems = [
      { page: 'dashboard', label: 'ระบบจัดการ', icon: 'bi-speedometer2' },
    ];

    const studentItems = [
      { page: 'student-dashboard', label: 'ติดตามผล', icon: 'bi-graph-up' },
    ];

    const endItems = [
      { page: 'faq', label: 'คำถามที่พบบ่อย', icon: 'bi-question-circle' },
      { page: 'about', label: 'เกี่ยวกับเรา', icon: 'bi-info-circle' },
      { page: 'contact', label: 'ติดต่อเรา', icon: 'bi-telephone' },
    ];

    let middleItems: any[] = [];
    if (userRole === 'admin' || userRole === 'instructor') {
      middleItems = adminItems;
    } else if (userRole === 'student') {
      middleItems = studentItems;
    }

    return [...commonItems, ...middleItems, ...endItems];
  };

  return (
    <>
      <nav 
        className={`navbar navbar-expand-lg fixed-top bg-white ${scrolled ? 'shadow-lg' : 'shadow'}`} 
        style={{ transition: 'all 0.3s ease', zIndex: 1030 }}
      >
        <div className="container-fluid px-3 px-md-4">
          {/* Logo and Brand */}
          <a 
            className="navbar-brand d-flex align-items-center" 
            href="#" 
            onClick={(e) => { e.preventDefault(); handleNavigate('home'); }}
          >
            <img
              src="https://cdn.discordapp.com/attachments/1421034729867710506/1421034749904027659/logo.png?ex=68f9d83d&is=68f886bd&hm=dffc2fcd00ec4df45354356f193e7d9840d1d6ebe85ddb7fe2faa94656377ab7&"
              alt="School Logo"
              className="rounded-circle me-2"
              style={{ 
                width: '45px', 
                height: '45px',
                objectFit: 'cover',
                border: '2px solid var(--primary-color)',
                padding: '2px',
                transition: 'transform 0.3s ease'
              }}
            />
            <span className="d-none d-sm-inline">
              <span className="d-block fw-bold text-primary" style={{ fontSize: '1.1rem', lineHeight: '1.2' }}>
                เรียนว่ายน้ำพิษณุโลก
              </span>
              <small className="text-muted d-block" style={{ fontSize: '0.7rem' }}>
                By ครูฟลุ๊ค
              </small>
            </span>
          </a>

          {/* Desktop Auth Buttons - Show on large screens */}
          <div className="d-none d-lg-flex align-items-center ms-auto order-lg-3 gap-2">
            {!isLoggedIn ? (
              <>
                <button
                  type="button"
                  onClick={() => onOpenAuthModal('signup')}
                  className="btn btn-outline-primary ripple"
                  style={{ 
                    borderRadius: '25px',
                    fontWeight: '500',
                    padding: '0.5rem 1.25rem',
                    border: '2px solid var(--primary-color)',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <i className="bi bi-person-plus me-2"></i>
                  สมัครสมาชิก
                </button>
                <button
                  type="button"
                  onClick={() => onOpenAuthModal('login')}
                  className="btn btn-primary ripple"
                  style={{ 
                    borderRadius: '25px',
                    fontWeight: '500',
                    padding: '0.5rem 1.5rem',
                    boxShadow: '0 4px 15px rgba(13, 148, 136, 0.3)',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  เข้าสู่ระบบ
                </button>
              </>
            ) : (
              <div className="user-dropdown position-relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setUserDropdownOpen(!userDropdownOpen);
                  }}
                  className="btn btn-light d-flex align-items-center gap-2 ripple"
                  style={{ 
                    borderRadius: '25px',
                    padding: '0.5rem 1rem',
                    border: '2px solid #e2e8f0',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <div 
                    className="d-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: '32px',
                      height: '32px',
                      background: 'linear-gradient(135deg, var(--primary-color) 0%, #0891b2 100%)',
                      color: 'white'
                    }}
                  >
                    <i className="bi bi-person-fill"></i>
                  </div>
                  <span className="fw-medium">{getRoleText()}</span>
                  <i className={`bi ${userDropdownOpen ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div 
                    className="position-absolute end-0 mt-2 bg-white rounded-3 shadow-lg"
                    style={{
                      minWidth: '220px',
                      zIndex: 1050,
                      border: '1px solid #e2e8f0',
                      animation: 'fadeIn 0.2s ease'
                    }}
                  >
                    <div className="p-3 border-bottom">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <div 
                          className="d-flex align-items-center justify-content-center rounded-circle"
                          style={{
                            width: '40px',
                            height: '40px',
                            background: 'linear-gradient(135deg, var(--primary-color) 0%, #0891b2 100%)',
                            color: 'white'
                          }}
                        >
                          <i className="bi bi-person-fill"></i>
                        </div>
                        <div>
                          <div className="fw-bold">{getRoleText()}</div>
                          <small className="text-muted">{userId || 'ผู้ใช้งาน'}</small>
                        </div>
                      </div>
                      <span className={`${getRoleBadgeClass()} w-100 d-block text-center`}>
                        {getRoleText()}
                      </span>
                    </div>

                    <div className="py-2">
                      {userRole === 'student' && (
                        <button
                          onClick={() => handleNavigate('student-dashboard')}
                          className="btn btn-link text-decoration-none text-dark d-flex align-items-center gap-2 w-100 text-start px-3 py-2"
                          style={{ transition: 'background-color 0.2s ease' }}
                        >
                          <i className="bi bi-graph-up text-primary"></i>
                          <span>ติดตามผล</span>
                        </button>
                      )}
                      {(userRole === 'admin' || userRole === 'instructor') && (
                        <button
                          onClick={() => handleNavigate('dashboard')}
                          className="btn btn-link text-decoration-none text-dark d-flex align-items-center gap-2 w-100 text-start px-3 py-2"
                          style={{ transition: 'background-color 0.2s ease' }}
                        >
                          <i className="bi bi-speedometer2 text-primary"></i>
                          <span>ระบบจัดการ</span>
                        </button>
                      )}
                    </div>

                    <div className="border-top p-2">
                      <button
                        onClick={() => { 
                          onLogout(); 
                          setUserDropdownOpen(false);
                        }}
                        className="btn btn-link text-decoration-none text-danger d-flex align-items-center gap-2 w-100 text-start px-3 py-2"
                        style={{ transition: 'background-color 0.2s ease' }}
                      >
                        <i className="bi bi-box-arrow-right"></i>
                        <span>ออกจากระบบ</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="navbar-toggler border-0 shadow-none d-lg-none" 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ order: 2 }}
          >
            <i className={`bi ${mobileMenuOpen ? 'bi-x-lg' : 'bi-list'}`} style={{ fontSize: '1.5rem', color: 'var(--primary-color)' }}></i>
          </button>

          {/* Nav Items */}
          <div 
            className="navbar-collapse order-lg-2"
            style={{
              display: mobileMenuOpen ? 'block' : 'none'
            }}
          >
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {getNavItems().map((item) => (
                <li key={item.page} className="nav-item">
                  <a 
                    className="nav-link fw-medium" 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); handleNavigate(item.page); }}
                    style={{ 
                      transition: 'color 0.2s ease',
                      padding: '0.5rem 0.75rem'
                    }}
                  >
                    <i className={`bi ${item.icon} me-2 d-lg-none`}></i>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Auth Buttons - Show only on mobile */}
            <div className="d-lg-none mt-3 pb-3">
              <div className="d-flex flex-column gap-2">
                {!isLoggedIn ? (
                  <>
                    <button
                      type="button"
                      onClick={() => { 
                        onOpenAuthModal('signup'); 
                        setMobileMenuOpen(false); 
                      }}
                      className="btn btn-outline-primary ripple w-100"
                      style={{ 
                        borderRadius: '25px',
                        fontWeight: '500',
                        padding: '0.75rem',
                        border: '2px solid var(--primary-color)'
                      }}
                    >
                      <i className="bi bi-person-plus me-2"></i>
                      สมัครสมาชิก
                    </button>
                    <button
                      type="button"
                      onClick={() => { 
                        onOpenAuthModal('login'); 
                        setMobileMenuOpen(false); 
                      }}
                      className="btn btn-primary ripple w-100"
                      style={{ 
                        borderRadius: '25px',
                        fontWeight: '500',
                        padding: '0.75rem'
                      }}
                    >
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      เข้าสู่ระบบ
                    </button>
                  </>
                ) : (
                  <>
                    <div className="px-3 py-2 bg-light rounded-3 mb-2">
                      <div className="d-flex align-items-center gap-2">
                        <div 
                          className="d-flex align-items-center justify-content-center rounded-circle"
                          style={{
                            width: '40px',
                            height: '40px',
                            background: 'linear-gradient(135deg, var(--primary-color) 0%, #0891b2 100%)',
                            color: 'white'
                          }}
                        >
                          <i className="bi bi-person-fill"></i>
                        </div>
                        <div>
                          <div className="fw-bold">{getRoleText()}</div>
                          <small className="text-muted">{userId || 'ผู้ใช้งาน'}</small>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => { 
                        onLogout(); 
                        setMobileMenuOpen(false); 
                      }}
                      className="btn btn-outline-danger ripple w-100"
                      style={{ borderRadius: '25px' }}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      ออกจากระบบ
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Desktop Navbar Collapse - Show menu on desktop */}
      <style>{`
        @media (min-width: 992px) {
          .navbar-collapse {
            display: flex !important;
          }
        }
      `}</style>

      {/* Spacer for fixed navbar */}
      <div style={{ height: '76px' }}></div>

      {/* Add animation styles */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .user-dropdown .btn:hover {
          border-color: var(--primary-color) !important;
          background-color: #f8fafc !important;
        }

        .user-dropdown .btn-link:hover {
          background-color: #f8fafc !important;
        }

        .nav-link:hover {
          color: var(--primary-color) !important;
        }

        .btn-outline-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(13, 148, 136, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(13, 148, 136, 0.4);
        }
      `}</style>
    </>
  );
}
