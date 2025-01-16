import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from '../store/store.js'
import App from './App.jsx'

createRoot(document.querySelector('#root')).render(
        <Provider store={store}>
            <App />
        </Provider>
)