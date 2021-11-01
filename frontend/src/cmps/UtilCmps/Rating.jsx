import { ReactComponent as StarSvg } from '../../assets/img/icons/star.svg'

export function Rating({ rate, handleChange, isPreview }) {
  function onHandleChange(ev) {
    if (!isPreview) handleChange(ev)
  }
  return (
    <div className="review-rating-stars">
      <label htmlFor="rate-1" className={rate >= 1 ? 'star-active' : ''}>
        <StarSvg />
      </label>
      <input type="radio" name="rate" id="rate-1" value={1} onChange={onHandleChange} hidden/>
      <label htmlFor="rate-2" className={rate >= 2 ? 'star-active' : ''}>
        <StarSvg />
      </label>
      <input type="radio" name="rate" id="rate-2" value={2} onChange={onHandleChange} hidden />
      <label htmlFor="rate-3" className={rate >= 3 ? 'star-active' : ''} >
        <StarSvg />
      </label>
      <input type="radio" name="rate" id="rate-3" value={3} onChange={onHandleChange} hidden />
      <label htmlFor="rate-4" className={rate >= 4 ? 'star-active' : ''} >
        <StarSvg />
      </label>
      <input type="radio" name="rate" id="rate-4" value={4} onChange={onHandleChange} hidden />
      <label htmlFor="rate-5" className={rate === 5 ? 'star-active' : ''}>
        <StarSvg />
      </label>
      <input type="radio" name="rate" id="rate-5" value={5} onChange={onHandleChange} hidden />
    </div>
  )
}
