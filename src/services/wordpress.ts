const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL;

export type WordPressPost = {
  ID: number;
  site_ID: number;
  title: string; // Not an object with 'rendered' property
  content: string; // Not an object with 'rendered' property
  excerpt: string; // Not an object with 'rendered' property
  slug: string;
  date: string;
  author: {
    ID: number;
    login: string;
    email: boolean;
    name: string;
    URL: string;
    avatar_URL: string;
    profile_URL: string;
    site_ID: number;
  };
  categories: {
    [key: string]: {
      ID: number;
      name: string;
      slug: string;
      description: string;
      post_count: number;
      parent: number;
    };
  };
  featured_image: string;
  post_thumbnail: {
    ID: number;
    URL: string;
    guid: string;
    mime_type: string;
    width: number;
    height: number;
  } | null;
  URL: string;
  short_URL: string;
  // Add other fields as needed
};

export type WordPressCategory = {
  ID: number;
  name: string;
  slug: string;
  description: string;
  post_count: number;
  parent: number;
};

export type WordPressPostsResponse = {
  found: number;
  posts: WordPressPost[];
  meta: {
    links: {
      counts: string;
    };
    wpcom: boolean;
  };
};

export async function getPostsByCategory(categorySlug: string): Promise<WordPressPostsResponse> {
  try {
    // Get posts for the category directly using the category slug
    const postsResponse = await fetch(
      `${WORDPRESS_API_URL}/posts?category=${categorySlug}&number=10`,
    );

    if (!postsResponse.ok) {
      throw new Error(`Failed to fetch posts: ${postsResponse.statusText}`);
    }

    const response: WordPressPostsResponse = await postsResponse.json();
    return response;
  } catch (error) {
    console.error(`Error fetching posts for category ${categorySlug}:`, error);
    return {
      found: 0,
      posts: [],
      meta: {
        links: {
          counts: '',
        },
        wpcom: true,
      },
    };
  }
}

export async function getFeaturedImage(post: WordPressPost): Promise<string | null> {
  // WordPress.com API returns featured_image or post_thumbnail
  if (post.featured_image) {
    return post.featured_image;
  }

  if (post.post_thumbnail?.URL) {
    return post.post_thumbnail.URL;
  }

  return null;
}
