"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mic2, Mail, MapPin, Twitter, Linkedin, Github, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Features", href: "/#features" },
      { name: "Pricing", href: "/subscriptions" },
      { name: "How It Works", href: "/#how-it-works" },
      { name: "Dashboard", href: "/dashboard" },
    ],
    resources: [
      { name: "Documentation", href: "/docs" },
      { name: "Tutorials", href: "/tutorials" },
      { name: "Blog", href: "/blog" },
      { name: "Support", href: "/support" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
      { name: "Partners", href: "/partners" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Accessibility", href: "/accessibility" },
    ],
  };

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/nexora" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/nexora" },
    { name: "GitHub", icon: Github, href: "https://github.com/nexora" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com/@nexora" },
  ];

  return (
    <footer className="bg-surface-raised border-t border-border-subtle mt-20">
      <div className="container mx-auto px-6 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <div>
                <Image src="/images/nexora.png" alt=" logo" width={46} height={22} className="transition-transform duration-300 group-hover:scale-105" />
              </div>
              <span className="text-xl font-bold text-text-primary">Nexora</span>
            </Link>
            <p className="text-text-secondary text-sm mb-6 leading-relaxed max-w-sm">
              Transform your learning journey with AI-powered voice mentors. Master any subject through natural conversations.
            </p>

            {/* Contact Info */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-text-secondary text-sm">
                <Mail className="w-3.5 h-3.5 text-accent-blue" />
                <a href="mailto:hello@nexora.ai" className="hover:text-text-primary transition-colors duration-200">
                  hello@nexora.ai
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-text-secondary text-sm">
                <MapPin className="w-3.5 h-3.5 text-accent-blue" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-text-primary text-sm mb-4">Product</h3>
            <ul className="space-y-2.5">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-secondary text-sm hover:text-text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-text-primary text-sm mb-4">Resources</h3>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-secondary text-sm hover:text-text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-text-primary text-sm mb-4">Company</h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-secondary text-sm hover:text-text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-text-primary text-sm mb-4">Legal</h3>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-secondary text-sm hover:text-text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border-subtle">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-text-tertiary text-xs">
              © {currentYear} Nexora. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-surface-sunken flex items-center justify-center text-text-tertiary hover:text-text-primary hover:bg-surface-sunken/80 transition-all duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Additional Links */}
            <div className="flex items-center gap-5 text-xs">
              <Link href="/sitemap" className="text-text-tertiary hover:text-text-primary transition-colors duration-200">
                Sitemap
              </Link>
              <Link href="/status" className="text-text-tertiary hover:text-text-primary transition-colors duration-200">
                Status
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
