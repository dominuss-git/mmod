import { Line, ResponsiveLine } from '@nivo/line';

export interface IDot {
  x: number;
  y: number;
}
export interface ILine {
  id: string;
  color?: string;
  data: Array<IDot>;
}

export interface ILineChartProps {
  data: Array<ILine>;
  noPaddings?: boolean;
  padding?: number;
  length?: number;
  cardinal?: boolean
  max?: number
}

export const LineChart = ({ data, noPaddings, padding, length, cardinal, max = 1 }: ILineChartProps) => {
  console.log(data)
  return(
    <Line
      data={data}
      margin={{
        top: 50,
        right: 60,
        bottom: 50,
        left: padding
          ? padding + 60
          : noPaddings
          ? length
            ? length > 95
              ? length + 10
              : length
            : 60
          : 100,
      }}
      xScale={{
        type: 'linear',
        min: 0,
        max: max,
      }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
      }}
      colors={['#333', 'green']}
      height={600}
      width={
        padding
          ?700 - padding
          : noPaddings
          ? length
            ? 700 - (length > 95 ? length - 50 : length - 60)
            : 700
          : 660
      }
      curve={cardinal ? 'monotoneX': 'linear'}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={null}
      axisLeft={null}
      enableGridX={false}
      enableGridY={false}
      lineWidth={5}
      pointSize={5}
      // pointColor={{ theme: 'background' }}
      pointBorderWidth={1}
      // pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[]}
    />
  );
};
