import { FloatingWhatsApp } from 'react-floating-whatsapp'

export const WhatsappButton = () => {
  return (
    <>
        <FloatingWhatsApp
            accountName={'Sanlam Digital Sales'}
            phoneNumber={'701000019'}
            statusMessage={'Online'}
            avatar={'./static/profile.jpg'}
            chatMessage={'Hello there! Need help? Reach out to us right here, and we\'ll get back to you as soon as we can!'}
        />
    </>
  );
};
