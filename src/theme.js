// theme.js

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
}

const colors = {
    brand: {
        100: "#141414",
        200: "#14213d",
        300: "#fca311",
        400: "#e5e5e5",
        500: "#ffffff",
    },
}

const sizes = {
    sizes: {
        max: 'max-content',
        min: 'min-content',
        full: '100%',
        '3xs': '14rem',
        '2xs': '16rem',
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem',
        '8xl': '90rem',
        container: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
        },
    },
}

// 3. extend the theme
const theme = extendTheme({ config, colors, sizes })

export default theme