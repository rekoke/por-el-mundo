import { getPostsByCategory } from '@/services/wordpress';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type ContinentPageProps = {
  params: Promise<{ continent: string; locale: string }>;
};

const CONTINENTS = ['africa', 'asia', 'europa', 'america', 'oceania'];

export async function generateStaticParams() {
  return CONTINENTS.map(continent => ({
    continent,
  }));
}

export async function generateMetadata(props: ContinentPageProps) {
  const { continent, locale } = await props.params;

  if (!CONTINENTS.includes(continent)) {
    return notFound();
  }

  const t = await getTranslations({ locale, namespace: 'Continents' });

  return {
    title: t(`${continent}.meta_title` as any),
    description: t(`${continent}.meta_description` as any),
  };
}

export default async function ContinentPage(props: ContinentPageProps) {
  const { continent, locale } = await props.params;
  setRequestLocale(locale);

  if (!CONTINENTS.includes(continent)) {
    return notFound();
  }

  // Fetch posts from WordPress
  const response = await getPostsByCategory(continent);
  const posts = response.posts; // Extract posts array from the response

  return (
    <div>
      <h1 className="text-3xl font-bold capitalize mb-8">{continent}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => {
          // Since we're using the updated API types, we don't need to fetch the featured image separately
          const featuredImageUrl = post.featured_image || post.post_thumbnail?.URL;

          return (
            <article key={post.ID} className="border rounded-lg overflow-hidden shadow-sm">
              {featuredImageUrl && (
                <div className="relative h-48 w-full">
                  <Image
                    src={featuredImageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h2
                  className="text-xl font-semibold mb-2"
                  dangerouslySetInnerHTML={{ __html: post.title }}
                />
                <div
                  className="text-gray-600 mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />
                <a
                  href={`/${continent}/${post.slug}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Read more →
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {posts.length === 0 && (
        <p className="text-gray-500">
          Todavía no hay artículos
        </p>
      )}
    </div>
  );
}
