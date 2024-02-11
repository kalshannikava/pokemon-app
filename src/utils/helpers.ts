/**
 * 
 * @param array Array to split
 * @param itemsPerChunk Number of array items per chunk
 * @returns Chunked array
 */
export const chunkArray = (array: Array<any>, itemsPerChunk: number = 20): Array<any>[] => {
  return array.reduce((resultArray, item, index) => { 
    const chunkIndex = Math.floor(index / itemsPerChunk)

    if(!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }

    resultArray[chunkIndex].push(item)

    return resultArray;
  }, [])
}
