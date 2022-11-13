import { ResponsiveBar, BarDatum } from '@nivo/bar';
import { ReactElement } from 'react';

export interface IBarChartElement {
  value: number;
  distribution: number;
}

export interface IBarChartProps {
  data: Array<IBarChartElement>;
}

export const BarChart = ({ data }: IBarChartProps): ReactElement => {
  return (
    <ResponsiveBar
      data={data as unknown as Array<BarDatum>}
      keys={['distribution']}
      indexBy="value"
      margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
      padding={0}
      valueScale={{ type: 'linear' }}
      groupMode="grouped"
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'nivo' }}
      colorBy="indexValue"
      // @ts-ignore
      width={700}
      // @ts-ignore
      height={600}
      // fill={[
      //   {
      //     match: {
      //       id: 'fries',
      //     },
      //     id: 'dots',
      //   },
      //   {
      //     match: {
      //       id: 'sandwich',
      //     },
      //     id: 'lines',
      //   },
      // ]}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 1.6]],
      }}
      // axisTop={null}
      // axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 90,
        // legend: 'value',
        legendPosition: 'middle',
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'distribution',
        legendPosition: 'middle',
        legendOffset: -40,
      }}
      // enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: 'color',
        modifiers: [['darker', 1.6]],
      }}
      // legends={[]}
      // role="application"
      barAriaLabel={function (e) {
        return e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue;
      }}
    />
  );
};
