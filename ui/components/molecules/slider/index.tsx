import React, { forwardRef } from 'react'

// Dependencies
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'

// Assets
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

type SliderProps = {
  items: React.ReactNode[]
} & SwiperProps

const Slider = ({ items, ...props }: SliderProps) => {
  return (
    <Swiper {...props}>
      {items.map((item, index) => {
        return <SwiperSlide key={index}>{item}</SwiperSlide>
      })}
    </Swiper>
  )
}

export default Slider
