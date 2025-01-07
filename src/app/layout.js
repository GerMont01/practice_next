"use client"
import '../styles/globals.css';
// import 'tailwindcss/tailwind.css';
import {NextUIProvider} from "@nextui-org/react";
import { Provider } from 'react-redux'; 
import { store } from '../store/store'; 
import Nav from '@/components/nav';
import Footer from '@/components/footer';

export default function Layout({ children }) {

  return (
    <html>
      <body>
        <Provider store={store}>    
          <NextUIProvider>
            <Nav />
            {children}
            <Footer/>
          </NextUIProvider>
        </Provider>
      </body>
    </html>
  )
}