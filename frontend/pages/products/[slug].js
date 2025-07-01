import { useRouter } from 'next/router'

export default function Product({ product }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <div dangerouslySetInnerHTML={{ __html: product.html }} />
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white" onClick={() => fetch('/api/generate?id=' + product.id)}>
        AI Generate
      </button>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch(process.env.NEXT_PUBLIC_CMS_URL + '/api/products');
  const data = await res.json();
  const paths = data.data.map(p => ({ params: { slug: p.attributes.slug } }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const res = await fetch(process.env.NEXT_PUBLIC_CMS_URL + `/api/products?filters[slug][$eq]=${params.slug}&populate=*`);
  const data = await res.json();
  const item = data.data[0];
  return {
    props: {
      product: {
        id: item.id,
        ...item.attributes,
        html: item.attributes.htmlBuilder?.html || ''
      }
    },
    revalidate: 60
  };
}
