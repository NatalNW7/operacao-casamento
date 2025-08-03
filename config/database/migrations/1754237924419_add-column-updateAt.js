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
    pgm.addColumn('payments', {
        updateAt: {
            type: 'timestamp',
            notNull: false,
            default: pgm.func('current_timestamp')
        }
    });

    // pgm.createFunction('update_updateAt_column', [], {
    //     returns: 'trigger',
    //     language: 'pplgsql',
    //     replace: true
    // }, 
    // `BEGIN
    //     NEW.updateAt = now();
    //     RETURN NEW;
    // END;`
    // );

    // pgm.createTrigger('payments', 'set_updateAt', {
    //     when: 'BEFORE',
    //     operation: 'update',
    //     function: 'update_updateAt_column',
    //     level: 'ROW',
    // });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    // pgm.dropTrigger('payments', 'set_updateAt');
    // pgm.dropFunction('update_updateAt_column', []);
    pgm.dropColumn('payments', 'updateAt');
};
