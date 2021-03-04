/** @jsxImportSource @emotion/react */

import React, { useState, lazy, Suspense } from 'react';
import { ApolloProvider } from '@apollo/client';
import { Link, Route, Switch } from 'react-router-dom';
import { css } from '@emotion/react'
import { ApolloClient, InMemoryCache } from '@apollo/client';

// import PokemonList from './PokemonList';
// import PokemonDetail from './PokemonDetail';
// import MyPokemonList from './MyPokemonList';
const PokemonList = lazy(() => import('./PokemonList'));
const PokemonDetail = lazy(() => import('./PokemonDetail'));
const MyPokemonList = lazy(() => import('./MyPokemonList'));


const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
  cache: new InMemoryCache(),
});

function App() {
  let store = localStorage.getItem('myPokemon');
  store = store ? store.split(',') : [];
  localStorage.setItem('myPokemon', store);

  const [myPokemon, setMyPokemon] = useState(store);

  const handleSetMyPokemon = (nickname) => {
    let store = localStorage.getItem('myPokemon');
    store = store ? store.split(',') : [];
    store.push(nickname);
    localStorage.setItem('myPokemon', store);

    setMyPokemon([...myPokemon, nickname]);
  }

  const handleRemovePokemon = (nickname) => {
    let store = localStorage.getItem('myPokemon');
    store = store ? store.split(',') : [];
    store = store.filter(el => el !== nickname);
    localStorage.setItem('myPokemon', store);

    setMyPokemon([...myPokemon.filter(pokemon => pokemon !== nickname)]);
  }

  return (
    <ApolloProvider client={client}>
      <div className="App" css={css`
        background-color: white;
        height: 100%;
        max-width: 500px;
        text-align: center;
        margin: 0 auto;
        padding-bottom: 1rem;
      `}>
        <nav css={css`
          height: 3rem;
          margin: 0 auto;
          background-color: #888;
          position: relative;
          font-size: 1.5rem;
          text-transform: uppercase;
        `}>
          <Link to="/" css={css`
            display: inline-block;
            position: absolute;
            height: 3rem;
            left: 0;
            top: 50%;
            transform: translate(0, -50%);
            text-decoration: none;
            background-color: #5cb85c;
            color: white;
            padding: 0.5rem;
            &:hover {
              background-color: #4CAF50;
            }
          `}>
            POKEMON
          </Link>
          <Link to="/mypokemon" css={css`
            display: inline-block;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translate(0, -50%);
            text-decoration: none;
            background-color: #5cb85c;
            color: white;
            padding: 0.5rem;
            &:hover {
              background-color: #4CAF50;
            }
          `}>
            MY POKEMON
          </Link>
        </nav>

        <Switch>
          <Route exact path="/" render={() => (
            <Suspense fallback={<h1>Still Loading…</h1>}>
              <PokemonList myPokemon={myPokemon} />
            </Suspense>
          )} />
          <Route path="/pokemon/:name" render={() => (
            <Suspense fallback={<h1>Still Loading…</h1>}>
              <PokemonDetail myPokemon={myPokemon} handleSetMyPokemon={handleSetMyPokemon} />
            </Suspense>
          )} />
          <Route path="/mypokemon" render={() => (
            <Suspense fallback={<h1>Still Loading…</h1>}>
              <MyPokemonList myPokemon={myPokemon} handleRemovePokemon={handleRemovePokemon} />
            </Suspense>
          )} />
        </Switch>
      </div>
    </ApolloProvider>
  );
}

export default App;
