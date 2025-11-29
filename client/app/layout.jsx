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
  icons: {
    icon: "/favicon.ico",           // default favicon
    shortcut: "/favicon.ico",       // shortcut icon
    apple: "/apple-touch-icon.png", // optional apple icon
  },
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <head>
       <link rel="icon" type="image/png" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
      </head>
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

        <script
          dangerouslySetInnerHTML={{
            __html: `window.chtlConfig = { chatbotId: "1938515834" };`,
          }}
        />
        <script
          async
          data-id="1938515834"
          id="chtl-script"
          type="text/javascript"
          src="https://chatling.ai/js/embed.js"

        />

<script
  dangerouslySetInnerHTML={{
    __html: `
      const waitForChatWidget = setInterval(() => {
        const chatWidget = document.querySelector('div[id^="chtl-"]');
        if (chatWidget) {
          chatWidget.style.animation = "floaty 3s ease-in-out infinite";
          chatWidget.style.borderRadius = "50%";
          chatWidget.style.boxShadow = "0 8px 20px rgba(0, 128, 0, 0.4)";
          
          const style = document.createElement('style');
          style.innerHTML = \`
            @keyframes floaty {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
              100% { transform: translateY(0px); }
            }
          \`;
          document.head.appendChild(style);
          
          clearInterval(waitForChatWidget);
        }
      }, 500);
    `,
  }}
/>



      </body>
    </html>
  );
}
