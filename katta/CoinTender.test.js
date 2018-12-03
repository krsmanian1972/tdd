import CoinTender from './CoinTender';

it('should tender coins',() => {
  const coinTender = new CoinTender();

  expect(coinTender.emit(0)).toEqual('Sorry');

  expect(coinTender.emit(1)).toEqual('P');
  expect(coinTender.emit(2)).toEqual('PP');

  expect(coinTender.emit(5)).toEqual('N');
  expect(coinTender.emit(6)).toEqual('NP');
  expect(coinTender.emit(7)).toEqual('NPP');

  expect(coinTender.emit(10)).toEqual('D');
  expect(coinTender.emit(89)).toEqual('DDDDDDDDNPPPP');

  console.log(coinTender.emit(89));
});
