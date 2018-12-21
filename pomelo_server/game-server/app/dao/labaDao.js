const labaDao = module.exports;
const dataApi = require('../util/dataApi')

labaDao.once = function () {
    let arrEle = [];
    let result = [];
    Object.keys(dataApi.ceil.data).forEach(function (key) {
        // console.log(key)
        // console.log(dataApi.ceil[key])
        arrEle.push(dataApi.ceil.data[key]);
    });
    let sumProbability = 0.0;
    let i;
    for (i = 0; i < arrEle.length; i++) {
        sumProbability += arrEle[i].probability;
    }

    for (let j = 0; j < 15; j++) {
        while (true) {
            let randomIndex = Math.random() * sumProbability;
            let isCheck = false;
            for (i = 0; i < arrEle.length; i++) {
                if (randomIndex <= arrEle[i].probability) {
                    let checkIndex = result.length % 3;
                    checkIndex += Math.floor(result.length / 3) * 3;
                    isCheck = true;
                    for (m = Math.floor(result.length / 3) * 3; m < checkIndex; m++) {
                        if (result[m].id == arrEle[i].id) {
                            isCheck = false;
                            break;
                        }
                    }

                    if (isCheck) {
                        result.push(arrEle[i]);
                        // console.log(arrEle[i].name);
                        break;
                    }
                } else {
                    randomIndex -= arrEle[i].probability;
                }
            }

            if (isCheck) {
                break;
            }
        }
    }

    this.checkReward(result);

    return result;
}

labaDao.checkReward = function (arrData) {
    let i, j, m;
    let arrLine = [];
    let sumResult = 0;
    for (col = 0; col < 5; col++) {
        for (row = 0; row < 3; row++) {
            if (col == 0) {
                let objNode = {
                    data: arrData[row + col * 3],
                    node: [],
                    depth: col
                };
                arrLine.push(objNode);
            } else {
                arrLine.forEach(node => {
                    if (this.compareNode(node, arrData[row + col * 3])) {
                        this.addDataToNode(node, arrData[row + col * 3], col);
                    }
                });
            }
        }
    }

    let result = [];
    let arrline = [];
    this.calcRewardLine(arrLine, result, arrline);

    console.log(JSON.stringify(result));
}

labaDao.calcRewardLine = function (arrPNode, totalLine, line) {
    arrPNode.forEach(pNode => {
        if(pNode.node.length > 0)
        {
            this.calcRewardLine(pNode.node, totalLine, line);
            line.forEach(singleLine => {
                singleLine.unshift(pNode.data.name);
            })
        }
        else if(pNode.depth >= 2)
        {
            line.push([pNode.data.name]);
        }

        if(pNode.depth == 0)
        {
            line.forEach(singleLine =>{
                if(singleLine.length >= 3)
                {
                    totalLine.push(singleLine);
                }
            });

            line = [];
        }
    });
}

labaDao.addDataToNode = function (nodeData, data, depth) {
    if (nodeData.depth < (depth - 1)) {
        nodeData.node.forEach(childNode => {
            this.addDataToNode(childNode, data, depth);
        })
    } else {
        nodeData.node.push({
            data: data,
            node: [],
            depth: depth
        });
    }
}

labaDao.compareNode = function (aNode, bData) {
    return this.compareCeil(aNode.data, bData);
}

labaDao.compareCeil = function (a, b) {
    return a.id == b.id
}