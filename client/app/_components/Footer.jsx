import { LocateIcon, Mail, Phone } from 'lucide-react'
import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaMailBulk, FaTwitter } from 'react-icons/fa'

const  Footer=()=> {
  return (
    <footer className="bg-gray-700 text-white py-16 ">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid md:grid-cols-4  gap-9">
        {/* Company Info */}
        <div>
          <h3 className=" font-heading text-2xl font-bold mb-6">KIRTY REALTY</h3>
          <p className=" font-body text-green-200 mb-4">
            Your trusted partner in finding the perfect home. We combine local expertise with personalized service.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
          <ul className="space-y-3">
            <li><a href="/" className="hover:text-green-200 transition">Home</a></li>
            <li><a href="/aboutus" className="hover:text-green-200 transition">Why Choose Us</a></li>
            <li><a href="/properties?type=All" className="hover:text-green-200 transition">Properties</a></li>
            <li><a href="/contactus" className="hover:text-green-200 transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-xl font-semibold mb-6">Contact Us</h4>
          <ul className="space-y-3">
            <li className="flex items-center">
              <Phone className="mr-3 text-green-400" size={20} />
              <span>+91 8076913424</span>
            </li>
            <li className="flex items-center">
              <FaMailBulk className="mr-3 text-green-400" size={20} />
              <span>kirtyrealty@gmail.com</span>
            </li>
            <li className="flex items-center ">
              <LocateIcon className="mr-3 text-green-400 mb-28 xl:mb-16 " size={100} />
              <span className='mb-11 '>KIRTY REALTY - Industrial Corporate,Property Lease,Sale, Msx Tower-1, Alpha-I Commercial Belt, Block E, Alpha I, Greater Noida, Uttar Pradesh 201308</span>
            </li>
          </ul>
        </div>

        <div>
          {/* Social Media */}
          <h4 className="text-xl font-semibold mb-6">Follow Us</h4>
          <ul className="flex space-x-4">
            <li><a href="#" className="text-blue-500 hover:opacity-65 transition text-4xl"><FaFacebook/></a></li>
            <li><a href="#" className="text-pink-500 hover:opacity-65 transition text-4xl"><FaInstagram/></a></li>
            <li><a href="#" className="text-blue-400 hover:opacity-65 transition text-4xl"><FaTwitter/></a></li>
            <li><a href="#" className="text-blue-500 hover:opacity-65 transition text-4xl"><FaLinkedin/></a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-green-700 mt-12 pt-6 text-center">
        <p className="text-green-200">
          © 2025 KIRTY REALTY. All Rights Reserved.
        </p>
      </div>

    </div>
  </footer>
  )
}

export default Footer