/* eslint-disable @typescript-eslint/ban-types */

/**
 * Mongo DB wrapper file to contain connection logic.
 */
import { Collection, Db, MongoClient } from 'mongodb';
import { Logger } from 'winston';

/**
 * This converts an object like { FooModel: FooModelClass } to { FooModel: Collection<FooModelClass> },
 * to ensure downstream, typescript won't complain about incorrect typings with mongodb.
 */
type NonFunctionPropertyNames<T> = {
    // eslint-disable-next-line @typescript-eslint/ban-types
    [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

type CollectionsObj<T> = {
    [i in keyof NonFunctionProperties<T>]: Collection<
        NonFunctionProperties<T>[i]
    >;
};

let client: MongoClient;
let databaseName: string;
let database: Db;

function buildCollections<T>(collections: T): CollectionsObj<T> {
    return Object.entries(collections).reduce((a, [key]) => {
        a[key as any] = database.collection(key);
        return a;
    }, {} as CollectionsObj<T>);
}

export type MongoDbBuilder<T> = (
    dbName: string
) => Promise<{ database: Db; collections: CollectionsObj<T> }>;

export function getMongoDBBuilder<T>(options: {
    url: string;
    collections?: T;
    logger?: Logger;
}): MongoDbBuilder<T> {
    return (dbName: string) => getMongoDB<T>({ dbName, ...options });
}

export async function getMongoDB<T>({
    url,
    dbName,
    collections,
    logger,
}: {
    url: string;
    dbName?: string;
    collections?: T;
    logger?: Logger;
}) {
    if (!client) {
        client = new MongoClient(url);
    }
    client = await client.connect();

    if (!dbName || databaseName !== dbName) {
        database = client.db(dbName);
        databaseName = dbName;
    }

    client.on('error', function (err) {
        logger && logger.debug('MongoDB error %s', err);
    });

    client.on('open', function () {
        logger && logger.debug('MongoDB connection opened');
    });

    if (database) {
        const dbCollections = buildCollections<T>(collections);

        return {
            database,
            collections: dbCollections as unknown as CollectionsObj<T>,
        };
    } else {
        logger &&
            logger.error(
                'MongoDB connection not established before reaching terminus.'
            );
    }
}

export async function closeConnection() {
    await client.close();
    client = undefined;
    databaseName = undefined;
    database = undefined;
}
