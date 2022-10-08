export type Collections = {
	posts: Post[];
	creators: Creator[];
};

export type Post = {
	layout: string;
	title: string;
	date: string;
	thumbnail: string;
	slug: string;
	creator: Creator['name'];
};

export type Creator = {
	name: string;
	description: string;
	avatar: string;
	slug: string;
	telegram?: string;
};
