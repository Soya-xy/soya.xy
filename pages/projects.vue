<script setup lang='ts'>
import type { Repo } from '~/assets/type/github'
const { config } = useConfig()
interface ProjectsList {
  name: string
  repoName: string
  tagline: string
  image: string
  url: string
  writeup?: string
  description?: string
}

const projectsList: ProjectsList[] = [
  {
    name: 'Soya',
    repoName: 'Soya.xy',
    tagline: 'The source of this website.',
    image: '/images/nuxt.png',
    url: 'https://xiaoyio.com',
    writeup: '',
    description: `I built this app because I wanted a simpler, IDE-like, WYSIWYG-free
    note-taking program that would be accessible from any platform via
    the web. I also wanted it to sync without creating users or
    requiring a database.
    The app allows plain text or markdown with previews, syncing,
    internal wiki style note-linking, drag-and-drop, prettier, syntax
    highlighting, light/dark mode, search, categorizing, and more!`,
  },

]

const { data } = await useFetch<Repo[]>(`https://api.github.com/users/${config.value.github.split('/')[3]}/repos?per_page=100`)
</script>

<template>
  <article>
    <header>
      <div class="container">
        <h1>Projects</h1>
        <p class="description">
          A few highlights of my open-source projects. View them all
          <a :href="config.github">on GitHub</a>.
        </p>
      </div>
    </header>

    <section class="projects large container">
      <div v-for="project in projectsList" :key="project.name" class="project">
        <h2>{{ project.name }}</h2>
        <img v-if="project.image" :src="project.image" :alt="project.name">
        <div class="links tags">
          <NuxtLink v-if="project.writeup" :to="project.writeup">
            Write-up
          </NuxtLink>
          <a :href="`https://github.com/taniarascia/${project.repoName}`" target="_blank" rel="noreferrer">
            Source
          </a>
          <a v-if="project.url" href="{project.url}" target="_blank" rel="noreferrer">
            Demo
          </a>
        </div>
        <p class="description">
          {{ project.tagline }}
        </p>
        <div class="stars">
          <img src="/images/nav-github.png" alt="Stargazers">
          <span>
            <a v-if="data.length > 0" :href="`https://github.com/taniarascia/${project.repoName}/stargazers`">
              {{ Number(
                data.find(repo => repo.name === project.name)
                  ?.stargazers_count || 0,
              ).toLocaleString()
              }}
            </a>
            stars on GitHub
          </span>
          <span />
        </div>
      </div>
    </section>
  </article>
</template>
