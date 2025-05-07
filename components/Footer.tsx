import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t-custom-teal bg-custom-bg border-2 py-6">
      <div className="container mx-auto grid grid-cols-2 gap-6 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
        {/* Logo and Description */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src="/gdeluxe1.png"
            alt="ТХКХ"
            className="h-auto w-40 md:w-64 lg:w-80"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center md:items-start lg:col-span-1">
          <ul className="space-y-4">
            <li>
              <a
                href="#"
                className="md:text-md hover:text-custom-teal md:border-custom-teal border-b border-gray-200 text-sm text-gray-600 md:border-b-0 md:border-r md:pr-4"
              >
                Нүүр хуудас
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="md:text-md hover:text-custom-teal md:border-custom-teal border-b border-gray-200 text-sm text-gray-600 md:border-b-0 md:border-r md:pr-2"
              >
                Дата Хабын танилцуулга
              </a>
            </li>
            <li>
              <a
                href="/rooms"
                className="md:text-md hover:text-custom-teal md:border-custom-teal border-b border-gray-200 text-sm text-gray-600 md:border-b-0 md:border-r md:pr-8"
              >
                Өрөөнүүд
              </a>
            </li>
            <li>
              <a
                href="/restaurant"
                className="md:text-md hover:text-custom-teal md:border-custom-teal border-b border-gray-200 text-sm text-gray-600 md:border-b-0 md:border-r md:pr-9"
              >
                Ресторан
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center space-y-3 md:items-start lg:col-span-2">
          <div className="border-custom-teal flex items-start border-b pb-4">
            <MapPin className="h-5 w-5 shrink-0 text-teal-500 md:h-9 md:w-9 " />
            <p className="md:text-md text-sm text-gray-600">
              Гачууртаас 20 км зайд Зүрхэн уулын энгэрт, Гүнжийн уулны нөмөрт
              байрладаг. GOBI Deluxe Hotel & Resort
            </p>
          </div>
          <h3 className="md:text-md mb-3 pt-2 text-sm font-semibold text-gray-800">
            Холбоо барих
          </h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <a
              href="tel:+97688090814"
              className="md:text-md border-custom-teal hover:text-custom-teal flex items-center border-r pr-1 text-sm text-gray-600"
            >
              <Phone className="text-custom-teal h-5 w-5" />
              (+976) 88090814
            </a>
            <a
              href="mailto:medku@gmail.com"
              className="md:text-md border-custom-teal hover:text-custom-teal flex items-center border-r pr-1 text-sm text-gray-600"
            >
              <Mail className="text-custom-teal h-5 w-5 " />
              reab@gdeluxe.mn
            </a>
            <Link
              href="https://www.facebook.com/GDeluxeHotelandResort"
              className="text-custom-teal hover:text-gray-600"
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.instagram.com/gdeluxe_resorts/#"
              className="text-custom-teal hover:text-gray-600 "
            >
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Google Maps */}
        <div className="flex flex-col items-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2664.788931982809!2d107.23211157633082!3d48.09501495412342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d967d072215acd9%3A0x966354e272aa526b!2sG%20Deluxe%20hotel%20and%20resort!5e0!3m2!1sen!2smn!4v1738033095892!5m2!1sen!2smn"
            width="100%"
            height="100%"
            className="md:h-350 lg:h-450 rounded-lg shadow-md"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
