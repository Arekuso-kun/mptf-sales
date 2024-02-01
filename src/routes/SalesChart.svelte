<script lang="ts">
  import { Chart, Button, ButtonGroup } from 'flowbite-svelte';

  export let items_daily: [string[], number[], number[]]; 
  export let items_monthly: [string[], number[], number[]]; 
  export let items_yearly: [string[], number[], number[]]; 

  let statusDaily: boolean;
  let statusMonthly: boolean;
  let statusYear: boolean;

  let items: [string[], number[], number[]] = [[], [], []]; 
  
  let selectedData = 'monthly';

  const handleDataChange = (value: string) => {
    selectedData = value;
  };

  const options: ApexCharts.ApexOptions = {
    chart: {
      height: 460,
      type: 'area',
      zoom: {
        enabled: true,
        autoScaleYaxis: true // Enable auto scaling of y-axis on zoom
      },
      background: '#00000000'
    },
    theme: {
      mode: 'dark',
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
      borderColor: '#ffffff0f'
    },
    stroke: {
      width: 3
    },
    series: [
      {
        name: 'Sales',
        data: items[1]
      },
      {
        name: 'Items sold',
        data: items[2]
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
      categories: items[0]
    },
    yaxis: {
      axisBorder: {
        show: true
      },
      axisTicks: {
        show: true
      }
    }
  };

  $: {
    statusDaily = false;
    statusMonthly = false;
    statusYear = false;
    
    if (selectedData == 'daily') {
      items = items_daily;
      statusDaily = true;
      if (options.tooltip && options.tooltip.x) options.tooltip.x.format = 'dd MMM yyyy';
    }
    
    if (selectedData == 'monthly') {
      items = items_monthly;
      statusMonthly = true;
      if (options.tooltip && options.tooltip.x) options.tooltip.x.format = 'MMM yyyy';
    }
    
    if (selectedData == 'yearly') {
      items = items_yearly;
      statusYear = true;
      if (options.tooltip && options.tooltip.x) options.tooltip.x.format = 'yyyy';
    }

    options.series = [
      { name: 'Sales', data: items[1] },
      { name: 'Items sold', data: items[2] }
    ];

    if (options.xaxis) options.xaxis.categories = items[0];
  }
</script>

<Chart class="text-slate-900" {options} />

<div class="flex justify-between items-center pt-5 pl-5">
  <ButtonGroup>
    <Button on:click={() => handleDataChange('daily')} disabled={statusDaily}>
      Daily
    </Button>
  
    <Button on:click={() => handleDataChange('monthly')} disabled={statusMonthly}>
      Monthly
    </Button>
  
    <Button on:click={() => handleDataChange('yearly')} disabled={statusYear}>
      Yearly
    </Button>
  </ButtonGroup>
</div>
