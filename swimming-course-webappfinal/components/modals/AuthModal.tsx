import { useState, FormEvent, useEffect } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  mode: 'login' | 'signup';
  onClose: () => void;
  onSubmit: (email: string, password: string, mode: 'login' | 'signup') => Promise<void>;
  onSwitchMode: (mode: 'login' | 'signup') => void;
}

export default function AuthModal({ isOpen, mode, onClose, onSubmit, onSwitchMode }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage('กำลังดำเนินการ...');
    setIsLoading(true);

    try {
      await onSubmit(email, password, mode);
      setMessage(mode === 'signup' ? 'ลงทะเบียนสำเร็จ! เข้าสู่ระบบแล้ว' : 'เข้าสู่ระบบสำเร็จ!');
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (error: any) {
      let displayError = 'เกิดข้อผิดพลาดในการยืนยันตัวตน';
      if (error.code === 'auth/email-already-in-use') {
        displayError = 'อีเมลนี้ถูกใช้แล้ว';
      } else if (error.code === 'auth/invalid-email' || error.code === 'auth/invalid-credential') {
        displayError = 'อีเมลหรือรหัสผ่านไม่ถูกต้อง';
      } else if (error.code === 'auth/weak-password') {
        displayError = 'รหัสผ่านควรมีความยาวอย่างน้อย 6 ตัวอักษร';
      }
      setMessage(`❌ ${displayError}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setMessage('');
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="modal-backdrop fade show" 
        onClick={handleClose}
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
        onClick={handleClose}
      >
        <div 
          className="modal-dialog modal-dialog-centered"
          onClick={(e) => e.stopPropagation()}
          style={{
            animation: 'modalSlideIn 0.3s ease-out'
          }}
        >
          <div className="modal-content border-0 shadow-xl" style={{ borderRadius: '20px' }}>
            {/* Header */}
            <div className="modal-header bg-gradient-primary text-white border-0">
              <h5 className="modal-title fw-bold">
                <i className={`bi ${mode === 'login' ? 'bi-box-arrow-in-right' : 'bi-person-plus'} me-2`}></i>
                {mode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}
              </h5>
              <button 
                type="button" 
                className="btn-close btn-close-white" 
                onClick={handleClose}
                aria-label="Close"
              ></button>
            </div>

            {/* Body */}
            <div className="modal-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="auth-email" className="form-label">
                    <i className="bi bi-envelope me-2"></i>
                    อีเมล
                  </label>
                  <input
                    type="email"
                    id="auth-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-control form-control-lg"
                    placeholder="example@email.com"
                    autoComplete="email"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="auth-password" className="form-label">
                    <i className="bi bi-lock me-2"></i>
                    รหัสผ่าน
                  </label>
                  <input
                    type="password"
                    id="auth-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-control form-control-lg"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <small className="text-muted">
                    <i className="bi bi-info-circle me-1"></i>
                    รหัสผ่านอย่างน้อย 6 ตัวอักษร
                  </small>
                </div>

                {message && (
                  <div className={`alert ${
                    message.includes('สำเร็จ') ? 'alert-success' : 
                    message.includes('❌') ? 'alert-danger' : 
                    'alert-info'
                  } border-0`}>
                    <i className={`bi ${
                      message.includes('สำเร็จ') ? 'bi-check-circle-fill' : 
                      message.includes('❌') ? 'bi-x-circle-fill' : 
                      'bi-hourglass-split'
                    } me-2`}></i>
                    {message}
                  </div>
                )}

                <div className="d-grid gap-2 mt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary btn-lg ripple"
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        กำลังดำเนินการ...
                      </>
                    ) : (
                      <>
                        <i className={`bi ${mode === 'login' ? 'bi-box-arrow-in-right' : 'bi-person-plus'} me-2`}></i>
                        {mode === 'login' ? 'เข้าสู่ระบบ' : 'ลงทะเบียน'}
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center mt-3">
                  {mode === 'login' ? (
                    <button
                      type="button"
                      onClick={() => onSwitchMode('signup')}
                      className="btn btn-link text-decoration-none"
                    >
                      ยังไม่มีบัญชี? <strong className="text-primary">สมัครสมาชิกที่นี่</strong>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onSwitchMode('login')}
                      className="btn btn-link text-decoration-none"
                    >
                      มีบัญชีอยู่แล้ว? <strong className="text-primary">เข้าสู่ระบบ</strong>
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="modal-footer border-0 bg-light">
              <small className="text-muted w-100 text-center">
                <i className="bi bi-shield-check me-1"></i>
                ข้อมูลของคุณปลอดภัยและได้รับการเข้ารหัส
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
