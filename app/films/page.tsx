import request from 'graphql-request';

import { graphql } from '../../gql/swapi/gql';

import Film from './Film';

const allFilmsWithVariablesQueryDocument = graphql(/* GraphQL */ `
    query allFilmsWithVariablesQuery($first: Int!) {
        allFilms(first: $first) {
            edges {
                node {
                    id
                    ...FilmItem
                }
            }
        }
    }
`);

async function getData() {
    const res = await request(
        'https://swapi-graphql.netlify.app/.netlify/functions/index',
        allFilmsWithVariablesQueryDocument,
        {
            first: 10
        }
    )

    return res;
}

export default async function Films() {
    const data = await getData();

    return (
        <div>
            {
                data
                && (
                    <ul>
                        {
                            data.allFilms?.edges?.map(val => (
                                val?.node
                                && (
                                    <li key={val.node.id}>
                                        <Film film={val.node} />
                                    </li>
                                )
                            ))
                        }
                    </ul>
                )
            }
            <pre>{JSON.stringify(data, null, 4)}</pre>
        </div>
    );
}

export const revalidate = 30 * 60; // in seconds
