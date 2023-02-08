//Minimalistic page to show how to do a graph query

import { useQuery, gql } from "@apollo/client" //yarn add @apollo/client

// This uses the graphql (gql) syntax to create a new graphql query
// We built this in the playground (in the subgraph studio) first to try it out then copied here
// We made sure it provided the result we wanted, and only then we copied
// Here we did "where:{ buyer: "0x0000000" }" because our tactic is to have the listed nfts being the ones that the activeItem has buyer = 0x00000, and when they are canceled, it
// updates the activeItem of that ID with buyer = 0x000dEad, and when they are bought, it updates the activeItem with buyer = address of the buyer. So we want to query only the ones
// with 0x00000 address to show as listed NFTs.
// For future uses I might need to look for other types of conditions, here we using "first" and "where", must look in some place that explains some graphql I think
// And also other strategy probably to get exactly the things I want to query like this one changing the buyers address
const GET_ACTIVE_ITEMS = gql`
    {
        activeItems(first: 5, where: { buyer: "0x0000000000000000000000000000000000000000" }) {
            id
            buyer
            seller
            nftAddress
            tokenId
            price
        }
    }
`

export default function GraphExample() {
    // Now we'll use our "GET_ACTIVE_ITEMS" query with the "useQuery" hook
    const { loading, error, data } = useQuery(GET_ACTIVE_ITEMS)
    console.log(data)
    return <div>hi</div>
}
