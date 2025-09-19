import React from 'react';
import { FaWhatsapp } from 'react-icons/fa'; // Importing WhatsApp icon from Font Awesome

interface PoCCardProps {
  name: string;
  phoneNumber: string;
  nameColor: string;
}

const PoCCard: React.FC<PoCCardProps> = ({ name, phoneNumber, nameColor }) => {
  const nameColorClass = `${nameColor}-500`;
  const phoneColorClass = `${nameColor}-400`;

  return (
    <div className="p-6 shadow-xl mx-4 bg-[#101720,0.1] backdrop-blur-md border border-gray-200 rounded-xl mt-8 overflow-hidden w-full md:w-[40%] lg:w-[20%] flex flex-col items-center justify-between">
      {/* Card Content */}
      <div className="space-y-2 flex flex-col items-center text-center">
        <p className={`text-2xl font-semibold py-3 ${nameColorClass}`}>
          {name}
        </p>
        <p className={`text-lg font-medium ${phoneColorClass}`}>
          {phoneNumber}
        </p>
      </div>

      {/* WhatsApp Button */}
      <div className="mt-4">
        <a
          href={`https://wa.me/${phoneNumber.replace(/\D/g, '')}`} // Removes non-digit characters for WhatsApp link
          className="px-4 py-2 bg-green-500/80 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
        >
          <FaWhatsapp className="w-6 h-6 mr-2" /> {/* Font Awesome WhatsApp Icon */}
          WhatsApp
        </a>
      </div>
    </div>
  );
};

export default PoCCard;
