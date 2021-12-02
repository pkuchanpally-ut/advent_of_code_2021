import { data } from './day_1_input';

async function main() {
  const measurements = data.split(/\r?\n/).map(str => parseInt(str));

  // Part: 1

  const totalMeasurements = measurements.reduce((count, currentValue, index, list) => {
          if (currentValue > list[index - 1]) {
              count += 1;
          }
          return count;
      }, 0);

  console.log('\x1b[43m\x1b[35m\x1b[4m', 'Total measurements larger than previous: ', totalMeasurements);

  // Part: 2

  let beginSlidingWindowAt = 0;
  let totalThreeMeasurements = 0;
  let previousWindowSum = 0;

  while (beginSlidingWindowAt + 2 < data.length) {
      let currentWindowSum = measurements[beginSlidingWindowAt] + measurements[beginSlidingWindowAt + 1] + measurements[beginSlidingWindowAt + 2];
      if ((beginSlidingWindowAt > 0) && (currentWindowSum > previousWindowSum)) {
          totalThreeMeasurements += 1;
      }
      previousWindowSum = currentWindowSum;
      beginSlidingWindowAt += 1;
  }

  console.log('\x1b[43m\x1b[35m\x1b[4m', 'Total sliding window measurements larger than previous window: ', totalThreeMeasurements);
}

main();
