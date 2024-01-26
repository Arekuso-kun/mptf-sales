<script lang="ts">
    import {
        Button,
        DarkMode,
        Fileupload,
        GradientButton,
        Heading,
        Dropzone,
        P,
        Hr,
        Badge,
    } from "flowbite-svelte";
    import Papa from "papaparse";
    import GridContainer from "./GridContainer.svelte";
    import SalesChart from "./SalesChart.svelte";
    import ItemsChart from "./ItemsChart.svelte";
    import { CashOutline, FileChartBarOutline, ChartOutline, ChartPieOutline, BadgeCheckOutline, ClockSolid } from 'flowbite-svelte-icons';
    import Achivement from "./Achivement.svelte";

    interface CsvRow {
        name: string;
        sku: string;
        orderid: string;
        date: string;
        status: string;
        price: number;
        net: number;
        fee: number;
    }

    let csvData: CsvRow[] = [];
    let fileName = "";

    function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    /**
     * Gets the user's loaded csv file and parse it
     * @param file User's loaded file
     */
    const parseCSV = (file: File) => {
        const config: Papa.ParseConfig = {
            header: true,
            dynamicTyping: true,
            complete: (results: any) => {
                csvData = results.data.filter((row: CsvRow) =>
                    Object.values(row).some(
                        (cell) => cell !== null && cell !== "",
                    ),
                );
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
    const handleFileChange = (event: Event) => {
        const inputElement = event.target as HTMLInputElement;
        const file = inputElement.files?.[0];

        if (file) {
            parseCSV(file);
        }
    };

    /**
     * Handle user's file drop input
     * @param event
     */
    const dropHandle = (event: DragEvent) => {
        event.preventDefault();

        console.log(event);

        if(!event.dataTransfer) return;
        
        [...event.dataTransfer.items].forEach((item, i) => {
            console.log(item);
            if (item.kind === "file") {
                const file = item.getAsFile();
                if(!file) return;
                parseCSV(file);
                fileName = file.name;
            }
        });

        console.log(event);
    };

    const animation = async() => {
        test = "h-0 w-0 rounded-[300px]";
        await delay(1000);
        test2 = "h-0";
        testBool = true;
    };


    let test = "h-[600px] w-[600px] rounded-[36px]";
    let test2 = "h-screen";
    let testBool = false;
    let gridTest = "p-4 rounded-lg bg-slate-900"
</script>

<div class="absolute top-2 right-2">
    <DarkMode />
</div>

<div class="flex flex-col justify-center transition-all duration-1000 ease-in-out {test2}">
    <div class="flex flex-col items-center justify-center overflow-hidden transition-all duration-1000 ease-in-out {test}">
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
    
            <GradientButton shadow color="purpleToBlue" size="xl" on:click={animation}>
                Show data
            </GradientButton>
        </div>
    </div>
</div>

{#if testBool == true}
    <div class="grid grid-cols-4 grid-rows-[repeat(4,_minmax(0,_300px)] gap-4 p-8">
        <GridContainer title="Items pie chart" extraClass="col-span-3 row-span-2">
            <ChartPieOutline slot="icon"/>
            <ItemsChart/>
        </GridContainer>

        <GridContainer title="Total sales">
            <CashOutline slot="icon"/>
            <p class="text-5xl font-semibold mb-3">$2,109.00</p>
            <p class="text-xl font-semibold text-slate-400">Fees: $300.00</p>
        </GridContainer>
        
        <GridContainer title="Items sold">
            <FileChartBarOutline slot="icon"/>
            <p class="text-5xl font-semibold mb-3">294 items</p>
            <p class="text-xl font-semibold text-slate-400">201 unique items</p>
        </GridContainer>

       <GridContainer title="Sales chart" extraClass="col-span-4 row-span-2">
            <ChartOutline slot="icon"/>
            <SalesChart/>
        </GridContainer>

        <GridContainer title="Achivements" extraClass="col-span-4">
            <BadgeCheckOutline slot="icon"/>
            <div class="flex flex-col gap-6">
                <Achivement text_achivement="Most sales in one day" text_value="$113.99" text_date="15 January 2022"/>
    
                <Achivement text_achivement="Most items sold in one day" text_value="205 items" text_date="7 January 2022"/>
            </div>
        </GridContainer>
    </div>
    <!-- <div class="bg-slate-400 overflow-hidden transition-all duration-700 ease-in-out h-screen">
        <div>
            <h3 class="text-lg font-semibold my-4">Parsed CSV Data</h3>
        </div>

        {#if csvData.length > 0}
            {#each csvData as row}
                <div>{row.name}</div>
            {/each}
        {/if}

        {#if csvData.length > 0}
            <div>
                <pre>{JSON.stringify(csvData, null, 2)}</pre>
            </div>
        {/if}
    </div> -->
{/if}
