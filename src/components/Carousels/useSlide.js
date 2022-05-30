import { useState, useRef, useCallback } from 'react';
import './carousel.scss';
const useSlide = (length, slideWidth, autoSlide) => {
  const [distance, setDistance] = useState(0);
  const slideLeft = () => {
    if (distance === 0) return
    setDistance(distance + slideWidth)
  }
  const slideRight = () => {
    if(distance === -slideWidth * (length - 1) && autoSlide) return setDistance(0)
    setDistance(distance - slideWidth);
  }

  const bulletSlide = (index) => {
    setDistance(-slideWidth * index)
  }
  const handlers = {
    onSwipedLeft: () => slideRight(),
    onSwipedRight: () => slideLeft(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  };

  return { slideLeft, distance, slideRight, handlers, bulletSlide }
}

export const useControl = (allowControl) => {
  const observer = useRef();
  const rightControl = useRef(null);
  const lastElement = useCallback(node => {
    if(observer.current) observer.current.disconnect();
    if(allowControl) {
      observer.current = new IntersectionObserver(entries => {
        if(entries[0].isIntersecting) {
          rightControl.current.classList.add('display-none')
        } else {
          rightControl.current.classList.remove('display-none')
        }
      }, {threshold: 1})
      if(node) observer.current.observe(node)
    }
  }, [allowControl]);
  return { rightControl, lastElement }
}

export default useSlide;
