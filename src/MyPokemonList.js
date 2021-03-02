/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

const MyPokemonList = ({ myPokemon, handleRemovePokemon }) => {
  const removePokemon = (e) => {
    handleRemovePokemon(e);
  }

  return (
    <div>
      <div css={css`margin-bottom: 2rem`}>
        <span css={css`font-size: 2rem`}>My Pokemon</span>
      </div>

      <ol>
        {
          myPokemon.map((pokemon) => (
            <li css={css`text-align: left; padding: 0.2rem; font-size: 1.5rem`}>
              <span css={css`
                text-align: left;
                display: inline-block;
                font-size: 1.5rem;
              `}>{pokemon}</span>
              <button css={css`
                width: 150px;
                font-size: 1.5rem;
                float: right;
                border: 0;
              `} onClick={() => removePokemon(pokemon)}>Remove</button>
            </li>
          ))
        }
      </ol>
    </div >
  );
}

export default MyPokemonList;
