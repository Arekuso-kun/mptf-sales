<script lang="ts">
    import { Hr } from 'flowbite-svelte';

    export let title: string = '';
    export let extraClass: string = '';
</script>

<div class="flex flex-col justify-between p-5 rounded-lg bg-slate-900 {extraClass}">
    <div>
        <div class="flex flex-row items-center">
            <h5 class="text-xl font-bold">
                {title}
            </h5>
            
            <span class="ml-2 text-indigo-500">
                <slot name="icon"/>
            </span>
        </div>
        <Hr classHr="h-px my-4 border-0 bg-slate-700" />
    </div>
    <slot/>
</div>