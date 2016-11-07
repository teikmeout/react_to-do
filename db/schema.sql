DROP TABLE IF EXISTS task;

CREATE TABLE task(
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  description VARCHAR(255),
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  deleted BOOLEAN NOT NULL DEFAULT FALSE,
  -- default value for this timestamp is the moment of creation
  date_created TIMESTAMP NOT NULL DEFAULT NOW(),
  date_completed TIMESTAMP,
  date_deleted TIMESTAMP
);

-- create an index to facilitate searching through the DB
CREATE INDEX name_idx
ON task (name);
