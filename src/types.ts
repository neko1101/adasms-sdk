export interface SendSMSObject {
    phone: string
    message?: string
    callbackUrl?: string
    previewMode?: boolean
    lead_id?: string
    sendAt?: string
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

export interface CreateLeadOption {
    name: string
}

export interface CreateLeadAPIResponse {
    id: number,
    name: string
}

export interface CreateLeadResponse extends CreateLeadAPIResponse {}

export interface GetLeadAPIResponse {
    id: number
    name: string
}

export interface GetLeadResponse extends GetLeadAPIResponse {}

export interface CreateContactOption {
    phone: string
    lead_id: number
}

export interface CreateContactAPIResponse {
    lead_id: number
    contact_id: number
    phone: string
}

export interface CreateContactResponse extends CreateContactAPIResponse {}

export interface GetContactListOption {
    lead_id: number
}

export interface Contacts {
    [key: string] : string
}

export interface GetContactListAPIResponse {
    lead: GetLeadResponse,
    contacts: Contacts
}

export interface GetContactListResponse extends GetContactListAPIResponse {}

export interface DeleteLeadOption {
    lead_id: number
}

export interface DeleteLeadAPIResponse {
    success: boolean
}

export interface DeleteLeadResponse extends DeleteLeadAPIResponse {}

export interface DeleteContactOption {
    contact_id: number
    lead_id: number
}

export interface DeleteContactAPIResponse {
    success: boolean
}

export interface DeleteContactResponse extends DeleteContactAPIResponse {}
