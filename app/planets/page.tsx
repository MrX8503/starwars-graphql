import request from 'graphql-request';

import { graphql } from '../../gql/swapi/gql';

import Planet from './Planet';

const allPlanetsQueryDoc = graphql(`
    query allPlanets($first: Int!) {
        allPlanets(first: $first) {
            edges {
                node {
                    id
                    ...PlanetItem
                }
            }
        }
    }
`);

async function getData() {
    const res = await request(
        'https://swapi-graphql.netlify.app/.netlify/functions/index',
        allPlanetsQueryDoc,
        {
            first: 10
        }
    )

    return res;
}

export default async function PlanetsPage() {
    const planets = await getData();

    return (
        <div className="prose">
            <h2>Planets</h2>
            <ul className="list-none">
                {
                    planets?.allPlanets?.edges?.map(val => (
                        val?.node
                        && (
                            <li key={val.node.id}>
                                <Planet data={val.node} />
                            </li>
                        )
                    ))
                }
            </ul>
        </div>
    );
}

export const revalidate = 3600; // in seconds
