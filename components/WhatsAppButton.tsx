import type { FC } from "react"
import { FaWhatsapp } from "react-icons/fa"

const WhatsAppButton: FC = () => {
  const handleClick = () => {
    window.open("https://wa.me/22897864804", "_blank")
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-lg transition-all duration-300 ease-in-out z-50 flex items-center justify-center"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp size={32} />
    </button>
  )
}

export default WhatsAppButton

