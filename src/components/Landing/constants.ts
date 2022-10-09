export const landingIds = {
	mostImportant: 'most-important',
	guides: 'guides',
	about: 'about',
	supportUs: 'support-us'
};

function makeAnchor(id: string) {
	return `#${id}`;
}

export const landingLinks = [
	{
		text: 'Гайды и руководства',
		href: makeAnchor(landingIds.guides)
	},
	{
		text: 'О проекте',
		href: makeAnchor(landingIds.about)
	},
	{
		text: 'Помочь проекту',
		href: makeAnchor(landingIds.supportUs),
		highlight: true
	}
];
