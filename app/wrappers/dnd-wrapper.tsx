import * as React from 'react'

import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

export const DragDropContextProvider = DragDropContext(HTML5Backend)((props: any) =>
  React.Children.only(props.children)
)
