const getButtonWebsiteLinks = (theme: 'light' | 'dark'): string => `
  relative overflow-hidden border z-10 transition-colors duration-300
  before:absolute before:top-0 before:left-0 before:h-full before:w-0 before:z-[-1]
  before:transition-all before:duration-700 before:ease-in-out hover:before:w-full
  ${theme === 'dark'
    ? 'bg-red-600 md:bg-gray-950 border-red-600 text-gray-100 hover:text-gray-950 hover:border-amber-600 before:bg-amber-300'
    : 'bg-amber-300 md:bg-gray-100 border-amber-300 text-gray-950 hover:text-gray-100 hover:border-red-600 before:bg-red-600'}
`.replace(/\s+/g, ' ').trim();

const getBaseButton = (): string =>
  'md:hover:cursor-pointer inline-flex justify-center items-center gap-1 md:gap-2 px-3 md:px-2 py-3 md:py-2 text-lg md:text-[1em] rounded-full font-semibold transition border-3 break-words max-w-full hover:cursor-pointer';

export { getButtonWebsiteLinks, getBaseButton };
