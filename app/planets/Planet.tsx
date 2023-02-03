import { graphql } from '../../gql/swapi/gql';
import { FragmentType, getFragmentData } from '../../gql/swapi/fragment-masking';

export const PlanetFragDoc = graphql(`
    fragment PlanetItem on Planet {
        name
        diameter
        rotationPeriod
        orbitalPeriod
        gravity
        population
    }
`);

export default function Planet(props: {
    // ensures the fragment is passed rather than the data shape
    data: FragmentType<typeof PlanetFragDoc>;
}) {
    const planet = getFragmentData(PlanetFragDoc, props.data);

    return (
        <pre>{JSON.stringify(planet, null, 4)}</pre>
    );
}
