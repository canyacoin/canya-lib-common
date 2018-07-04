declare let require: any;

const canyaAbi = require('../build/contracts/CanYaCoin.json').abi;
const daoAbi = require('../build/contracts/Dao.json').abi;

export {
  canyaAbi,
  daoAbi
};
