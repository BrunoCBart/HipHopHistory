import { useEffect, useState } from 'react'
import './App.css'
import HipHopHistorySlider from './HipHopHistorySlider'
import { HipHopHistory } from './interfaces/HipHopHistory'
import { hipHopCulture, hipHopDance } from './utils/hipHopHistory'
function App () {
  const [hipHistory, setHipHistory] = useState<HipHopHistory[]>([])
  let load = 0

  useEffect(() => {
    const bg: any = document.querySelector('.main')
    const loadingText: any = document.querySelector('.loading-text')

    const scale = (num:number, inMin:number, inMax:number, outMin:number, outMax:number) => {
      return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
    }
    function blurring () {
      if (bg && loadingText) {
        if (load > 100) {
          clearInterval(int)
          loadingText.remove()
          bg.classList.remove('blur')
          return
        }

        loadingText.innerText = `${load}%`
        bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`
        load += 1
      }
    }

    const int = setInterval(blurring, 25)
  }, [])

  return (
  <section className="main blur">
    <span className="loading-text">0%</span>
    {hipHistory.length === 0
      ? (<header className="header">
      <h1>História do Hip Hop</h1>
      <h2>Estudio de Dança 3D</h2>
      <p>Por: Bruno Bartolomeu</p>
      <div
        className="hipHistoryTheme culture-theme"
        role="button"
        onClick={() => {
          setHipHistory(hipHopCulture)
        }}>
          <p>Cultura</p>
      </div>
      <div
        className="hipHistoryTheme dance-theme"
        role="button"
        onClick={() => {
          setHipHistory(hipHopDance)
        }}>
          <p>Dança</p>
      </div>
    </header>)
      : <HipHopHistorySlider hipHopHistory={hipHistory} />
}
  </section>
  )
}

export default App
