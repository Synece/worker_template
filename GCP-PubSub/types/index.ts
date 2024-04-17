// Defines the types for the fields in the "before" and "after" objects
interface DevTopicValue {
    id: number;
    label?: string;
}

// Defines the type for the event source information
interface DebeziumSource {
    version: string;
    connector: string;
    name: string;
    ts_ms: number;  // Timestamp in milliseconds
    snapshot: string; // Indicates if the event is part of a snapshot
    db: string; // Database name
    sequence?: [null, string]; // Sequence information, if available
    schema: string; // Schema name
    table: string; // Table name
    txId?: number; // Transaction ID, if applicable
    lsn?: number; // Log Sequence Number, if applicable
    xmin?: number; // xmin value from PostgreSQL, if applicable
}

// Type for the transaction block in the event metadata
interface TransactionBlock {
    id: string; // Transaction identifier
    total_order: number; // Total order of the event in the transaction
    data_collection_order: number; // Order of data collection in the transaction
}

// The general envelope of a Debezium event
interface DebeziumEnvelope {
    before?: DevTopicValue; // State of the row before the change
    after?: DevTopicValue; // State of the row after the change
    source: DebeziumSource; // Source information of the event
    op: string; // Operation type, such as 'c' (create), 'u' (update), 'd' (delete)
    ts_ms: number; // Event timestamp in milliseconds
    transaction?: TransactionBlock; // Transaction details, if included in the event
}

// Global type for a message from Debezium
export interface DebeziumEvent {
    schema: {
        type: string; // Type of the schema, typically 'struct'
        fields: Array<any>; // Array of field definitions
        optional: boolean; // Whether the schema is optional
        name: string; // Name of the schema
        version: number; // Version of the schema
    };
    payload: DebeziumEnvelope; // The actual data of the event
}
