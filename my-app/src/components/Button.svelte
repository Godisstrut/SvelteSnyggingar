<script>
    let buttonProps = {
    class:[$$restProps.class]
    }
</script>

<button {...buttonProps} on:click>
    <slot />
</button>