import * as React from 'react'
import { ThemedStyledFunction } from 'styled-components'

type StyledFunction<T> = ThemedStyledFunction<T, null>

export function withProps<T, U extends HTMLElement = HTMLElement>(
  styledFunction: StyledFunction<React.HTMLProps<U>>
): StyledFunction<T & React.HTMLProps<U>> {
  return styledFunction
}
