<script lang="ts">
  import { Chart, Button, Dropdown, DropdownItem } from 'flowbite-svelte';
  import { ChevronDownSolid } from 'flowbite-svelte-icons';

  const options: ApexCharts.ApexOptions = {
    series: [92, 87, 76, 63, 55, 42, 38, 29, 18, 15],
    chart: {
      height: 460,
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
      colors: ['#0f172a']
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -25
        }
      }
    },
    labels: ['Mann Co. Supply Crate Key', 'Taunt: The Schadenfreude', 'Refined Metal'],
    legend: {
      position: 'right',
      horizontalAlign: 'center',
      fontSize: '14',
      labels: {
        useSeriesColors: true
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
