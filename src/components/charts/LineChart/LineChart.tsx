/* eslint-disable */
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

import { TimeFilter } from '@/components/charts/TimeFilter';
import { contentFont } from '@/constants/fonts';

type FilterTimes = '1d' | '1w' | '1m' | '1y' | 'all';

interface LineChartProps {
  data?: number[];
}

// TODO: Update chart data
const LineChart: React.FC = ({ data }: LineChartProps) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [view, setView] = useState<FilterTimes>('1w');
  const { theme } = useTheme();

  const generateMockData = (interval: FilterTimes) => {
    const now = new Date();
    const data = [];

    switch (interval) {
      case '1d':
        for (let i = 0; i < 150; i += 1) {
          const date = new Date(now.getTime() - (1440 - i) * 60 * 1000);
          data.push([
            date.getTime(),
            Math.min(100, Math.max(0, 50 + Math.random() * 20 - 10)),
          ]);
        }
        break;
      case '1w':
        for (let i = 0; i < 168; i += 1) {
          const date = new Date(now.getTime() - (168 - i) * 60 * 60 * 1000);
          data.push([
            date.getTime(),
            Math.min(100, Math.max(0, 50 + Math.random() * 20 - 10)),
          ]);
        }
        break;
      case '1m':
        for (let i = 0; i < 365; i += 1) {
          const date = new Date(now.getTime() - (365 - i) * 60 * 60 * 1000);
          data.push([
            date.getTime(),
            Math.min(100, Math.max(0, 50 + Math.random() * 50 - 10)),
          ]);
        }
        break;
      default:
        for (let i = 0; i < 1000; i += 1) {
          const date = new Date(now.getTime() - (1000 - i) * 60 * 60 * 1000);
          data.push([
            date.getTime(),
            Math.min(100, Math.max(0, 50 + Math.random() * 20 - 10)),
          ]);
        }
        break;
    }

    setChartData(data);
  };

  useEffect(() => {
    generateMockData(view);
    console.log(view);
  }, [view]);

  const options: Highcharts.Options = {
    chart: {
      type: 'line',
      height: 300,
      backgroundColor: 'transparent',
    },
    title: {
      text: '',
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: null,
      },
      lineColor: theme === 'dark' ? '#FFFFFF0D' : '#F5F5F5',
      tickColor: theme === 'dark' ? '#FFFFFF0D' : '#F5F5F5',
      gridLineColor: theme === 'dark' ? '#FFFFFF0D' : '#F5F5F5',
      labels: {
        style: {
          fontFamily: contentFont.style.fontFamily,
          color: '#8F8F8F',
        },
      },
      crosshair: {
        width: 2,
        color: theme === 'dark' ? '#FFFFFF0D' : '#F5F5F5',
        dashStyle: 'Solid',
      },
    },
    yAxis: {
      title: {
        text: null,
      },
      max: 100,
      min: 0,
      gridLineColor: theme === 'dark' ? '#FFFFFF0D' : '#F5F5F5',
      gridLineDashStyle: 'Dash',
      labels: {
        style: {
          fontFamily: contentFont.style.fontFamily,
          color: '#8F8F8F',
        },
      },
      opposite: true,
    },
    series: [
      {
        showInLegend: false,
        name: 'Chance',
        data: chartData,
        type: 'line',
        color: '#EE514F',
      },
    ],
    tooltip: {
      useHTML: true, // Allows custom HTML for styling
      formatter(this: Highcharts.TooltipFormatterContextObject) {
        const date = Highcharts.dateFormat('%b %e', this.x as number);
        const label = 'Samuel L. Jackson';
        const value = (this.y as number).toFixed(0);

        return /* html */ `
              <div style="
                  min-width: 200px;
                  background-color: ${theme === 'dark' ? '#1E1E1E' : '#fff'};
                  color: ${theme === 'dark' ? '#fff' : '#000'};
                  border-radius: 4px;
                  padding: 8px;
                  font-family: inherit;
                  box-shadow: 0px 2px 8px 0px #0000004F;
              ">
                  <div class="text-text-subtle text-[11px] mb-1">
                      ${date}
                  </div>
                  <div class="flex justify-between items-center">
                    <div class="flex items-center">
                      <span class="w-0.5 h-3 bg-text-support-red rounded-full mr-1"></span>
                      <div class="text-text text-[13px]">
                        ${label}
                      </div>
                    </div>
                    <div class="text-text-support-red text-[13px]">
                      ${value}%
                    </div>
                  </div>
              </div>
          `;
      },
      borderWidth: 0,
      shadow: false,
      backgroundColor: 'transparent',
    },
    credits: {
      enabled: false,
    },
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '10px',
        }}
      />
      <HighchartsReact highcharts={Highcharts} options={options} />
      <TimeFilter onTimeChange={(value) => setView(value as FilterTimes)} />
    </div>
  );
};

export default LineChart;
