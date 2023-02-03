import request from 'graphql-request';

import { graphql } from '../../gql/swapi/gql';

import StarshipPaginate from './StarshipPaginate';

const allStarshipsQueryDoc = graphql(`
    query allStarships($first: Int!) {
        allStarships(first: $first) {
            __typename
            ...StarshipPaginateItem
        }
    }
`);

async function getStarshipsData(first: number) {
    const res = await request(
        'https://swapi-graphql.netlify.app/.netlify/functions/index',
        allStarshipsQueryDoc,
        {
            first
        }
    )

    return res;
}

export default async function StarshipsPage() {
    const data = await getStarshipsData(2);

    return (
        <div className="prose">
            <h2>Starships</h2>
            {
                data.allStarships?.__typename === 'StarshipsConnection'
                && <StarshipPaginate data={data.allStarships} />
            }
        </div>
    );
}

export const revalidate = 3600; // in seconds
