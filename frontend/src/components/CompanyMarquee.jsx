import React from 'react';

const CompanyMarquee = () => {
    // Array of some dummy company logos (using standard tech logos as placeholders)
    const companies = [
        { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
        { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
        { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
        { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
        { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
        { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
        { name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png" },
        { name: "Spotify", logo: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" }
    ];

    // Double the array for seamless infinite scrolling
    const marqueeLogos = [...companies, ...companies];

    return (
        <div className="w-full bg-white border-y border-gray-100 py-10 overflow-hidden flex flex-col items-center">
            <p className="text-sm font-medium text-gray-500 mb-6 uppercase tracking-widest">Trusted by Top Companies</p>
            <div className="relative flex w-full max-w-7xl">
                {/* Gradient Masks for smooth fading edges */}
                <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
                
                <div className="flex w-[200%] animate-marquee items-center">
                    {marqueeLogos.map((company, idx) => (
                        <div key={idx} className="flex-1 flex justify-center items-center px-8 opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0">
                            <img src={company.logo} alt={company.name} className="h-8 md:h-10 object-contain" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CompanyMarquee;
