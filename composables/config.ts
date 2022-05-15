export function useConfig() {
  const config = useState('config', () => ({
    // seo
    siteUrl: 'https://localhost',
    siteLogo: '/images/logo.jpeg',
    github: 'https://github.com/Soya-xy',
    description: '1',
    image: '1',
    article: '1',
    summary: '1',
    schemaOrgJSONLD: {},
    author: 'Soya',
    // 标题
    title: 'Soya',
    // 菜单
    menu: [{
      label: 'Articles',
      icon: '/images/nav-blog.png',
      url: 'articles',
    }, {
      label: 'Projects',
      icon: '/images/nav-blog.png',
      url: 'projects',
    }, {
      label: 'About me',
      icon: '/images/nav-blog.png',
      url: 'about',
    }],
    // 右侧社交菜单
    socialMenu: [
      {
        label: '文章',
        icon: '/images/nav-blog.png',
        url: '',
      }, {
        icon: '/images/nav-blog.png',
        url: '',
      },
    ],
    // 是否开启主题色切换
    enableThemeSwitch: true,
  }))

  return {
    config,

  }
}
