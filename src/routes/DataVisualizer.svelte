<script lang="ts">
    import { 
        DarkMode, 
        GradientButton, 
        Dropzone, 
        Popover } from "flowbite-svelte";

    import { 
        CashOutline, 
        FileChartBarOutline, 
        ChartOutline, 
        ChartPieOutline, 
        BadgeCheckOutline, 
        ClockOutline, 
        QuestionCircleSolid } from 'flowbite-svelte-icons';
    
    import Papa from "papaparse";
    
    import GridContainer from "./GridContainer.svelte";
    import SalesChart from "./SalesChart.svelte";
    import ItemsChart from "./ItemsChart.svelte";
    import Achivement from "./Achievement.svelte";

    import type { CsvRow } from './data-analyzer';

    import { 
        reformatDates,
        formatDate,
        countDifferentDays, 
        countItemOccurrences, 
        getLastItemDayDifference, 
        getTotalFees, 
        getTotalSales,
        getPriceSumAndItemCount,
        getMostExpensiveItem,
        getMostSalesInOneDay,
        getMostItemsSoldInOneDay } from './data-analyzer';

    let csvData: CsvRow[] = [];
    let fileName = "";

    let mostExpensiveItem: CsvRow;
    let mostSalesInOneDay: { sales: number, date: string };
    let mostItemsSoldInOneDay: { items: number, date: string };

    let showDataButton: boolean = true;

    function sleep(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    /**
     * Gets the user's loaded csv file and parse it
     * ! 'csvData' variable outside function
     * @param file User's loaded file
     */
     function parseCSV(file: File) {
        const config: Papa.ParseConfig = {
            header: true,
            dynamicTyping: true,
            complete: (results: any) => {
                csvData = results.data.filter((row: CsvRow) =>
                    Object.values(row).some(
                        (cell) => cell !== null && cell !== "",
                    ),
                );
                showDataButton = false;
            },
        };

        // Use FileReader to read the contents of the File
        const reader = new FileReader();

        reader.onload = (event) => {
            if (event.target) {
                const csvContent = event.target.result as string;
                // Parse the CSV content
                Papa.parse(csvContent, config);
            }
        };

        reader.onerror = (event) => {
            // TO DO handle error message
        };

        // Read the file as text
        reader.readAsText(file);
    };

    /**
     * Handle user's file input
     * @param event
     */
     function handleFileChange(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const file = inputElement.files?.[0];

        if (file) {
            parseCSV(file);
            fileName = file.name;
        }
    };

    /**
     * Handle user's file drop input
     * @param event
     */
     function dropHandle(event: DragEvent) {
        event.preventDefault();

        if(!event.dataTransfer) return;
        
        [...event.dataTransfer.items].forEach((item, i) => {
            if (item.kind === "file") {
                const file = item.getAsFile();
                if(!file) return;
                parseCSV(file);
                fileName = file.name;
            }
        });
    };

    let animationHide: boolean = false;
    let animationReveal: boolean = false;
    let showDataToggle = false;

    /**
     * Performs transition animation.
     */
    const transition = async() => {
        animationHide = true;
        await sleep(1000);
        animationReveal = true;
        showDataToggle = true;
        csvData = reformatDates(csvData);
    };

    $: {
        mostExpensiveItem = getMostExpensiveItem(csvData);
        mostSalesInOneDay = getMostSalesInOneDay(csvData);
        mostItemsSoldInOneDay = getMostItemsSoldInOneDay(csvData);
    }
</script>

<div class="absolute top-2 right-2">
    <DarkMode />
</div>

<div class="flex flex-col justify-center transition-all duration-1000 ease-in-out {animationReveal ? "h-0" : "h-screen"}">
    <div class="flex flex-col items-center justify-center overflow-hidden transition-all duration-1000 ease-in-out 
    {animationHide ? "h-0 w-0 rounded-[300px]" : "h-[600px] w-[600px] rounded-[36px]"}">
        <div class="flex-none flex flex-col items-center justify-center gap-10 bg-slate-900 h-[600px] w-[600px] p-10">
            <p class="text-5xl font-semibold">Upload CSV file</p>
            <p class="text-slate-400">How do I get the file?</p>
    
            <Dropzone accept=".csv" on:drop={dropHandle}
                on:dragover={(event) => {event.preventDefault();}}
                on:change={handleFileChange}>
                <svg aria-hidden="true" class="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                {#if csvData.length === 0}
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span class="font-semibold">Click to upload</span> or drag and drop
                    </p>
                {:else}
                    <p>{fileName}</p>
                {/if}
            </Dropzone>
    
            <GradientButton disabled={showDataButton} shadow color="purpleToBlue" size="xl" on:click={transition}>
                Show data
            </GradientButton>
        </div>
    </div>
</div>

{#if showDataToggle == true}
    <div class="grid grid-cols-4 grid-rows-7 gap-4 p-8">
        <GridContainer title="Top 10 most sold items" extraClass="col-span-3 row-span-3">
            <ChartPieOutline slot="icon"/>
            <ItemsChart items={countItemOccurrences(csvData, 10)}/>
        </GridContainer>

        <GridContainer title="Total sales">
            <CashOutline slot="icon"/>

            <p class="text-5xl font-semibold mb-3 mr-8">
                ${getTotalSales(csvData)}
            </p>

            <p class="text-xl font-semibold text-slate-400">
                ${getTotalFees(csvData)} fees
            </p>
        </GridContainer>
        
        <GridContainer title="Items sold">
            <FileChartBarOutline slot="icon"/>

            <p class="text-5xl font-semibold mb-3 mr-8">
                {csvData.length} items
            </p>

            <p class="text-xl font-semibold text-slate-400">
                {countItemOccurrences(csvData).length} unique items
            </p>
        </GridContainer>

        <GridContainer title="Since first trade">
            <ClockOutline slot="icon"/>
            <p class="text-5xl font-semibold mb-3 mr-8">
                {getLastItemDayDifference(csvData)} days
            </p>

            <div class="flex flex-row items-center justify-between">
                <p class="text-xl font-semibold text-slate-400">
                    {countDifferentDays(csvData)} active days
                </p>

                <button id="b3">
                    <QuestionCircleSolid class="w-4 h-4 ms-1.5" />
                    <span class="sr-only">Show information</span>
                </button>
                <Popover triggeredBy="#b3" placement="bottom-start">
                    <div class="p-3 space-y-2">
                      <h3 class="font-semibold text-gray-900 dark:text-white">Active days</h3>
                      These are days with at least one item sold.
                    </div>
                </Popover>
            </div>
        </GridContainer>

       <GridContainer title="Sales chart" extraClass="col-span-4 row-span-3">
            <ChartOutline slot="icon"/>
            <SalesChart 
                items_daily={getPriceSumAndItemCount(csvData, 'daily')}
                items_monthly={getPriceSumAndItemCount(csvData, 'monthly')}
                items_yearly={getPriceSumAndItemCount(csvData, 'yearly')}/>
        </GridContainer>

        <GridContainer title="Achievements" extraClass="col-span-4">
            <BadgeCheckOutline slot="icon"/>
            <div class="space-y-6">
                <Achivement 
                    text_achivement="Most sales in one day" 
                    text_value="${mostSalesInOneDay.sales}" 
                    text_date="{mostSalesInOneDay.date}"/>
                <Achivement 
                    text_achivement="Most items sold in one day" 
                    text_value="{mostItemsSoldInOneDay.items} items" 
                    text_date="{mostItemsSoldInOneDay.date}"/>
                <Achivement 
                    text_achivement="Most expensive item sold" 
                    text_value="{mostExpensiveItem.name} - ${mostExpensiveItem.price.toFixed(2)}" 
                    text_date="{mostExpensiveItem.date}"/>
            </div>
        </GridContainer>
    </div>
{/if}
