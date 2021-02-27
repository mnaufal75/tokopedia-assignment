import { gql, useQuery } from '@apollo/client';

const GET_POKEMONS_LIST = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      nextOffset
      prevOffset
      status
      message
      results {
        id
        url
        name
        image
      }
    }
  }
`;

const PokemonList = ({ }) => {
  const { loading, error, data } = useQuery(GET_POKEMONS_LIST, {
    variables: {
      "limit": 20,
      "offset": 0
    }
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  console.log(data);

  return (
    <ol name="pokemon">
      {data.pokemons.results.map(pokemon => (
        <li key={pokemon.id}>
          {pokemon.name}
        </li>
      ))}
    </ol>
  );
}

export default PokemonList;
