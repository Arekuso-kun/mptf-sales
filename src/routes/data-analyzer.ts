export interface CsvRow {
    name: string;
    sku: string;
    orderid: string;
    date: string;
    status: string;
    price: number;
    net: number;
    fee: number;
}

/**
* Counts every item occurrences 
* @param data User's CSV data
*/
export function countItemOccurrences(data: CsvRow[], numFirstElements?: number): [string, number][] {
    const itemOccurrences: Record<string, number> = {};

    for (const item of data) {
        // If the item is already in the dictionary, increment its count, otherwise set count to 1
        itemOccurrences[item.name] = (itemOccurrences[item.name] || 0) + 1;
    }

    const sortedOccurrences = Object.entries(itemOccurrences);
    sortedOccurrences.sort((a, b) => b[1] - a[1]);

    if (numFirstElements !== undefined && numFirstElements >= 0) {
        const firstElements = sortedOccurrences.slice(0, numFirstElements);
        const restCount = sortedOccurrences.slice(numFirstElements).reduce((acc, [, count]) => acc + count, 0);
        if (restCount > 0) {
            return [...firstElements, ['Other', restCount]];
        }
        return firstElements;
    }

    return sortedOccurrences;
}

/**
 * Calculates the total sales
 * @param data User's CSV data
 * @returns The total sales amount rounded to two decimal places
 */
export function getTotalSales(data: CsvRow[]): number {
    let totalSales = 0;

    for (const item of data) {
        totalSales += item.price;
    }

    return parseFloat(totalSales.toFixed(2));
}

/**
 * Calculates the total fees
 * @param data User's CSV data
 * @returns The total fees amount rounded to two decimal places
 */
export function getTotalFees(data: CsvRow[]): number {
    let totalFees = 0;

    for (const item of data) {
        totalFees += item.fee;
    }

    return parseFloat(totalFees.toFixed(2));
}

/**
 * Calculates the difference in days between the last item's date (the oldest one) and today's date
 * @param data User's CSV data
 * @returns The difference in days as a whole number
 */
export function getLastItemDayDifference(data: CsvRow[]): number {
    const lastItemDate = new Date(data[data.length - 1].date);
    
    const today = new Date();

    const differenceMs = today.getTime() - lastItemDate.getTime();

    // Convert the difference from milliseconds to days
    return Math.floor(differenceMs / (1000 * 60 * 60 * 24));
}

/**
 * Counts the number of different days
 * @param data User's CSV data
 * @returns The number of different days
 */
export function countDifferentDays(data: CsvRow[]): number {
    const uniqueDates = new Set<string>();

    for (const item of data) {
        // Extracts only the day, month, and year
        const dateWithoutTime = item.date.split(" ").slice(0, 3).join(" ").replaceAll(',', ''); 
        uniqueDates.add(dateWithoutTime);
    }

    return uniqueDates.size;
}

/**
 * Calculates the sales and item sold aggregated by day, month, or year
 * @param data User's CSV data
 * @param aggregation The aggregation type ('daily', 'monthly', or 'yearly')
 * @returns An array containing three arrays: dates, sales, and items sold
 */
export function getPriceSumAndItemCount(data: CsvRow[], aggregation: 'daily' | 'monthly' | 'yearly'): [string[], number[], number[]] {

    function dateToString(date: Date, aggregation: 'daily' | 'monthly' | 'yearly'): string {
        switch (aggregation) {
            case 'daily':
                return date.toISOString().split("T")[0];

            case 'monthly':
                return date.toISOString().substr(0, 7);

            case 'yearly':
                return date.toISOString().substr(0, 4);
        }
    }

    function incrementDate(lastDate: Date, aggregation: 'daily' | 'monthly' | 'yearly'): void {
        switch (aggregation) {
            case 'daily':
                lastDate.setDate(lastDate.getDate() + 1);
                break;

            case 'monthly':
                lastDate.setMonth(lastDate.getMonth() + 1);
                break;

            case 'yearly':
                lastDate.setFullYear(lastDate.getFullYear() + 1);
                break;
        }
    }

    const dates: string[] = [];
    const priceSums: number[] = [];
    const itemCounts: number[] = [];

    const dateMap = new Map<string, { priceSum: number, itemCount: number }>();

    for (const item of data) {
        const date = new Date(item.date + ' UTC');

        // Convert EST time to UTC time
        date.setHours(date.getHours() + 5);

        let dateString = dateToString(date, aggregation);

        // Ensure dateData is initialized with a default value if it doesn't exist in the map
        const dateData = dateMap.get(dateString) ?? { priceSum: 0, itemCount: 0 };

        dateData.priceSum += item.price;
        dateData.itemCount++;

        dateMap.set(dateString, dateData);
    }

    const firstDate = new Date([...dateMap.keys()].reverse()[0]);
    const lastDate = new Date([...dateMap.keys()][0]);

    incrementDate(lastDate, aggregation);

    for (let currentDate = firstDate; currentDate < lastDate; ) {
        let dateString = dateToString(currentDate, aggregation);

        // Push aggregated data for each date range
        if (!dateMap.has(dateString)) {
            dates.push(dateString);
            priceSums.push(0);
            itemCounts.push(0);
        } else {
            const dateData = dateMap.get(dateString)!;
            dates.push(dateString);
            priceSums.push(parseFloat(dateData.priceSum.toFixed(2)));
            itemCounts.push(dateData.itemCount);
        }

        incrementDate(currentDate, aggregation);
    }

    return [dates, priceSums, itemCounts];
}
