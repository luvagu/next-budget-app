module.exports = {
	debug: process.env.NODE_ENV === 'development',
	i18n: {
		locales: ['en', 'es'],
		defaultLocale: 'es',
	},
	localePath:
		typeof window === 'undefined'
			? require('path').resolve('./public/locales')
			: '/public/locales',
	ns: ['common'],
}
