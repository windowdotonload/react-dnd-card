/*
 * @Descripttion: 
 * @version: 
 * @Author: windowdotonload
 */
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

ReactDOM.render(
  <DndProvider backend={HTML5Backend}>
    <App />
  </DndProvider>,
  document.getElementById('root')
)
