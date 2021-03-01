import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from "react-router";

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
      <h1>{data.pokemon.name}</h1>
      <img src={data.pokemon.sprites.front_default} />
      <h2>Moves: </h2>
      <ul>
        {data.pokemon.moves
          .filter((_, i) => {
            return i <= 10;
          })
          .map(move => {
            return <li key={move.move.name}>{move.move.name}</li>;
          })
        }
      </ul>
      <h2>Types: </h2>
      <ul>
        {data.pokemon.types
          .map(type => {
            return <li key={type.type.name}>{type.type.name}</li>;
          })
        }
      </ul>

      <button onClick={handleCatch}>Catch</button>

      <div id="catchModal" className="modal" style={showModal ? { display: "block" } : { display: "none" }}>
        <div className="modal-content">
          <span className="close">&times;</span>
          <form>
            <label htmlFor="nickname">Nickname: </label>
            <input type="text" name="nickname" value={nickname} onChange={handleInputText}></input>
            <input type="submit" onClick={handleInputSubmit}></input>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
