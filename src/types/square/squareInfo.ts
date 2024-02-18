export interface AnnouncementInfo {
    AutherID: string,
    Content: string,
    CreatedAt: number,
}

export interface CreatePostInfo {
    UserID: string,
    Title: string,
    Content: string,
}

export interface CreateReplyInfo {
    Content: string,
    ParentID: string,
}

export interface EditPostInfo {
    Title: string,
    Content: string,
}

export interface PostInfo {
    TopicID: string,
    Title: string,
    Content: string,
    AutherID: string,
    Likes: number,
    Views: number,
    CreatedAt: number,
}

export interface QueryPostsInfo {
    Page: number,
    Limit: number,
}

export interface QueryRepliesInfo {
    Page: number,
    Limit: number,
    TopicID: string,
}

export interface ReplyInfo {
    ReplyID: string,
    TopicID: string,
    ParentID: string,
    Content: string,
    AutherID: string,
    Likes: number,
    CreatedAt: number,
}

export interface ViewsAndLikes {
    Views: number,
    Likes: number,
}