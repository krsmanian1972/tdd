export default class PrimeFactors {

  getFactors(aNumber) {
    const factors = [];
    for(var divisor = 2; aNumber > 1; divisor++)
    {
      for(;aNumber%divisor == 0;aNumber = aNumber/divisor)
      {
        factors.push(divisor);
      }
    }
    return factors;
  }
}
