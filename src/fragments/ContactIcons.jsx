import React, { useEffect, useState } from 'react';
import Messenger from '../assets/svg/messenger.svg';
import ArrowUp from '../assets/svg/arrow-up-circle-fill.svg';
import WhatsApp from '../assets/svg/whatsapp-symbol-logo.svg';

function ContactIcons() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {showBackToTop && (
        <img
          src={ArrowUp}
          alt="to top"
          type="button"
          className="btn btn-floating btn-lg"
          id="btn-back-to-top"
          onClick={backToTop}
        />
      )}

        {showBackToTop && (
        <img
            src={Messenger}
            alt="msger"
            type="button"
            className="btn btn-floating btn-lg"
            id="msger"
            onClick={backToTop}
        />
        )}

      {showBackToTop && (
      <img
        src={WhatsApp}
        alt="msger"
        type="button"
        className="btn btn-floating btn-lg"
        id="whtsp"
        onClick={backToTop}
      />
      )}
    </>
  );
}

export default ContactIcons;