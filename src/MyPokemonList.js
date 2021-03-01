const MyPokemonList = ({ myPokemon, handleRemovePokemon }) => {
  const removePokemon = (e) => {
    handleRemovePokemon(e);
  }

  return (
    <div>
      <h1>My Pokemon</h1>
      {
        myPokemon.map((pokemon) => (
          <>
            <h3>{pokemon}</h3>
            <button onClick={() => removePokemon(pokemon)}>-</button>
          </>
        ))
      }
    </div>
  );
}

export default MyPokemonList;
