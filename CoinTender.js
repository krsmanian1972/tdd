export default class CoinTender {

  anotherEmit(request)
  {
    if(request <= 0)
    {
      return CoinTender.badRequest;
    }

    var result = '';

    for(var i=0;i<CoinTender.denominations.length;i++)
    {
      if(request >= CoinTender.denominations[i])
      {
        var toTender = parseInt(request/CoinTender.denominations[i]);

        result = result+this.replicate(toTender,CoinTender.denomLabels[i]);

        request = request%CoinTender.denominations[i];
      }
    }

    return result;
  }

  emit(request) {
    if(request <= 0)
    {
      return CoinTender.badRequest;
    }

    var result = ''
    for(var i=0;i<CoinTender.denominations.length;i++)
    {
      while(request >= CoinTender.denominations[i])
      {
          result = result+CoinTender.denomLabels[i];
          request = request-CoinTender.denominations[i];
      }
    }
    return result;
  }

  replicate(times,label)
  {
      var value = '';
      for(var i=0;i<times;i++)
      {
          value = value+label;
      }
      return value;
  }

}

CoinTender.badRequest = 'Sorry';
CoinTender.denominations = [10,5,1];
CoinTender.denomLabels = ['D','N','P']
