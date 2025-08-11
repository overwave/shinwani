--liquibase formatted sql

--changeset overwave:user_create_table
CREATE TABLE IF NOT EXISTS user_
(
    id           BIGSERIAL PRIMARY KEY,
    login        TEXT        NOT NULL,
    wanikani_key TEXT        NOT NULL,
    bunpro_key   TEXT        NOT NULL,
    hash         TEXT        NOT NULL,
    created_at   TIMESTAMPTZ NOT NULL,
    updated_at   TIMESTAMPTZ NOT NULL
);
