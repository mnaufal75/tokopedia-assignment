const MyPokemonList = ({ myPokemon }) => {
  return (
    <div>
      <h1>My Pokemon</h1>
      {
        myPokemon.map((pokemon) => (
          <h3>{pokemon}</h3>
        ))
      }
    </div>
  );
}

export default MyPokemonList;
