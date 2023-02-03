import Link from 'next/link';
import request from 'graphql-request';

import { graphql } from '../../../gql/swapi/gql';

import Person from './Person';

const filmDetailQueryDoc = graphql(`
    query filmDetail($id: ID!) {
        film(id: $id) {
            title
            episodeID
            openingCrawl
            director
            releaseDate
            producers
            characterConnection {
                characters {
                    name
                    id
                }
            }
        }
    }
`);

async function getData(id: string) {
    try {
        const res = await request(
            'https://swapi-graphql.netlify.app/.netlify/functions/index',
            filmDetailQueryDoc,
            {
                id
            }
        );

        return res;
    }
    catch (err) {
        return Promise.resolve({ error: 'failed to fetch' })
    }
}

export default async function FilmDetail({ params }: { params: { slug: string } }) {
    const data = await getData(decodeURIComponent(params.slug));

    if ('error' in data) {
        return (
            <div>
                <h5>Not Found</h5>
                <p>
                    {params.slug}
                </p>
            </div>
        );
    }

    return (
        <div className="prose">
            <h2>{data.film?.title}</h2>
            <p>{data.film?.releaseDate}</p>
            <p>{data.film?.openingCrawl}</p>
            <h3>Director</h3>
            <p>{data.film?.director}</p>
            <h3>Producers</h3>
            <ul>
                {data.film?.producers?.map(val => <li key={val}>{val}</li>)}
            </ul>
            <h3>Characters</h3>
            <ul>
                {data.film?.characterConnection?.characters?.map(val => (
                    <li key={val?.id}>
                        {
                            val?.id
                                // @ts-expect-error Server Component
                                ? <Person id={val.id} />
                                : val?.name
                        }

                    </li>
                ))}
            </ul>
        </div>
    );
}

export const revalidate = 3600; // in seconds

export async function generateStaticParams() {
    return [
        { slug: 'ZmlsbXM6MQ==' },
        { slug: 'ZmlsbXM6Mg==' },
        { slug: 'ZmlsbXM6Mw==' },
        { slug: 'ZmlsbXM6NA==' },
        { slug: 'ZmlsbXM6NQ==' },
        { slug: 'ZmlsbXM6Ng==' }
    ];
}
