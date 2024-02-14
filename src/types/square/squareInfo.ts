export interface PostInfo {
    topicID: string,
    title: string,
    content: string,
    autherID: string,
    likes: number,
    views: number,
    createAt: string
}

export interface PageInfo {
    page: number,
    limit: number,
}

export interface CreatePostInfo {
    userID: string,
    title: string,
    content: string,
}