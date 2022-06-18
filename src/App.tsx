import './App.css'
import HipHopHistorySlider from './HipHopHistorySlider'
import { hipHopHistory } from './utils/hipHopHistory'
function App () {
  return (
  <section className="main">
    <HipHopHistorySlider hipHopHistory={hipHopHistory} />
  </section>
  )
}

export default App
