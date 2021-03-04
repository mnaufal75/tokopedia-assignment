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
              <div css={css`display: flex; width: 100%`}>
                <div css={css`
                  text-align: left;
                  display: inline-block;
                  font-size: 1.5rem;
                  flex: 1;
                  overflow: hidden;
                  text-overflow: ellipsis;
                `}>{pokemon}</div>
                <div css={css`
                  flex: 0;
                `}>
                  <button css={css`
                    width: 150px;
                    font-size: 1.5rem;
                    float: right;
                    border: 0;
                  `} onClick={() => removePokemon(pokemon)}>Remove</button>
                </div>
              </div>
            </li>
          ))
        }
      </ol>
    </div >
  );
}

export default MyPokemonList;
