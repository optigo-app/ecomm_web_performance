import React from 'react'
import { Helmet } from 'react-helmet-async'

const MetaData = () => {
  return (
    <Helmet>
    {/* Basic Meta Tags */}
    <title>{title}</title>
    <meta name="description" content={description} />
    {keywords && <meta name="keywords\" content={keywords} />}
    
    {/* Open Graph Meta Tags */}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    
    {/* Twitter Card Meta Tags */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    
    {/* Canonical URL */}
    <link rel="canonical" href={currentUrl} />
    
    {/* Schema Markup */}
    {/* {schema && <SchemaMarkup schema={schema} />} */}

  </Helmet>
  )
}

export default MetaData
