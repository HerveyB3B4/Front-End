import request from "../request";
import { PageInfo, PostInfo } from "../../types/discussion/discussionInfo";

export default class discussionService {
    static async createNewPost(data: PostInfo): Promise<any> {
        return request({
            "headers": {
                "Content-Type": "application/json"
            },
            method: "post",
            url: "/square/topic/create",
            data: data,
        })
    }

    static async getPostList(data: PageInfo): Promise<any> {
        return request({
            "headers": {
                "Content-Type": "application/json"
            },
            method: "get",
            url: "/square/topic",
            params: data,
        })
    }

}