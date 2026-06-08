import imagen from "../assets/CasaEnMano.png"

export const Footer = () => {
  return (
    <footer className="w-full py-11 border-t border-gray-100 bg-gray-300 z-60 box-border bottom-0 relative">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-2">
        <p className="text-gray-500 text-sm flex items-center gap-1">
          Made with <span className="text-red-500">❤️</span> by 
          <span className="font-semibold text-blue-600 hover:underline transition-all">Cristina</span>
        </p>
        <p className="text-gray-400 text-xs">
          &copy; {new Date().getFullYear()} Todos los derechos reservados.
        </p>
      </div>
          <img src={imagen} alt="" className="absolute right-0 bottom-0 w-44 h-30 hidden sm:block"/>
    </footer>
  );
};
