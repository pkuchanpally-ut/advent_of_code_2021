import { data } from './day_3_input';

function getComparedList(dataList: string[]): { '1': number; '0': number }[] {
  return dataList.reduce((accumulatedBits, currentNumber) => {
    currentNumber.split('').forEach((currentBit, index) => {
      if (!accumulatedBits[index]) {
        accumulatedBits[index] = { '1': 0, '0': 0 };
      }
      accumulatedBits[index][currentBit] += 1;
    });
    return accumulatedBits;
  }, []);
}

// Part 1:

const comparedList: { '1': number; '0': number }[] = getComparedList(data.split(/\r?\n/));

const rates: { gamma: string; epsilon: string } = comparedList.reduce((accumulatedRates, currentBits) => {
  if ( currentBits['1'] > currentBits['0'] ) {
    accumulatedRates.gamma += '1';
    accumulatedRates.epsilon += '0';
  } else {
    accumulatedRates.gamma += '0';
    accumulatedRates.epsilon += '1';
  }

  return accumulatedRates;
}, { gamma: '', epsilon: '' });

console.log('\x1b[43m\x1b[35m\x1b[4m', 'Power consumption: ', parseInt(rates.gamma, 2) * parseInt(rates.epsilon, 2));

// Part 2:

let oxygenList: string[] = [...data.split(/\r?\n/)];
let carbonList: string[] = [...data.split(/\r?\n/)];
let oxygenIndexToCompare = 0;
let carbonIndexToCompare = 0;

while ( oxygenList.length !== 1 ) {
  if (oxygenIndexToCompare === oxygenList[0].length) {
    oxygenIndexToCompare = 0;
  }
  const comparedOxygenList: { '1': number; '0': number }[] = getComparedList(oxygenList);

  if (comparedOxygenList[oxygenIndexToCompare]['1'] >= comparedOxygenList[oxygenIndexToCompare]['0']) {
    oxygenList = oxygenList.filter(currentBits => currentBits[oxygenIndexToCompare] === '1');
  } else {
    oxygenList = oxygenList.filter(currentBits => currentBits[oxygenIndexToCompare] === '0');
  }

  oxygenIndexToCompare++;
}

while ( carbonList.length !== 1 ) {
  if (carbonIndexToCompare === carbonList[0].length) {
    carbonIndexToCompare = 0;
  }
  const comparedCarbonList: { '1': number; '0': number }[] = getComparedList(carbonList);

  if (comparedCarbonList[carbonIndexToCompare]['1'] < comparedCarbonList[carbonIndexToCompare]['0']) {
    carbonList = carbonList.filter(currentBits => currentBits[carbonIndexToCompare] === '1');
  } else {
    carbonList = carbonList.filter(currentBits => currentBits[carbonIndexToCompare] === '0');
  }

  carbonIndexToCompare++;
}

console.log('\x1b[43m\x1b[35m\x1b[4m', 'Life support rating: ', (parseInt(oxygenList[0], 2) * parseInt(carbonList[0], 2)));
