

import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";
import "./globals.css";
import { Playfair_Display, Inter } from "next/font/google";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"], // Regular & Bold
  display: "swap",
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
  variable: "--font-inter",
}); 

export const metadata = {
  title: "KIRTY REALTY",
  description: "Your Property. Our Priority.",  
  icons: [
    { url: "/favi.png", sizes: "32x32", type: "image/png" },
  
  ]
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} bg-white text-gray-900 min-h-screen flex flex-col`}
      >
        <Navbar />
        
        <main className="flex-grow">
          {children}
        </main>

        <Footer />

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
