import { Quote, Star } from 'lucide-react'

// placeholder copy — replace with real client testimonials before going live
const REVIEWS = [
  {
    name: 'Aarav & Meera',
    shoot: 'Wedding',
    rating: 5,
    text: 'They caught moments we did not even know happened. Every time we open the album we find something new.',
  },
  {
    name: 'Rohan Kapoor',
    shoot: 'Automotive',
    rating: 5,
    text: 'The car shoot looked straight out of a magazine. Lighting, reflections, angles — all spot on.',
  },
  {
    name: 'Ishita Rao',
    shoot: 'Fashion Portrait',
    rating: 5,
    text: 'Calm on set, sharp with direction. I have never felt this comfortable in front of a camera.',
  },
  {
    name: 'The Olive Table',
    shoot: 'Food',
    rating: 5,
    text: 'Our menu photos doubled online orders in a month. The food looks exactly as good as it tastes.',
  },
  {
    name: 'Nexa Studio',
    shoot: 'Commercial',
    rating: 5,
    text: 'Clear brief, fast turnaround, and a campaign set that worked across print and social.',
  },
  {
    name: 'Kabir & Ananya',
    shoot: 'Pre-Wedding',
    rating: 5,
    text: 'Felt like a day out with friends who happened to carry cameras. The photos feel like us.',
  },
]

function ClientReviews() {
  return (
    <section
      id="client-reviews"
      className="relative w-full overflow-hidden bg-brand-black px-8 py-32 sm:px-14 lg:px-20"
    >
      <div className="pointer-events-none absolute -right-40 top-0 h-[28rem] w-[28rem] rounded-full bg-brand-crimson/10 blur-[140px]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[24rem] w-[24rem] rounded-full bg-brand-crimson/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="reviews-reveal flex items-center gap-4">
          <span className="h-px w-10 bg-brand-crimson" />
          <span className="font-audiowide text-[11px] uppercase tracking-[0.4em] text-brand-crimson">
            Client Reviews
          </span>
        </div>

        <h2 className="reviews-reveal mt-8 max-w-4xl font-arizonia text-5xl leading-[1.1] text-brand-offwhite sm:text-6xl lg:text-7xl">
          Words From Behind the Frame
        </h2>

        <p className="reviews-reveal mt-6 max-w-md font-audiowide text-[11px] uppercase leading-loose tracking-[0.25em] text-brand-offwhite/60">
          The people we have shot for &mdash; in their own words.
        </p>

        <div className="reviews-grid mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((review) => (
            <article
              key={review.name}
              className="review-card flex flex-col rounded-2xl border border-brand-offwhite/10 bg-brand-offwhite/5 p-8 transition-colors duration-500 hover:border-brand-crimson/40"
            >
              <Quote className="h-6 w-6 text-brand-crimson" />

              <p className="mt-6 flex-1 font-audiowide text-[11px] uppercase leading-loose tracking-[0.2em] text-brand-offwhite/70">
                {review.text}
              </p>

              <div className="mt-8 flex gap-1" aria-label={`${review.rating} out of 5 stars`}>
                {Array.from({ length: review.rating }, (_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-brand-crimson text-brand-crimson" />
                ))}
              </div>

              <div className="mt-4 border-t border-brand-offwhite/10 pt-4">
                <p className="font-arizonia text-3xl text-brand-offwhite">{review.name}</p>
                <p className="mt-1 font-audiowide text-[10px] uppercase tracking-[0.3em] text-brand-offwhite/40">
                  {review.shoot}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ClientReviews
