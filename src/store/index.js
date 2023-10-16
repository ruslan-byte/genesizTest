import axios from "axios";
import { defineStore } from 'pinia'
export const useStore = defineStore('index', {
    state: () => ({
        api: {
            url: "",
            accessToken: "",
        },
        resultList: [],
        select: {
            activeID: 0,
            options: [
                { id: 0, label: "Не выбрано" },
                { id: 1, label: "Сделка" },
                { id: 2, label: "Контакт" },
                { id: 3, label: "Компания" },
            ],
        }
    }),
    actions: {
        createItem() {
            if (this.select.activeID === 0) return;
            const links = ["/api/v4/leads", "/api/v4/contacts", "/api/v4/companies"];
            return axios(this.api.url + links[this.select.activeID - 1], {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + this.api.accessToken,
                },
                mode: "no-cors",
                data: { name: [] },
            }).then((res) => {
                const resultNames = ["leads", "contacts", "companies"];
                let result = res.data._embedded[resultNames[this.select.activeID - 1]][0]
                result.label=this.select.options[this.select.activeID].label
                this.resultList.push(result);
                return true;
            });
        },
        getToken() {
            axios("https://test.gnzs.ru/oauth/get-token.php", {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                "X-Client-Id": "31334466",
                },
            }).then((res) => {
                this.api.url = `https://${res.data.base_domain}`;
                this.api.accessToken = res.data.access_token;
            });
        }
    },
})