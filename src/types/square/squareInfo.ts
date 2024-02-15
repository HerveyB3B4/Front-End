export interface AnnouncementInfo {
    AutherID: string,
    Content: string,
    CreatedAt: string,
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
    CreatedAt: string,
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
    CreatedAt: string,
}

export interface ViewsAndLikes {
    Views: number,
    Likes: number,
}