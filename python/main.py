import math
from moralis import evm_api
import pandas as pd
from pandas import json_normalize
import json
import time
import warnings
import os
from dotenv import load_dotenv

load_dotenv()

warnings.simplefilter(action='ignore', category=FutureWarning)
pd.options.mode.chained_assignment = None

api_key = os.getenv('MORALIS_API_KEY')
nftContract = "0x3110ef5f612208724ca51f5761a69081809f03b7" ##impostors genesis aliens

cursor =""
df = pd.DataFrame()

firstParams = {
    "address": nftContract,
    "chain": "eth",
    "disable_total": False
}
result = evm_api.nft.get_contract_nfts(
    api_key=api_key,
    params= firstParams
)

totalNfts = result["total"]
noOfReqs = math.ceil(totalNfts/100)

print("fetching NFTs")
for x in range(noOfReqs):
    result = evm_api.nft.get_contract_nfts(
        api_key,
        params={
            "address":nftContract,
            "chain":"eth",
            "cursor": cursor
        }
    )

    cursor = result["cursor"]
    df2 = json_normalize(result["result"])

    if(df.empty):
        df = df2
    else:
        df = pd.concat([df,df2])
    print(x + 1, " / ", noOfReqs)
    time.sleep(0.21)

# df.index = list(range(5300))
df.index = list(range(totalNfts))
numTraitsList = [] # Store number of traits in each nft
traitsDf = pd.DataFrame()

print("Finding unique traits")

for z in range(totalNfts):
    traitsOfSingleNFT = json_normalize(json.loads(df.iloc[z]['metadata'])['attributes'])
    numberOfSingleNFTTraits = len(traitsOfSingleNFT.index)
    numTraitsList.append(numberOfSingleNFTTraits)

    if traitsDf.empty:
        traitsDf = traitsOfSingleNFT
    else:
        traitsDf = pd.concat([traitsDf,traitsOfSingleNFT])

    print(z+1, " / " , totalNfts)

allTraits = traitsDf["trait_type"].unique() # all unique traits in this collection
allTraitsWithCountsDf = pd.DataFrame(columns=['trait_type','counts']) # Create DF with 2 columns
allTraitsWithCountsDf['trait_type'] = allTraits # Set value of trait_type colmn

for traitIndex in range(len(allTraits)):
    DFWithSingleTraitAndItsVariants = traitsDf[traitsDf['trait_type'] == allTraits[traitIndex]]
    traitCounts = DFWithSingleTraitAndItsVariants['value'].value_counts()
    # trait_type  value count
    # Ears
    #             Ogre     1474
    #             Cat      842
    #             Whiskers 791
    nftsWithoutTraits = pd.Series([totalNfts - len(DFWithSingleTraitAndItsVariants.index)], index=['null'])
    traitCounts = pd.concat([traitCounts , nftsWithoutTraits])
    traitCounts = 1 / ( traitCounts / totalNfts) # reverse ratio for no liner values
    allTraitsWithCountsDf.at[traitIndex, "counts"] = traitCounts

# numOfTraitsSeries = pd.Series(numTraitsList).value_counts()
# numOfTraitsSeries = 1 / (numOfTraitsSeries / totalNfts)
# numOfTraitsDf = pd.DataFrame(data={'trait_type': ["Number Of Traits"], 'counts': [numOfTraitsSeries]})
# allTraitsWithCountsDf = pd.concat([allTraitsWithCountsDf, numOfTraitsDf], ignore_index=True)

rarityScoreList = []
rarityMap = []

for z in range(totalNfts):
# for z in range(5300):
    totalTraitsInCrrNFT = len(json_normalize(json.loads(df.iloc[z]['metadata'])['attributes'])['trait_type'])
    rarityScore = 0
    rarityMapEntry = []
    for t in range(totalTraitsInCrrNFT):
        currentTrait = json_normalize(json.loads(df.iloc[z]['metadata'])['attributes'])['trait_type'][t]
        currentVariant = json_normalize(json.loads(df.iloc[z]['metadata'])['attributes'])['value'][t]
        currentScore = allTraitsWithCountsDf[allTraitsWithCountsDf["trait_type"] == currentTrait]['counts'].tolist()[0][currentVariant]
        rarityScore = rarityScore + currentScore
        rarityMapEntry.append({
            "trait" : currentTrait,
            "variant" : currentVariant,
            "score" : currentScore
        })
    rarityScoreList.append(rarityScore)
    rarityMap.append(rarityMapEntry)
    print( z + 1, " / ", totalNfts)

df["total_rarity_score"] = rarityScoreList
df["rarity_map"] = rarityMap

df = df.sort_values(by="total_rarity_score", ascending=False)
df.index = list(range(totalNfts))

df.to_json(r'folder/rarityData.json', orient="index")