<script lang="ts">
    import SidebarLink from "./SidebarLink.svelte";

    interface Link {
        href: string;
        icon: string;
        label: string;
    }

    export let links: Link[];
</script>

<aside
    class="fixed top-16 left-0 bottom-0 w-64 bg-white z-10 border-r border-gray-300"
>
    <div class="p-2 flex flex-col gap-0">
        {#each links as link}
            <SidebarLink href={link.href} icon={link.icon}
                >{link.label}</SidebarLink
            >
        {/each}
    </div>
</aside>
