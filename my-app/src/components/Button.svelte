<script>
    //Initaliserar objekt buttonProps
    let buttonProps = {
    class:[$$restProps.class]
    }
</script>
<!-- En knapp om använder de egenskaper som defineras i buttonProps-->
<button {...buttonProps} on:click>
    <slot />
</button>