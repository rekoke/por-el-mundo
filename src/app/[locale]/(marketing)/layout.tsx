import { NavDropdown } from '@/components/NavDropdown';
import { getPostsByCategory } from '@/services/wordpress';
import { BaseTemplate } from '@/templates/BaseTemplate';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

export default async function Layout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({
    locale,
    namespace: 'RootLayout',
  });

  const [africaPosts, europaPosts, asiaPosts, americaPosts, oceaniaPosts] = await Promise.all([
    getPostsByCategory('africa'),
    getPostsByCategory('europa'),
    getPostsByCategory('asia'),
    getPostsByCategory('america'),
    getPostsByCategory('oceania'),
  ]);

  return (
    <>
      <BaseTemplate
        leftNav={(
          <>
            <li>
              <Link
                href="/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                {t('home_link')}
              </Link>
            </li>
            <li>
              <Link
                href="/about/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                {t('about_link')}
              </Link>
            </li>
            <li>
              <NavDropdown
                label={t('africa_link')}
                href="/africa"
                items={africaPosts}
              />
            </li>
            <li>
              <NavDropdown
                label={t('europe_link')}
                href="/europa"
                items={europaPosts}
              />
            </li>
            <li>
              <NavDropdown
                label={t('asia_link')}
                href="/asia"
                items={asiaPosts}
              />
            </li>
            <li>
              <NavDropdown
                label={t('america_link')}
                href="/america"
                items={americaPosts}
              />
            </li>
            <li>
              <NavDropdown
                label={t('oceania_link')}
                href="/oceania"
                items={oceaniaPosts}
              />
            </li>
          </>
        )}
      >
        <div className="py-5 text-xl [&_p]:my-6">{props.children}</div>
      </BaseTemplate>
    </>
  );
}
