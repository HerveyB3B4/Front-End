export interface PostInfo {
    title: string,
    like: string,
    createTime: string
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