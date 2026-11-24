import './RakshaBandhanBanner.css'

export default function RakshaBandhanBanner() {
  return (
    <a
      className="rakhi-banner"
      href="#products"
      aria-label="Rakshabandhan Special Offer - Festive Delight box at ₹249"
    >
      <div className="rakhi-ribbon" />

      <div className="rakhi-left">
        <img className="rakhi-logo" src="/logo.png" alt="Bakeats" />
        <img className="rakhi-box-img" src="/products/cookies/maska.png" alt="Festive Delight Box" />
        <div className="rakhi-price">
          <span className="rakhi-price-old">₹299</span>
          <span className="rakhi-price-new">₹249/-</span>
        </div>
      </div>

      <div className="rakhi-center">
        <div className="rakhi-hindi">रक्षाबंधन</div>
        <div className="rakhi-subtitle">Special Offer</div>
      </div>

      <div className="rakhi-right">
        <div className="rakhi-discount">
          <span className="rakhi-discount-num">10%</span>
          OFF
        </div>
        <div className="rakhi-products">
          <img src="/products/cookies/ajwain.png" alt="Ajwain Cookies" />
          <img src="/products/cookies/nariyal.png" alt="Nariyal Cookies" />
          <img src="/products/rusks/elaichi.png" alt="Elaichi Rusk" />
          <img src="/products/rusks/suji.png" alt="Suji Rusk" />
        </div>
      </div>
    </a>
  )
}
