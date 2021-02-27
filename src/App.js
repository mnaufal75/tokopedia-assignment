import { ApolloProvider } from '@apollo/client';
import './App.css';
import PokemonList from './PokemonList';

import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <PokemonList />
      </div>
    </ApolloProvider>
  );
}

export default App;
