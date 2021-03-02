/** @jsxImportSource @emotion/react */

import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { Link, Route, Switch } from 'react-router-dom';
import { css } from '@emotion/react'
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

  const handleRemovePokemon = (nickname) => {
    setMyPokemon([...myPokemon.filter(pokemon => pokemon !== nickname)]);
  }

  return (
    <ApolloProvider client={client}>
      <div className="App" css={css`
        background-color: white;
        height: 100vh;
        max-width: 500px;
        text-align: center;
        margin: 0 auto;
      `}>
        <nav css={css`
          height: 2rem;
          margin: 0 auto;
          background-color: #F1F1F1;
          position: relative;
          font-size: 1.5rem;
          text-transform: uppercase;
        `}>
          <Link to="/" css={css`
              display: inline-block;
              float: left;
              text-decoration: none;
            `}>
            POKEMON
          </Link>
          <Link to="/mypokemon" css={css`
              display: inline-block;
              float: right;
              text-decoration: none;
            `}>
            MY POKEMON
          </Link>
        </nav>

        <Switch>
          <Route exact path="/" render={() => (
            <PokemonList myPokemon={myPokemon} />
          )} />
          <Route path="/pokemon/:name" render={() => (
            <PokemonDetail myPokemon={myPokemon} handleSetMyPokemon={handleSetMyPokemon} />
          )} />
          <Route path="/mypokemon" render={() => (
            <MyPokemonList myPokemon={myPokemon} handleRemovePokemon={handleRemovePokemon} />
          )} />
        </Switch>
      </div>
    </ApolloProvider>
  );
}

export default App;
