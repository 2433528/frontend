
export const Footer = () => {
  return (
    <footer className="w-full py-6 mt-auto border-t border-gray-100 bg-gray-300 z-50">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-2">
        <p className="text-gray-500 text-sm flex items-center gap-1">
          Made with <span className="text-red-500">❤️</span> by 
          <span className="font-semibold text-blue-600 hover:underline transition-all">Cristina</span>
        </p>
        <p className="text-gray-400 text-xs">
          &copy; {new Date().getFullYear()} Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};
