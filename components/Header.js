import { ConnectButton } from "web3uikit"
import Link from "next/link" //In next.js we can make links using the next.js link tag. Link allows us to connect to different links or urls in our application (*)

// The <nav></nav> tag usually defines a nav bar. Really similar to a div but used for nav bars (that are the bars that you click to change pages)
// href="/" means going to the homepage.
// this <a> inside <link> was giving bug, so had to fix with adding a thing called legacyBehavior. (**)
// <h1></h1> stands for header 1
// moralisAuth={false} so that we dont try to connect to a Moralis database when we connect, we want to just connect to the Metamask

export default function Header() {
    return (
        <nav className="p-5 border-b-2 flex flex-row justify-between items-center">
            <h1 className="py-4 px-4 font-bold text-3xl">NFT Marketplace</h1>
            <div className="flex flex-row items-center">
                <Link href="/">
                    <a className="mr-4 p-6">Home</a>
                </Link>
                <Link href="/sell-nft">
                    <a className="mr-4 p-6">Sell NFT</a>
                </Link>
                <ConnectButton moralisAuth={false} />
            </div>
        </nav>
    )
}
// (*) https://nextjs.org/docs/api-reference/next/link prob not needed cuz we didnt explore much of this link but if its needed, its here

// (**) https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor
// This ** bugs cuz of nextjs version 13 update, they propose to add legacyBehavior which patrick didnt had to.
// but I was using this legacyBehavior in the Moralis part, and I copied the graph part from patrick without that legacyBehavior and its working for me, i'll keep it
// here if I get to this problem again
