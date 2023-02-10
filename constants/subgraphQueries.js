import { gql } from "@apollo/client"

//check graphExample.js in the pages folder for some notes about this
//created this file just for the queries
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
//nice how everything in next.js or react is export default x. here its not module.exports or anything, always export default for components, helpers, pages etc
export default GET_ACTIVE_ITEMS
