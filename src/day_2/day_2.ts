import { data } from './day_2_input';

enum Position {
  UP = 'up',
  DOWN = 'down',
  FORWARD = 'forward',
}

const plannedCourse: { position: string; steps: number }[] = data.split(/\r?\n/).map(command => {
  let [ position, steps ] = command.split(' ');
  return { position, steps: parseInt(steps) };
});

// Part: 1

const horizontalDepth = plannedCourse.reduce((accumulatedPosition, currentPosition) => {
  if ( currentPosition.position === Position.FORWARD) {
    accumulatedPosition.horizontal += currentPosition.steps;
  }

  if ( currentPosition.position === Position.UP) {
    accumulatedPosition.depth -= currentPosition.steps;
  }

  if ( currentPosition.position === Position.DOWN) {
    accumulatedPosition.depth += currentPosition.steps;
  }
  return accumulatedPosition;
}, { horizontal: 0, depth: 0 });

console.log('\x1b[43m\x1b[35m\x1b[4m', 'Final Position: ', horizontalDepth.horizontal * horizontalDepth.depth);

// Part: 2

const horizontalDepthWithAim = plannedCourse.reduce((accumulatedPosition, currentPosition) => {
  if ( currentPosition.position === Position.FORWARD) {
    accumulatedPosition.horizontal += currentPosition.steps;
    accumulatedPosition.depth += currentPosition.steps * accumulatedPosition.aim;
  }

  if ( currentPosition.position === Position.UP) {
    accumulatedPosition.aim -= currentPosition.steps;
  }

  if ( currentPosition.position === Position.DOWN) {
    accumulatedPosition.aim += currentPosition.steps;
  }
  return accumulatedPosition;
}, { horizontal: 0, depth: 0, aim: 0 });

console.log('\x1b[43m\x1b[35m\x1b[4m', 'Final Position with Aim: ', horizontalDepthWithAim.horizontal * horizontalDepthWithAim.depth);
