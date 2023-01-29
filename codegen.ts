import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    generates: {
        './gql/swapi/': {
            documents: ['app/**/*.tsx', 'components/**/*.tsx', 'pages/**/*.tsx', '!/gql/**/*'],
            schema: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
            preset: 'client',
            plugins: [],
        }
    }
};

export default config;
