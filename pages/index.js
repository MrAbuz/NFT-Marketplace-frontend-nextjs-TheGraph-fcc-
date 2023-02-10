import styles from "../styles/Home.module.css"
import { useMoralis } from "react-moralis"
import NFTBox from "../components/NFTBox"
import networkMapping from "../constants/networkMapping.json"
import GET_ACTIVE_ITEMS from "../constants/subgraphQueries"
import { useQuery } from "@apollo/client"

// Pug -> deploying "BasicNft" (tx: 0x7d2a247a8af369492dbdc110b679906d1cab71f129af15a7898c9554f48a790f)...: deployed at 0x4fF33FB4786e8aAEc46044404e072Be9F7355008 with 2174497 gas
// Shiba inu -> deploying "BasicNftTwo" (tx: 0xb05303ead3a960494e1d87b8162a261f96934a5de065a03473a1604d7b53942e)...: deployed at 0x7ABac258d8e72eB1bA99e878E88D34b241e68262 with 2167146 gas

//yarn add @apollo/client
//yarn add graphql

// Hosting:
// In components/NFTBox.js we're using "Import Image from "next/image" which comes with some pre-processing so it's a little hard to use on IPFS.
// So we would need to update the way we do images to host this on IPFS. But we still can do that.
// Other options are Vercel, Netlify or any other traditional centralized hosting service.
// Patrick challenges us to update this code to be able to be hosted on IPFS, to have an end-to-end decentralized NFT Marketplace.
// He's offering an NFT to the first one making a PR to this code with the solution, so It's probably easy to find the way going through the PRs of this repo.

export default function Home() {
    const { isWeb3Enabled, chainId } = useMoralis()
    //chainId comes in the hex format in Moralis. This is how to pass from hex -> int
    const chainString = chainId ? parseInt(chainId).toString() : "5"
    const marketplaceAddress = networkMapping[chainString].NftMarketplace[0] //to always be connected to the marketplace address of the chain we're on

    //this is for The Graph. check pages/graphExample.js for more notes
    //my thought, if this marketplace was multichain we'd probably need to choose different uri's in app.js depending on the chain we are, and have each chain setted up with a different uri.
    const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS)

    //map is like a loop that inserts each "nft" one by one each loop, and in this case each loop returns a Box
    return (
        <div className="container mx-auto">
            <h1 className="py-4 px-4 font-bold text-2xl">Recently Listed</h1>
            <div className="flex flex-wrap">
                {isWeb3Enabled ? (
                    loading || !listedNfts ? (
                        <div>Loading...</div>
                    ) : (
                        listedNfts.activeItems.map((nft) => {
                            console.log(nft)
                            const { price, nftAddress, tokenId, seller } = nft
                            return (
                                <NFTBox
                                    price={price}
                                    nftAddress={nftAddress}
                                    tokenId={tokenId}
                                    marketplaceAddress={marketplaceAddress}
                                    seller={seller}
                                    key={`${nftAddress}${tokenId}`}
                                />
                            )
                        })
                    )
                ) : (
                    <div>Web3 Currently Not Enabled</div>
                )}
            </div>
        </div>
    )
}

//this initial page from create next app was a bit different from patrick one due to a next.js update, but I rearranged it to be the same as patrick
//deleted the google font thing aswell that was giving error
