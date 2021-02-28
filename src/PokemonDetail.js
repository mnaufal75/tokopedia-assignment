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

const PokemonDetail = ({ }) => {
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
            return <li>{move.move.name}</li>;
          })
        }
      </ul>
    </div>
  );
}

export default PokemonDetail;