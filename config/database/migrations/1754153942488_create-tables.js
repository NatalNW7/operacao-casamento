/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createTable('users', {
        id: 'id',
        name: {
            type: 'varchar(100)', 
            notNull: true
        },
        whatsapp: {
            type: 'varchar(25)',
            notNull: true
        },
        cpf: {
            type: 'varchar(15)',
            notNull: true,
            unique: true
        },
        email: {
            type: 'varchar(50)',
            notNull: true
        },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    });
    pgm.createTable('products', {
        id: {
            type: 'varchar(17)',
            primaryKey: true,
        },
        name: {
            type: 'varchar(17)',
            notNull: true,
        },
        price: {
            type: 'integer',
            notNull: true
        }
    });
    pgm.createTable('payments', {
        id: {
            type: 'varchar(50)',
            primaryKey: true
        },
        userId: {
           type: 'integer',
           notNull: true,
           references: '"users"',
           onDelete: 'CASCADE' 
        },
        productId: {
            type: 'varchar(17)',
            notNull: true,
            references: '"products"',
            onDelete: 'CASCADE'
        },
        paidAmount: {
            type: 'integer',
            notNull: true
        },
        quantityWithBonus: {
            type: 'integer',
            notNull: true
        },
        devMode: {
           type: 'boolean',
           notNull: true 
        },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    });
    pgm.createIndex('payments', 'userId')
    pgm.createIndex('payments', 'productId')
    
    pgm.sql(
        `INSERT INTO products (id, name, price) VALUES
        ('PACOTE_ESPECIAL', 'Pacote Especial', 5),
        ('PACOTE_FAMILIA', 'Pacote Família', 5),
        ('PACOTE_AMIGOS', 'Pacote Amigos', 6),
        ('TICKET_INDIVIDUAL', 'Ticket Individual', 7);`);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
*/
export const down = (pgm) => {
    pgm.dropIndex('payments', 'userId', {
        ifExists: true
    });
    pgm.dropIndex('payments', 'productId', {
        ifExists: true
    });
    pgm.dropTable('payments', {
        cascade: true,
        ifExists: true,
    });
    pgm.dropTable('users', {
        ifExists: true,
    });
    pgm.dropTable('products', {
        ifExists: true,
    });
};
