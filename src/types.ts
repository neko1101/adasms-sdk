export interface SendSMSObject {
    phone: string
    message: string | undefined
    callbackUrl: string | undefined
    previewMode: boolean | undefined
    leadId: string | undefined
    sendAt: string | undefined
}

export interface ClientOption {
    token: string
}

export interface ErrorResponse {
    error?: string | undefined
    explain?: string | undefined
}

export interface SendSMSResponse {
    success: boolean
    message: SendSMSAPIMessage
}

export interface SendSMSAPIResponse {
    error?: string
    explain?: string
    success: boolean
    message: SendSMSAPIMessage      
}

export interface SendSMSAPIMessage {
    price: number
    total_sent: number
    recipients: number
    message_per_recipient: number
    send_at: string
    scheduled_message_id?: number
    priority_mode: boolean
    preview_mode: boolean
}

export interface ScheduledMessage {
    id: number
    send_at: string
    recipients: number
    content: string
    sent: number
}

export interface ListScheduledMessageResponse extends Array<ScheduledMessage>{}

export interface BalanceAPIResponse {
    balance: string
    error?: string
    explain?: string
}

export interface BalanceResponse extends BalanceAPIResponse {}

export interface DeleteMessageObject {
    messageId: number
}

export interface DeleteScheduledMessageResponse {
    success: boolean
}

