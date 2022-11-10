"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../src/index");
const expect_type_1 = require("expect-type");
const moment_1 = __importDefault(require("moment"));
let phone = process.env.TEST_PHONE;
let token = process.env.ADASMS_APPLICATION_SECRET;
let apiUrl = "https://terminal.adasms.com/api";
let client;
beforeEach(async () => {
    const option = {
        token: token
    };
    client = new index_1.Client(option);
});
it('should return client', async () => {
    (0, expect_type_1.expectTypeOf)(client).toMatchTypeOf();
});
it('should use adasms api url', async () => {
    expect(client["apiUrl"]).toBe(apiUrl);
});
it('should use adasms token that you set', async () => {
    expect(client["token"]).toBe(token);
});
it('should send sms with preview mode', async () => {
    const params = {
        phone: phone,
        message: "Hello from jest test",
        previewMode: true,
    };
    const response = await client.sendSMS(params);
    (0, expect_type_1.expectTypeOf)(response).toMatchTypeOf();
    expect(response.message.preview).toBe(true);
});
it('should send sms wit callback', async () => {
    const params = {
        phone: phone,
        message: "Hello from jest test",
        previewMode: true,
        callbackUrl: "https://callback.com"
    };
    const response = await client.sendSMS(params);
    (0, expect_type_1.expectTypeOf)(response).toMatchTypeOf();
    expect(response.success).toBe(true);
});
it('should send sms with send_at', async () => {
    const params = {
        phone: phone,
        message: "Hello from jest test",
        previewMode: true,
        send_at: (0, moment_1.default)().add(1, 'hour').format("YYYY-MM-DD HH:mm")
    };
    const response = await client.sendSMS(params);
    (0, expect_type_1.expectTypeOf)(response).toMatchTypeOf();
    expect(response.message?.send_at).toBe(params.send_at + ":00");
});
it('should check for account balance', async () => {
    const response = await client.getCreditBalance();
    (0, expect_type_1.expectTypeOf)(response).toMatchTypeOf();
    expect(response.balance).toBeDefined();
});
it('should create lead', async () => {
    const params = {
        name: "test lead"
    };
    const response = await client.createLead(params);
    (0, expect_type_1.expectTypeOf)(response).toMatchTypeOf();
    expect(response.id).toBeDefined();
    await cleanupLead({ lead_id: response.id.toString() });
});
it('should delete lead_id', async () => {
    const leadParams = {
        name: "test lead"
    };
    const lead = await client.createLead(leadParams);
    const params = {
        lead_id: lead.id
    };
    const response = await client.deleteLead(params);
    (0, expect_type_1.expectTypeOf)(response).toMatchTypeOf();
    expect(response.success).toBeTruthy();
});
it('should list leads', async () => {
    const leadParams = {
        name: "test lead"
    };
    const lead = await client.createLead(leadParams);
    const response = await client.getLeads();
    (0, expect_type_1.expectTypeOf)(response).toMatchTypeOf();
    expect(response.length).toBeGreaterThan(0);
    await cleanupLead({ lead_id: lead.id.toString() });
});
it('should add contact in lead', async () => {
    const leadParams = {
        name: "test lead"
    };
    const lead = await client.createLead(leadParams);
    const params = {
        phone: "60199131212",
        lead_id: lead.id
    };
    const response = await client.createContact(params);
    (0, expect_type_1.expectTypeOf)(response).toMatchTypeOf();
    expect(response.contact_id).toBeDefined();
    await cleanupLead({ lead_id: lead.id.toString() });
});
it('should get contacts for lead_id', async () => {
    const leadParams = {
        name: "test lead"
    };
    const lead = await client.createLead(leadParams);
    const contactParams = {
        phone: "60199131212",
        lead_id: lead.id
    };
    const contact = await client.createContact(contactParams);
    const params = {
        lead_id: lead.id
    };
    const response = await client.getContactList(params);
    (0, expect_type_1.expectTypeOf)(response).toMatchTypeOf();
    expect(response.contacts[contact.contact_id]).toBeDefined();
    await cleanupLead({ lead_id: lead.id.toString() });
});
it('should delete contact in lead_id', async () => {
    const leadParams = {
        name: "test lead"
    };
    const lead = await client.createLead(leadParams);
    const contactParams = {
        phone: "60199131212",
        lead_id: lead.id
    };
    const contact = await client.createContact(contactParams);
    const params = {
        lead_id: lead.id,
        contact_id: contact.contact_id
    };
    const response = await client.deleteContact(params);
    (0, expect_type_1.expectTypeOf)(response).toMatchTypeOf();
    expect(response.success).toBeTruthy();
    await cleanupLead({ lead_id: lead.id.toString() });
});
it('should able to delete scheduled message', async () => {
    const sendSMSParams = {
        phone: phone,
        message: "Hello from jest test",
        previewMode: false,
        send_at: (0, moment_1.default)().add(1, 'hour').format("YYYY-MM-DD HH:mm")
    };
    const sms = await client.sendSMS(sendSMSParams);
    const params = {
        message_id: sms.message?.scheduled_message_id
    };
    const response = await client.deleteScheduledMessage(params);
    (0, expect_type_1.expectTypeOf)(response).toMatchTypeOf();
    expect(response.success).toBeTruthy();
});
it('should list scheduled messages', async () => {
    const sendSMSParams = {
        phone: phone,
        message: "Hello from jest test",
        previewMode: false,
        send_at: (0, moment_1.default)().add(1, 'hour').format("YYYY-MM-DD HH:mm")
    };
    const sms = await client.sendSMS(sendSMSParams);
    const response = await client.listScheduledMessage();
    (0, expect_type_1.expectTypeOf)(response).toMatchTypeOf();
    await cleanupScheduledSMS({ message_id: sms.message.scheduled_message_id });
});
const cleanupScheduledSMS = async (params) => {
    const deleteParams = {
        message_id: params.message_id
    };
    const option = {
        token: token
    };
    const cleanupScheduledSMSClient = new index_1.Client(option);
    await cleanupScheduledSMSClient.deleteScheduledMessage(deleteParams);
};
const cleanupLead = async (params) => {
    const deleteParams = {
        lead_id: parseInt(params.lead_id)
    };
    const option = {
        token: token
    };
    const deleteLeadClient = new index_1.Client(option);
    await deleteLeadClient.deleteLead(deleteParams);
};
//# sourceMappingURL=index.test.js.map