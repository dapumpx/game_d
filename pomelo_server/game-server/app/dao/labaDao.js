const labaDao = module.exports;
const dataApi = require('../util/dataApi')

labaDao.once = function () {
    let arrEle = [];
    Object.keys(dataApi.ceil.data).forEach(function(key) {
        // console.log(key)
        // console.log(dataApi.ceil[key])
        arrEle.push(dataApi.ceil.data[key]);
      });
    let sumProbability = 0.0;
    let i;
    for(i = 0; i < arrEle.length; i++)
    {
        // console.log(arrEle[i]);
        // console.log("%s %s", arrEle[i].name, arrEle[i].probability)
        sumProbability += arrEle[i].probability;
    }
    // console.log("sumProbability " + sumProbability);
    let randomIndex = Math.random() * sumProbability;
    // console.log("randomIndex " + randomIndex);
    for(i = 0; i < arrEle.length; i++)
    {
        if(randomIndex <= arrEle[i].probability)
        {
            return arrEle[i];
        }
        else
        {
            randomIndex -= arrEle[i].probability;
        }
    }

    return null;
}