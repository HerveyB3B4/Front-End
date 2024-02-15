import request from "../request";
import { CreatePostInfo, CreateReplyInfo, EditPostInfo, QueryPostsInfo, QueryRepliesInfo } from "../../types/square/squareInfo";

export default class squareService {
    static async getAnnouncement(): Promise<any> {
        return request({
            "headers": {
                "Content-Type": "application/json"
            },
            method: "get",
            url: "/api/square/announcement",
        })
    }

    static async postCreateNewPost(data: CreatePostInfo): Promise<any> {
        return request({
            "headers": {
                "Content-Type": "application/json"
            },
            method: "post",
            url: "/api/square/topic/new",
            data: data,
        })
    }

    static async getPostList(data: QueryPostsInfo): Promise<any> {
        return request({
            "headers": {
                "Content-Type": "application/json"
            },
            method: "get",
            url: "/api/square/topic/list",
            params: data,
        })
    }

    static async getPostDetail(topicID: string): Promise<any> {
        return request({
            "headers": {
                "Content-Type": "application/json"
            },
            method: "get",
            url: "/api/square/topic",
            params: {
                TopicID: topicID,
            },
        })
    }

    static async postCreateNewReply(topicID: string, data: CreateReplyInfo): Promise<any> {
        return request({
            "headers": {
                "Content-Type": "application/json"
            },
            method: "post",
            url: "/api/square/topic/replies",
            params: {
                TopicID: topicID,
            },
            data: data,
        })
    }

    static async getReplies(params: QueryRepliesInfo): Promise<any> {
        return request({
            "headers": {
                "Content-Type": "application/json"
            },
            method: "get",
            url: "/api/square/topic/replies",
            params: params,
        })
    }

    static async putEditPost(topicID: string, data: EditPostInfo): Promise<any> {
        return request({
            "headers": {
                "Content-Type": "application/json"
            },
            method: "put",
            url: "/api/square/topic",
            params: {
                TopicID: topicID,
            },
            data: data,
        })
    }

    static async getViewsAndLikes(topicID: string): Promise<any> {
        return request({
            "headers": {
                "Content-Type": "application/json"
            },
            method: "get",
            url: "/api/square/topic/views&likes",
            params: {
                TopicID: topicID,
            },
        })
    }

    static async putLikesOnReply(replyID: string): Promise<any> {
        return request({
            "headers": {
                "Content-Type": "application/json"
            },
            method: "put",
            url: "/api/square/topic/likes/reply",
            params: {
                ReplyID: replyID,
            },
        })
    }

    static async putLikesOnPost(topicID: string): Promise<any> {
        return request({
            "headers": {
                "Content-Type": "application/json"
            },
            method: "put",
            url: "/api/square/topic/likes/topic",
            params: {
                TopicID: topicID,
            },
        })
    }

    static async delReply(replyID: string): Promise<any> {
        return request({
            "headers": {
                "Content-Type": "application/json"
            },
            method: "del",
            url: "/api/square/topic/delete/reply",
            params: {
                ReplyID: replyID,
            },
        })
    }

    static async delPost(topicID: string): Promise<any> {
        return request({
            "headers": {
                "Content-Type": "application/json"
            },
            method: "del",
            url: "/api/square/topic/delete/topic",
            params: {
                TopicID: topicID,
            },
        })
    }
}