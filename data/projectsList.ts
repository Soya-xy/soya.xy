interface ProjectsList {
  name: string
  repoName: string
  tagline: string
  image: string
  url: string
  writeup?: string
  description?: string
}

export const projectsList: ProjectsList[] = [
  {
    name: 'Soya',
    repoName: 'Soya.xy',
    tagline: 'The source of this website.',
    image: 'https://photoserver-1254285921.cos.ap-beijing.myqcloud.com/nuxt.png',
    url: 'https://xiaoyio.com',
    writeup: '',
    description: 'A static site generator for Nuxt.js.',
  },
]
