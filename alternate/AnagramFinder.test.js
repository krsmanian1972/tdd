import AnagramFinder from './AnagramFinder';

it("should list matching words from dictionary if they are anagrams",()=> {

  const finder = new AnagramFinder();
  const knownWords = ['enlist','pinkish','kinship','listen','tinsel']
  finder.setLibrary(knownWords);

  expect(finder.getLibrary()).toEqual(knownWords);


  expect(finder.getAnagrams('kinship')).toEqual(['pinkish']);
});

it('should validate if two words are anagramic', ()=> {
  const finder = new AnagramFinder();
  expect(finder.isAnagram('enlist','listen')).toBe(true);
  expect(finder.isAnagram('enlost','listen')).toBe(false);
  expect(finder.isAnagram('enlst','listen')).toBe(false);

});


  /**
  const mockFn = jest.spyOn(finder,'isAnagram');
  mockFn.mockImplementation((word1,word2) => {
    return (word1=='pinkish' && word2=='kinship')
  });
**/
