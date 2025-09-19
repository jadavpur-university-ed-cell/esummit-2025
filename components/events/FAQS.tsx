import { useState } from 'react';

interface FAQProps {
  faqs: { question: string; answer: string }[];
  headingColor?: string;
  questionColor?: string;
  answerColor?: string;
  backgroundColor?: string;
}

const FAQ = ({ faqs, headingColor = 'gray-900', questionColor = 'gray-400', answerColor = 'white', backgroundColor = "[#101720]" }: FAQProps) => {
  const [openIndex, setOpenIndex] = useState<number|null>(null);

  const handleToggle = (index:number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`bg-${backgroundColor} rounded-xl p-4`}>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
          <h2 className={`text-center text-3xl font-extrabold ${headingColor} sm:text-4xl`}>Frequently asked questions</h2>
          <dl className="mt-6 space-y-6 divide-y divide-gray-200">
            {faqs.map((faq, index:number) => (
              <div key={index} className="pt-6">
                <dt className="text-lg">
                  <button
                    type="button"
                    className={`text-left w-full flex justify-between items-start ${questionColor}`}
                    aria-controls={`faq-${index}`}
                    aria-expanded={openIndex === index}
                    onClick={() => handleToggle(index)}
                  >
                    <span className={`font-medium ${questionColor}`}>{faq.question}</span>
                    <span className="ml-6 h-7 flex items-center">
                      <svg
                        className={`h-6 w-6 transform ${openIndex === index ? 'rotate-180' : 'rotate-0'} text-white`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                </dt>
                <dd
                  className={`mt-2 pr-12 ${openIndex === index ? 'block' : 'hidden'}`}
                  id={`faq-${index}`}
                >
                  <p className={`text-base ${answerColor}`}>{faq.answer}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FAQ;