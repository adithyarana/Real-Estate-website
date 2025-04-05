import React from 'react';
import Map from '@/app/contactus/components/Map';
import { MapPin, Phone, Mail } from 'lucide-react';

function Meetus() {
  return (
    <div className='p-6 md:p-12 '>
      <h2 className='font-heading text-3xl text-center text-green-800 font-bold'>Meet Us</h2>
      <p className='font-body text-center text-green-600 mb-8'>Visit Our Office</p>

      <div className='flex flex-col lg:flex-row items-center gap-10 lg:gap-20'>
        {/* Left Side  Contact Details */}
        <div className='w-full lg:w-1/2 space-y-6'>
          <div className='bg-white  shadow-lg rounded-2xl p-6 border border-gray-200'>
            <div className='space-y-6'>
              <div className='flex items-center gap-4'>
                <MapPin className='text-green-600 w-8 h-8' />
                <span className='text-lg text-gray-700'>
                  <strong className='text-xl text-gray-900'>Greater Noida</strong> <br />
                  Sector MU 2, Greater Noida, UP 201310
                </span>
              </div>
              <div className='flex items-center gap-4'>
                <Phone className='text-green-600 w-6 h-6' />
                <span className='text-lg text-gray-700'>+91 6301837384</span>
              </div>
              <div className='flex items-center gap-4'>
                <Mail className='text-green-600 w-6 h-6' />
                <span className='text-lg text-gray-700'>contact@example.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side  Map */}
          <Map className=' rounded-2xl shadow-lg border border-gray-200' />
       
      </div>
    </div>
  );
}

export default Meetus;
