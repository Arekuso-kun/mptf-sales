<script lang="ts">
  import { Chart, Button, ButtonGroup } from 'flowbite-svelte';

  export let items: [string, number][]; 

  let statusPie: boolean;
  let statusBar: boolean;

  let selectedChart = 'bar';

  const handleChartChange = (value: string) => {
    selectedChart = value;
  };

  const bar_options: ApexCharts.ApexOptions = {
    series: [{
      data: items.map(([_, num]) => num)
    }],
    chart: {
      height: 460,
      width: '100%',
      type: 'bar',
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
      enabled: false
    },
    grid: {
      show: false
    },
    plotOptions: {
      bar: {
        horizontal: true,
      }
    },
    xaxis: {
      categories: items.map(([str, _]) => str)
    }
  };

  const pie_options: ApexCharts.ApexOptions = {
    series: items.map(([_, num]) => num),
    chart: {
      height: 460,
      width: '100%',
      type: 'pie',
      background: '#00000000'
    },
    theme: {
      mode: 'dark',
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
    tooltip: {
      shared: true
    },
    dataLabels: {
      formatter: (val: number, opts) => {
        const name = opts.w.globals.labels[opts.seriesIndex];
        return name + ' ' + val.toFixed(1) + '%'
      }
    },
    labels: items.map(([str, _]) => str),
    legend: {
      position: 'right',
      horizontalAlign: 'center',
      fontSize: '14',
      labels: {
        useSeriesColors: true
      },
      formatter: function(seriesName, opts) {
        return seriesName + ': ' + opts.w.globals.series[opts.seriesIndex];
      }
    }
  };

  $: {
    statusPie = false;
    statusBar = false;
    
    if (selectedChart == 'pie') {
      statusPie = true;
    }
    
    if (selectedChart == 'bar') {
      statusBar = true;
    }
  }
</script>

{#if selectedChart == 'pie'}
  <Chart class="text-slate-900" options={pie_options} />
{:else if selectedChart == 'bar'} 
  <Chart class="text-slate-900" options={bar_options} />
{/if}

<div class="flex justify-between items-center pt-5 pl-5">
  <ButtonGroup>
    <Button on:click={() => handleChartChange('pie')} disabled={statusPie}>
      Pie chart
    </Button>
  
    <Button on:click={() => handleChartChange('bar')} disabled={statusBar}>
      Bar chart
    </Button>
  </ButtonGroup>
</div>