<script lang="ts">
    import { Badge, Hr } from "flowbite-svelte";
    import { ClockSolid } from "flowbite-svelte-icons";
    import { formatDate } from "./data-analyzer";

    export let text_achivement: String; 
    export let text_value: String; 
    export let text_date: String; 
</script>


<div class="flex flex-row items-center gap-4">
    <span class="text-xl font-semibold leading-none text-slate-400">
        {text_achivement}:
    </span>

    <span class="text-xl font-bold leading-none">
        {text_value}
    </span>

    <Hr classHr="w-12 h-1 m-0 rounded" />

    <Badge color="indigo" border>
        <ClockSolid class="w-4 h-4 me-2" />
        <span class="text-lg">
            {formatDate(new Date(text_date.toString()))}
        </span>
    </Badge>
</div>