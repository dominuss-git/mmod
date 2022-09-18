import { ChangeEvent, FormEvent, ReactElement, useEffect, useMemo, useState } from 'react';

import { Button, ILabelValue, Input, ISection, Output } from '../../components';
import { FortuneRoulette, IFortuneRouletteData } from './FortuneRoulette';

import styles from './lab1dop.module.scss';

export const Lab1dop = (): ReactElement => {
  const [rouletteDegree, setRouletteDegree] = useState<number>(0);
  const [winner, setWinner] = useState<IFortuneRouletteData & { chance: number, show: boolean }>();
  const [data, setData] = useState<Array<IFortuneRouletteData>>();
  const [donations, setDonations] = useState<Record<string, number>>();
  const [input, setInput] = useState<{ game: string; donation: number } | undefined>({
    game: 'The Witcher 3',
    donation: 10,
  });
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleStart = (): void => {
    if (!data) return;
    setDisabled(true)
    const degree = Math.floor(Math.random() * 5000) + 5000 + rouletteDegree;

    setRouletteDegree(degree);
    
    if (winner) {
      setWinner({ ...winner, show: false  })
    }

    setTimeout(() => {
      const count = data.reduce((acc, val) => acc + val.value, 0);
      const currentDegree = 360 - ((degree - 90) % 360) === 0 ? 360 : 360 - ((degree - 90) % 360);

      const degreePerEd = count / 360;

      let winnerValue = currentDegree * degreePerEd;

      for (const { value, id, label } of data) {
        if (winnerValue <= value) {
          setWinner({ id, value, label, chance: (value / count) * 100, show: true });
          // console.log('winner', id, ': ', (value / count) * 100);
          setDisabled(false);
          return;
        }

        winnerValue -= value;
      }

      setDisabled(false);
    }, 10000);
  };

  const onSubmitDonation = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    console.log(input);

    if (
      !input ||
      !input.game ||
      input.game.length === 0 ||
      !input.donation ||
      Number(input.donation) === 0
    )
      return;

    setDonations((prev) => ({
      ...prev,
      [input.game]:
        prev && prev[input.game]
          ? prev[input.game] + Number(input.donation)
          : Number(input.donation),
    }));
  };

  useEffect(() => {
    if (!donations) return;

    setData(
      Object.keys(donations).map((key) => ({
        id: key,
        label: key,
        value: donations[key],
      }))
    );
  }, [donations]);

  const handleInput = (event: ChangeEvent<HTMLInputElement>): void => {
    // @ts-ignore
    setInput((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const outputDonations = useMemo<Array<ISection> | undefined>(() => {
    return donations && data
      ? [
          {
            labelValues: Object.keys(donations).reduce((acc, key) => {
              const count = data.reduce((acc, val) => acc + val.value, 0);

              acc.push(
                {
                  label: key,
                  value: donations[key],
                  procent: true,
                  dollar: true,
                },
                {
                  label: 'chance',
                  value: ((donations[key] / count) * 100).toFixed(2),
                  procent: true,
                }
              );
              return acc;
            }, [] as Array<ILabelValue>),
          },
        ]
      : undefined;
  }, [data, donations]);

  const isDisabled = useMemo(() => {
    if (!data || data.length === 0) return true;
    if (winner?.show === undefined) return false;

    if (winner.show === false) return true

    return false;
  }, [data, winner])

  return (
    <div className={styles.page}>
      <div className={[styles.snack, winner?.show ? styles.snack__show : undefined].join(' ')}>
        <span className={[styles.text__bold, styles.text__orange].join(' ')}>Winner: </span>
        <span className={styles.text__white}> {winner?.id}</span>
        <span className={styles.text__orange}>! Chance: </span>
        <span className={styles.text__white}>{winner?.chance.toFixed(2)} </span>
        <span className={styles.text__purple}> %</span>
        <span className={styles.text__orange}>.</span>
        <span className={styles.text__orange}>Donations: </span>
        <span className={styles.text__white}>{winner?.value.toFixed(2)} </span>
        <span className={styles.text__purple}> $</span>
        <span className={styles.text__orange}>.</span>
      </div>
      <div className={styles.page__roulette}>
        <FortuneRoulette data={data} degree={rouletteDegree} />
        <Button disabled={isDisabled || !data} onClick={handleStart}>Start</Button>
      </div>

      <div className={styles.page__donations}>
        <form className={styles.donations__form} onSubmit={onSubmitDonation}>
          <div className={styles.donations__inputs}>
            <Input
              onChange={handleInput}
              value={input?.donation}
              label="donate"
              name={'donation'}
              type={'number'}
            />
            <Input onChange={handleInput} value={input?.game} label="game" name={'game'} />
          </div>
          <Button>Donate</Button>
        </form>
        <Output
          sections={outputDonations}
          classname={styles.donations}
          wrapperClassname={styles.donations__wrapper}
        />
      </div>
    </div>
  );
};
