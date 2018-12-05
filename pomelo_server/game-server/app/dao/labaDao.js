const labaDao = module.exports;
const dataApi = require('../util/dataApi')

labaDao.once = function () {
    let arrEle = dataApi.ceil;
    let sumProbability = 0.0;
    let i;
    for(i = 0; i < arrEle.length; i++)
    {
        sumProbability += arrEle[i].probability;
    }

    let randomIndex = Math.random() * sumProbability;

    for(i = 0; i < arrEle.length; i++)
    {
        if(randomIndex <= arrEle[i].probability)
        {
            return arrEle[i];
        }
    }

    return null;
}