import fetch from 'node-fetch';
import moment from 'moment'; 
import * as type from './types';

export class Client {
    token: string
    apiUrl: string
    constructor(option: type.ClientOption) {
        this.token = option.token
        this.apiUrl = "https://terminal.adasms.com/api"
    }

    /**
     * Send SMS API
     * @param params 
     * @returns 
     */
    public async sendSMS(params: type.SendSMSObject): Promise<type.SendSMSAPIResponse | type.ErrorResponse> {
        const form = new FormData()
        form.append("_token", this.token)
        form.append("phone", params.phone.toString())
        form.append("message", (params.message) ?  params.message.toString() : "Sent from adasms-client.")
        form.append("callback_url", (params.callbackUrl) ?  params.callbackUrl.toString() : "")
        form.append("preview", (params.previewMode) ?  "1" : "0")
        form.append("lead_id", (params.leadId) ? params.leadId.toString() : "")
        form.append("send_at", moment(params.sendAt, "Y-m-d H:i", true).isValid() ? params.sendAt!.toString() : "")

        const response = await fetch(this.apiUrl + "/v1/send", {
            "method": "POST",
            "headers": {
              "Content-Type": "multipart/form-data"
            },
            "body": form
        })
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
     * @returns 
     */
    public async getCreditBalance(): Promise<type.BalanceAPIResponse | type.ErrorResponse> {
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
     * List scheduled "sendAt" messages
     * @returns 
     */
    public async listScheduledMessage() {
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
     * @param params 
     * @returns 
     */
    public async deleteScheduledMessage(params : type.DeleteMessageObject) {
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
}
