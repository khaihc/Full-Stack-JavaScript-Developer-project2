DO $$ BEGIN
    IF EXISTS (SELECT * FROM information_schema.tables WHERE table_name = 'users') THEN
        DROP TABLE users CASCADE;
    END IF;
END $$;

DO $$ BEGIN
    IF EXISTS (SELECT * FROM information_schema.tables WHERE table_name = 'products') THEN
        DROP TABLE products CASCADE;
    END IF;
END $$;

DO $$ BEGIN
    IF EXISTS (SELECT * FROM information_schema.tables WHERE table_name = 'orders') THEN
        DROP TABLE orders CASCADE;
    END IF;
END $$;

DO $$ BEGIN
    IF EXISTS (SELECT * FROM information_schema.tables WHERE table_name = 'order_product') THEN
        DROP TABLE order_product CASCADE;
    END IF;
END $$;