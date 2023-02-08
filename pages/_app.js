import "../styles/globals.css"
import { MoralisProvider } from "react-moralis"
import Header from "../components/Header"
import Head from "next/head"
import { NotificationProvider } from "web3uikit"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"

//This is for the The Graph stuff
//uri: comes from the subgraph studio -> details -> development query URL (in the right side). Think this is specific to every different subgraph
//Ps: this is a bit centralized because it starts with https, we're directly calling the graph website. however all the data is still stored in the decentralized graph indexer
//In the future as more protocols/browsers etc adopt ipfs or some solution like ipfs it will be different (I guess there's no solution atm to be 100% decentralized but check)
//We're doing kind of the same we did when we are querying ipfs to get the images for the nfts to show in the marketplace, we had to query from http because some people dont have ipfs
//in their browser and wouldnt see the image, same thing imo
//This client tells our graphql where to make those queries

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://api.studio.thegraph.com/query/41862/nft-marketplace/v0.0.1",
})

function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Head>
                <title>NFT Marketplace</title>
                <meta name="description" content="NFT Marketplace" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MoralisProvider initializeOnMount={false}>
                <ApolloProvider client={client}>
                    <NotificationProvider>
                        <Header />
                        <Component {...pageProps} />
                    </NotificationProvider>
                </ApolloProvider>
            </MoralisProvider>
        </div>
    )
}

export default MyApp
