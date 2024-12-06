/* eslint-disable */
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef } from 'react';

import { TimeFilter } from '@/components/charts/TimeFilter';
import { contentFont } from '@/constants/fonts';

interface LineChartProps {
  data?: Highcharts.SeriesOptionsType[];
  onTimeChange?: (value: FilterTimes) => void;
  visibilityState: boolean[];
  size?: 'sm' | 'default';
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  onTimeChange,
  visibilityState,
  size = 'default',
}) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  useEffect(() => {
    const chart = chartComponentRef.current?.chart;
    if (chart) {
      visibilityState.forEach((isVisible, index) => {
        const series = chart.series[index];
        if (series && series.visible !== isVisible) {
          series.setVisible(isVisible, false);
        }
      });
      chart.redraw();
    }
  }, [visibilityState]);

  const { theme } = useTheme();
  const options: Highcharts.Options = {
    chart: {
      type: 'line',
      height: size === 'sm' ? 200 : 350,
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
    series: data,
    tooltip: {
      shared: true,
      useHTML: true,
      formatter(this: Highcharts.TooltipFormatterContextObject) {
        const date = Highcharts.dateFormat('%b %e - %H:%M', this.x as number);
        const points = this.points || [this.point];

        let tooltipContent = `
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
      </div>`;

        points.forEach((point) => {
          const color = point.series.color;
          tooltipContent += `
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <span class="w-0.5 h-3 rounded-full mr-1" style="background-color: ${color}"></span>
              <div class="text-text text-[13px]">
                ${point.series.name}
              </div>
            </div>
            <div style="color: ${color}" class="text-[13px]">
              ${point.y?.toFixed(0)}
            </div>
          </div>`;
        });

        tooltipContent += '</div>';
        return tooltipContent;
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
      <HighchartsReact
        ref={chartComponentRef}
        highcharts={Highcharts}
        options={options}
      />
      {size === 'default' && (
        <TimeFilter
          onTimeChange={(value) => onTimeChange?.(value as FilterTimes)}
        />
      )}
    </div>
  );
};

export default LineChart;
