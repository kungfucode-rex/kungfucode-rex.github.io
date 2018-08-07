module.exports = {
	title: '小二后台文档',
	base: '/',
	description: '小二租车后台相关文档整理',
	themeConfig: {
    	editLinks: true,
		/* nav: [
			{ text: '框架', link: '/framework/' },
			{ text: 'Async-validator', link: '/plugins/AsyncValidator.md' },
			{ text: 'Axios', link: '/plugins/Axios.md' }
		], */
		nav: [
            { text: '基础框架', link: '/framework/' },
			{
				text: '插件',
				items: [
					{ text: 'Async-validator', link: '/plugins/AsyncValidator' },
					{ text: 'Axios', link: '/plugins/Axios' }
				]
			},
			{
				text: '业务后台',
				items: [
					{ text: '盘古后台', link: '/business/PanGu' },
					{ text: 'BG后台', link: '/business/BG' },
					{ text: '外包后台', link: '/business/Waibao' },
					{ text: '新能源后台', link: '/business/NewEnergy' },
					{ text: '燃油后台', link: '/business/Ranyou' },
					{ text: '微信后台', link: '/business/Weixin' }
				]
			}
		],
		sidebar: {
			'/framework/': [
				'',
				'GlobalAppoint',
				'GlobalConfig',
				'GlobalInstanceProps',
				'GlobalUtils',
				'VersionAndOffline',
				'MenuRouter',
				'QueryListPage',
				'FormPage',
				'FormWidgets',
				'OtherWidgets',
				'ChangeLogs'
			]
		}
	}

}