import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({favicon, title, description, url, image }) => {
    const keywords = "bstore orail"
    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />

                {/* Keywords */}
                <meta name="keywords" content={keywords} />

                {/* Favicon */}
                <link rel="icon" href={favicon} type="image/x-icon" />

                {/* Apple Touch Icon */}
                <link rel="apple-touch-icon" href={image} />

                {/* Android Chrome Icons */}
                <link rel="icon" sizes="192x192" href={image} />
                <link rel="icon" sizes="512x512" href={image} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={image} />
                <meta property="og:image:type" content="image/jpeg/png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                {/* <meta property="og:url" content={url} /> */}
                {/* <meta property="og:site_name" content="Op" /> */}

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={image} />

                {/* WhatsApp */}
                <meta property="og:image" content={image} />
                <meta property="og:image:secure_url" content={image} />

                {/* Additional Meta Tags */}
                <meta name="robots" content="index, follow" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Helmet>
        </>
    );
};

export default SEO;

