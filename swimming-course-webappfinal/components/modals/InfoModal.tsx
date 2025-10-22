import { useEffect } from 'react';

interface InfoModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

export default function InfoModal({ isOpen, title, message, onClose }: InfoModalProps) {
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

  if (!isOpen) return null;

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
          className="modal-dialog modal-dialog-centered" 
          onClick={(e) => e.stopPropagation()}
          style={{
            animation: 'modalSlideIn 0.3s ease-out'
          }}
        >
          <div className="modal-content border-0 shadow-xl" style={{ borderRadius: '20px' }}>
            <div className="modal-header bg-gradient-primary text-white border-0">
              <h5 className="modal-title fw-bold">
                <i className="bi bi-info-circle me-2"></i>
                {title}
              </h5>
              <button 
                type="button" 
                className="btn-close btn-close-white" 
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-4">
              <div 
                className="text-dark"
                dangerouslySetInnerHTML={{ __html: message }}
              />
            </div>
            <div className="modal-footer border-0 bg-light">
              <button
                onClick={onClose}
                className="btn btn-primary ripple px-4"
              >
                <i className="bi bi-check-circle me-2"></i>
                ตกลง
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
