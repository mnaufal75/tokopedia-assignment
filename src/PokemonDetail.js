/** @jsxImportSource @emotion/react */

import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from "react-router";
import { css, keyframes } from '@emotion/react'

const GET_POKEMON_DETAIL = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      sprites {
        front_default
      }
      moves {
        move {
          name
        }
      }
      types {
        type {
          name
        }
      }
    }
  }
`

const pokemonType = {
  'bug': '#729f3f',
  'dark': '#707070',
  'dragon': '#53a4cf',
  'electric': '#eed535',
  'fairy': '#fdb9e9',
  'fighting': '#d56723',
  'fire': '#fd7d24',
  'flying': '#3dc7ef',
  'ghost': '#7b62a3',
  'grass': '#9bcc50',
  'ground': '#f7de3f',
  'ice': '#51c4e7',
  'normal': '#a4acaf',
  'poison': '#b97fc9',
  'psychic': '#f366b9',
  'rock': '#a38c21',
  'steel': '#9eb7b8',
  'water': '#4592c4',
}

const PokemonDetail = ({ myPokemon, handleSetMyPokemon }) => {
  const [nickname, setNickname] = useState("");
  const [showModal, setShowmodal] = useState(false);

  const handleCatch = () => {
    const rand = Math.random();
    if (rand > 0.5) {
      alert("Catched");
      setShowmodal(true);
    } else {
      alert("failed");
    }
  };

  const handleInputText = (e) => {
    setNickname(e.target.value);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    console.log(myPokemon.filter(pokemon => pokemon === nickname).length);
    if (myPokemon.filter(pokemon => pokemon === nickname).length > 0) {
      setNickname("");
      alert("Nickname already used.");
    } else {
      handleSetMyPokemon(nickname);
      setNickname("");
      setShowmodal(false);
    }
  };

  const handleClose = () => {
    setShowmodal(false);
  };

  const animation = keyframes`
    from {top:-300px; opacity:0}
    to {top:0px; opacity:1}
  `

  let { name } = useParams();

  const { loading, error, data } = useQuery(GET_POKEMON_DETAIL, {
    variables: {
      "name": name,
    }
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <div css={css`padding: 1rem;`}>
        <span css={css`
        display: block;
        text-transform: capitalize;
        font-size: 2rem;
      `}>
          {data.pokemon.name} #{(data.pokemon.id).toString().padStart(3, 0)}
        </span>
        <img src={data.pokemon.sprites.front_default} />
      </div>

      <button css={css`
        font-size: 1.5rem;
        border: 0;
      `} onClick={handleCatch}>Catch this Pokemon</button>

      <div id="catchModal" className="modal" style={showModal ? { display: "block" } : { display: "none" }} css={css`
        position: fixed;
        z-index: 1;
        padding-top: 100px;
        left: 0;
        top: 0;
        animation: ${animation} 0.4s;
        width: 100%;
        height: 100%;
        background-color: rgb(0,0,0,0.4);
      `}>
        <div className="modal-content" css={css`
          position: relative;
          width: 80%;
          background-color: #fefefe;
          margin: 0 10%;
          padding: 25px;
        `}>
          <div>
            <span className="close" css={css`
              color: black;
              font-size: 1.5rem;
              font-weight: bold;
              position: absolute;
              top: 0.5rem;
              right: 1rem;
              cursor: pointer;
            `} onClick={handleClose}>
              &times;
            </span>
          </div>

          <form css={css`font-size: 1.2rem`}>
            <span>Input your nickname for this Pokemon</span>
            <input type="text" name="nickname" value={nickname} onChange={handleInputText} css={css`
              width: 100%;
              font-size: 1.2rem;
              margin: 1rem 0;
            `} />
            <input type="submit" onClick={handleInputSubmit} css={css`
              width: 100%;
              font-size: 1.2rem;
            `} />
          </form>
        </div>
      </div>

      <div css={css`padding: 1rem;`}>
        <span css={css`
          text-align: left;
          font-size: 1.5rem;
        `}>
          Types:
        </span>
        <div css={css`
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        `}>
          {data.pokemon.types
            .map(type => {
              return <span key={type.type.name} css={css`
                font-size: 1.2rem;
                margin: 1rem;
                padding: 0.5rem;
                border-radius: 0.25rem;
                text-transform: capitalize;
                color: white;
                background-color: ${pokemonType[type.type.name]};
              `}>{type.type.name}</span>;
            })
          }
        </div>
      </div>

      <div css={css`padding: 1rem; `}>
        <span css={css`
              text - align: left;
          font-size: 1.5rem;
        `}>
          Moves:
        </span>
        <div css={css`
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        `}>
          {data.pokemon.moves
            .filter((_, i) => {
              return i <= 10;
            })
            .map(move => {
              return <span key={move.move.name} css={css`
                font-size: 1.2rem;
                padding: 1rem;
                text-transform: capitalize;
              `}>{move.move.name}</span>;
            })
          }
        </div>
      </div>
    </div >
  );
}

export default PokemonDetail;
