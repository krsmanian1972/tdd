export default class AnagramFinder {

  constructor(list)
  {
    this.libWords = list;
  }

  getAnagrams(givenWord) {

    const matchingWords = this.libWords.reduce((matches,word)=> {
        if(this.isAnagram(givenWord,word))
        {
            matches.push(word);
        }
        return matches;
    },[]);

    return matchingWords.join(' ');
  }

  isAnagram(givenWord,libWord) {

    const charCountMap = this.occurranceMap(givenWord);
    const libCharCountMap = this.occurranceMap(libWord);

    return this.isEqualMap(charCountMap,libCharCountMap);
  }

  occurranceMap(aWord)
  {
    const charCount = {};

    Array.from(aWord).forEach((value) => {
      charCount[value] = charCount[value] ? charCount[value]+1 : 1;
    });

    return charCount;
  }

  isEqualMap(firstMap,secondMap) {
    if(firstMap === null || secondMap === null || firstMap.length != secondMap.length)
    {
      return false;
    }

    for(var key in secondMap)
    {
      if(firstMap[key] === undefined)
      {
        return false;
      }

      firstMap[key] = firstMap[key] - secondMap[key];
    }

    return this.isAllZero(firstMap);
  }

  isAllZero(aMap)
  {
    for(var key in aMap)
    {
      if(aMap[key] != 0)
      {
        return false;
      }
    }
    return true;
  }
}
