<template>
    <div class="stats">
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>Stat</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Number of Notes</td>
                    <td>{{storeNotes.totalNotesCount}}</td>
                </tr>
                <tr>
                    <td>Total number of Character</td>
                    <td>{{ storeNotes.totalCharactersCount }}</td>
                </tr>
            </tbody>
        </table>

        <input maxlength="10" v-model="loveNoteballs" v-autofocus class="input" type="text"
            placeholder="Do you love noteballs?">

        <input v-model="searchTerm" class="input mt-10" type="text" id="search" placeholder="Autocomplete here..." />
        <ul v-if="searchCountries.length">
            <li>
                Showing {{ searchCountries.length }} of {{ countries.length }} results
            </li>
            <li v-for="country in searchCountries" :key="country.name" @click="selectCountry(country.name)">
                {{ country.name }}
            </li>
        </ul>

        <p v-if="selectedCountry">
            You have selected: {{ selectedCountry }}
        </p>
    </div>

</template>

<script setup>
import { ref, computed } from 'vue'
import { useStoreNotes } from '@/stores/storeNotes'
import { vAutofocus } from '@/directives/vAutofocus'
import { useWatchCharacters } from '@/use/useWatchCharacters'
import countries from '@/data/countries.json'

const storeNotes = useStoreNotes()
const loveNoteballs = ref('')
useWatchCharacters(loveNoteballs, 10)

let searchTerm = ref('')

const searchCountries = computed(() => {
    if (searchTerm.value === '') {
        return []
    }

    let matches = 0

    return countries.filter(country => {
        if (
            country.name.toLowerCase().includes(searchTerm.value.toLowerCase())
            && matches < 10
        ) {
            matches++
            return country
        }
    })
})

const selectCountry = (country) => {
    selectedCountry.value = country
    searchTerm.value = ''
}

let selectedCountry = ref('')
</script>