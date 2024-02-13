import request from "../request";
import { PageInfo, CreatePostInfo } from "../../types/square/squareInfo";

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

    static async createNewPost(data: CreatePostInfo): Promise<any> {
        return request({
            "headers": {
                "Content-Type": "application/json"
            },
            method: "post",
            url: "/api/square/topic/new",
            data: data,
        })
    }

    static async getPostList(data: PageInfo): Promise<any> {
        return request({
            "headers": {
                "Content-Type": "application/json"
            },
            method: "get",
            url: "/api/square/topic/list",
            params: data,
        })
    }

}