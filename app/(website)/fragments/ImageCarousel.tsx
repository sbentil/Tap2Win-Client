"use client"
import Image from 'next/image';
import { useState, useEffect } from 'react';

const ImageCarousel = () => {
    const images = [
        "/assets/car-display-1.jpg",
        "/assets/car-display-2.jpg",

    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [images?.length, currentImageIndex]);

    const handleThumbnailClick = (index: any) => {
        setCurrentImageIndex(index);
    };

    return (
        <div className="fixed h-screen w-screen md:w-[100vw] md:h-[100vh] overflow-hidden">
            <div className="flex w-full h-full transition-transform duration-500 ease-in-out transform">
                {images.map((image, index) => (
                    <Image
                        width={1920}
                        height={1080}
                        key={index}
                        src={image}
                        alt={`Image ${index + 1}`}
                        className={`w-full h-full object-center object-cover ${index === currentImageIndex ? 'block' : 'hidden'
                            }`}
                    />
                ))}
            </div>
            <div className="absolute bottom-4 right-4 flex gap-2">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`w-10 h-8 overflow-hidden cursor-pointer rounded-xl ${index === currentImageIndex ? 'border border-gray-700' : 'border-gray-300'
                            }`}
                        onClick={() => handleThumbnailClick(index)}
                    >
                        <Image
                            width={20}
                            height={10}
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;
