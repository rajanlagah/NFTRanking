Demo at https://nft-ranking-weld.vercel.app/

## NFT Ranking
- used Impostors Genesis Aliens NFT collection
- Listing based on rarity of nft
- Each NFT have Rarity score

### Python code
1. It download NFT data of given NFT collection address using moralis APIs. 
2. Store NFT data in pandas dataframe
3. Calculate Rarity score for each feature.
4. Assing score to each feature based on its rarity
5. Store all this in JSON format

### Nextjs code
1. Parse saved JSON data 
2. API endpoint to serve NFTs ( max 20 per api call)
3. Frontend on page load call API and render NFTs
4. on scroll after specific threshold it call backend for more NFTs ( infite scroll )
5. user can hover and see breakdown of rarity score
6. user can click buy button and then will redirected to OpenSea nft page

### Learnings
1. Moralis APIs
2. NFT marketplaces
3. Rarity scores
