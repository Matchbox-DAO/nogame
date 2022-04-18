import styled, { createGlobalStyle } from 'styled-components'
import { Text, TextProps } from 'rebass'

const TextWrapper = styled(Text)`
  color: white;
`

export const TYPE = {
  main(props: TextProps) {
    return <TextWrapper fontWeight={500} {...props} />
  },
  link(props: TextProps) {
    return <TextWrapper fontWeight={500} {...props} />
  },
  black(props: TextProps) {
    return <TextWrapper fontWeight={500} {...props} />
  },
  white(props: TextProps) {
    return <TextWrapper fontWeight={500} {...props} />
  },
  body(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={16} {...props} />
  },
  largeHeader(props: TextProps) {
    return <TextWrapper fontWeight={700} fontSize={24} {...props} />
  },
  mediumHeader(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={20} {...props} />
  },
  subHeader(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={14} {...props} />
  },
  small(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={11} {...props} />
  },
  blue(props: TextProps) {
    return <TextWrapper fontWeight={500} {...props} />
  },
  yellow(props: TextProps) {
    return <TextWrapper fontWeight={500} {...props} />
  },
  darkGray(props: TextProps) {
    return <TextWrapper fontWeight={500} {...props} />
  },
  gray(props: TextProps) {
    return <TextWrapper fontWeight={500} {...props} />
  },
  italic(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={12} fontStyle={'italic'} {...props} />
  },
  error({ error, ...props }: { error: boolean } & TextProps) {
    return <TextWrapper fontWeight={500} {...props} />
  },
}

const CairoTextWrapper = styled(TextWrapper)`
  font-family: 'Cairo', sans-serif;
  color: white;
  line-height: 100%;
`

export const CairoText = {
  main(props: TextProps) {
    return <CairoTextWrapper fontWeight={500} {...props} />
  },
  body(props: TextProps) {
    return <CairoTextWrapper fontWeight={400} fontSize={16} {...props} />
  },
  mediumBody(props: TextProps) {
    return <CairoTextWrapper fontWeight={500} fontSize={18} {...props} />
  },
  largeHeader(props: TextProps) {
    return <CairoTextWrapper fontWeight={600} fontSize={24} {...props} />
  },
  mediumHeader(props: TextProps) {
    return <CairoTextWrapper fontWeight={500} fontSize={20} {...props} />
  },
  subHeader(props: TextProps) {
    return <CairoTextWrapper fontWeight={400} fontSize={14} {...props} />
  },
  small(props: TextProps) {
    return <CairoTextWrapper fontWeight={500} fontSize={11} {...props} />
  },
}

export const FixedGlobalStyle = createGlobalStyle`

html, input, textarea, button {
  font-family: Poppins, sans-serif;
  font-display: fallback;
 }

 @supports (font-variation-settings: normal) {
  html, input, textarea, button {
  font-family: Poppins, sans-serif;
   }
}

html,
body {
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
  margin: 0;
}

button {
  user-select: none;
}

html {
  font-size: 16px;
  font-variant: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-feature-settings: 'ss01' on, 'ss02' on, 'cv01' on, 'cv03' on;
  
}
`

export const ThemedGlobalStyle = createGlobalStyle`
html {
  background-repeat: no-repeat;
  background-size: cover;
  backdrop-filter: blur(400px);
}

//body {
//}
`
