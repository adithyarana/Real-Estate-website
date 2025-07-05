import Link from "next/link";

const Home = () => {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-6 ">

      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/adminbanner.jpg"
          alt="Background"
          className="w-full h-full object-cover object-center sm:object-top"
        />
        <div className="absolute inset-0 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-green-100/10 to-green-900/30"></div>
      </div>

      {/* Content */}
      <div className="z-10 max-w-2xl w-full   rounded-2xl  p-8   transform transition-all hover:scale-105">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className=" font-heading font-bold text-4xl text-green-800 tracking-tight">
              Welcome to The Kirty Realty Admin Panel
            </h1>
            <div className="h-1 w-20 bg-green-500 mx-auto rounded-full"></div>
          </div>

          <p className=" font-body font-medium text-black text-lg">
            Only the admin can visit this page 👇
          </p>

          <Link href="/adminlogin" className="block">
            <button className="w-full md:w-auto bg-green-600 hover:bg-green-700 rounded-xl text-white py-3 px-8 cursor-pointer font-medium transition-colors duration-300 shadow-md hover:shadow-lg">
              Admin Login
            </button>
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-green-100 text-center text-black text-sm">
          Secure access for authorized personnel only
        </div>
      </div>

      {/* Decorative elements */}
      <div className="fixed top-10 left-10 w-32 h-32 bg-green-200 rounded-full opacity-30 blur-3xl z-0"></div>
      <div className="fixed bottom-10 right-10 w-40 h-40 bg-green-300 rounded-full opacity-20 blur-3xl z-0"></div>
    </div>
  );
};

export default Home;
