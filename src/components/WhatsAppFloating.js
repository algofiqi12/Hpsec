import { IconWhatsApp } from './Icons';
import { waLink } from '@/lib/utils';

export default function WhatsAppFloating() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-floating"
      aria-label="Chat WhatsApp HPSEC"
    >
      <IconWhatsApp size={28} />
    </a>
  );
}
