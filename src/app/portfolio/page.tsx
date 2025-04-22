'use client';

import Image from 'next/image';
import ThreeScene from "../components/ThreeScene";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen px-4 md:px-8 py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between mb-16 mt-8">
        <div className="md:w-3/5 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-transparent bg-clip-text">
            Full Stack Engineer
          </h1>
          <p className="text-xl md:text-2xl text-[var(--muted)] mb-6">
            Building modern web applications and cloud solutions
          </p>
          <div className="flex gap-4">
            <a 
              href="#contact" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors"
            >
              Contact Me
            </a>
            <a 
              href="#projects" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 border border-[var(--border-color)] rounded-lg hover:bg-[var(--code-bg)] transition-colors"
            >
              View Projects
            </a>
          </div>
        </div>
        <div className="md:w-2/5 flex justify-center">
          <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-[var(--color-primary)]">
            {/* Add your profile image here */}
            <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] opacity-30"></div>
            {/* Placeholder for profile image - uncomment and add your image path
            <Image 
              src="/profile.jpg" 
              alt="Profile Picture" 
              fill 
              className="object-cover"
            />
            */}
            <ThreeScene />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="mb-16">
        <h2 className="text-3xl font-bold mb-8 border-b-2 border-[var(--border-color)] pb-2">Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 border border-[var(--border-color)] rounded-lg hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold mb-3 text-[var(--color-primary)]">Full Stack Development</h3>
            <p className="text-[var(--muted)]">
              Building responsive and accessible web applications using modern JavaScript frameworks and libraries.
            </p>
          </div>
          <div className="p-6 border border-[var(--border-color)] rounded-lg hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold mb-3 text-[var(--color-primary)]">Cloud Services</h3>
            <p className="text-[var(--muted)]">
              Deploying and managing applications on cloud platforms with focus on scalability and reliability.
            </p>
          </div>
          <div className="p-6 border border-[var(--border-color)] rounded-lg hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold mb-3 text-[var(--color-primary)]">Web Applications</h3>
            <p className="text-[var(--muted)]">
              Creating intuitive user interfaces and seamless user experiences with attention to performance.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="mb-16">
        <h2 className="text-3xl font-bold mb-8 border-b-2 border-[var(--border-color)] pb-2">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Project Card 1 */}
          <div className="border border-[var(--border-color)] rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-[var(--code-bg)] flex items-center justify-center">
              <span className="text-xl font-mono text-[var(--muted)]">Project Preview</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Project One</h3>
              <p className="text-[var(--muted)] mb-4">A full-stack application with modern architecture and responsive design.</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-[var(--code-bg)] text-sm rounded">React</span>
                <span className="px-2 py-1 bg-[var(--code-bg)] text-sm rounded">Node.js</span>
                <span className="px-2 py-1 bg-[var(--code-bg)] text-sm rounded">MongoDB</span>
              </div>
              <button 
                onClick={() => {
                  // Handle project click - would navigate to project detail in a real app
                  alert("Project details would open here");
                }}
                className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium cursor-pointer"
              >
                View Project →
              </button>
            </div>
          </div>
          
          {/* Project Card 2 */}
          <div className="border border-[var(--border-color)] rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-[var(--code-bg)] flex items-center justify-center">
              <span className="text-xl font-mono text-[var(--muted)]">Project Preview</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Project Two</h3>
              <p className="text-[var(--muted)] mb-4">A cloud-based solution with scalable architecture and robust performance.</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-[var(--code-bg)] text-sm rounded">AWS</span>
                <span className="px-2 py-1 bg-[var(--code-bg)] text-sm rounded">TypeScript</span>
                <span className="px-2 py-1 bg-[var(--code-bg)] text-sm rounded">NextJS</span>
              </div>
              <button
                onClick={() => {
                  // Handle project click - would navigate to project detail in a real app
                  alert("Project details would open here");
                }}
                className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium cursor-pointer"
              >
                View Project →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="mb-16">
        <h2 className="text-3xl font-bold mb-8 border-b-2 border-[var(--border-color)] pb-2">Get In Touch</h2>
        <div className="bg-[var(--code-bg)] p-8 rounded-lg">
          <p className="text-lg mb-6">
            I'm currently open to new opportunities. Feel free to reach out if you'd like to discuss a project or potential collaboration.
          </p>
          <button 
            onClick={() => {
              // In a real app, this would open a contact form modal
              // For now, we'll use the mailto as a fallback
              window.location.href = "mailto:your.email@example.com";
            }}
            className="inline-block px-6 py-3 bg-[var(--color-accent)] text-white rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            Contact Me
          </button>
        </div>
      </section>
    </main>
  );
}
