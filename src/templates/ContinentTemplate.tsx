import Link from 'next/link';

type Region = {
  key: string;
  title: string;
  description: string;
  href: string;
};

type ContinentTemplateProps = {
  title: string;
  description: string;
  regions: Region[];
  locale: string;
};

export async function ContinentTemplate({
  title,
  description,
  regions,
}: ContinentTemplateProps) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="mb-6 text-lg">{description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regions.map(region => (
          <Link
            key={region.key}
            href={region.href}
            className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{region.title}</h2>
            <p className="text-gray-600">{region.description}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
