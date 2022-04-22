import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './mvp.scss'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { store } from '@/state/store'
import { Provider } from 'react-redux'
// import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
