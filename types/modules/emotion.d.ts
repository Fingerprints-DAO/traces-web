import '@emotion/react'

type ColorVariant = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      bg: string
      primary: ColorVariant
    }
    components: {
      Avatar: {
        sizes: {
          xm: any
        }
      }
    }
  }
}
