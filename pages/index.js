import Image from "next/image"
import styles from "../styles/Home.module.css"
import { useMoralisQuery, useMoralis } from "react-moralis"
import NFTBox from "../components/NFTBox"
import networkMapping from "../constants/networkMapping.json"
import GET_ACTIVE_ITEMS from "../constants/subgraphQueries"
import { useQuery } from "@apollo/client"

//deploying "BasicNft" (tx: 0x7d2a247a8af369492dbdc110b679906d1cab71f129af15a7898c9554f48a790f)...: deployed at 0x4fF33FB4786e8aAEc46044404e072Be9F7355008 with 2174497 gas
//deploying "BasicNftTwo" (tx: 0xb05303ead3a960494e1d87b8162a261f96934a5de065a03473a1604d7b53942e)...: deployed at 0x7ABac258d8e72eB1bA99e878E88D34b241e68262 with 2167146 gas

//yarn add @apollo/client
//yarn add graphql

//search in all the files to see if I need to create any .env and which variables to add in there
//and check if I should delete addEvents.js, im assuming it is ofc

export default function Home() {
    const { isWeb3Enabled, chainId } = useMoralis()
    //chainId comes in the hex format in Moralis. This is how to pass from hex -> int
    const chainString = chainId ? parseInt(chainId).toString() : "31337"
    const marketplaceAddress = networkMapping[chainString].NftMarketplace[0]

    //this is for The Graph. check pages/graphExample.js for more notes
    const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS)

    //map is like a loop
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
