<script lang="ts">
  import { Chart, Button, Dropdown, DropdownItem } from 'flowbite-svelte';
  import { ChevronDownSolid } from 'flowbite-svelte-icons';

  const options: ApexCharts.ApexOptions = {
    chart: {
      height: 460,
      type: 'area'
    },
    theme: {
      monochrome: {
        enabled: true,
        color: '#4f46e5'
      }
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
      x: {
        show: false,
        format: 'dd MMM yyyy'
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.6,
        opacityTo: 0
      }
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      show: false
    },
    series: [
      {
        name: 'Sales',
        data: [20.95, 51.34, 31.18]
      },
      {
        name: 'Items sold',
        data: [40, 14, 97]
      }
    ],
    legend: {
      position: 'top',
      labels: {
        useSeriesColors: true
      }
    },
    xaxis: {
      type: 'datetime',
      categories: [1327359600000, 1327446000000, 1327532400000]
    }
  };
</script>

<Chart class="text-slate-900" {options} />

<div class="flex justify-between items-center pt-5">
  <Button class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 
  text-center inline-flex items-center dark:hover:text-white bg-transparent hover:bg-transparent 
  dark:bg-transparent dark:hover:bg-transparent focus:ring-transparent dark:focus:ring-transparent py-0">
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
   
