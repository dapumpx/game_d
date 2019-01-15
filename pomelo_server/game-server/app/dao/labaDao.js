const labaDao = module.exports;
const dataApi = require('../util/dataApi')

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
    while (true) {
        totalResult.push(result);
        result = result.slice();
        let rewardLine = this.checkReward(result);

        if (rewardLine.length > 0) {
            rewardResult.push(rewardLine);
            rewardLine.forEach(line => {
                line.forEach(eachCell => {
                    result[eachCell.index] = -1
                })
            });
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

    return {
        totalResult: totalResult,
        rewardResult: rewardResult
    };
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