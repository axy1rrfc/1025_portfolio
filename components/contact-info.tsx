'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Github, Linkedin, Twitter, Mail as MailIcon } from 'lucide-react'

export function ContactInfo() {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'hello@portfolio.dev',
      href: 'mailto:hello@portfolio.dev'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'San Francisco, CA',
      href: '#'
    },
    {
      icon: Clock,
      title: 'Timezone',
      value: 'PST (UTC-8)',
      href: '#'
    }
  ]

  const socialLinks = [
    {
      icon: Github,
      title: 'GitHub',
      href: 'https://github.com'
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      href: 'https://linkedin.com'
    },
    {
      icon: Twitter,
      title: 'Twitter',
      href: 'https://twitter.com'
    },
    {
      icon: MailIcon,
      title: 'Email',
      href: 'mailto:hello@portfolio.dev'
    }
  ]

  const availability = [
    { service: 'Project Consultation', status: 'Available', color: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' },
    { service: 'Freelance Work', status: 'Available', color: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' },
    { service: 'Full-time Position', status: 'Considering', color: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300' },
    { service: 'Speaking Engagements', status: 'Available', color: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' }
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Details */}
          <div className="reveal-element">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                      <info.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{info.title}</p>
                      <a 
                        href={info.href} 
                        className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {info.value}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Social Links & Availability */}
          <div className="space-y-8">
            {/* Social Links */}
            <div className="reveal-element">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Connect With Me</h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.title}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-8 h-8 mx-auto mb-2 text-gray-700 dark:text-gray-300" />
                      <p className="font-medium text-gray-900 dark:text-white">{social.title}</p>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Availability */}
            <div className="reveal-element">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Availability</h3>
                <div className="space-y-3">
                  {availability.map((item, index) => (
                    <motion.div
                      key={item.service}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <span className="text-gray-700 dark:text-gray-300">{item.service}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${item.color}`}>
                        {item.status}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}