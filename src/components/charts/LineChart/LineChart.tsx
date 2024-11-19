/* eslint-disable */
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useTheme } from 'next-themes';
import React from 'react';

import { TimeFilter } from '@/components/charts/TimeFilter';
import { contentFont } from '@/constants/fonts';

interface LineChartProps {
  data?: number[][];
  onTimeChange?: (value: FilterTimes) => void;
}

// TODO: Update chart data
const LineChart: React.FC<LineChartProps> = ({ data, onTimeChange }) => {
  const { theme } = useTheme();
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
        data: data,
        type: 'line',
        color: '#EE514F',
      },
    ],
    tooltip: {
      useHTML: true, // Allows custom HTML for styling
      formatter(this: Highcharts.TooltipFormatterContextObject) {
        const date = Highcharts.dateFormat('%b %e - %H:%M', this.x as number);
        const label = 'Price';
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
                      ${value}
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
      <TimeFilter
        onTimeChange={(value) => onTimeChange?.(value as FilterTimes)}
      />
    </div>
  );
};

export default LineChart;
