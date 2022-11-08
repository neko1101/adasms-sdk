import fetch from 'node-fetch';
import * as type from './types';
import querystring from 'querystring'

export class Client {
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
     * @returns Promise<type.SendSMSResponse | type.ErrorResponse>
     */
    public async sendSMS(params: type.SendSMSObject): Promise<type.SendSMSResponse | type.ErrorResponse> {
        const query = "?_token=" + this.token
        + "&phone=" + params.phone.toString()
        + "&message=" + querystring.escape((params.message) ?  params.message.toString() : "Sent from adasms-client.")
        + "&callback_url=" + (params.callbackUrl) ?  params.callbackUrl?.toString() : ""
        + (params.previewMode) ?  "&preview=1" : ""
        + (params.lead_id) ? "&lead_id=" + params.lead_id?.toString() : ""
        + (params.sendAt) ? "&send_at=" + params.sendAt?.toString() : ""

        const response = await fetch(
            "https://terminal.adasms.com/api/v1/send" + query,
            {
                "method": "GET"
            }
        )
        const data = await response.json() as unknown as type.SendSMSAPIResponse

        if(response.ok) {
            const ok: type.SendSMSResponse = {
                success: data.success,
                message: data.message
            }
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
     * Get ADASMS credit balance
     * @returns Promise<type.BalanceResponse | type.ErrorResponse>
     */
    public async getCreditBalance(): Promise<type.BalanceResponse | type.ErrorResponse> {
        const response = await fetch(this.apiUrl + "/v1/balance", {
            "method": "GET"
        })

        const data = await response.json() as unknown as type.BalanceAPIResponse

        if(response.ok) {
            const ok: type.BalanceResponse = {
               balance: data.balance
            }
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
     * List scheduled "sendAt" messages in queue
     * @returns Promise<type.ScheduledMessage[] | type.ErrorResponse>
     */
    public async listScheduledMessage(): Promise<type.ScheduledMessage[] | type.ErrorResponse> {
        const response = await fetch(this.apiUrl + "/v1/scheduled", {
            "method": "GET"
        })

        const data = await response.json() as unknown as type.ScheduledMessage[] & type.ErrorResponse

        if(response.ok) {
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
    public async deleteScheduledMessage(params : type.DeleteMessageObject): Promise<type.DeleteScheduledMessageResponse | type.ErrorResponse> {
        const response = await fetch(
            this.apiUrl 
            + "/v1/scheduled/" 
            + params.messageId
            + "?_token=" 
            + this.token,
            {
                "method": "DELETE"
            }
        )
        
        const data = await response.json() as unknown as type.DeleteScheduledMessageResponse & type.ErrorResponse
        
        if(response.ok) {
            const ok: type.DeleteScheduledMessageResponse = data
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
     * Create a lead
     * @param params type.CreateLeadOption
     * @returns Promise<type.CreateLeadResponse | type.ErrorResponse>
     */
    public async createLead(params: type.CreateLeadOption): Promise<type.CreateLeadResponse | type.ErrorResponse> {
        const form = new FormData();
        form.append("name", params.name.toString());

        const response = await fetch(this.apiUrl + "/v1/leads?_token=" + this.token, {
            "method": "POST",
            "headers": {
                "Content-Type": "multipart/form-data"
            },
            "body": form
        })
        const data = await response.json() as unknown as type.CreateLeadAPIResponse & type.ErrorResponse  

        if(response.ok) {
            const ok: type.CreateLeadResponse = data
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
        const data = await response.json() as unknown as type.GetLeadAPIResponse[] & type.ErrorResponse  

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
    public async createContact(params: type.CreateContactOption): Promise<type.CreateContactResponse | type.ErrorResponse> {
        const form = new FormData();
        form.append("phone", params.phone.toString());

        const response = await fetch(this.apiUrl + "/v1/leads/" + params.lead_id + "?_token=" + this.token, {
            "method": "POST",
            "headers": {
                "Content-Type": "multipart/form-data"
            },
            "body": form
        })

        const data = await response.json() as unknown as type.CreateContactAPIResponse & type.ErrorResponse

        if(response.ok) {
            const ok: type.CreateContactResponse = data
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
     * Get the list of contact by lead_id
     * @param params type.GetContactListOption
     * @returns Promise<type.GetContactListResponse | type.ErrorResponse>
     */
    public async getContactList(params: type.GetContactListOption): Promise<type.GetContactListResponse | type.ErrorResponse> {
        const response = await fetch(
            this.apiUrl 
            + "/v1/leads/" 
            + params.lead_id 
            + "?_token=" + this.token, 
            {
                "method": "GET"
            }
        )

        const data = await response.json() as unknown as type.GetContactListAPIResponse & type.ErrorResponse

        if(response.ok) {
            const ok: type.GetContactListResponse = data
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
     * Delete lead
     * @param params type.DeleteLeadOption
     * @returns Promise<type.DeleteLeadResponse | type.ErrorResponse>
     */
    public async deleteLead(params: type.DeleteLeadOption): Promise<type.DeleteLeadResponse | type.ErrorResponse> {
        const response = await fetch(
            this.apiUrl 
            + "/v1/leads/" 
            + params.lead_id
            + "?_token=" + this.token, 
            {
                "method": "DELETE"
            }
        )

        const data = await response.json() as unknown as type.DeleteLeadAPIResponse & type.ErrorResponse

        if(response.ok) {
            const ok: type.DeleteLeadResponse = data
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
     * delete contact
     * @param params type.DeleteContactOption
     * @returns Promise<type.DeleteContactResponse | type.ErrorResponse>
     */
    public async deleteContact(params: type.DeleteContactOption): Promise<type.DeleteContactResponse | type.ErrorResponse> {
        const response = await fetch(
            this.apiUrl 
            + "/v1/leads/" 
            + params.lead_id
            + "/" + params.contact_id
            + "?_token=" + this.token, 
            {
                "method": "DELETE"
            }
        )

        const data = await response.json() as unknown as type.DeleteContactAPIResponse & type.ErrorResponse

        if(response.ok) {
            const ok: type.DeleteContactResponse = data
            return ok
        } else {
            const err: type.ErrorResponse = {
                error: data.error,
                explain: data.explain
            }
            return err
        }
    }
}
