import AnagramFinder from './AnagramFinder'

it('should find matching anagramic words',() => {
  const givenList = ['inlets','listen','pinkish', 'boaters', 'borates'];
  const finder = new AnagramFinder(givenList);
  expect(finder.getAnagrams('kinship')).toEqual('pinkish');
  expect(finder.getAnagrams('enlist')).toEqual('inlets listen');
  expect(finder.getAnagrams('boaster')).toEqual('boaters borates');
  expect(finder.getAnagrams('nothing')).toEqual('');
});

it("should return true if the words are anagram", () => {
  const givenWord = 'pinkish';
  const anagramWord = 'kinship';

  const finder = new AnagramFinder();
  expect(finder.isAnagram('pinkish', 'kinship')).toBe(true);
  expect(finder.isAnagram('pinkish', 'kinshop')).toBe(false);
});

it("should validate if two hashes are equal", () => {

  const finder = new AnagramFinder();

  const pink = finder.occurranceMap('pink');
  const inkp = finder.occurranceMap('inkp');
  const inks = finder.occurranceMap('inks');

  expect(finder.isEqualMap(pink,inkp)).toBe(true);
  expect(finder.isEqualMap(pink,inks)).toBe(false);

});

it("should validate null hashes effectively", () => {
  const finder = new AnagramFinder();
  expect(finder.isEqualMap(null,null)).toBe(false);
});
