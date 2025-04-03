import { redirect } from 'next/navigation';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to My Website</h1>
      <p className="mb-8">This is my portfolio website built with Next.js</p>
      <a href="/dashboard" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        View Dashboard
      </a>
    </div>
  );
}
