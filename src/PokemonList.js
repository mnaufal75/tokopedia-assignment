/** @jsxImportSource @emotion/react */

import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react'

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
      "limit": 21,
      "offset": 0
    }
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div name="pokemon" css={css`
      display: grid;
      grid-template-columns: auto auto auto;
    `}>
      {data.pokemons.results.map(pokemon => (
        <Link to={`pokemon/${pokemon.name}`} key={pokemon.id} css={css`
          text-decoration: none;
        `}
        >
          <img src={pokemon.image} css={css`

          `} />
          <span to={`pokemon/${pokemon.name}`} css={css`
            text-transform: capitalize;
            color: black;
            display: block;
          `}>
            {pokemon.name}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default PokemonList;
