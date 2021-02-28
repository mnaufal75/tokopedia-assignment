import { ApolloProvider } from '@apollo/client';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import PokemonList from './PokemonList';
import PokemonDetail from './PokemonDetail';

import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Switch>
          <Route exact path="/pokemons" component={PokemonList} />
          <Route path="/pokemon/:name" component={PokemonDetail} />
        </Switch>
      </div>
    </ApolloProvider>
  );
}

export default App;
