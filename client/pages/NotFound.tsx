import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-xl mb-8">Page not found</p>
          <Link 
            to="/" 
            className="bg-black text-white px-8 py-3 text-[12px] tracking-[1.3px] inline-block hover:bg-gray-800 transition-colors"
          >
            GO TO HOMEPAGE
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
