import { useState } from 'react'
import { Plus } from 'lucide-react'

// placeholder answers — update with the studio's real policies
const FAQS = [
  {
    question: 'How far in advance should I book?',
    answer: 'Weddings are usually booked 6–12 months ahead. Portraits, food and commercial shoots can often be scheduled within 2–3 weeks.',
  },
  {
    question: 'Do you travel for shoots?',
    answer: 'Yes. We shoot across the country and abroad. Travel and stay are quoted separately based on location.',
  },
  {
    question: 'When will I receive my photos?',
    answer: 'A sneak peek arrives within 72 hours. Full edited galleries are delivered in 2–3 weeks for portraits and commercial work, 6–8 weeks for weddings.',
  },
  {
    question: 'How many edited images do we get?',
    answer: 'It depends on the package — a portrait session delivers around 40 images, a full wedding day 500 or more. Every image is individually colour-graded.',
  },
  {
    question: 'Can we get the raw files?',
    answer: 'We deliver finished, edited images only. Raw files are part of our process, not the final product.',
  },
  {
    question: 'What is your payment and cancellation policy?',
    answer: 'A 30% advance secures your date, with the balance due before delivery. The advance is non-refundable but can be moved to a new date once.',
  },
]

function FAQs() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section
      id="faqs"
      className="relative w-full overflow-hidden bg-brand-black px-8 py-32 sm:px-14 lg:px-20"
    >
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[28rem] w-[28rem] rounded-full bg-brand-crimson/10 blur-[140px]" />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <div className="faqs-reveal flex items-center gap-4">
            <span className="h-px w-10 bg-brand-crimson" />
            <span className="font-audiowide text-[11px] uppercase tracking-[0.4em] text-brand-crimson">
              FAQs
            </span>
          </div>

          <h2 className="faqs-reveal mt-8 font-arizonia text-5xl leading-[1.1] text-brand-offwhite sm:text-6xl lg:text-7xl">
            Before You Book
          </h2>

          <p className="faqs-reveal mt-6 max-w-sm font-audiowide text-[11px] uppercase leading-loose tracking-[0.25em] text-brand-offwhite/60">
            The questions we hear most. Anything else &mdash; just ask.
          </p>
        </div>

        <ul className="faqs-list m-0 list-none border-t border-brand-offwhite/10 p-0">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <li key={faq.question} className="faq-item border-b border-brand-offwhite/10">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-audiowide text-xs uppercase tracking-[0.2em] text-brand-offwhite">
                    {faq.question}
                  </span>
                  <Plus
                    className={`h-4 w-4 shrink-0 text-brand-crimson transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  />
                </button>

                {/* grid-rows trick animates height without measuring content */}
                <div
                  id={`faq-answer-${i}`}
                  className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 font-audiowide text-[11px] uppercase leading-loose tracking-[0.2em] text-brand-offwhite/55">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default FAQs
