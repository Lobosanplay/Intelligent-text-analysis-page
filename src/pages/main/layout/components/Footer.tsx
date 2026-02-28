import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <a
                href="https://github.com/Lobosanplay"
                className="text-dark-800 flex justify-center items-center gap-x-2 py-1 hover:scale-130 duration-500 transition-transform"
                target="_blank"
              >
                <Github className="h-5 w-5" />
              </a>
              <p className="text-sm">
                © 2026 Lobosanplay. All rights reserved.
              </p>
            </div>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-sm hover:text-gray-300">
              Privacy Policy
            </a>
            <a href="#" className="text-sm hover:text-gray-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
