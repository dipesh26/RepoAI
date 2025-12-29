import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description?: string;
}

export const SEO = ({
  title,
  description = "AI-powered repository analysis. Generate docs, detect tech debt, and chat with your code using RepoAI.",
}: SEOProps) => {
  const fullTitle = `RepoAI · ${title}`;

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};
