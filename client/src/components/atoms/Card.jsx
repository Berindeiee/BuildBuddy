import React, { useState, useEffect } from 'react';
import '../../Styles/NftCard.css';

const NftCard = ({ imageName, title, description }) => {
    const [ImageComponent, setImageComponent] = useState(null);

    useEffect(() => {
        const importImage = async () => {
            try {
                // Presupunând că ai un folder `assets` în `src` cu imagini SVG
                const image = await import(`../../assets/${imageName}.svg`);
                setImageComponent(<img src={image.default} alt={title} className='tokenImage' />);
            } catch (err) {
                console.error("Failed to load the image", err);
                // Poți afișa o imagine de fallback sau un mesaj aici
            }
        };

        importImage();
    }, [imageName, title]); // Reîncarcă imaginea dacă prop-urile `imageName` sau `title` se schimbă

    return (
        <div>
            <div className="nft">
                <div className='main'>
                    {/* Afisează imaginea sau un placeholder dacă încă se încarcă */}
                    {ImageComponent || <p>Loading image...</p>}
                    <h2>{title}</h2> {/* Titlul cardului primit ca prop */}
                    <p className='description'>{description}</p> {/* Descrierea cardului primită ca prop */}
                </div>
            </div>
        </div>
    );
};

export default NftCard;
