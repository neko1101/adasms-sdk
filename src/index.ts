import fetch from 'node-fetch'
import * as type from './types'
import querystring from 'querystring'
import axios from 'axios'

export default class Client {
    private token: string
    private apiUrl: string

    /**
     * Client constructor
     * @param option type.ClientOption
     */
    constructor(option: type.ClientOption) {
        this.apiUrl = "https://terminal.adasms.com/api"
        if(process.env.ADASMS_APPLICATION_SECRET) {
            this.token = process.env.ADASMS_APPLICATION_SECRET
        } else {
            this.token = option.token
        }
    }

    /**
     * Send SMS API
     * @param params 
     * @returns Promise<type.SendSMSResponse>
     */
    public async sendSMS(params: type.SendSMSObject): Promise<type.SendSMSResponse> {
        let query: string
        query = "?_token=" + this.token

        if (params.phone) {
            query = query + "&phone=" + params.phone!.toString()
        }

        if (params.message) {
            query = query + "&message=" + querystring.escape(params.message.toString())
        } else {
            query = query + "&message=" + querystring.escape("Sent from adasms-client.")
        }

        if(params.callbackUrl) {
            query = query +  "&callback_url=" + params.callbackUrl.toString()
        }

        if(params.previewMode) {
            query = query + "&preview=1"
        }

        if(params.lead_id) {
            query = query + "&lead_id=" + params.lead_id.toString()
        }

        if(params.send_at) {
            query = query + "&send_at=" + params.send_at.toString()
        }
        // console.log(query)
        const response = await fetch(this.apiUrl
            + "/v1/send" + query,
            {
                "method": "GET"
            }
        )

        const data = await response.json()
        // console.log(data)
        if(response.ok) {
            const ok: type.SendSMSResponse = {
                success: data.success,
                message: data.message,
                error: data.error,
                explain: data.explain
            }
            return ok
        } else {
            const err: type.SendSMSResponse = {
                success: false,
                error: data.error,
                explain: data.explain
            }
            return err
        }
    }

    /**
     * Get ADASMS credit balance
     * @returns Promise<type.BalanceResponse | type.ErrorResponse>
     */
    public async getCreditBalance(): Promise<type.BalanceResponse> {
        const response = await fetch(this.apiUrl 
            + "/v1/balance"
            + "?_token=" + this.token,
            {
                "method": "GET"
            }
        )

        const data = await response.json()
        if(response.ok) {
            const ok: type.BalanceResponse = {
               balance: data.balance
            }
            return ok
        } else {
            const err: type.BalanceResponse = {
                error: data.error,
                explain: data.explain
            }
            return err
        }
    }

    /**
     * List scheduled "sendAt" messages in queue
     * @returns Promise<type.ScheduledMessage[] | type.ErrorResponse>
     */
    public async listScheduledMessage(): Promise<any> {
        const response = await axios.get(this.apiUrl 
            + "/v1/scheduled"
            + "?_token=" + this.token
        )

        const data = await response.data as type.ListScheduledMessageResponse
        if(data.length > 0) {
            const ok: type.ScheduledMessage[] = data
            return ok
        } else {
            const err: type.ErrorResponse = {
                error: data.error,
                explain: data.explain
            }
            return err
        }
    }

    /**
     * Delete scheduled message by message ID
     * @param params type.DeleteMessageObject
     * @returns Promise<type.DeleteScheduledMessageResponse | type.ErrorResponse>
     */
    public async deleteScheduledMessage(params : type.DeleteMessageObject): Promise<type.DeleteScheduledMessageResponse> {
        const response = await fetch(this.apiUrl 
            + "/v1/scheduled/" 
            + params.message_id
            + "?_token=" 
            + this.token,
            {
                "method": "DELETE"
            }
        )
        
        const data = await response.json()
        if(response.ok) {
            const ok: type.DeleteScheduledMessageResponse = data
            return ok
        } else {
            const err: type.DeleteScheduledMessageResponse = {
                error: data.error,
                explain: data.explain
            }
            return err
        }
    }

    /**
     * Create a lead
     * @param params type.CreateLeadOption
     * @returns Promise<type.CreateLeadResponse>
     */
    public async createLead(params: type.CreateLeadOption): Promise<any> {
        const form = new URLSearchParams({
            name: params.name.toString()
        })
        const response = await axios.post(this.apiUrl 
            + "/v1/leads"
            + "?_token=" 
            + this.token,
            form
        )
        const data = await response.data as type.CreateLeadResponse
        if(!data.error) {
            const ok: type.CreateLeadResponse = data
            return ok
        } else {
            const err: type.CreateLeadResponse = {
                error: data.error,
                explain: data.explain
            }
            return err
        }
    }

    /**
     * Get the list of leads
     * @returns Promise<type.GetLeadResponse[] | type.ErrorResponse>
     */
    public async getLeads(): Promise<type.GetLeadResponse[] | type.ErrorResponse> {
        const response = await fetch(
            this.apiUrl 
            + "/v1/leads?_token=" 
            + this.token, 
            {
                "method": "GET"
            }
        )
        const data = await response.json()

        if(response.ok) {
            const ok: type.GetLeadResponse[] = data
            return ok
        } else {
            const err: type.ErrorResponse = {
                error: data.error,
                explain: data.explain
            }
            return err
        }
    }

    /**
     * Create contact with lead_id
     * @param params type.CreateContactOption
     * @returns Promise<type.CreateContactResponse | type.ErrorResponse>
     */
    public async createContact(params: type.CreateContactOption): Promise<type.CreateContactResponse> {
        const form = new URLSearchParams({
            phone: params.phone.toString()
        })

        const response = await axios.post(this.apiUrl 
            + "/v1/leads/" 
            + params.lead_id 
            + "?_token=" 
            + this.token, 
           form
        )
        const data = response.data as type.CreateContactResponse
        if(!data.error) {
            const ok: type.CreateContactResponse = data
            return ok
        } else {
            const err: type.CreateContactResponse = {
                error: data.error,
                explain: data.explain
            }
            return err
        }
    }

    /**
     * Get the list of contact by lead_id
     * @param params type.GetContactListOption
     * @returns Promise<type.GetContactListResponse | type.ErrorResponse>
     */
    public async getContactList(params: type.GetContactListOption): Promise<type.GetContactListResponse> {
        const response = await fetch(this.apiUrl 
            + "/v1/leads/" 
            + params.lead_id 
            + "?_token=" + this.token, 
            {
                "method": "GET"
            }
        )

        const data = await response.json()
        if(response.ok) {
            const ok: type.GetContactListResponse = data
            return ok
        } else {
            const err: type.GetContactListResponse = {
                error: data.error,
                explain: data.explain
            }
            return err
        }
    }

    /**
     * Delete lead
     * @param params type.DeleteLeadOption
     * @returns Promise<type.DeleteLeadResponse | type.ErrorResponse>
     */
    public async deleteLead(params: type.DeleteLeadOption): Promise<type.DeleteLeadResponse> {
        const response = await fetch(this.apiUrl 
            + "/v1/leads/" 
            + params.lead_id
            + "?_token=" + this.token, 
            {
                "method": "DELETE"
            }
        )

        const data = await response.json()
        if(response.ok) {
            const ok: type.DeleteLeadResponse = data
            return ok
        } else {
            const err: type.DeleteLeadResponse = {
                error: data.error,
                explain: data.explain
            }
            return err
        }
    }

    /**
     * delete contact
     * @param params type.DeleteContactOption
     * @returns Promise<type.DeleteContactResponse | type.ErrorResponse>
     */
    public async deleteContact(params: type.DeleteContactOption): Promise<type.DeleteContactResponse> {
        const response = await fetch(this.apiUrl 
            + "/v1/leads/" 
            + params.lead_id
            + "/" + params.contact_id
            + "?_token=" + this.token, 
            {
                "method": "DELETE"
            }
        )

        const data = await response.json()
        if(response.ok) {
            const ok: type.DeleteContactResponse = data
            return ok
        } else {
            const err: type.DeleteContactResponse = {
                error: data.error,
                explain: data.explain
            }
            return err
        }
    }
}

export { Client } 
