import Link from 'next/link';
import { graphql } from '../../gql/swapi/gql';
import { FragmentType, getFragmentData } from '../../gql/swapi/fragment-masking';

export const FilmCardFragDoc = graphql(`
    fragment FilmCardItem on Film {
        id
        title
        releaseDate
        director
    }
`);

export default function FilmCard(props: {
    // ensures the fragment is passed rather than the data shape
    data: FragmentType<typeof FilmCardFragDoc>;
}) {
    // prevents component from accessing parent or child data
    const data = getFragmentData(FilmCardFragDoc, props.data);

    return (
        <Link href={`/films/${data.id}`} className="h-full block px-6 no-underline border rounded-md bg-gray-100 hover:bg-white shadow-sm hover:shadow-lg">
            <h3>{data.title}</h3>
            <p>
                {data.releaseDate}
            </p>
            <p>
                {data.director}
            </p>
        </Link>
    );
}
