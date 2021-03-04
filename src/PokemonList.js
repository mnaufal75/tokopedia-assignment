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

const PokemonList = ({ myPokemon }) => {
  const { loading, error, data } = useQuery(GET_POKEMONS_LIST, {
    variables: {
      "limit": 21,
      "offset": 0
    }
  });

  if (loading) return '';
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <span css={css`font-size: 1.2rem`}>You own {myPokemon.length <= 1 ? `${myPokemon.length} pokemon` : `${myPokemon.length} pokemons`}</span>
      <div name="pokemon" css={css`
        display: grid;
        grid-template-columns: auto auto auto;
      `}>
        {data.pokemons.results.map(pokemon => (
          <Link to={`pokemon/${pokemon.name}`} key={pokemon.id} css={css`
          text-decoration: none;
        `}
          >
            <img src={pokemon.image} width="96" height="96" css={css`
              &:hover {
                transform: scale(1.2);
              }
            `} />
            <span to={`pokemon/${pokemon.name}`} css={css`
              text-transform: capitalize;
              color: black;
              display: block;
              font-size: 1.2rem;
            `}>
              {pokemon.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PokemonList;
