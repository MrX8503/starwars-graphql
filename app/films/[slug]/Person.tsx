import request from 'graphql-request';

import { graphql } from '../../../gql/swapi/gql';

const personQueryDoc = graphql(`
    query person($id: ID!) {
        person(id: $id) {
            name
            eyeColor
            gender
        }
    }
`);

async function getData(id: string) {
    // console.log('Get person======');

    try {
        const res = await request(
            'https://swapi-graphql.netlify.app/.netlify/functions/index',
            personQueryDoc,
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

export default async function Person({ id }: { id: string }) {
    const data = await getData(id);

    if ('error' in data) {
        return (
            <div>
                <h5>Not Found</h5>
                <p>
                    {id}
                </p>
            </div>
        );
    }

    return (
        <>
            <h4>{data.person?.name}</h4>
            <p>
                {`Gender: ${data.person?.gender}`}
            </p>
            <p>
                {`Eye Color: ${data.person?.eyeColor}`}
            </p>
        </>
    );
}
