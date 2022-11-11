export interface SendSMSObject {
    phone?: string;
    message?: string;
    callbackUrl?: string;
    previewMode?: boolean;
    lead_id?: number;
    send_at?: string;
}

export interface ClientOption {
    token: string;
}

export interface ErrorResponse {
    error?: string;
    explain?: string;
}

export interface SendSMSResponse extends ErrorResponse {
    success?: boolean;
    message?: SendSMSAPIMessage;
}

export interface SendSMSAPIResponse extends ErrorResponse {
    success?: boolean;
    message?: SendSMSAPIMessage;
}

export interface SendSMSAPIMessage {
    price: number;
    total_sent: number;
    recipients: number;
    message_per_recipient: number;
    send_at: string;
    scheduled_message_id: number;
    priority_mode: boolean;
    preview: boolean;
    lead_id: number;
}

export interface ScheduledMessage {
    id: number;
    send_at: string;
    recipients: number;
    content: string;
    sent: number;
}

export interface ListScheduledMessageResponse extends ErrorResponse {
    list?: ScheduledMessage[]
}

export interface BalanceAPIResponse extends ErrorResponse {
    balance?: string;
}

export interface BalanceResponse extends BalanceAPIResponse {}

export interface DeleteMessageObject {
    message_id: number;
}

export interface DeleteScheduledMessageResponse extends ErrorResponse {
    success?: boolean;
}

export interface CreateLeadOption {
    name: string;
}

export interface CreateLeadAPIResponse extends ErrorResponse {
    id?: number;
    name?: string;
}

export interface CreateLeadResponse extends CreateLeadAPIResponse {}

export interface Leads {
    id: number;
    name: string;
}

export interface GetLeadResponse extends ErrorResponse {
    leads?: Leads[]
}

export interface CreateContactOption {
    phone: string;
    lead_id: number;
}

export interface CreateContactAPIResponse extends ErrorResponse {
    lead_id?: number;
    contact_id?: number;
    phone?: string;
}

export interface CreateContactResponse extends CreateContactAPIResponse {}

export interface GetContactListOption {
    lead_id: number;
}

export interface Contacts {
    [key: string]: string;
}

export interface GetContactListAPIResponse extends ErrorResponse {
    lead?: GetLeadResponse;
    contacts?: Contacts;
}

export interface GetContactListResponse extends GetContactListAPIResponse {}

export interface DeleteLeadOption {
    lead_id: number;
}

export interface DeleteLeadAPIResponse extends ErrorResponse {
    success?: boolean;
}

export interface DeleteLeadResponse extends DeleteLeadAPIResponse {}

export interface DeleteContactOption {
    contact_id: number;
    lead_id: number;
}

export interface DeleteContactAPIResponse extends ErrorResponse {
    success?: boolean;
}

export interface DeleteContactResponse extends DeleteContactAPIResponse {}
