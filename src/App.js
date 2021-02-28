import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { Link, Route, Switch } from 'react-router-dom';
import './App.css';
import PokemonList from './PokemonList';
import PokemonDetail from './PokemonDetail';
import MyPokemonList from './MyPokemonList';

import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const [myPokemon, setMyPokemon] = useState([]);

  const handleSetMyPokemon = (nickname) => {
    setMyPokemon([...myPokemon, nickname]);
  }

  return (
    <ApolloProvider client={client}>
      <div className="App">
        {myPokemon.map(e => (
          <h1>{e}</h1>
        ))}
        <Link to="/pokemons">poke</Link>
        <Switch>
          <Route exact path="/pokemons" component={PokemonList} />
          <Route path="/pokemon/:name" render={() => (
            <PokemonDetail handleSetMyPokemon={handleSetMyPokemon} />
          )} />
          <Route path="/mypokemon" render={() => (
            <MyPokemonList myPokemon={myPokemon} />
          )} />
        </Switch>
      </div>
    </ApolloProvider>
  );
}

export default App;
