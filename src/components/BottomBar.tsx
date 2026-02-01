import './BottomBar.css'

export default function BottomBar() {
  return (
    <div className="bottom-bar">
      <span className="bottom-bar__text">
        Frontend Preview Only. Please wake servers to enable backend functionality.
      </span>
      <button type="button" className="bottom-bar__wake">
        Wake up servers
      </button>
    </div>
  )
}
