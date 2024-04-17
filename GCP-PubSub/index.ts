import {PubSub, Message} from '@google-cloud/pubsub';
import {Mailer} from "./classes/Mailer";
import {DebeziumEvent} from "./types";

require("dotenv").config();


// Instantiates a client
const pubsub = new PubSub({projectId: process.env.GCP_PROJECT_ID});
const env = process.env.APP_ENV || "staging";

const mailer = new Mailer();

const messageHandler = async (message: Message) => {

    const data: DebeziumEvent = JSON.parse(message.data.toString());
    const operation = data.payload.op; // r (read), c (create), u (update) or d (delete)
    const table: string = data.payload.source.table;

    console.log(`Received message type ${data.payload.op} for table: ${table}`);

    try {

        switch (operation) {
            // case 'r':
            case 'c':
                // Create event case
                // Here you can handle what happens when a row in table "x" is inserted
                await mailer.sendMail('to@example.com', 'Thank you for your purchase', '<h1>Hello World</h1>'); // Get the corresponding field to get email value
                break;
            case 'u':
                // Update event case
                // Here you can handle what happens when a row in table "x" is updated
                await mailer.sendMail('to@example.com', 'Your preferences have been updated', '<h1>Hello World</h1>'); // Get the corresponding field to get email value
                break;
            case 'd':
                // Delete event case
                // Here you can handle what happens when a row in table "x" is deleted
                await mailer.sendMail('to@example.com', 'Your deployment has successfully been deleted', '<h1>Hello World</h1>'); // Get the corresponding field to get email value
                break;

            default:
                console.log(`Unknown operation type: ${operation}`);
                return;
        }
        // Acknowledge receipt of the message after the processing
        message.ack();

    } catch (err) {
        console.error(`Failed to handle operation ${operation}: ${err}`);
        console.error(JSON.stringify(data.payload));
        // Mark the message as not processed
        message.nack();
        return process.exit(1);
    }
};

const topic = `${env}.synece`; // Your global topic receiving every events
const subscription = `${env}.synece.subscription`; // The topic subscription

const options = {
    flowControl: {
        maxMessages: Number(process.env.PUBSUB_MAX_MESSAGES), // Max un-ack messages processed at a time
    },
};

console.info(`Listening for events in ${topic}`);
const current_topic = pubsub.topic(topic);
const current_subscription = current_topic.subscription(subscription, options);

// Triggers when Pub/Sub subscription receives a new event
current_subscription.on('message', async (message) => {
    // Execute processing function
    await messageHandler(message);
});

// Error handling
current_subscription.on('error', (error) => {
    console.error(`Received error: ${error.message}`);
});
