import React, { useEffect } from 'react';
import PropTypes from  'prop-types';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { Swipeable } from 'react-swipeable';
import '../carousel.scss';
import useSlide, { useControl } from '../useSlide';

const PaddedCarousel = ({ slides, slideWidth, duration, autoSlide, cardAlign, bullet, controls }) => {
  const { slideLeft, handlers, distance, slideRight, bulletSlide } = useSlide(slides.length, slideWidth);
  const { lastElement, rightControl } = useControl(controls);
  useEffect(() => {
    if(autoSlide) {
      const interval = slides.length > 1 ? setInterval(() => slideRight(), duration) : null;
      return () => clearInterval(interval)
    }
  }, [autoSlide, distance, duration, slideRight, slides.length])
  return (
    slides.length !== 0 && (
      <Swipeable {...handlers} className="padded-carousel padding-horizontal-xlg slider position-relative overflow-h margin-bottom-sm">
        <div className="d-flex nowrap align-items-stretch overflow-h position-relative" style={{width: '100%'}}>
          {slides.map((Slide, index) => {
             if(index + 1 === slides.length) {
              return (
                <div key={index} ref={lastElement} className="slide" style={{minWidth: !cardAlign ? '100%' : 'auto', transform: `translateX(${distance}%)`}}>
                  {Slide}
                </div>
              )
             } else {
              return (
                <div key={index} className="slide" style={{minWidth: !cardAlign ? '100%' : 'auto', transform: `translateX(${distance}%)`}}>
                  {Slide}
                </div>
              )
             }
          })}
        </div>
        { controls && (
            <>
              <button id="slide-right" ref={rightControl} onClick={slideRight} className="bg-color1-opacity border-r-circle padding-horizontal-sm padding-vertical-sm cursor-pointer">
                <MdKeyboardArrowRight className="font-lg color1" />
              </button>
              <button id="slide-left" onClick={slideLeft} className="bg-color1-opacity border-r-circle padding-horizontal-sm padding-vertical-sm cursor-pointer">
                <MdKeyboardArrowLeft className="font-lg color1" />
              </button>
            </>
          )}
        <div className="d-flex bullets">
        { bullet && (
          slides.map((_, index) => {
            return (
              <div key={index} onClick={() => bulletSlide(index)} className={`bullet ${index === Math.abs(distance / 100) ? 'active' : ''} margin-right-sm border-r-circle`} />
            )
          })
        )}
        </div>
      </Swipeable>
    )
  )
}

PaddedCarousel.propTypes = {
  duration: PropTypes.number.isRequired,
  bullet: PropTypes.bool,
  controls: PropTypes.bool,
  slideWidth: PropTypes.number,
  autoSlide: PropTypes.bool,
  cardAlign: PropTypes.bool,
}
PaddedCarousel.defaultProps = {
  duration: 3500,
  bullet: false,
  controls: true,
  slideWidth: 100,
  autoSlide: true,
  cardAlign: false,
}
export default PaddedCarousel;