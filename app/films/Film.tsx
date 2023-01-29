import { graphql } from '../../gql/swapi/gql';
import { FragmentType, useFragment } from '../../gql/swapi/fragment-masking';

import Species from './Species';

export const FilmFragment = graphql(/* GraphQL */ `
    fragment FilmItem on Film {
        id
        title
        releaseDate
        producers
        speciesConnection {
            edges {
                node {
                    id
                    ...SpeciesItem
                }
            }
        }
    }
`);

const Film = (props: {
    film: FragmentType<typeof FilmFragment>;
}) => {
    const film = useFragment(FilmFragment, props.film);

    return (
        <>
            <h3>{film.title}</h3>
            <p>{film.releaseDate}</p>
            {
                film.speciesConnection?.edges?.map(val => (
                    val?.node
                    && (
                        <li key={val?.node?.id}>
                            <Species species={val?.node} />
                        </li>
                    )
                ))
            }
        </>
    );
};

export default Film;
