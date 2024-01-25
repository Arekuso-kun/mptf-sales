<script lang="ts">
    import { Chart, Card, A, Button, Dropdown, DropdownItem } from 'flowbite-svelte';
    import { ChevronRightSolid, ChevronDownSolid } from 'flowbite-svelte-icons';
  
    let options: ApexCharts.ApexOptions = {
      chart: {
        height: 405,
        type: 'area',
        fontFamily: 'Inter, sans-serif',
        dropShadow: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      tooltip: {
        enabled: true,
        theme: "dark",
        x: {
          show: false
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.55,
          opacityTo: 0,
          shade: '#1C64F2',
          gradientToColors: ['#1C64F2']
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 6
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: 0
        }
      },
      series: [
        {
          name: 'Sales',
          data: [6500, 5418, 4456, 6526, 5356, 6456],
          color: '#a5b4fc'
        },
        {
          name: 'Items sold',
          data: [4650, 3618, 5646, 6126, 4356, 3456],
          color: '#4338ca'
        }
      ],
      legend: {
        position: 'bottom',
        fontFamily: 'Inter, sans-serif',
        labels: {
          useSeriesColors: true
        }
      },
      xaxis: {
        categories: ['01 February', '02 February', '03 February', '04 February', '05 February', '06 February', '07 February'],
        labels: {
          show: false
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        show: false
      }
    };
  </script>
  
  
  <Chart {options} />
  
  <div class="flex justify-between items-center pt-5">
    <Button class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center 
    inline-flex items-center dark:hover:text-white bg-transparent hover:bg-transparent dark:bg-transparent 
    dark:hover:bg-transparent focus:ring-transparent dark:focus:ring-transparent py-0">
      Daily
      <ChevronDownSolid class="w-2.5 m-2.5 ms-1.5" />
    </Button>
    <Dropdown class="w-40" offset={-6}>
      <DropdownItem>Daily</DropdownItem>
      <DropdownItem>Weekly</DropdownItem>
      <DropdownItem>Monthly</DropdownItem>
      <DropdownItem>Yearly</DropdownItem>
    </Dropdown>
  </div>
   
