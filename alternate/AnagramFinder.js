export default class AnagramFinder{

    setLibrary(libWords)
    {
      this.libWords = libWords;
    }

    getLibrary()
    {
      return this.libWords;
    }

    getAnagrams(givenWord)
    {
      const result=[];
      this.libWords.forEach((item) => {
        if(item !== givenWord && this.isAnagram(item,givenWord))
        {
            result.push(item);
        }
      });
      return result;
    }

    isAnagram(word1,word2)
    {
      if(word1.length != word2.length)
      {
        return false;
      }
      const arr1 = word1.split('').sort();
      const arr2 = word2.split('').sort();
      return this.isEqual(arr1,arr2);
    }

    isEqual(arr1,arr2)
    {
      if(arr1.length != arr2.length)
      {
        return false;
      }
      for(var i=0;i<arr1.length;i++)
      {
        if(arr2[i] != arr1[i])
        {
          return false;
        }
      }
      return true;
    }
}
