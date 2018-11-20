import PrimeFactors from './PrimeFactors';

it("should print prime factors",()=> {

  const pf = new PrimeFactors();
  expect(pf.getFactors(1)).toEqual([]);
  expect(pf.getFactors(2)).toEqual([2]);
  expect(pf.getFactors(3)).toEqual([3]);
  expect(pf.getFactors(4)).toEqual([2,2]);
  expect(pf.getFactors(5)).toEqual([5]);
  expect(pf.getFactors(6)).toEqual([2,3]);
  expect(pf.getFactors(7)).toEqual([7]);
  expect(pf.getFactors(8)).toEqual([2,2,2]);
  expect(pf.getFactors(9)).toEqual([3,3]);

  expect(pf.getFactors(2018)).toEqual([2,1009]);

})
