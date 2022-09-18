import { ChangeEvent, FormEvent, ReactElement, useMemo, useState } from 'react';

import { Button, ILabelValue, Input, ISection, Output } from '../../components';

import styles from './lab1.module.scss';

interface IResult {
  yes: number;
  no: number;
  yes_procent: number;
  no_procent: number;
  chance: number;
}

type task4Keys = 'AB' | 'not_AB' | 'Anot_B' | 'not_Anot_B';

interface IResultState {
  '#1'?: IResult & { delay: string };
  '#2'?: {
    data: Array<IResult>;
    delay: string;
  };
  '#3'?: Array<Omit<IResult, 'no' | 'no_procent'> & { label: task4Keys }>;
  '#4'?: Record<
    number,
    {
      chance: number;
      realChance: number;
      max: number;
      count: number;
    }
  > & { delay: string };
}

const times = Math.pow(10, 6);

const Generate = (probability: string) => {
  const time = performance.now();
  const chance =
    probability?.split('.').length !== 1
      ? probability?.split('.')[1]?.split('')
      : probability?.split('.')[0];
  const count = probability?.split('.').length !== 1 ? chance.length : 0;
  const max = Math.pow(10, count);

  const result = {
    yes: 0,
    no: 0,
  };

  for (let i = 0; i < times; i++) {
    const randomVar = Math.floor(Math.random() * max) + 1;

    if (randomVar <= Number(typeof chance === 'string' ? chance : chance.join(''))) {
      result.yes++;
      continue;
    }

    result.no++;
  }

  return {
    ...result,
    yes_procent: (result.yes / times) * 100,
    no_procent: (result.no / times) * 100,
    chance: Number(probability) * 100,
  };
};

export const Lab1 = (): ReactElement => {
  const [probability, setProbability] = useState<string>('0.0');
  const [probabilityArray, setProbabilityArray] = useState<string>('0.37, 0.74, 1, 0');
  const [probabilityArray4, setProbabilityArray4] = useState<string>(
    '0.13, 0.21, 0.005, 0.05, 0.10 0.37 0.072 0.033 0.03'
  );
  const [probabilityArray3, setProbabilityArray3] = useState<string>('0.13, 0.21');
  const [result, setResult] = useState<IResultState>({
    '#1': undefined,
    '#2': undefined,
    '#3': undefined,
    '#4': undefined,
  });

  const handleInputProbability = (event: ChangeEvent<HTMLInputElement>): void => {
    const result = Number(event.target.value);

    if (isNaN(result)) return;
    if (result > 1) return;

    setProbability(event.target.value);
  };

  const handleInputProbabilityArray = (event: ChangeEvent<HTMLInputElement>): void => {
    const input = event.target.value.split(' ').join(',').split(',');

    for (const value of input) {
      if (value.length === 0) continue;
      const variale = Number(value);

      if (isNaN(variale)) return;
      if (variale > 1) return;
    }

    setProbabilityArray(event.target.value);
  };

  const handleInputProbabilityArray3 = (event: ChangeEvent<HTMLInputElement>): void => {
    const input = event.target.value.split(' ').join(',').split(',');
    let count = 0;
    console.log(input);

    for (const value of input) {
      if (value.length === 0) continue;
      const variable = Number(value);

      if (isNaN(variable)) return;
      if (variable > 1) return;

      count++;

      if (count > 2) {
        if (probabilityArray3.length >= event.target.value.length) {
          setProbabilityArray3(event.target.value);
        }
        return;
      }
    }

    setProbabilityArray3(event.target.value);
  };

  const handleInputProbabilityArray4 = (event: ChangeEvent<HTMLInputElement>): void => {
    const input = event.target.value.split(' ').join(',').split(',');
    let count = 0;

    for (const value of input) {
      if (value.length === 0) continue;
      const variable = Number(value);

      if (isNaN(variable)) return;
      if (variable > 1) return;

      count += variable;

      if (count > 1) return;
    }

    setProbabilityArray4(event.target.value);
  };

  const onSubmit1 = (e: FormEvent<HTMLFormElement>): void => {
    const time = performance.now();
    e.preventDefault();

    setResult((prev) => ({
      ...prev,
      '#1': { ...Generate(probability), delay: ((performance.now() - time) / 1000000).toFixed(5) },
    }));
  };

  const onSubmit2 = (e: FormEvent<HTMLFormElement>): void => {
    const time = performance.now();
    e.preventDefault();
    const output: Array<IResult> = [];

    for (const probability of probabilityArray.split(' ').join(',').split(',')) {
      if (probability.length === 0) continue;

      output.push(Generate(probability));
    }

    setResult((prev) => ({
      ...prev,
      '#2': { data: output, delay: ((performance.now() - time) / 1000000).toFixed(5) },
    }));
  };

  const onSubmit3 = (e: FormEvent<HTMLFormElement>): void => {
    const time = performance.now();
    e.preventDefault();
    const output: Array<{ max: number; probability: number; chance: number }> = [];
    for (const probability of probabilityArray3.split(' ').join(',').split(',')) {
      if (probability.length === 0) continue;
      const chance =
        probability?.split('.').length !== 1
          ? probability?.split('.')[1]?.split('')
          : probability?.split('.')[0];
      const count = probability?.split('.').length !== 1 ? chance.length : 0;
      const max = Math.pow(10, count);

      const realProbability = Number(probability);
      const realChance = Number(typeof chance === 'string' ? chance : chance.join(''));

      output.push(
        {
          max,
          probability: realProbability,
          chance: realChance,
        }
        // {
        //   max,
        //   count,
        //   probability: 1 - realProbability,
        //   chance: max - realChance,
        // }
      );
    }

    const result = {
      A: {
        B: 0,
        not_B: 0,
      },
      not_A: {
        B: 0,
        not_B: 0,
      },
    };

    for (let i = 0; i < times; i++) {
      const randomVarA = Math.floor(Math.random() * output[0].max) + 1;
      const randomVarAB = Math.floor(Math.random() * output[1].max) + 1;

      // A
      if (randomVarA <= output[0].chance) {
        // B
        if (randomVarAB <= output[1].chance) {
          result.A.B++;
        } /** NOT B */ else {
          result.A.not_B++;
        }
      } /** NOT A */ else {
        // B
        if (randomVarAB <= output[1].chance) {
          result.not_A.B++;
        } /** NOT B */ else {
          result.not_A.not_B++;
        }
      }
    }

    setResult((prev) => ({
      ...prev,
      '#3': [
        {
          chance: output[0].probability * output[1].probability,
          yes: result.A.B,
          yes_procent: result.A.B / times,
          label: 'AB',
        },
        {
          chance: (1 - output[0].probability) * output[1].probability,
          yes: result.not_A.B,
          yes_procent: result.not_A.B / times,
          label: 'not_AB',
        },
        {
          chance: (1 - output[0].probability) * (1 - output[1].probability),
          yes: result.not_A.not_B,
          yes_procent: result.not_A.not_B / times,
          label: 'not_Anot_B',
        },
        {
          chance: output[0].probability * (1 - output[1].probability),
          yes: result.A.not_B,
          yes_procent: result.A.not_B / times,
          label: 'Anot_B',
        },
      ],
    }));
  };

  const onSubmit4 = (e: FormEvent<HTMLFormElement>): void => {
    const time = performance.now();
    e.preventDefault();
    const output = [];

    for (const probability of probabilityArray4.split(' ').join(',').split(',')) {
      if (probability.length === 0) continue;

      const chance =
        probability?.split('.').length !== 1
          ? probability?.split('.')[1]?.split('')
          : probability?.split('.')[0];
      const count = probability?.split('.').length !== 1 ? chance.length : 0;
      const max = Math.pow(10, count);

      output.push({
        chance: Number(typeof chance === 'string' ? chance : chance.join('')),
        realChance: Number(probability),
        max,
      });
    }
    if (output.reduce((acc, val) => acc + val.realChance, 0) !== 1) return;

    const result: Record<
      number,
      {
        chance: number;
        realChance: number;
        max: number;
        count: number;
      }
    > = output
      .sort((a, b) => (a.max < b.max ? 1 : a.chance < b.chance ? 1 : -1))
      .reduce((acc, val, index) => ({ ...acc, [index]: { ...val, count: 0 } }), {});

    for (let i = 0; i < times; i++) {
      let randomVar = Math.floor(Math.random() * output[0].max) + 1;

      output.every(({ chance, max }, index) => {
        if (randomVar <= chance * (result[0].max / max)) {
          result[index].count++;
          return false;
        }
        randomVar -= chance * (result[0].max / max);
        return true;
      });
    }

    setResult((prev) => ({
      ...prev,
      '#4': { ...result, delay: ((performance.now() - time) / 1000000).toFixed(5) },
    }));
  };

  const data1 = useMemo<Array<ISection> | undefined>(
    () =>
      result && result['#1']
        ? [
            {
              labelValues: [
                { label: 'no counts', value: result['#1'].no },
                { label: 'yes counts', value: result['#1'].yes },
                { label: 'no %', value: result['#1'].no_procent.toFixed(4), procent: true },
                { label: 'yes %', value: result['#1'].yes_procent.toFixed(4), procent: true },
                { label: 'chance %', value: result['#1'].chance.toFixed(4), procent: true },
                { label: 'delay', value: result['#1'].delay, sec: true, procent: true },
              ],
            },
          ]
        : undefined,

    [result['#1']]
  );

  const data2 = useMemo<Array<ISection> | undefined>(
    () =>
      result && result['#2']
        ? result['#2'].data.map(({ no_procent, yes_procent, yes, no, chance }) => ({
            labelValues: [
              { label: 'no counts', value: no },
              { label: 'yes counts', value: yes },
              { label: 'no %', value: no_procent.toFixed(4), procent: true },
              { label: 'yes %', value: yes_procent.toFixed(4), procent: true },
              { label: 'chance %', value: chance.toFixed(4), procent: true },
              { label: 'delay', value: result['#2']?.delay, sec: true, procent: true },
            ],
          }))
        : undefined,

    [result['#2']]
  );

  const data3 = useMemo<Array<ISection> | undefined>(
    () =>
      result &&
      result['#3'] &&
      result['#3'].map((value) => ({
        title: value.label,
        labelValues: [
          {
            label: 'yes procent',
            value: (value.yes_procent * 100).toFixed(4),
            procent: true
          },
          {
            label: 'yes',
            value: value.yes
          },
          {
            label: 'chance',
            value: (value.chance * 100).toFixed(4),
            procent: true,
          },
        ],
      })),
    [result['#3']]
  );

  const data4 = useMemo<Array<ISection> | undefined>(
    () =>
      result && result['#4']
        ? [
            {
              labelValues: [
                ...Object.keys(result['#4']).reduce((acc, key) => {
                  if (key === 'delay') return acc;

                  acc.push(
                    {
                      label: '#' + (Number(key) + 1) + ' chance',
                      value: result['#4'] && result['#4'][Number(key)].realChance,
                      procent: true,
                    },
                    {
                      label: '#' + (Number(key) + 1) + ' counts',
                      value: result['#4'] && result['#4'][Number(key)].count,
                    },
                    {
                      label: '#' + (Number(key) + 1),
                      value:
                        result['#4'] &&
                        (result['#4'][Number(key)].count / Math.pow(10, 6)).toFixed(4),
                      procent: true,
                    }
                  );

                  return acc;
                }, [] as Array<ILabelValue>),
                { label: 'deelay', value: result['#4'].delay, procent: true, sec: true },
              ],
            },
          ]
        : undefined,
    [result['#4']]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__section}>
        <form name="form1" onSubmit={onSubmit1} className={styles.form}>
          <Input label="#1" name={'#1'} value={probability} onChange={handleInputProbability} />
          <Button name={'form1'} type={'submit'}>
            click
          </Button>
        </form>
        <Output wrapperClassname={styles.output__1} sections={data1} />
      </div>
      <div className={styles.wrapper__section}>
        <form name="form2" onSubmit={onSubmit2} className={styles.form}>
          <Input
            label={'#2'}
            name={'#2'}
            value={probabilityArray}
            onChange={handleInputProbabilityArray}
          />
          <Button name={'form2'} type={'submit'}>
            click
          </Button>
        </form>
        <Output wrapperClassname={styles.output__2} sections={data2} />
      </div>
      <div className={styles.wrapper__section}>
        <form name="form3" onSubmit={onSubmit3} className={styles.form}>
          <Input
            label={'#3'}
            name={'#3'}
            value={probabilityArray3}
            onChange={handleInputProbabilityArray3}
          />
          <Button name={'form3'} type={'submit'}>
            click
          </Button>
        </form>
        <Output wrapperClassname={styles.output__3} sections={data3} />
      </div>
      <div className={styles.wrapper__section}>
        <form name="form4" onSubmit={onSubmit4} className={styles.form}>
          <Input
            label={'#4'}
            name={'#4'}
            value={probabilityArray4}
            onChange={handleInputProbabilityArray4}
          />
          <Button name={'form4'} type={'submit'}>
            click
          </Button>
        </form>
        <Output
          wrapperClassname={styles.output__4}
          classname={styles.output__4_grid}
          sections={data4}
        />
      </div>
    </div>
  );
};
