// @ts-ignore
import Plotly from 'plotly.js-dist-min';
import { getRandonValue } from './getRandomValue5';

export const plotly = (fxy: any, id: string, random: (x: number, y: number) => number, mode: boolean, interval = 0.1) => {
  const trace1 = [];
  // console.log(trace1);

  if (!mode) {
    for (let i = 0; i < 1 - interval; i += interval) {
      for (let j = 0; j < 1 - interval; j += interval) {
        trace1.push({
          opacity: 0.5,
          // color: 'rgba(255,127,80)',
          intensity: [
            0, 0.14285714285714285, 0.2857142857142857, 0.42857142857142855, 0.5714285714285714,
            0.7142857142857143, 0.8571428571428571, 1,
          ],
          type: 'mesh3d',
          x: [i, i, i + interval, i + interval, i, i, i + interval, i + interval],
          y: [j, j + interval, j + interval, j, j, j + interval, j + interval, j],
          z: [
            0,
            0,
            0,
            0,
            random(i + interval, j + interval),
            random(i + interval, j + interval),
            random(i + interval, j + interval),
            random(i + interval, j + interval),
          ],
          i: [7, 0, 0, 0, 4, 4, 6, 6, 4, 0, 3, 2],
          j: [3, 4, 1, 2, 5, 6, 5, 2, 0, 1, 6, 3],
          k: [0, 7, 2, 3, 6, 7, 1, 1, 5, 5, 7, 6],
          scene: 'scene1',
        });
      }
    }
  } else {
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 3; j++) {
        trace1.push({
          opacity: 0.5,
          // color: 'rgba(255,127,80)',
          intensity: [
            0, 0.14285714285714285, 0.2857142857142857, 0.42857142857142855, 0.5714285714285714,
            0.7142857142857143, 0.8571428571428571, 1,
          ],
          type: 'mesh3d',
          x: [i, i, i + 1, i + 1, i, i, i + 1, i + 1],
          y: [j, j + 1, j + 1, j, j, j + 1, j + 1, j],
          z: [
            0,
            0,
            0,
            0,
            random(j + 1, i + 1),
            random(j + 1, i + 1),
            random(j + 1, i + 1),
            random(j + 1, i + 1),
          ],
          i: [7, 0, 0, 0, 4, 4, 6, 6, 4, 0, 3, 2],
          j: [3, 4, 1, 2, 5, 6, 5, 2, 0, 1, 6, 3],
          k: [0, 7, 2, 3, 6, 7, 1, 1, 5, 5, 7, 6],
          scene: 'scene1',
        });
      }
    }
  }
  var trace2;

  if (!mode) {
    trace2 = {
      opacity: 1,
      color: 'green',
      type: 'mesh3d',
      x: fxy.x,
      y: fxy.y,
      z: fxy.z,
      scene: 'scene1',
    };
  }

  var layout = {
    scene1: {
      domain: {
        x: [0.0, 1],
        y: [0, 1.0],
      },
    },

    height: 600,
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 0,
      pad: 0,
    },
  };

  Plotly.newPlot(id, mode ? [...trace1] : [...trace1, trace2], layout);
};
