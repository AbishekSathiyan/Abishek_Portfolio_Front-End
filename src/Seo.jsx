import { Helmet } from 'react-helmet-async'

export default function Seo({
  title = "Abishek S | Frontend Developer",
  description = "Portfolio of Abishek S, a frontend developer specializing in React and modern web technologies.",
  name = "Abishek S",
  type = "website",
  image = "/images/social-preview.jpg",
  url = "https://abishek-portfolio-front-end.vercel.app/"
}) {
  return (
    <Helmet>
      {/* Standard metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      
      {/* Facebook/OpenGraph metadata */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={description} />
      
      {/* Twitter metadata */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@yourtwitter" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={description} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Favicons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Helmet>
  )
}