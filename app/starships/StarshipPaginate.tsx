'use client';

import { useState } from 'react';
import request from 'graphql-request';

import { graphql } from '../../gql/swapi/gql';
import { FragmentType, getFragmentData } from '../../gql/swapi/fragment-masking';

import Starship from './Starship';

const starshipsNextQueryDoc = graphql(`
    query starshipsNext($after: String!, $first: Int!) {
        allStarships(after: $after, first: $first) {
            __typename
            edges {
                cursor
                node {
                    ...StarshipItem
                }
            }
        }
    }
`);

export const StarshipPaginateFragDoc = graphql(`
    fragment StarshipPaginateItem on StarshipsConnection {
        edges {
            cursor
            node {
                ...StarshipItem
            }
        }
    }
`);

export default function StarshipPaginate(props: {
    // ensures the fragment is passed rather than the data shape
    data: FragmentType<typeof StarshipPaginateFragDoc>;
}) {
    const data = getFragmentData(StarshipPaginateFragDoc, props.data);
    const [ships, setShips] = useState(data.edges);

    const handleLoadMore = () => {
        const { cursor } = ships?.[ships.length - 1] || {};

        if (cursor) {
            request(
                'https://swapi-graphql.netlify.app/.netlify/functions/index',
                starshipsNextQueryDoc,
                {
                    after: cursor,
                    first: 2
                }
            )
                .then(data => {
                    if (data.allStarships?.__typename === 'StarshipsConnection') {
                        setShips(prevState => {
                            const { edges } = data?.allStarships || {};

                            if (edges && Array.isArray(prevState)) {
                                return prevState.concat(edges);
                            }

                            return prevState;
                        })
                    }
                })
                .catch(console.error);
        }
    };

    return (
        <>
            <ul className="list-none">
                {ships?.map(val => (
                    val?.node
                    && (
                        <li key={val?.cursor}>
                            <Starship data={val?.node} />
                        </li>
                    )
                ))}
            </ul>
            <button
                type="button" className="rounded-md px-4 py-2 bg-blue-700 hover:bg-blue-500 text-white"
                onClick={handleLoadMore}
            >
                Load More
            </button>
        </>
    );
}
