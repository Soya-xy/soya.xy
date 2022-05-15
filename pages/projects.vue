<script setup lang='ts'>
import type { Repo } from '~/assets/type/github'
import { projectsList } from '~/data/projectsList'
const { config } = useConfig()
const { data } = await useFetch<Repo[]>(`https://api.github.com/users/${config.value.github.split('/')[3]}/repos`)
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
