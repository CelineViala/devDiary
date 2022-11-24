BEGIN;
DROP TABLE IF EXISTS "diary_entry","paragraph","category","keyword","capture","link", "diary_entry_has_keyword" CASCADE;

CREATE TABLE "category"(
    "id" SERIAL PRIMARY KEY,
    "label" VARCHAR(50) NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);
CREATE TABLE "diary_entry"(
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(100) NOT NULL,
    "date" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "context" TEXT,
    "fixed" BOOLEAN,
    "category_id" INT NOT NULL REFERENCES "category" ("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);
CREATE TABLE "paragraph"(
    "id" SERIAL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "important" BOOLEAN NOT NULL DEFAULT FALSE,
    "diary_entry_id" INT NOT NULL REFERENCES "diary_entry" ("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
); 
CREATE TABLE "keyword"(
    "id" SERIAL PRIMARY KEY,
    "label" VARCHAR(100) NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);
CREATE TABLE "capture"(
    "id" SERIAL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "diary_entry_id" INT NOT NULL REFERENCES "diary_entry" ("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);
CREATE TABLE "link"(
    "id" SERIAL PRIMARY KEY,
    "address" TEXT NOT NULL,
    "diary_entry_id" INT NOT NULL REFERENCES "diary_entry" ("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);
CREATE TABLE
    "diary_entry_has_keyword" (
        "diary_entry_id" INT NOT NULL REFERENCES "diary_entry" ("id") ON DELETE CASCADE,
        "keyword_id" INT NOT NULL REFERENCES "keyword" ("id") ON DELETE CASCADE,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        PRIMARY KEY ("diary_entry_id", "keyword_id") 
);
COMMIT;