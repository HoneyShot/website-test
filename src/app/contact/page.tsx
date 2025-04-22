'use client';

import { useState } from 'react';
import { useLanguage } from '../components/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // This is where you would typically send the form data to your backend
    // For demo purposes, we'll just simulate a successful submission
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen px-4 md:px-8 py-12">
      <section className="max-w-4xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary)] text-transparent bg-clip-text">
          {t.contact.title}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <div className="space-y-6">
              <p className="text-lg">
                {t.contact.description}
              </p>
              
              <div className="space-y-4 mt-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-[var(--color-accent-subtle)]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[var(--color-accent)]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <span>info@shotnest.com</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-[var(--color-primary-subtle)]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[var(--color-primary)]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <span>+90 850 555 55 55</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-[var(--navy-subtle)]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[var(--navy)]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <span>Istanbul, TR</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">{t.contact.name}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-transparent"
                  style={{ borderColor: "var(--border-color)" }}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">{t.contact.email}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-transparent"
                  style={{ borderColor: "var(--border-color)" }}
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">{t.contact.subject}</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-transparent"
                  style={{ borderColor: "var(--border-color)" }}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">{t.contact.message}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-transparent"
                  style={{ borderColor: "var(--border-color)" }}
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white font-medium rounded-md hover:opacity-90 transition-opacity duration-300 flex justify-center items-center"
              >
                {isSubmitting ? (
                  <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-e-transparent"></span>
                ) : (
                  t.contact.send
                )}
              </button>
              
              {submitStatus === 'success' && (
                <div className="p-3 bg-green-100 text-green-800 rounded-md">
                  Thank you for your message! I'll get back to you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-3 bg-red-100 text-red-800 rounded-md">
                  There was an error sending your message. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
