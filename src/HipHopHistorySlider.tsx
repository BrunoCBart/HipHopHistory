import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { HipHopHistory } from './interfaces/HipHopHistory'

function HipHopHistorySlider ({ hipHopHistory }: { hipHopHistory: HipHopHistory[] }) {
  let isDragging: boolean = false
  let startPos: number = 0
  let currentTranslate: number = 0
  let prevTranslate: number = 0
  let animationId = 0
  let currentIndex: number = 0

  window.oncontextmenu = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    return false
  }

  useEffect(() => {
    const slider: any = document.querySelector('.slider')

    const getPositionX = (e: any) => {
      return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX
    }

    const setSliderPosition = () => {
      if (slider) slider.style.transform = `translateX(${currentTranslate}px)`
    }

    const animation = () => {
      setSliderPosition()
      if (isDragging) requestAnimationFrame(animation)
    }

    const setPositionByIndex = () => {
      currentTranslate = currentIndex * -window.innerWidth
      prevTranslate = currentTranslate
      setSliderPosition()
    }

    const handleTouchStart = (index:number) => {
      return (e: any) => {
        console.log('start')
        currentIndex = index
        startPos = getPositionX(e)
        isDragging = true
        animationId = requestAnimationFrame(animation)
      }
    }

    const handleTouchMove = (e: any) => {
      if (isDragging) {
        console.log('move')
        const currentPosition = getPositionX(e)
        currentTranslate = prevTranslate + currentPosition - startPos
      }
    }

    const handleTouchEnd = () => {
      console.log('end')
      isDragging = false
      cancelAnimationFrame(animationId)
      const movedBy = currentTranslate - prevTranslate

      if (movedBy < -100 && currentIndex < hipHopHistory.length - 1) {
        currentIndex++
      }

      if (movedBy > 100 && currentIndex > 0) {
        currentIndex--
      }

      setPositionByIndex()
    }
    const sliderEvents = () => {
      const slides = document.querySelectorAll('.slide')
      slides.forEach((slide: any, index: number) => {
        const slideImage = slide.querySelector('img')
        slideImage.addEventListener('dragstart', (e: React.TouchEvent) => e.preventDefault())

        slide.addEventListener('touchstart', handleTouchStart(index))
        slide.addEventListener('touchmove', handleTouchMove)
        slide.addEventListener('touchend', handleTouchEnd)

        slide.addEventListener('mousedown', handleTouchStart(index))
        slide.addEventListener('mouseup', handleTouchEnd)
        slide.addEventListener('mouseleave', handleTouchEnd)
        slide.addEventListener('mousemove', handleTouchMove)
      })
    }

    sliderEvents()
  }, [])

  return (
    <div className="slider">

      {hipHopHistory.map((hipHop: HipHopHistory, index: number) => {
        return (
          <div key={index} className="slide">
            <div className="slide-container">
              <img src={hipHop.image} className="slide-img"/>
              <p>{hipHop.content}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

HipHopHistorySlider.propTypes = {
  hipHopHistory: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  })).isRequired
}

export default HipHopHistorySlider
