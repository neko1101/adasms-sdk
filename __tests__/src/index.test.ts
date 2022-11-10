import Client, * as type from "../../src/index"
import {expectTypeOf} from 'expect-type'
import moment from 'moment'

let phone = process.env.TEST_PHONE
let token = process.env.ADASMS_APPLICATION_SECRET
let apiUrl = "https://terminal.adasms.com/api"


let client: Client

beforeEach(async() => {
    const option: type.ClientOption = {
        token: token!
    }
    client = new Client(option)
})

it('should return client', async () => {
    expectTypeOf(client).toMatchTypeOf<Client>()
});

it('should use adasms api url', async () => {
    expect(client["apiUrl"]).toBe(apiUrl)
});

it('should use adasms token that you set', async () => {
    expect(client["token"]).toBe(token)
});

it('should send sms with preview mode', async () => {
    const params: type.SendSMSObject = {
        phone: phone,
        message: "Hello from jest test",
        previewMode: true,
    }
    const response = await client.sendSMS(params)
    expectTypeOf(response).toMatchTypeOf<type.SendSMSResponse>()
    expect(response.message!.preview).toBe(true)
});

it('should send sms wit callback', async () => {
    const params: type.SendSMSObject = {
        phone: phone,
        message: "Hello from jest test",
        previewMode: true,
        callbackUrl: "https://callback.com"
    }
    const response = await client.sendSMS(params)
    expectTypeOf(response).toMatchTypeOf<type.SendSMSResponse>()
    expect(response.success).toBe(true)
});

// it('should send sms with lead_id', async () => {
//     const params: type.SendSMSObject = {
//         message: "Hello from jest test",
//         previewMode: true,
//         lead_id: 1
//     }
//     const response = await client.sendSMS(params)
//     expectTypeOf(response).toMatchTypeOf<type.SendSMSResponse>()
//     expect(response.message!.lead_id).toBe("1")
//     console.log(response)
// });

it('should send sms with send_at', async () => {
    const params: type.SendSMSObject = {
        phone: phone,
        message: "Hello from jest test",
        previewMode: true,
        send_at: moment().add(1, 'hour').format("YYYY-MM-DD HH:mm") // Y-m-d H:i
    }
    const response = await client.sendSMS(params)
    expectTypeOf(response).toMatchTypeOf<type.SendSMSResponse>()
    expect(response.message?.send_at).toBe(params.send_at + ":00")
});

it('should check for account balance', async () => {
    const response = await client.getCreditBalance()
    expectTypeOf(response).toMatchTypeOf<type.BalanceResponse>()
    expect(response.balance).toBeDefined()
});

it('should create lead', async () => {
    const params: type.CreateLeadOption = {
        name: "test lead"
    }
    const response = await client.createLead(params)
    expectTypeOf(response).toMatchTypeOf<type.CreateLeadResponse>()
    expect(response.id).toBeDefined()

    await cleanupLead({ lead_id: response.id!.toString()})
});

it('should delete lead_id', async () => {
    const leadParams: type.CreateLeadOption = {
        name: "test lead"
    }
    const lead = await client.createLead(leadParams)

    const params: type.DeleteLeadOption = {
        lead_id: lead.id!
    }
    const response = await client.deleteLead(params)
    expectTypeOf(response).toMatchTypeOf<type.DeleteContactResponse>()
    expect(response.success).toBeTruthy()
});

it('should list leads', async () => {
    const leadParams: type.CreateLeadOption = {
        name: "test lead"
    }
    const lead = await client.createLead(leadParams)

    const response = await client.getLeads()
    expectTypeOf(response).toMatchTypeOf<type.GetLeadResponse[] | type.ErrorResponse>()
    // @ts-ignore
    expect(response.length).toBeGreaterThan(0)

    await cleanupLead({lead_id: lead.id!.toString()})
});

it('should add contact in lead', async () => {
    const leadParams: type.CreateLeadOption = {
        name: "test lead"
    }
    const lead = await client.createLead(leadParams)

    const params: type.CreateContactOption = {
        phone: "60199131212",
        lead_id: lead.id!
    }
    const response = await client.createContact(params)
    expectTypeOf(response).toMatchTypeOf<type.CreateContactResponse>()
    expect(response.contact_id).toBeDefined()

    await cleanupLead({lead_id: lead.id!.toString()})
});

it('should get contacts for lead_id', async () => {
    const leadParams: type.CreateLeadOption = {
        name: "test lead"
    }
    const lead = await client.createLead(leadParams)

    const contactParams: type.CreateContactOption = {
        phone: "60199131212",
        lead_id: lead.id!
    }
    const contact = await client.createContact(contactParams)

    const params: type.GetContactListOption = {
        lead_id: lead.id!
    }
    const response = await client.getContactList(params)
    expectTypeOf(response).toMatchTypeOf<type.GetContactListResponse>()
    // @ts-ignore
    expect(response.contacts[contact.contact_id]).toBeDefined()

    await cleanupLead({lead_id: lead.id!.toString()})
});

it('should delete contact in lead_id', async () => {
    const leadParams: type.CreateLeadOption = {
        name: "test lead"
    }
    const lead = await client.createLead(leadParams)

    const contactParams: type.CreateContactOption = {
        phone: "60199131212",
        lead_id: lead.id!
    }
    const contact = await client.createContact(contactParams)

    const params: type.DeleteContactOption = {
        lead_id: lead.id!,
        contact_id: contact.contact_id!
    }
    const response = await client.deleteContact(params)
    expectTypeOf(response).toMatchTypeOf<type.DeleteContactResponse>()
    expect(response.success).toBeTruthy()

    await cleanupLead({lead_id: lead.id!.toString()})
});

it('should able to delete scheduled message', async () => {
    const sendSMSParams: type.SendSMSObject = {
        phone: phone,
        message: "Hello from jest test",
        previewMode: false,
        send_at: moment().add(1, 'hour').format("YYYY-MM-DD HH:mm") // Y-m-d H:i
    }
    const sms = await client.sendSMS(sendSMSParams)

    const params: type.DeleteMessageObject = {
        message_id: sms.message!.scheduled_message_id
    }
    const response = await client.deleteScheduledMessage(params)
    expectTypeOf(response).toMatchTypeOf<type.DeleteScheduledMessageResponse>()
    expect(response.success).toBeTruthy()
});

it('should list scheduled messages', async () => {
    const sendSMSParams: type.SendSMSObject = {
        phone: phone,
        message: "Hello from jest test",
        previewMode: false,
        send_at: moment().add(1, 'hour').format("YYYY-MM-DD HH:mm") // Y-m-d H:i
    }
    const sms = await client.sendSMS(sendSMSParams)

    const response = await client.listScheduledMessage()
    expectTypeOf(response).toMatchTypeOf<type.ListScheduledMessageResponse | type.ErrorResponse>()
    await cleanupScheduledSMS({message_id: sms.message!.scheduled_message_id})
});

const cleanupScheduledSMS = async (params: { message_id: number}) => {
    const deleteParams: type.DeleteMessageObject = {
        message_id: params.message_id
    }   
    const option: type.ClientOption = {
        token: token!
    }
    const cleanupScheduledSMSClient = new Client(option)
    await cleanupScheduledSMSClient.deleteScheduledMessage(deleteParams)
}

const cleanupLead = async (params: { lead_id:string }) => {
    const deleteParams: type.DeleteLeadOption = {
        lead_id: parseInt(params.lead_id)
    }
    const option: type.ClientOption = {
        token: token!
    }
    const deleteLeadClient = new Client(option)
    await deleteLeadClient.deleteLead(deleteParams)
}