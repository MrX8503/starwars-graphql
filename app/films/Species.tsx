import { graphql } from '../../gql/swapi/gql';
import { FragmentType, useFragment } from '../../gql/swapi/fragment-masking';

export const SpeciesFragment = graphql(/* GraphQL */ `
    fragment SpeciesItem on Species {
        name
    }
`);

const Species = (props: {
    species: FragmentType<typeof SpeciesFragment>;
}) => {
    const species = useFragment(SpeciesFragment, props.species);

    return (
        <>
            <h4>{species.name}</h4>
        </>
    );
};

export default Species;
