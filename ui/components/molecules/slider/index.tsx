import React from 'react'

// Dependencies
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'

// Assets
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

type SliderProps = {
  items?: JSX.Element[]
} & SwiperProps

const Slider = ({ items, ...props }: SliderProps) => {
  if (!items) return null
  return (
    <Swiper {...props}>
      {items.map((item, index) => {
        return <SwiperSlide key={index}>{item}</SwiperSlide>
      })}
    </Swiper>
  )
}

export default Slider
