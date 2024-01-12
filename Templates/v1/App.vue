<template>
    <div>
        <h1 class="h3">{{ greeting }}</h1>
        <span class="btn" @click="setGreeting">Refresh Greeting</span>
    </div>
</template>

    
<script>
export default {
    props: {

    },
    data() {
        return {
            greetings: [
                'Good Morning',
                'Good Afternoon',
                'Good Evening'
            ],
            greeting: ''
        }
    },
    methods: {
        getGreeting() {
            return this.greetings[this.greetings.length * Math.random() | 0]
        },
        setGreeting() {
            this.greeting = this.getGreeting()
        }       
    },
    computed: {
        
        },
    components: {
        
        },
    created() {
        this.setGreeting()
    },
    mounted() {

    }
}

</script>


