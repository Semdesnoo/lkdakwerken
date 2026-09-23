'use client';

import Link from 'next/link';

// Pas dit aan naar het echte WhatsApp-nummer van LK Dakwerken.
// Formaat: internationale notatie zonder + of spaties (bijv. 316****5678).
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '316****5678';

const DEFAULT_MESSAGE =
  'Hallo LK Dakwerken, ik heb een vraag over een offerte of een klus.';

export function WhatsappFloat() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    DEFAULT_MESSAGE
  )}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Stuur ons een WhatsApp-bericht"
      className="wa-float"
    >
      {/* WhatsApp icon in de officiële 'bubble' vorm */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="22"
        height="22"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.094c-.74-.37-1.473-.788-2.13-1.293a13.527 13.527 0 0 1-2.376-2.45 7.18 7.18 0 0 1-1.012-1.595c-.084-.218.06-.282.213-.387.135-.094.298-.252.448-.36.158-.118.211-.205.318-.351.107-.146.06-.243-.018-.36-.084-.135-.74-1.717-.83-1.88-.084-.158-.169-.213-.298-.213-.118 0-.252-.014-.388-.014a.748.748 0 0 0-.55.247c-.18.213-.69.67-.69 1.635 0 .965.71 1.901 1.388 2.61 1.452 1.5 2.84 2.66 4.83 3.65.45.225.81.36 1.085.46.46.144.875.124 1.205.075.367-.054 1.118-.456 1.275-.898.158-.443.158-.823.111-.898-.043-.07-.158-.108-.341-.167zM16.04 6.5c-5.523 0-10 4.477-10 10 0 1.83.494 3.55 1.353 5.012L6 27.5l6.21-1.36a9.96 9.96 0 0 0 4.83 1.232h.005c5.523 0 10-4.477 10-10s-4.477-10.372-10-10.372zm0 18.13h-.004a8.13 8.13 0 0 1-4.14-1.13l-.297-.176-3.685.808.822-3.59-.193-.307a8.13 8.13 0 0 1-1.244-4.345c.002-4.49 3.656-8.144 8.146-8.144 2.176 0 4.22.85 5.758 2.39a8.09 8.09 0 0 1 2.385 5.762c-.002 4.49-3.656 8.13-8.548 8.13z" />
      </svg>
    </Link>
  );
}