import request from 'graphql-request';

import { graphql } from '../../gql/swapi/gql';

import FilmCard from './FilmCard';

const allFilmsQueryDoc = graphql(`
    query allFilms($first: Int!) {
        allFilms(first: $first) {
            edges {
                node {
                    id
                    episodeID
                    ...FilmCardItem
                }
            }
        }
    }
`);

async function getData() {
    const res = await request(
        'https://swapi-graphql.netlify.app/.netlify/functions/index',
        allFilmsQueryDoc,
        {
            first: 10
        }
    )

    return res;
}

export default async function FilmsPage() {
    const films = await getData();

    return (
        <div className="prose max-w-none">
            <h2>Films</h2>
            <ul className="grid gap-8 grid-cols-3 auto-rows-fr list-none pl-0">
                {
                    films?.allFilms?.edges?.map(val => (
                        val?.node
                        && (
                            <li key={val.node.id} className="m-0 p-0">
                                {/* {val.node.episodeID} */}
                                <FilmCard data={val.node} />
                            </li>
                        )
                    ))
                }
            </ul>
        </div>
    );
}

export const revalidate = 3600; // in seconds


// async function sleep(seconds = 1000) {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve('done sleeping');
//         }, seconds);
//     });
// }
