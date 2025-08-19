const getTextPrimary = (theme: string): string => {
    return theme === 'dark' ? 'text-gray-100' : 'text-gray-950';
};

const getTextSecondary = (theme: string): string => {
    return theme === 'dark' ? 'text-gray-200' : 'text-gray-900';
};

export { getTextPrimary, getTextSecondary }