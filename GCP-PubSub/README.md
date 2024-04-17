# Synece Notification Worker Example

This repository contains an example worker for handling database events captured by Synece, transmitted through a Pub/Sub system, and processing these events to send email notifications accordingly. This example is designed to help you quickly start implementing your own notification system using the Synece platform.

## Overview

The Synece Notification Worker listens to a Pub/Sub topic for messages that represent database events such as inserts, updates, and deletes. Upon receiving a message, the worker processes the event and sends out email notifications based on the type of event.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 12.x or higher)
- npm or yarn package manager
- Access to a Google Cloud project with Pub/Sub enabled
- SMTP server details for sending emails

## Setup Instructions

Follow these steps to get the example worker up and running:

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/Synece/worker_template
cd GCP-PubSub
```

### 2. Install Dependencies

Install the necessary Node.js dependencies:

```bash
npm install
```
or
```bash
yarn install
```

### 3. Configure the Environment

Copy the sample environment configuration file and fill in your details:

```bash
cp .env.example .env
```

Edit `.env` to include your Pub/Sub topic details, database credentials, and SMTP settings for sending emails.

### 4. Run the Worker

To start the worker, run:

```bash
npm run start
```
or
```bash
yarn run start
```

The worker will now listen for messages on the configured Pub/Sub topic and send notifications as configured.

### 5. Run in Production

To start the worker, run:

```bash
npm run build && node out.js
```
or
```bash
yarn run build && node out.js
```

## Customization

This worker is just a starting point. You are encouraged to modify and extend it to meet your specific requirements. Some potential customizations could include:
- Adding support for different types of notifications (SMS, push notifications, etc.)
- Extending the message processing logic to handle more complex business scenarios
- Integrating with other services or databases

## Contributing

If you have suggestions for improvements or bug fixes, please submit a pull request or open an issue in this repository.

## License

This example worker is provided under the MIT license. See the LICENSE file for more details.

## Support

If you need help setting up or customizing your worker, please contact Synece support at contact@synece.com.
