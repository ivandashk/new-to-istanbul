export type Metadata = {
	posts: Post[];
};

export type Post = {
	layout: string;
	title: string;
	date: string;
	thumbnail: string;
	slug: string;
};
