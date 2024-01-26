<script lang="ts">
    import { Chart, Card, A, Button, Dropdown, DropdownItem, Popover } from 'flowbite-svelte';
    import { InfoCircleSolid, ChevronDownSolid, ChevronRightSolid, PenSolid, DownloadSolid, ShareNodesSolid, TrashBinSolid, DotsHorizontalOutline } from 'flowbite-svelte-icons';
  
    const options: ApexCharts.ApexOptions = {
      series: [92.5, 87.3, 76.1, 63.7, 55.2, 42.8, 38.6, 29.4, 18.7, 5.9],
      colors: ['#312e81', '#3730a3', '#4338ca', '#4f46e5', '#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe', '#e0e7ff', '#eef2ff'],
      chart: {
        height: 420,
        width: '100%',
        type: 'pie'
      },
      theme: {
        monochrome: {
          enabled: true,
          color: '#4f46e5'
        }
      },
      stroke: {
        colors: ['#0f172a'],
      },
      plotOptions: {
        pie: {
          dataLabels: {
            offset: -25
          }
        }
      },
      labels: ['Mann Co. Supply Crate Key', 'Taunt: The Schadenfreude', 'Refined Metal'],
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: 'Inter, sans-serif'
        }
      },
      legend: {
        position: 'right',
        fontFamily: 'Inter, sans-serif',
        labels: {
          useSeriesColors: true
        }
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return value + '%';
          }
        }
      },
      xaxis: {
        labels: {
          formatter: function (value) {
            return value + '%';
          }
        },
        axisTicks: {
          show: false
        },
        axisBorder: {
          show: false
        }
      }
    };
  </script>
  
  <Chart {options} />

  <div class="flex justify-between items-center pt-5">
    <Button class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 
    text-center inline-flex items-center dark:hover:text-white bg-transparent hover:bg-transparent 
    dark:bg-transparent dark:hover:bg-transparent focus:ring-transparent dark:focus:ring-transparent py-0">
      Placeholder
      <ChevronDownSolid class="w-2.5 m-2.5 ms-1.5" />
    </Button>
    <Dropdown class="w-40" offset={-6}>
      <DropdownItem>Placeholder</DropdownItem>
    </Dropdown>
  </div>
