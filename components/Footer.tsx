import { FaInstagram, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer id="contact" className="bg-[#1B1C3D] text-gray-300 px-6 md:px-16 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 place-items-center">
        <Link href={"/"} className="flex items-center h-12 col-span-2 md:col-span-1">
          <Image
            width={1000}
            height={100}
            src="/esummit-25.svg" 
            alt="E-SUMMIT&apos;25"
            className="h-full object-contain"
          />
        </Link>

        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/events" className="hover:text-white transition">
                Events
              </Link>
            </li>
            <li>
              <Link href="/merchandise" className="hover:text-white transition">
                Merchandise
              </Link>
            </li>
            <li>
              <Link href="/team" className="hover:text-white transition">
                Team
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
            Help
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/brochure" className="hover:text-white transition">
                Brochure
              </Link>
            </li>
            <li>
              <Link href="/sponsors" className="hover:text-white transition">
                For Sponsors
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white transition">
                Privacy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
            Contact
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>Piyush</li>
            <li>Sohini</li>
            <li>Jotiraditya</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-600 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 text-center">
        <p>
          © 2025 Jadavpur University Entrepreneurship Cell. All rights reserved.
        </p>

        <div className="flex space-x-5 mt-4 md:mt-0 text-lg">
          <a
            href="https://www.instagram.com/juecell/"
            aria-label="Instagram"
            className="hover:text-white transition"
          >
            <FaInstagram />
          </a>
          <a
            href="https://x.com/ju_ecell"
            aria-label="Twitter"
            className="hover:text-white transition"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.linkedin.com/school/juecell/"
            aria-label="LinkedIn"
            className="hover:text-white transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.facebook.com/juecell"
            aria-label="Facebook"
            className="hover:text-white transition"
          >
            <FaFacebook />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;