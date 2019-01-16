const labaDao = module.exports;
const dataApi = require('../util/dataApi');
var pomelo = require('pomelo');

labaDao.once = function () {
    let result = [];
    let isCheck;
    for (let j = 0; j < 15; j++) {
        while (true) {
            let tmpCell = this.getRandomCell();
            let checkIndex = result.length % 3;
            checkIndex += Math.floor(result.length / 3) * 3;
            isCheck = true;
            for (let m = Math.floor(result.length / 3) * 3; m < checkIndex; m++) {
                if (result[m].id == tmpCell.id) {
                    isCheck = false;
                    break;
                }
            }

            if (isCheck) {
                result.push(tmpCell);
                break;
            }
        }
    }

    let totalResult = [];
    let rewardResult = [];
    let coinResult = [];
    while (true) {
        totalResult.push(result);
        result = result.slice();
        let rewardLine = this.checkReward(result);
        let coinCurrResult = {
            round: totalResult.length,
            coin: []
        };
        if (rewardLine.length > 0) {
            rewardResult.push(rewardLine);
            rewardLine.forEach(line => {
                coinCurrResult.coin.push(this.getCoin(line));
                line.forEach(eachCell => {
                    result[eachCell.index] = -1
                })
            });
            coinResult.push(coinCurrResult);
            // console.log(result);
            for (let i = result.length - 1; i >= 0; i--) {
                if (result[i] == -1) {
                    let m = i - 1;
                    while (true) {
                        if ((m + 1) % 3 <= 0) {
                            break;
                        }

                        if (result[m] == -1) {
                            m--;
                        } else {
                            result[i] = result[m];
                            result[m] = -1;
                            break;
                        }
                    }
                    // console.log(result);
                }
            }
            for (let i = 0; i < result.length; i++) {
                if (result[i] == -1) {
                    result[i] = this.getRandomCell();
                }
            }
        } else {
            break;
        }
    }
    let totalGet = 0;
    coinResult.forEach(r => {
        r.coin.forEach(c => {
            totalGet += c * r.round;
        })
    });

    return {
        totalResult: totalResult,
        rewardResult: rewardResult,
        coinResult: coinResult,
        totalGet: totalGet
    };
}

labaDao.updateRank = function (user, addCoin) {
    if (pomelo.app.insRank == undefined) {
        pomelo.app.insRank = {};

        let hTime = new Date();
        let tmpTs = hTime.setHours(hTime.getHours() + 1, 0, 0, 0);
        pomelo.app.insRank.rankTime = tmpTs;
        pomelo.app.insRank.rank = [];
    }

    if (Date.now() > pomelo.app.insRank.rankTime) {
        this.resetGameTime();
    }
    let isExist = false;
    // pomelo.app.insRank.rank.forEach(userRecord => {
    //     if(userRecord.id == user.id)
    //     {
    //         user.coin += addCoin;
    //         isExist = true;
    //         break;
    //     }
    // })
    for(let userRecord of pomelo.app.insRank.rank)
    {
        if(userRecord.id == user.id)
        {
            userRecord.coin += addCoin;
            isExist = true;
            // break;
        }
    }
    if(!isExist)
    {
        pomelo.app.insRank.rank.push({
            id: user.id,
            coin:addCoin
        })
    }
    pomelo.app.insRank.rank.sort((userA, userB)=>{
        if(userA.coin > userB.coin)
        {
            return -1;
        }
        else
        {
            return 0;
        }
    });
    let top5 = [];
    let myRank = -1;
    for(let i = 0; i < pomelo.app.insRank.rank.length; i++)
    {
        if(i < 5)
        {
            top5.push(pomelo.app.insRank.rank[i]);
        }

        if(pomelo.app.insRank.rank[i].id == user.id)
        {
            myRank = i+1;
        }

        if(i > 5 && myRank > 0)
        {
            break;
        }
    }

    return {
        topRank: top5,
        myRank:myRank,
        rankTime:pomelo.app.insRank.rankTime
    }
}

labaDao.resetGameTime = function () {
    pomelo.app.insRank.rankTime += 1000 * 60 * 60;
    pomelo.app.insRank.rank = [];
}

labaDao.getCoin = function (line) {
    let vo = dataApi.ceil.data[line[0].id];
    switch (line.length) {
        case 3:
            return vo.ratio_3;
        case 4:
            return vo.ratio_4;
        case 5:
            return vo.ratio_5;
        default:
            return 0;
    }
}

labaDao.getRandomCell = function () {
    let arrEle = [];
    let sumProbability = 0.0;
    Object.keys(dataApi.ceil.data).forEach(function (key) {
        arrEle.push(dataApi.ceil.data[key]);
        sumProbability += dataApi.ceil.data[key].probability
    });

    let randomIndex = Math.random() * sumProbability;
    for (i = 0; i < arrEle.length; i++) {
        if (randomIndex <= arrEle[i].probability) {
            return arrEle[i];
        } else {
            randomIndex -= arrEle[i].probability;
        }
    }
    return arrEle[0];
}

labaDao.checkReward = function (arrData) {
    let arrLine = [];
    for (col = 0; col < 5; col++) {
        for (row = 0; row < 3; row++) {
            if (col == 0) {
                let objNode = {
                    data: arrData[row + col * 3],
                    node: [],
                    depth: col,
                    index: row + col * 3
                };
                arrLine.push(objNode);
            } else {
                arrLine.forEach(node => {
                    if (this.compareNode(node, arrData[row + col * 3])) {
                        this.addDataToNode(node, arrData[row + col * 3], col, row + col * 3);
                    }
                });
            }
        }
    }

    let result = [];
    let currLine = [];
    this.calcRewardLine(arrLine, result, currLine);

    console.log(JSON.stringify(result));

    return result;
}

labaDao.calcRewardLine = function (arrPNode, totalLine, line) {
    arrPNode.forEach(pNode => {
        if (pNode.node.length > 0) {
            this.calcRewardLine(pNode.node, totalLine, line);
            line.forEach(singleLine => {
                singleLine.unshift({
                    name: pNode.data.name,
                    id: pNode.data.id,
                    index: pNode.index
                });
            })
        } else if (pNode.depth >= 2) {
            line.push([{
                name: pNode.data.name,
                id: pNode.data.id,
                index: pNode.index
            }]);
        }

        if (pNode.depth == 0) {
            line.forEach(singleLine => {
                if (singleLine.length >= 3) {
                    totalLine.push(singleLine);
                }
            });

            line = [];
        }
    });
}

labaDao.addDataToNode = function (nodeData, data, depth, index) {
    if (nodeData.depth < (depth - 1)) {
        nodeData.node.forEach(childNode => {
            this.addDataToNode(childNode, data, depth, index);
        })
    } else {
        nodeData.node.push({
            data: data,
            node: [],
            depth: depth,
            index: index
        });
    }
}

labaDao.compareNode = function (aNode, bData) {
    return this.compareCeil(aNode.data, bData);
}

labaDao.compareCeil = function (a, b) {
    return a.id == b.id
}