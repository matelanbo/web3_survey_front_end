import { DAppProvider, Config, Rinkeby } from '@usedapp/core';
import { Header } from "./Components/Header";
import { Container } from "@material-ui/core"
import { Main } from "./Components/Main"

const config: Config = {
  networks: [Rinkeby],
  readOnlyChainId: Rinkeby.chainId,
  readOnlyUrls: {
    [Rinkeby.chainId]: 'https://rinkeby.infura.io/v3/f4dfc7ac15314fe8a3b4f69309729393',
  },
}

function App() {
  return (
    <div style={{
      backgroundColor: '#faf9f5',
    }}>
      <DAppProvider config={config}>
        <Header></Header>
        <Container maxWidth="md">
          <Main />
        </Container>
      </DAppProvider>

    </div>
  );
}

export default App;
