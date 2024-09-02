import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import {NextUIProvider} from "@nextui-org/react";
import { Provider } from 'react-redux'; 
import { store } from '../store/store'; 
import Nav from '@/components/nav';

function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store}>    
      <NextUIProvider>
        <Nav />
        <Component {...pageProps} />
      </NextUIProvider>
    </Provider>
  )
}

export default MyApp;