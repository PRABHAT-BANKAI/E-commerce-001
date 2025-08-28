import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-8">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-white">ApanaCart</h2>
          <p className="mt-3 text-sm text-gray-400">
            Your one-stop shop for the best products at unbeatable prices.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/home" className="hover:text-blue-400">Home</Link></li>
            <li><Link to="/products" className="hover:text-blue-400">Products</Link></li>
            <li><Link to="/about" className="hover:text-blue-400">About Us</Link></li>
            <li><Link to="/features" className="hover:text-blue-400">Features</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400">Contact</Link></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-3">Customer Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="#" className="hover:text-blue-400">FAQs</Link></li>
            <li><Link to="#" className="hover:text-blue-400">Shipping & Returns</Link></li>
            <li><Link to="#" className="hover:text-blue-400">Privacy Policy</Link></li>
            <li><Link to="#" className="hover:text-blue-400">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-blue-500"><FaFacebookF /></a>
            <a href="#" className="hover:text-sky-400"><FaTwitter /></a>
            <a href="#" className="hover:text-pink-500"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-600"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Payment + App Download */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Payment & App</h3>
          
          {/* Payment Methods (smaller images) */}
          <div className="flex space-x-2 mb-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
              alt="Visa"
              className="h-6"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
              alt="MasterCard"
              className="h-6"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              alt="PayPal"
              className="h-6"
            />
          </div>

          {/* App Download (smaller badges) */}
          <div className="flex flex-col space-y-2">
            <a href="#" target="_blank" rel="noopener noreferrer" className="w-28">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
              />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="w-28">
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ApanaCart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
