import { graphql } from '../../gql/swapi/gql';
import { FragmentType, getFragmentData } from '../../gql/swapi/fragment-masking';

export const StarshipFragDoc = graphql(`
    fragment StarshipItem on Starship {
        name
        model
        starshipClass
        hyperdriveRating
    }
`);

export default function Starship(props: {
    // ensures the fragment is passed rather than the data shape
    data: FragmentType<typeof StarshipFragDoc>;
}) {
    const starship = getFragmentData(StarshipFragDoc, props.data);

    return (
        <pre>{JSON.stringify(starship, null, 4)}</pre>
    );
}
