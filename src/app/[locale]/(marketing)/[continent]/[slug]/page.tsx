import { getPostsByCategory } from '@/services/wordpress';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type PostPageProps = {
  params: Promise<{ continent: string; slug: string; locale: string }>;
};

export default async function PostPage(props: PostPageProps) {
  const { continent, slug, locale } = await props.params;
  setRequestLocale(locale);

  // Fetch all posts for the continent
  const response = await getPostsByCategory(continent);
  const posts = response.posts; // Extract posts array from the response

  // Find the specific post by slug
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return notFound();
  }

  // Get the featured image URL directly from the post object
  const featuredImageUrl = post.featured_image || post.post_thumbnail?.URL;

  return (
    <article className="max-w-4xl mx-auto">
      {featuredImageUrl && (
        <div className="relative h-96 w-full mb-8">
          <Image
            src={featuredImageUrl}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}

      <h1
        className="text-4xl font-bold mb-4"
        dangerouslySetInnerHTML={{ __html: post.title }}
      />

      <div className="text-gray-500 mb-8">
        Published on
        {' '}
        {new Date(post.date).toLocaleDateString()}
      </div>

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
