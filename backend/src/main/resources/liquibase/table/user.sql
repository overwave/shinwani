--liquibase formatted sql

--changeset overwave:user_create_table
CREATE TABLE IF NOT EXISTS user_
(
    id           BIGSERIAL PRIMARY KEY,
    login        TEXT        NOT NULL,
    wanikani_key TEXT,
    bunpro_key   TEXT,
    hash         TEXT        NOT NULL,
    created_at   TIMESTAMPTZ NOT NULL,
    updated_at   TIMESTAMPTZ NOT NULL
);

--changeset overwave:added_bunpro_credentials
ALTER TABLE IF EXISTS user_
    RENAME COLUMN bunpro_key TO bunpro_email;
ALTER TABLE IF EXISTS user_
    ADD COLUMN IF NOT EXISTS bunpro_password TEXT;

--changeset overwave:rename_wanikani_key
ALTER TABLE IF EXISTS user_
    RENAME COLUMN wanikani_key TO wanikani_token;

--changeset overwave:add_bunpro_token_fields
ALTER TABLE IF EXISTS user_
    ADD COLUMN IF NOT EXISTS bunpro_token             TEXT,
    ADD COLUMN IF NOT EXISTS bunpro_token_valid_until TIMESTAMPTZ;
