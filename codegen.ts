import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    generates: {
        './gql/swapi/': {
            documents: ['app/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}', 'pages/**/*.{ts,tsx}', '!/gql/**/*'],
            schema: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
            preset: 'client',
            plugins: [],
            presetConfig: {
                fragmentMasking: {
                    // rename from useFragment
                    unmaskFunctionName: 'getFragmentData'
                }
            }
        }
    }
};

export default config;
